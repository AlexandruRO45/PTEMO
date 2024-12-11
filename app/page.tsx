// app/page.js
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the component with SSR disabled
const ClientOnlyComponent = dynamic(() => import('../src/App'), { ssr: false });

export default function Page() {
  return (
    <div>
      <ClientOnlyComponent />
    </div>
  );
}