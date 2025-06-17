import { AppShell, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { Route, Routes } from 'react-router-dom';
import NewChatButton from './components/navbar/NewChatButton';
import ContextWrapper from './context/ContextWrapper';
import ActiveChatFrame from './frames/ActiveChatFrame';
import Navbar from './frames/Navbar';

export default function App() {
  const [navbarOpened, { toggle }] = useDisclosure();

  return (
    <ContextWrapper>
      <Notifications />
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
          }}
        >
          <Flex direction="row-reverse" justify="space-between" w="100%" mx="md">
            <NewChatButton
              closeNavFn={() => {
                if (navbarOpened) toggle();
              }}
            />
            <Burger opened={navbarOpened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar>
          <Navbar
            closeNavFn={() => {
              if (navbarOpened) toggle();
            }}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<ActiveChatFrame />} />
            <Route path="/chat/:chatID" element={<ActiveChatFrame />} />
          </Routes>
        </AppShell.Main>

        {/* <AppShell.Footer>{location.pathname !== '/' && <InputBox />}</AppShell.Footer> */}
      </AppShell>
    </ContextWrapper>
  );
}
