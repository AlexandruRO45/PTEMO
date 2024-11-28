import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Download, Pause, Play } from 'lucide-react';

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
    { id: 'V004', type: 'Car', location: 'Zone D', status: 'Moving', idleTime: '00:15:00', emissions: '1.0 kg CO2' },
    { id: 'V005', type: 'Truck', location: 'Zone E', status: 'Idle', idleTime: '00:30:00', emissions: '4.0 kg CO2' },
    { id: 'V006', type: 'Car', location: 'Zone B', status: 'Moving', idleTime: '00:25:00', emissions: '1.5 kg CO2' },
    { id: 'V007', type: 'Truck', location: 'Zone E', status: 'Idle', idleTime: '00:45:00', emissions: '5.0 kg CO2' },
    { id: 'V008', type: 'Car', location: 'Zone A', status: 'Moving', idleTime: '00:35:00', emissions: '2.2 kg CO2' },
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
        <Card className="w-full bg-[#3b3a5b] text-white">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Vehicle Tracking</CardTitle>
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
                    <Button variant="outline" size="icon" onClick={handleExport} className="bg-[#2c2a4e] text-white border-[#68599f] hover:bg-[#68599f]">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockVehicles.map((vehicle) => (
                        <Card key={vehicle.id} className="p-4 bg-[#2c2a4e] hover:bg-[#68599f] cursor-pointer transition-colors" onClick={() => setSelectedVehicle(vehicle)}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-300">{vehicle.id} - {vehicle.type}</h3>
                                    <p className="text-sm text-gray-300">{vehicle.location} - {vehicle.status}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-300">Idle: {vehicle.idleTime}</p>
                                    <p className="text-sm text-gray-300">Emissions: {vehicle.emissions}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                {selectedVehicle && (
                    <div className="mt-4 p-4 bg-[#68599f] rounded-lg">
                        <h4 className="font-bold">Selected Vehicle: {selectedVehicle.id}</h4>
                        <p>Type: {selectedVehicle.type}</p>
                        <p>Status: {selectedVehicle.status}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
