import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext"; // Import MovieProvider
import { Analytics } from "@vercel/analytics/react";
import './css/index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MovieProvider> {/* Wrap App inside MovieProvider */}
        <App />
        <Analytics debug={false} />
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>,
);
