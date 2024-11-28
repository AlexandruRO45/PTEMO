/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useState } from "react";
import { VehicleTrackingPanel } from './VehicleTrackingPanel';
import { EmissionsDashboard } from './EmissionsDashboard';
import { SimulationControlPanel } from './SimulationControlPanel';
import { DataAnalytics } from './DataAnalytics';
import { Notifications } from './Notifications';
import { InteractiveMap } from './InteractiveMap';
import { UserGuide } from './UserGuide';
import { QuickStats } from './QuickStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { ThemeProvider } from "./ui/theme-provider";
import './styles/globals.css';

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
        <header className="bg-[#2c2a4e] text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold">Port of Dover Traffic Management</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowUserGuide(!showUserGuide)}
            className="bg-[#3b3a5b] text-white border-[#68599f] hover:bg-[#68599f]"
          >
            Help
          </Button>
        </header>
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-[#3b3a5b]">
          <div className="lg:col-span-2 space-y-4">
            <InteractiveMap />
            <div className="grid grid-cols-2 gap-4">
              <SimulationControlPanel />
              <VehicleTrackingPanel />
            </div>
          </div>
          <div className="space-y-4">
            <Tabs defaultValue="emissions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#2c2a4e]">
                <TabsTrigger value="emissions" className="data-[state=active]:bg-[#68599f]">Emissions</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-[#68599f]">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="emissions">
                <EmissionsDashboard />
              </TabsContent>
              <TabsContent value="analytics">
                <DataAnalytics />
              </TabsContent>
            </Tabs>
            <QuickStats />
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


export default CarDecorationApp;
