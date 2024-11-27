import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const emissionsData = [
  { time: '00:00', total: 100, idle: 20, trucks: 70, cars: 30 },
  { time: '04:00', total: 150, idle: 30, trucks: 100, cars: 50 },
  { time: '08:00', total: 300, idle: 100, trucks: 200, cars: 100 },
  { time: '12:00', total: 400, idle: 150, trucks: 250, cars: 150 },
  { time: '16:00', total: 350, idle: 120, trucks: 230, cars: 120 },
  { time: '20:00', total: 200, idle: 50, trucks: 130, cars: 70 },
];

export function EmissionsDashboard() {
  const [timeframe, setTimeframe] = useState('today');

  return (
    <Card className="w-full bg-[#3b3a5b] text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Emissions Dashboard</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px] bg-[#2c2a4e] text-white border-[#68599f]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent className="bg-[#2c2a4e] text-white">
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={emissionsData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIdle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTrucks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCars" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff8042" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b4a6b" />
              <XAxis dataKey="time" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip contentStyle={{ backgroundColor: '#2c2a4e', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#colorTotal)" />
              <Area type="monotone" dataKey="idle" stroke="#82ca9d" fillOpacity={1} fill="url(#colorIdle)" />
              <Area type="monotone" dataKey="trucks" stroke="#ffc658" fillOpacity={1} fill="url(#colorTrucks)" />
              <Area type="monotone" dataKey="cars" stroke="#ff8042" fillOpacity={1} fill="url(#colorCars)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-[#2c2a4e] p-4 rounded-lg">
            <h3 className="text-sm font-medium text-[#68599f]">Total Emissions</h3>
            <p className="text-2xl font-bold">1500 kg CO2</p>
            <p className="text-sm text-[#82ca9d]">+5% from yesterday</p>
          </div>
          <div className="bg-[#2c2a4e] p-4 rounded-lg">
            <h3 className="text-sm font-medium text-[#68599f]">Idle Emissions</h3>
            <p className="text-2xl font-bold">470 kg CO2</p>
            <p className="text-sm text-[#ff8042]">+12% from yesterday</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

