import { AppShell, Burger, createTheme, Group, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContextWrapper from './context/ContextWrapper';
import ActiveChatFrame from './frames/ActiveChatFrame';
import Navbar from './frames/Navbar';

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, sans-serif',
  fontSmoothing: true,
});

export default function App() {
  const [navbarOpened, { toggle }] = useDisclosure();

  return (
    <ContextWrapper>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <BrowserRouter>
          <AppShell
            withBorder={false}
            header={{ height: '4rem' }}
            navbar={{
              width: '20rem',
              breakpoint: 'sm',
              collapsed: { mobile: !navbarOpened },
            }}
          >
            <AppShell.Header
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '1rem',
              }}
            >
              <Group gap="1rem">
                <Burger opened={navbarOpened} onClick={toggle} hiddenFrom="sm" size="sm" />
              </Group>
            </AppShell.Header>
            <AppShell.Navbar>
              <Navbar />
            </AppShell.Navbar>
            <AppShell.Main>
              <Routes>
                <Route path="/chat/:chatID" element={<ActiveChatFrame />} />
              </Routes>
            </AppShell.Main>
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </ContextWrapper>
  );
}
