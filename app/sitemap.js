import {getArticles} from '../lib/sanity';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tandemhopper.vercel.app').replace(/\/$/, '');

export default async function sitemap() {
  const articles = await getArticles();

  const staticPages = [
    {url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1},
    {url: `${siteUrl}/geschichten`, changeFrequency: 'daily', priority: 0.9},
    {url: `${siteUrl}/ueber-uns`, changeFrequency: 'monthly', priority: 0.5},
  ];

  const articlePages = articles.map((article) => ({
    url: `${siteUrl}/geschichten/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...articlePages];
}
