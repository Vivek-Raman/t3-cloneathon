import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './auth/AuthContextProvider';
import { createTheme, MantineProvider } from '@mantine/core';
import SelectedModelContextProvider from './model/SelectedModelContextProvider';

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, sans-serif',
  fontSmoothing: true,
});

export default function ContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <SelectedModelContextProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </SelectedModelContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
