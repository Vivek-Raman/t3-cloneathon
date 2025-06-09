import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import App from './chat/App.tsx';
import AnalyticsProvider from './chat/context/AnalyticsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnalyticsProvider>
      <App />
    </AnalyticsProvider>
  </StrictMode>,
);
