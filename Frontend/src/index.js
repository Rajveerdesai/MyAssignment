import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
// import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
  </React.StrictMode>
);
