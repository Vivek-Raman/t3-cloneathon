import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './chat/App.tsx';
import AnalyticsProvider from './chat/context/AnalyticsProvider.tsx';
import './index.css';
import './utils/custom-icons.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnalyticsProvider>
      <App />
    </AnalyticsProvider>
  </StrictMode>,
);
