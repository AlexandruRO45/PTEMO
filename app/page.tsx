import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the component with SSR disabled
const ClientOnlyComponent = dynamic(() => import('../src/ClientApp'), { ssr: false });

export default function Page() {
  return (
    <div>
      <ClientOnlyComponent />
    </div>
  );
}