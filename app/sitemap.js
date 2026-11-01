import {getArticles} from '../lib/sanity';
import {getCountryGuides} from '../lib/countryGuides';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tandemhopper.de').replace(/\/$/, '');

export default async function sitemap() {
  const [articles,countries] = await Promise.all([getArticles(),getCountryGuides()]);

  const staticPages = [
    {url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1},
    {url: `${siteUrl}/geschichten`, changeFrequency: 'daily', priority: 0.9},
    {url: `${siteUrl}/kalender`, changeFrequency: 'daily', priority: 0.8},
    {url: `${siteUrl}/laender`, changeFrequency: 'monthly', priority: 0.85},
    {url: `${siteUrl}/ueber-uns`, changeFrequency: 'monthly', priority: 0.5},
  ];

  const articlePages = articles.map((article) => ({
    url: `${siteUrl}/geschichten/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const countryPages = countries.map(country=>({url:`${siteUrl}/laender/${country.slug}`,changeFrequency:'monthly',priority:0.8}));
  return [...staticPages, ...countryPages, ...articlePages];
}
