import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
//context
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HelmetProvider>
    <SettingsProvider>
      <CollapseDrawerProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </CollapseDrawerProvider>
    </SettingsProvider>
    </HelmetProvider>,
);
