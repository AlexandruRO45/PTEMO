/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import {
  IModelApp,
  IModelConnection,
  queryTerrainElevationOffset,
  ScreenViewport,
  SpatialViewState,
  Viewport
} from "@itwin/core-frontend";
import { CarDecorator } from "./CarDecorator";
// UNSUPORTED: The following imports are not supported in the browser, use PUBLIC PATH URL instead
// import darkblue from ".darkblue.png";
// import green from ".green.png";
// import lime from ".lime.png";
// import magenta from ".magenta.png";
// import orange from ".orange.png";
// import purple from ".purple.png";
// import red from ".red.png";
// import teal from ".teal.png";
// import white from "../public/white.png";
import { Range3d, Transform, Vector2d } from "@itwin/core-geometry";
import {
  BackgroundMapType,
  BaseMapLayerSettings,
  Cartographic,
  DisplayStyle3dProps,
  GlobeMode,
  SpatialViewDefinitionProps
} from "@itwin/core-common";
import { CarVisualization, Density } from "./CarVisualization";
import { StreetsAndIntersections } from "./common/open-street-map/OverpassApi";

export default class CarDecorationApi {
  /** Will be updated to dispose the currently active decorator. */
  private static _disposables: VoidFunction[] = [];

  /** Will be updated to dispose the currently active decorator. */
  private static _carDecorator?: CarDecorator;

  /** Provide the pngs to be used for the cars */
  private static _carImages = [
    `${process.env.PUBLIC_URL}/truck.png`,
    `${process.env.PUBLIC_URL}/truck2.png`,
    `${process.env.PUBLIC_URL}/truck3.png`,
    // `${process.env.PUBLIC_URL}/darkblue.png`,
    // `${process.env.PUBLIC_URL}/green.png`,
    // `${process.env.PUBLIC_URL}/lime.png`,
    // `${process.env.PUBLIC_URL}/magenta.png`,
    // `${process.env.PUBLIC_URL}/orange.png`,
    // `${process.env.PUBLIC_URL}/purple.png`,
    // `${process.env.PUBLIC_URL}/red.png`,
    // `${process.env.PUBLIC_URL}/teal.png`,
    // `${process.env.PUBLIC_URL}/white.png`,

  ];

  /** Used by `travelTo` to find a destination given a name */
  private static _locationProviderUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;

  /** Used to determine how far out to search - this is in meters and is slightly less than 50 miles */
  public static readonly maxQueryDistance = 50000;

  /** Given a place name - whether a specific address or a more freeform description like "New Zealand", "Ol' Faithful", etc -
   * look up its location on the Earth and, if found, use a flyover animation to make the viewport display that location.
   */
  public static async travelTo(
    viewport: ScreenViewport,
    destination: string
  ): Promise<boolean> {
    if (!viewport.view.is3d()) return false;

    // Obtain latitude and longitude.
    const location = await CarDecorationApi.getLocationFromMapbox(destination);
    if (!location) return false;

    // Determine the height of the Earth's surface at this location.
    const cartographicLocation = Cartographic.fromDegrees({
      longitude: location.center.lon,
      latitude: location.center.lat,
    });

    const elevationOffset = await queryTerrainElevationOffset(viewport, cartographicLocation);
    if (elevationOffset !== undefined) cartographicLocation.height = elevationOffset;

    // Move the viewport to the location.
    const center = viewport.view.cartographicToRoot(cartographicLocation);
    if (!center) return false;

    const offset = 500; // 500-meter radius for view bounds
    const corner1 = Transform.createTranslationXYZ(offset, offset, offset).multiplyPoint3d(center);
    const corner2 = Transform.createTranslationXYZ(-offset, -offset, -offset).multiplyPoint3d(center);

    const viewArea = Range3d.create(corner1, corner2);
    viewport.zoomToVolume(viewArea);

    return true;
  }

  /** Retrieves the geographical location (latitude and longitude) of a given destination using the Mapbox API. */
  private static async getLocationFromMapbox(destination: string): Promise<{ center: { lat: number, lon: number } }> {
    const accessToken = process.env.IMJS_MAP_BOX_KEY || "";
    const url = `${this._locationProviderUrl}/${encodeURIComponent(destination)}.json?access_token=${accessToken}`;
    const response = await fetch(url);
    if (!response.ok)
      return { center: { lat: 0, lon: 0 } };

    const data = await response.json();
    if (!data.features || data.features.length === 0)
      return { center: { lat: 0, lon: 0 } };

    const [lon, lat] = data.features[0].geometry.coordinates;
    return { center: { lat, lon } };
  }

  /** Changes the background map between using open street map street view and bing hybrid view */
  public static setMap(viewport: Viewport, streetsOnlyMap: boolean) {
    if (!viewport.view.is3d()) return;

    const displayStyle = viewport.view.getDisplayStyle3d();

    if (streetsOnlyMap) {
      displayStyle.backgroundMapBase = BaseMapLayerSettings.fromJSON({
        formatId: "TileURL",
        url: "https://b.tile.openstreetmap.org/{level}/{column}/{row}.png",
        name: "openstreetmap",
      });
    } else {
      displayStyle.changeBackgroundMapProvider({
        name: "MapBoxProvider",
        type: BackgroundMapType.Hybrid,
      });
    }
  }

