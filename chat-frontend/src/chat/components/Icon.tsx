import { Icon as TheIcon, type IconProps } from '@iconify/react/dist/iconify.js';

export default function Icon({
  icon,
  size = '1rem',
  ...props
}: {
  icon: string;
  size?: number | string;
} & IconProps) {
  return <TheIcon icon={icon} {...props} width={size} height={size} />;
}
