import { AppShell, createTheme, MantineProvider, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from './frames/Navbar';
import ContextWrapper from './context/ContextWrapper';

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
            <Burger opened={navbarOpened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div style={{ marginLeft: '1rem' }}>Header</div>
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
