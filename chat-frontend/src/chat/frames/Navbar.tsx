import { Stack } from '@mantine/core';
import UserCard from '../components/navbar/UserCard';

export default function Navbar() {
  return (
    <Stack justify="space-between" h="100%" p="lg">
      <div>Navbar</div>
      <UserCard />
    </Stack>
  );
}
