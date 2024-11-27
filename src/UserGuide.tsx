import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const helpItems = [
  {
    question: "How do I use the emissions dashboard?",
    answer: "The emissions dashboard displays real-time and cumulative emissions data. Use the filters to adjust the time range and vehicle types. Click on specific data points for more detailed information."
  },
  {
    question: "How can I run a simulation?",
    answer: "Navigate to the Simulation Control Panel, select a scenario from the dropdown, adjust the simulation speed if needed, and click the 'Run Simulation' button. You can pause, play, or adjust the speed during the simulation."
  },
  {
    question: "How do I export a report?",
    answer: "In the Data Analytics section, use the filters to select the desired data range and metrics. Click the 'Generate Report' button to create a PDF report with graphical summaries and insights."
  },
  {
    question: "What do the real-time alerts mean?",
    answer: "Real-time alerts appear when certain metrics exceed their targets. For example, you might see an alert for high wait times or emissions in a specific zone. Click on the alert for more details and to navigate to the relevant area on the map."
  }
];

export function UserGuide() {
  return (
    <Card className="bg-[#2c2a4e] text-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">User Guide & Help</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {helpItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border-b border-[#68599f]">
              <AccordionTrigger className="text-[#68599f] hover:text-white">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-300">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

