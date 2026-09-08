import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://xn--2o2bo3ogka6rr6n9os3kcc0g.com/sitemap.xml',
  }
}
