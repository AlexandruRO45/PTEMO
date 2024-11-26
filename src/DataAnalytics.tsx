import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DataAnalytics.scss';


const data = [
  { name: 'Zone A', idleTime: 4, waitTime: 2.5, emissions: 120 },
  { name: 'Zone B', idleTime: 3, waitTime: 2, emissions: 100 },
  { name: 'Zone C', idleTime: 5, waitTime: 3, emissions: 150 },
  { name: 'Zone D', idleTime: 4.5, waitTime: 2.8, emissions: 130 },
  { name: 'Zone E', idleTime: 6, waitTime: 3.5, emissions: 180 },
];

export function DataAnalytics() {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');

  const handleGenerateReport = () => {
    // In a real application, this would trigger the report generation process
    console.log('Generating report for:', { zone: selectedZone, vehicleType: selectedVehicleType });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Analytics and Reporting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="zone-select" className="block text-sm font-medium text-gray-700 mb-1">
              Zone
            </label>
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger id="zone-select">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="zoneA">Zone A</SelectItem>
                <SelectItem value="zoneB">Zone B</SelectItem>
                <SelectItem value="zoneC">Zone C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="vehicle-select" className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type
            </label>
            <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
              <SelectTrigger id="vehicle-select">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="truck">Trucks</SelectItem>
                <SelectItem value="car">Cars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="idleTime" fill="#8884d8" name="Idle Time (hrs)" />
              <Bar yAxisId="left" dataKey="waitTime" fill="#82ca9d" name="Wait Time (hrs)" />
              <Bar yAxisId="right" dataKey="emissions" fill="#ffc658" name="Emissions (kg CO2)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Button onClick={handleGenerateReport}>Generate Report</Button>
      </CardContent>
    </Card>
  );
}

