import { PostHogProvider } from 'posthog-js/react';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_POSTHOG_HOST,
      }}
    >
      {children}
    </PostHogProvider>
  );
}
