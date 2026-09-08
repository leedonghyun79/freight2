import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const { seo, site, brand, analytics } = siteConfig;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  metadataBase: new URL(site.url),
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: site.url,
    siteName: brand.nameKo,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${brand.nameKo} 특수운송 차량`,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
  ...(analytics.googleSiteVerification || analytics.naverSiteVerification
    ? {
        verification: {
          ...(analytics.googleSiteVerification
            ? { google: analytics.googleSiteVerification }
            : {}),
          ...(analytics.naverSiteVerification
            ? { other: { "naver-site-verification": analytics.naverSiteVerification } }
            : {}),
        },
      }
    : {}),
};

const gtagId = analytics.googleAdsId || analytics.gaMeasurementId;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics / Ads */}
        {gtagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${analytics.googleAdsId ? `gtag('config', '${analytics.googleAdsId}');` : ""}
                ${analytics.gaMeasurementId ? `gtag('config', '${analytics.gaMeasurementId}');` : ""}
              `}
            </Script>
          </>
        )}

        {/* 네이버 애널리틱스 / 전환추적 */}
        {analytics.naverWcsId && (
          <>
            <Script
              type="text/javascript"
              src="//wcs.naver.net/wcslog.js"
              strategy="afterInteractive"
            />
            <Script id="naver-conversion" strategy="afterInteractive">
              {`
                if (!wcs_add) var wcs_add={};
                wcs_add["wa"] = "${analytics.naverWcsId}";
                if (!_nasa) var _nasa={};
                if(window.wcs){ wcs.inflow(); wcs_do(); }
              `}
            </Script>
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: brand.nameKo,
                url: site.url,
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: brand.nameKo,
                url: site.url,
                logo: `${site.url}${brand.logoDark || seo.ogImage}`,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: siteConfig.company.addresses[0]?.value ?? "",
                  addressCountry: "KR",
                },
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-inter" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
