import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Play, Pause, FastForward, Rewind } from 'lucide-react';

const scenarios = [
  { id: 'baseline', name: 'Baseline' },
  { id: 'peak_times', name: 'Peak Times' },
  { id: 'optimized_routing', name: 'Optimized Routing' },
  { id: 'additional_entry', name: 'Additional Entry Points' },
];

export function SimulationControlPanel() {
  const [selectedScenario, setSelectedScenario] = useState('baseline');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSpeedChange = (newSpeed: number[]) => setSpeed(newSpeed[0]);

  return (
    <Card className="w-full bg-[#3b3a5b] text-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Simulation Control</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="scenario-select" className="block text-sm font-medium text-gray-300 mb-1">
            Scenario
          </label>
          <Select value={selectedScenario} onValueChange={setSelectedScenario}>
            <SelectTrigger id="scenario-select" className="bg-[#2c2a4e] text-white border-[#68599f]">
              <SelectValue placeholder="Select a scenario" />
            </SelectTrigger>
            <SelectContent className="bg-[#2c2a4e] text-white">
              {scenarios.map((scenario) => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePlayPause} className="bg-[#2c2a4e] text-white border-[#68599f] hover:bg-[#68599f]">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" className="bg-[#2c2a4e] text-white border-[#68599f] hover:bg-[#68599f]">
            <Rewind className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-[#2c2a4e] text-white border-[#68599f] hover:bg-[#68599f]">
            <FastForward className="h-4 w-4" />
          </Button>
          <div className="flex-grow">
            <Slider
              value={[speed]}
              onValueChange={handleSpeedChange}
              min={0.5}
              max={2}
              step={0.5}
              className="w-full"
            />
          </div>
          <span className="text-sm font-medium">{speed}x</span>
        </div>
        <Button className="w-full bg-[#68599f] hover:bg-[#68599f]/80 text-white">Run Comparison</Button>
      </CardContent>
    </Card>
  );
}

