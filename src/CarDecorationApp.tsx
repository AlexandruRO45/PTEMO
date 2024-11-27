/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect, useState } from "react";
// import { Viewer, ViewerViewportControlOptions } from "@itwin/web-viewer-react";
// import { UiFramework, UiItemsProvider } from "@itwin/appui-react";
// import {
//   ThemeProvider,
//   // Surface,
//   Text,
//   ProgressRadial,
//   // Alert,
//   ThemeType,
// } from "@itwin/itwinui-react";
// // import { CarDecorationWidgetProvider } from "./CarDecorationWidget";
// import CarDecorationApi from "./CarDecorationApi";
// import { IModelApp } from "@itwin/core-frontend";
// import { authClient } from "./common/AuthorizationClient";
// import { mapLayerOptions } from "./common/MapLayerOptions";
// import { VehicleTrackingPanel } from "./VehicleTrackingPanel";
// import { EmissionsDashboard } from "./EmissionsDashboard";
// import { DataAnalyticsTools } from "./DataAnalyticsTools";

import { VehicleTrackingPanel } from './VehicleTrackingPanel';
import { EmissionsDashboard } from './EmissionsDashboard';
import { SimulationControlPanel } from './SimulationControlPanel';
import { DataAnalytics } from './DataAnalytics';
import { Notifications } from './Notifications';
import { InteractiveMap } from './InteractiveMap';
import { UserGuide } from './UserGuide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { ThemeProvider } from "./ui/theme-provider";
import './styles/globals.css';
// import "./CarDecorationApp.scss";


// const uiProviders: UiItemsProvider[] = [new CarDecorationWidgetProvider()];

// const viewportOptions: ViewerViewportControlOptions = {
//   viewState: async (iModelConnection) => {
//     const notice = `
//       <div class="logo-card-notice">
//       <span>
//         This sample uses data from <a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a>.
//         The data retrieved from this API is made available under the <a target="_blank" href="https://www.openstreetmap.org/copyright">Open Database License</a>.
//       </span>
//       </br>
//       <span>
//         © OpenStreetMap contributors
//       </span>
//       </div>
//     `;
//     IModelApp.applicationLogoCard = () => IModelApp.makeLogoCard({ heading: "Car Particle Effect", notice });
//     return CarDecorationApi.getInitialView(iModelConnection);
//   },
// };

// const iTwinId = process.env.IMJS_ITWIN_ID;
// const iModelId = process.env.IMJS_IMODEL_ID;
// const theme = (process.env.THEME ?? "dark") as ThemeType;
// const logo = `${process.env.PUBLIC_URL}/logo.svg`;


const CarDecorationApp = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'High Wait Time', description: 'Wait times in Zone A have exceeded the target.' },
  ]);
  const [showUserGuide, setShowUserGuide] = useState(false);

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-[#3b3a5b] text-white flex flex-col">
        <header className="bg-[#68599f] text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Port of Dover Traffic Management</h1>
          <Button
            variant="secondary"
            onClick={() => setShowUserGuide(!showUserGuide)}
            className="bg-[#2c2a4e] text-white hover:bg-[#3b3a5b]"
          >
            Help
          </Button>
        </header>
        <main className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-3/4 p-4 flex flex-col overflow-auto">
            <InteractiveMap />
            <div className="mt-4">
              <DataAnalytics />
            </div>
          </div>
          <div className="lg:w-1/4 p-4 overflow-auto">
            <Tabs defaultValue="simulation" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#2c2a4e]">
                <TabsTrigger value="simulation" className="data-[state=active]:bg-[#68599f]">Simulation</TabsTrigger>
                <TabsTrigger value="vehicles" className="data-[state=active]:bg-[#68599f]">Vehicles</TabsTrigger>
                <TabsTrigger value="emissions" className="data-[state=active]:bg-[#68599f]">Emissions</TabsTrigger>
              </TabsList>
              <TabsContent value="simulation">
                <SimulationControlPanel />
              </TabsContent>
              <TabsContent value="vehicles">
                <VehicleTrackingPanel />
              </TabsContent>
              <TabsContent value="emissions">
                <EmissionsDashboard />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <footer className="bg-[#2c2a4e] text-white p-2 text-center">
          <p>&copy; 2023 Port of Dover Traffic Management System</p>
        </footer>
        <Notifications notifications={notifications} onDismiss={dismissNotification} />
        {showUserGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#3b3a5b] p-4 rounded-lg max-w-2xl max-h-[80vh] overflow-auto">
              <UserGuide />
              <Button className="mt-4 bg-[#68599f] text-white hover:bg-[#7a6ab3]" onClick={() => setShowUserGuide(false)}>Close</Button>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

// Define panel size
// UiFramework.frontstages.onFrontstageReadyEvent.addListener((event) => {
//   const { bottomPanel } = event.frontstageDef;
//   bottomPanel && (bottomPanel.size = 255);
// });

export default CarDecorationApp;
