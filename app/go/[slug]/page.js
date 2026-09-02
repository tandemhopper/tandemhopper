import { notFound } from 'next/navigation';
import TrackingRedirect from '../../../components/TrackingRedirect';
import { getTrackingLink, trackingLinks } from '../../../lib/trackingLinks';

export const metadata = {
  title: 'Weiterleitung',
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return Object.keys(trackingLinks).map((slug) => ({ slug }));
}

export default async function TrackingPage({ params }) {
  const { slug } = await params;
  const trackingLink = getTrackingLink(slug);

  if (!trackingLink) notFound();

  return <TrackingRedirect destination={trackingLink.destination} />;
}
