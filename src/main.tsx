import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <div className="snow-container">
      {/* Create multiple snowflakes dynamically */}
      <div className="snowflake snowflake-1"></div>
      <div className="snowflake snowflake-2"></div>
      <div className="snowflake snowflake-3"></div>
      <div className="snowflake snowflake-4"></div>
      <div className="snowflake snowflake-5"></div>
      {/* Add as many snowflakes as needed */}
    </div>
  </StrictMode>
);
