'use client';

import { Analytics } from '@vercel/analytics/next';

export default function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        try {
          const url = new URL(event.url);
          if (url.pathname.startsWith('/go/')) return null;
        } catch {
          // If the URL cannot be parsed, keep the analytics event unchanged.
        }

        return event;
      }}
    />
  );
}
