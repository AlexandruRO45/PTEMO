import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
// import './EmissionsDashboard.scss';

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Emissions Dashboard</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: "Total Emissions",
              color: "hsl(var(--chart-1))",
            },
            idle: {
              label: "Idle Emissions",
              color: "hsl(var(--chart-2))",
            },
            trucks: {
              label: "Truck Emissions",
              color: "hsl(var(--chart-3))",
            },
            cars: {
              label: "Car Emissions",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="total" stackId="1" stroke="var(--color-total)" fill="var(--color-total)" />
              <Area type="monotone" dataKey="idle" stackId="2" stroke="var(--color-idle)" fill="var(--color-idle)" />
              <Area type="monotone" dataKey="trucks" stackId="3" stroke="var(--color-trucks)" fill="var(--color-trucks)" />
              <Area type="monotone" dataKey="cars" stackId="3" stroke="var(--color-cars)" fill="var(--color-cars)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium">Total Emissions</h3>
            <p className="text-2xl font-bold">1500 kg CO2</p>
            <p className="text-sm text-muted-foreground">+5% from yesterday</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Idle Emissions</h3>
            <p className="text-2xl font-bold">470 kg CO2</p>
            <p className="text-sm text-muted-foreground">+12% from yesterday</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

