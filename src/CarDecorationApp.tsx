/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect, useState } from "react";
import { Viewer, ViewerViewportControlOptions } from "@itwin/web-viewer-react";
import { UiFramework, UiItemsProvider } from "@itwin/appui-react";
import {
  ThemeProvider,
  Surface,
  Text,
  ProgressRadial,
  Alert,
  ThemeType,
} from "@itwin/itwinui-react";
import { CarDecorationWidget, CarDecorationWidgetProvider } from "./CarDecorationWidget";
import CarDecorationApi from "./CarDecorationApi";
import { IModelApp } from "@itwin/core-frontend";
import { authClient } from "./common/AuthorizationClient";
import { mapLayerOptions } from "./common/MapLayerOptions";
import "./CarDecorationApp.scss";

const uiProviders: UiItemsProvider[] = [new CarDecorationWidgetProvider()];

const viewportOptions: ViewerViewportControlOptions = {
  viewState: async (iModelConnection) => {
    const notice = `
      <div class="logo-card-notice">
      <span>
        This sample uses data from <a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a>.
        The data retrieved from this API is made available under the <a target="_blank" href="https://www.openstreetmap.org/copyright">Open Database License</a>.
      </span>
      </br>
      <span>
        © OpenStreetMap contributors
      </span>
      </div>
    `;
    IModelApp.applicationLogoCard = () => IModelApp.makeLogoCard({ heading: "Car Particle Effect", notice });
    return CarDecorationApi.getInitialView(iModelConnection);
  },
};

const iTwinId = process.env.IMJS_ITWIN_ID;
const iModelId = process.env.IMJS_IMODEL_ID;
const theme = (process.env.THEME ?? "dark") as ThemeType;
// const logo = [`${process.env.PUBLIC_URL}/truck.png`];


const CarDecorationApp = () => {

  const [iModelConnected, setIModelConnected] = useState(false);

  /** Sign-in */
  useEffect(() => {
    void authClient.signIn();
  }, []);

  /** The sample's render method */
  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <Surface className="team-banner">
          {/* <img src={logo} alt="Logo" /> */}
          <Text variant="headline" className="header">
            YOUR APPLICATION NAME
          </Text>
        </Surface>
        <div className="app-ui">
          {iModelConnected ? (
            <Surface className="details">
              <Text variant="leading">Welcome to the Car Decoration App!</Text>
              {/* Your custom components or content */}
              {<CarDecorationWidget />}
            </Surface>
          ) : (
            <Surface className="spinner">
              <ProgressRadial indeterminate={true} size="large" />
            </Surface>
          )}
          <div className="model-view">
            <Viewer
              iTwinId={iTwinId ?? ""}
              iModelId={iModelId ?? ""}
              authClient={authClient}
              viewportOptions={viewportOptions}
              mapLayerOptions={mapLayerOptions}
              defaultUiConfig={{
                hideNavigationAid: true,
                hideStatusBar: true,
                hideToolSettings: true,
              }}
              uiProviders={uiProviders}
              enablePerformanceMonitors={false}
              theme={theme}
              onIModelConnected={() => setIModelConnected(true)}
            />
            <Alert type="informational" className="custom-alert">
              Your custom alert message
            </Alert>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Define panel size
UiFramework.frontstages.onFrontstageReadyEvent.addListener((event) => {
  const { bottomPanel } = event.frontstageDef;
  bottomPanel && (bottomPanel.size = 255);
});

export default CarDecorationApp;
