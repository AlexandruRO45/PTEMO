/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect, useState } from "react";
import { Viewer, ViewerViewportControlOptions } from "@itwin/web-viewer-react";
import { UiFramework, UiItemsProvider } from "@itwin/appui-react";
import {
  ThemeProvider,
  // Surface,
  Text,
  ProgressRadial,
  // Alert,
  ThemeType,
} from "@itwin/itwinui-react";
import { CarDecorationWidgetProvider } from "./CarDecorationWidget";
import CarDecorationApi from "./CarDecorationApi";
import { IModelApp } from "@itwin/core-frontend";
import { authClient } from "./common/AuthorizationClient";
import { mapLayerOptions } from "./common/MapLayerOptions";
import { VehicleTrackingPanel } from "./VehicleTrackingPanel";
import { EmissionsDashboard } from "./EmissionsDashboard";
import { DataAnalyticsTools } from "./DataAnalyticsTools";
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
const logo = `${process.env.PUBLIC_URL}/logo.svg`;


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
        <header className="header">
          <img src={logo} alt="Logo" style={{ height: "40px", marginRight: "16px" }} />
          <Text variant="headline">Port Traffic Simulation</Text>
        </header>
        <div className="content">
          {iModelConnected ? (
            <aside className="sidebar">
              <VehicleTrackingPanel />
              <EmissionsDashboard />
              <DataAnalyticsTools />
              {/* Include other components as needed */}
            </aside>
          ) : (
            <div className="spinner">
              <ProgressRadial indeterminate size="large" />
            </div>
          )}
          <main className="map-viewer">
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
            {/* Real-Time Alerts */}
            {/* <Alert type="informational" className="custom-alert">
              Real-time traffic updates will appear here.
            </Alert> */}
          </main>
        </div>
        <footer className="footer">
          <Text variant="small">© 2023 Your Company Name</Text>
          {/* Links to User Guide and Help Section */}
        </footer>
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
