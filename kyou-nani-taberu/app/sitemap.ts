import type { MetadataRoute } from 'next';

const locales = ['ja', 'en', 'zh-CN', 'zh-TW', 'ko'];
const pages = ['', '/guide', '/faq', '/about', '/privacy', '/terms', '/company'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kyou-nani-taberu.app';
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const prefix = locale === 'ja' ? '' : `/${locale}`;
      entries.push({
        url: `${baseUrl}${prefix}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'monthly',
        priority: page === '' ? 1.0 : 0.7,
      });
    }
  }

  return entries;
}
