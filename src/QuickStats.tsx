import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function QuickStats() {
    return (
        <Card className="w-full bg-[#3b3a5b] text-white">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-300">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-300">Total Vehicles</p>
                        <p className="text-2xl font-bold text-gray-300">1,234</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-300">Avg. Wait Time</p>
                        <p className="text-2xl font-bold text-gray-300">12.5 min</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-300">Total Emissions</p>
                        <p className="text-2xl font-bold text-gray-300">5,678 kg</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-300">Efficiency Score</p>
                        <p className="text-2xl font-bold text-gray-300">85%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}