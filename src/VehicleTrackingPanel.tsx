import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Download, Pause, Play } from 'lucide-react';
import './VehicleTrackingPanel.scss';

interface Vehicle {
    id: string;
    type: string;
    location: string;
    status: string;
    idleTime: string;
    emissions: string;
}

const mockVehicles: Vehicle[] = [
    { id: 'V001', type: 'Truck', location: 'Zone A', status: 'Moving', idleTime: '00:05:00', emissions: '2.5 kg CO2' },
    { id: 'V002', type: 'Car', location: 'Zone B', status: 'Idle', idleTime: '00:10:00', emissions: '0.8 kg CO2' },
    { id: 'V003', type: 'Truck', location: 'Zone C', status: 'Loading', idleTime: '00:20:00', emissions: '3.2 kg CO2' },
];

export function VehicleTrackingPanel() {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [updateFrequency, setUpdateFrequency] = useState('1'); // Update default value here
    const [isUpdating, setIsUpdating] = useState(true);

    const handleExport = () => {
        // In a real application, this would trigger the data export process
        console.log('Exporting vehicle data...');
    };

    const toggleUpdates = () => {
        setIsUpdating(!isUpdating);
        // In a real application, this would start/stop real-time updates
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Vehicle Tracking</CardTitle>
                <div className="flex space-x-2">
                    <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Update every" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 second</SelectItem> {/* Added new item here */}
                            <SelectItem value="5">5 seconds</SelectItem>
                            <SelectItem value="10">10 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">1 minute</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={toggleUpdates}>
                        {isUpdating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleExport}>
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockVehicles.map((vehicle) => (
                        <Card key={vehicle.id} className="p-4 hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedVehicle(vehicle)}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{vehicle.id} - {vehicle.type}</h3>
                                    <p className="text-sm text-gray-500">{vehicle.location} - {vehicle.status}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm">Idle: {vehicle.idleTime}</p>
                                    <p className="text-sm">Emissions: {vehicle.emissions}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

