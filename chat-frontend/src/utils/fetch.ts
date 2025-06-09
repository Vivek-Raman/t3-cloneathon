import { notifications } from '@mantine/notifications';
import supabase from './supabase';

export const authFetch = async <T>(url: string, options?: RequestInit): Promise<T | null> => {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  if (!token) {
    notifications.show({
      title: 'Error',
      message: 'You must be logged in to do this',
      color: 'red',
    });
    return null;
  }

  const response: Response = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response) {
    notifications.show({
      title: 'Error',
      message: 'Something went wrong',
      color: 'red',
    });
  }

  return response.json() as Promise<T | null>;
};
