// src/ClientApp.tsx
"use client";

import dynamic from 'next/dynamic';

// Dynamically import App component with SSR disabled
const App = dynamic(() => import('./App'), { ssr: false });

const ClientApp = () => {
    return <App />;
};

export default ClientApp;