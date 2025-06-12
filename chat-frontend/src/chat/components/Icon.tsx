import { Icon as TheIcon, type IconProps } from '@iconify/react/dist/iconify.js';
import { Box } from '@mantine/core';

export default function Icon({ icon, ...props }: { icon: string } & IconProps) {
  return (
    <Box w="1.5rem" h="1.5rem">
      <TheIcon icon={icon} {...props} width="100%" height="100%" />
    </Box>
  );
}
