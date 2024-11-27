import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
// import './UserGuide.scss';

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
    <Card>
      <CardHeader>
        <CardTitle>User Guide & Help</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {helpItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

