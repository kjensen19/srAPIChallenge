import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('react-root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript




root.render(<App tab="home" />);


