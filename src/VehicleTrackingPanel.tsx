// VehicleTrackingPanel.tsx
import React from 'react';
import { List, ListItem, Text } from "@itwin/itwinui-react";
// import './VehicleTrackingPanel.scss';

export const VehicleTrackingPanel = () => {
    return (
        <div className="vehicle-tracking-panel">
            <Text variant="title">Vehicle Tracking</Text>
            <List>
                {/* Map through your vehicles data and display each as a ListItem */}
                <ListItem>
                    <Text>Vehicle ID: 12345</Text>
                    {/* Add more details */}
                </ListItem>
                {/* More ListItems */}
            </List>
        </div>
    );
};