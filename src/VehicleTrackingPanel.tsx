// VehicleTrackingPanel.tsx
import React, { useEffect, useState } from 'react';
import { List, ListItem, Text, Modal } from "@itwin/itwinui-react";
import './VehicleTrackingPanel.scss';

// Define the Vehicle interface
interface Vehicle {
    id: string;
    type: string;
    entryTime: string; // ISO string
    idleTime: number; // in minutes
    movementState: 'idle' | 'moving' | 'waiting';
    waitingTime: number; // in minutes
    emissionsData: number; // e.g., CO2 emissions in kg
}

// The VehicleTrackingPanel component
export const VehicleTrackingPanel = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    // Simulate fetching vehicle data and real-time updates
    useEffect(() => {
        // Initial fetch or subscription to vehicle data
        const fetchVehicles = async () => {
            // Replace this with actual data fetching logic
            const initialVehicles: Vehicle[] = [
                {
                    id: 'TRUCK-001',
                    type: 'Truck',
                    entryTime: new Date().toISOString(),
                    idleTime: 0,
                    movementState: 'moving',
                    waitingTime: 0,
                    emissionsData: 0.0,
                },
                {
                    id: 'VESSEL-042',
                    type: 'Vessel',
                    entryTime: new Date().toISOString(),
                    idleTime: 0,
                    movementState: 'idle',
                    waitingTime: 5,
                    emissionsData: 1.2,
                },
                // Add more vehicles as needed
            ];
            setVehicles(initialVehicles);
        };

        fetchVehicles();

        // Simulate real-time updates
        const interval = setInterval(() => {
            setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) => {
                    // Simulate updates to the vehicle data
                    const updatedVehicle = { ...vehicle };

                    // Update idleTime, waitingTime, emissionsData
                    if (vehicle.movementState === 'idle') {
                        updatedVehicle.idleTime += 0.1; // Increment idle time
                        updatedVehicle.emissionsData += 0.05; // Increment emissions
                    } else if (vehicle.movementState === 'waiting') {
                        updatedVehicle.waitingTime += 0.1; // Increment waiting time
                    }

                    // Randomly change movement state for simulation
                    const states: Vehicle['movementState'][] = ['idle', 'moving', 'waiting'];
                    updatedVehicle.movementState = states[Math.floor(Math.random() * states.length)];

                    return updatedVehicle;
                })
            );
        }, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    // Handle click on a vehicle to view detailed metrics
    const handleVehicleClick = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
    };

    // Close the modal
    const closeModal = () => {
        setSelectedVehicle(null);
    };

    return (
        <div className="vehicle-tracking-panel">
            <Text variant="title">Vehicle Tracking</Text>
            <List>
                {vehicles.map((vehicle) => (
                    <ListItem key={vehicle.id} onClick={() => handleVehicleClick(vehicle)}>
                        <div className="vehicle-item">
                            <Text><strong>ID:</strong> {vehicle.id}</Text>
                            <Text><strong>Type:</strong> {vehicle.type}</Text>
                            <Text><strong>Status:</strong> {vehicle.movementState}</Text>
                        </div>
                    </ListItem>
                ))}
            </List>

            {/* Vehicle Details Modal */}
            {selectedVehicle && (
                <Modal
                    title={`Vehicle Details - ${selectedVehicle.id}`}
                    isOpen={true}
                    onClose={closeModal}
                    closeOnEsc
                >
                    <div className="vehicle-details">
                        <Text><strong>Type:</strong> {selectedVehicle.type}</Text>
                        <Text>
                            <strong>Entry Time:</strong> {new Date(selectedVehicle.entryTime).toLocaleString()}
                        </Text>
                        <Text><strong>Movement State:</strong> {selectedVehicle.movementState}</Text>
                        <Text><strong>Idle Time:</strong> {selectedVehicle.idleTime.toFixed(1)} mins</Text>
                        <Text><strong>Waiting Time:</strong> {selectedVehicle.waitingTime.toFixed(1)} mins</Text>
                        <Text>
                            <strong>Emissions Data:</strong> {selectedVehicle.emissionsData.toFixed(2)} kg CO₂
                        </Text>
                    </div>
                </Modal>
            )}
        </div>
    );
};