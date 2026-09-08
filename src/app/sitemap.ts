import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.site.url

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
