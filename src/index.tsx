import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore: CSS import side effect declaration not found
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);