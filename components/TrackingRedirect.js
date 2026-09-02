'use client';

import { useEffect } from 'react';

export default function TrackingRedirect({ destination }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.replace(destination);
    }, 75);

    return () => window.clearTimeout(timer);
  }, [destination]);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <p>
        Weiterleitung…{' '}
        <a href={destination}>Falls nichts passiert, hier klicken.</a>
      </p>
    </main>
  );
}