  /** Returns the 2d magnitude of the viewport's extents */
  public static getExtents(viewport: Viewport): number {
    return Vector2d.createFrom(viewport.view.getExtents()).magnitude();
  }

  /** Returns a list of CarDecorator decorators that have been added using the ViewManager API. */
  public static getCarDecorators(): CarDecorator[] {
    return IModelApp.viewManager.decorators.filter(
      (decorator) => decorator instanceof CarDecorator
    ) as CarDecorator[];
  }

  /** Removes listeners up and frees any resources owned by this sample. */
  public static dispose() {
    CarDecorationApi._disposables?.forEach((dispose) => dispose());
    CarDecorationApi._disposables = [];
    // Dispose of resources owned by the decorators (e.g. textures)
    if (this._carDecorator) this._carDecorator.dispose();
  }

  /**
   * Creates a car decorator and sets up methods to dispose of it
   * @param streetsAndIntersections
   * @param maxCars - max number of car particles to be created
   * @param density - used to determine the number of car particles
   * @param size - size of the car particles
   */
  public static createDecorator(
    streetsAndIntersections: StreetsAndIntersections,
    maxCars: number,
    density: Density,
    size: number
  ) {
    // Dispose of any existing car decorators
    CarDecorationApi.dispose();

    const viewport = IModelApp.viewManager.selectedView;
    if (undefined === viewport) return;

    // Create decorator
    const visualization = new CarVisualization(maxCars, density, size, this._carImages.length, streetsAndIntersections);
    this._carDecorator = new CarDecorator(visualization, this._carImages);

    if (undefined === this._carDecorator) return;

    // Tell the viewport to re-render the decorations every frame so that the car particles animate smoothly.
    const removeOnRender = viewport.onRender.addListener(() =>
      viewport.invalidateDecorations()
    );

    // The methods below are events to ensure the timely dispose of textures owned by the decorators.
    // When the viewport is destroyed, dispose of these decorators too.
    const removeOnDispose = viewport.onDisposed.addListener(() =>
      CarDecorationApi.dispose()
    );

    // When the iModel is closed, dispose of any decorations.
    const removeOnClose = viewport.iModel.onClose.addOnce(() =>
      CarDecorationApi.dispose()
    );

    // Add the decorator to be rendered in all active views.
    // The function "removeCarDecorator" is equivalent to calling "IModelApp.viewManager.dropDecorator(carEmitter)"
    const removeCarDecorator = IModelApp.viewManager.addDecorator(this._carDecorator);

    // Remove all event listeners related to the decorator
    CarDecorationApi._disposables = [
      removeCarDecorator,
      removeOnRender,
      removeOnDispose,
      removeOnClose,
    ];
  }

  /** Returns a spacial views state with the viewport's location set to Madrid */
  public static readonly getInitialView = async (
    imodel: IModelConnection
  ): Promise<SpatialViewState> => {
    // These values come from the view definition associated with this iModel
    const model = "0x20000000020";
    const viewDefinitionId = "0x200000008c9";
    const categorySelectorId = "0x200000008cc";
    const displayStyleId = "0x200000008cb";
    const modelSelectorId = "0x200000008ca";

    const viewDefinitionProps: SpatialViewDefinitionProps = {
      classFullName: "BisCore:SpatialViewDefinition",
      id: viewDefinitionId,
      jsonProperties: {
        viewDetails: {
          gridOrient: 4,
          gridSpaceX: 0.1,
          disable3dManipulations: true,
        },
      },
      code: {
        spec: "0x1c",
        scope: model,
        value: "3D Metric Design - View 1",
      },
      model,
      categorySelectorId,
      displayStyleId,
      isPrivate: false,
      description: "",
      cameraOn: false,
      origin: [-11941629.925858043, 4777112.235469295, 44102.77093490586],
      extents: [1312.179818775386, 2143.3449330940266, 1410.4581301882986],
      angles: {},
      camera: {
        lens: 0,
        focusDist: 0,
        eye: [0, 0, 0],
      },
      modelSelectorId,
    };

    const displayStyleProps: DisplayStyle3dProps = {
      classFullName: "BisCore:DisplayStyle3d",
      code: { scope: model, spec: "0xa", value: "" },
      id: displayStyleId,
      model,
      jsonProperties: {
        styles: {
          backgroundMap: {
            globeMode: GlobeMode.Plane,
            nonLocatable: true,
          },
          viewflags: {
            backgroundMap: true,
            grid: false,
          },
        },
      },
    };

    return SpatialViewState.createFromProps(
      {
        viewDefinitionProps,
        displayStyleProps,
        categorySelectorProps: {
          categories: [],
          classFullName: "BisCore:CategorySelector",
          code: { scope: model, spec: "0x8", value: "" },
          id: categorySelectorId,
          model,
        },
        modelSelectorProps: {
          classFullName: "BisCore:ModelSelector",
          code: { scope: model, spec: "0x11", value: "" },
          id: modelSelectorId,
          model,
          models: [],
        },
      },
      imodel
    );
  };
}
