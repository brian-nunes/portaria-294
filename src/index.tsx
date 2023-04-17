import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PlataformProvider } from './Context/PlataformContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PlataformProvider>
      <App />
    </PlataformProvider>
  </React.StrictMode>
);
