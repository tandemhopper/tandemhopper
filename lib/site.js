export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tandemhopper.de').replace(/\/$/, '');

export function absoluteUrl(value = '') {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
}
