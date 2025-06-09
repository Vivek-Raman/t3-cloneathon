import { AppShell, Burger, createTheme, Group, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ContextWrapper from './context/ContextWrapper';
import Navbar from './frames/Navbar';
import { Notifications } from '@mantine/notifications';

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
              <div>Header</div>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar>
            <Navbar />
          </AppShell.Navbar>
          <AppShell.Main>Main</AppShell.Main>
        </AppShell>
      </MantineProvider>
    </ContextWrapper>
  );
}
