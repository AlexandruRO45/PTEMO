import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ZoomIn, ZoomOut, Maximize, Pause, Play } from 'lucide-react';
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
// import './InteractiveMap.scss';

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

export function InteractiveMap() {
  const [zoom, setZoom] = useState(1);
  const [isUpdating, setIsUpdating] = useState(true);
  const [updateFrequency, setUpdateFrequency] = useState('5');

  const [iModelConnected, setIModelConnected] = useState(false);

  /** Sign-in */
  useEffect(() => {
    void authClient.signIn();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUpdating) {
      interval = setInterval(() => {
        // This is where you would update the map data in a real application
        console.log('Updating map data...');
      }, parseInt(updateFrequency) * 1000);
    }
    return () => clearInterval(interval);
  }, [isUpdating, updateFrequency]);

  const toggleUpdates = () => {
    setIsUpdating(!isUpdating);
  };

  return (
    <Card className="w-full h-[500px] bg-[#3b3a5b] text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Port of Dover Interactive Map</CardTitle>
        <div className="flex space-x-2">
          <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
            <SelectTrigger className="w-[120px] bg-[#2c2a4e] text-white border-[#68599f]">
              <SelectValue placeholder="Update every" />
            </SelectTrigger>
            <SelectContent className="bg-[#2c2a4e] text-white">
              <SelectItem value="1">1 second</SelectItem>
              <SelectItem value="5">5 seconds</SelectItem>
              <SelectItem value="10">10 seconds</SelectItem>
              <SelectItem value="30">30 seconds</SelectItem>
              <SelectItem value="60">1 minute</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={toggleUpdates} className="bg-[#2c2a4e] text-white border-[#68599f] hover:bg-[#68599f]">
            {isUpdating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoom(zoom => Math.min(zoom + 0.1, 2))} className="bg-[#2c2a4e] text-white border-[#68599f] hover:bg-[#68599f]">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoom(zoom => Math.max(zoom - 0.1, 0.5))} className="bg-[#2c2a4e] text-white border-[#68599f] hover:bg-[#68599f]">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoom(1)} className="bg-[#2c2a4e] text-white border-[#68599f] hover:bg-[#68599f]">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative h-[calc(100%-4rem)] bg-[#2c2a4e] overflow-hidden">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }} className="w-full h-full">
          {/* This would be replaced with an actual map component */}
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
        </div>
      </CardContent>
    </Card>
  );
}

UiFramework.frontstages.onFrontstageReadyEvent.addListener((event) => {
  const { bottomPanel } = event.frontstageDef;
  bottomPanel && (bottomPanel.size = 255);
});

