import { notFound } from 'next/navigation';
import TrackingRedirect from '../../../components/TrackingRedirect';
import { getTrackingLink, trackingLinks } from '../../../lib/trackingLinks';
import { getArticleBySlug } from '../../../lib/sanity';
import { imageUrl } from '../../../lib/imageUrl';
import { absoluteUrl } from '../../../lib/site';

export function generateStaticParams() {
  return Object.keys(trackingLinks).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trackingLink = getTrackingLink(slug);

  if (!trackingLink) {
    return {
      title: 'Weiterleitung',
      robots: { index: false, follow: false },
    };
  }

  const articleSlug = trackingLink.destination.split('/').filter(Boolean).at(-1);
  const article = articleSlug ? await getArticleBySlug(articleSlug) : null;

  if (!article) {
    return {
      title: 'Weiterleitung',
      robots: { index: false, follow: false },
    };
  }

  const description = article.seoDescription || article.teaser;
  const socialImage = article.hero ? absoluteUrl(imageUrl(article.hero, 1600, 84)) : null;

  return {
    title: article.title,
    description,
    alternates: { canonical: trackingLink.destination },
    robots: { index: false, follow: false },
    openGraph: {
      type: 'article',
      locale: 'de_DE',
      url: trackingLink.destination,
      siteName: 'Tandemhopper',
      title: article.title,
      description,
      publishedTime: article.date || undefined,
      images: socialImage ? [{ url: socialImage, alt: article.heroAlt || article.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export default async function TrackingPage({ params }) {
  const { slug } = await params;
  const trackingLink = getTrackingLink(slug);

  if (!trackingLink) notFound();

  return <TrackingRedirect destination={trackingLink.destination} />;
}
