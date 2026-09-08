import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "무진동화물차·무진동항온항습·무진동리프트 | 프로텍스 특수운송",
  description: "프로텍스특수운송은 반도체, 의료기기, 항공우주부품등 고가 정밀장비 운송을 위해 특수무진동 항온항습 리프트차량으로 최적의 운송서비스를 제공합니다",
  keywords: "프로텍스, 특수운송, 무진동운송, 무진동 특수운송, 장비이전, 데이터센터이전, 의료기기운송, 반도체장비운송, 정밀장비운송, 항온항습운송",
  openGraph: {
    title: "무진동화물차·무진동항온항습·무진동리프트 | 프로텍스 특수운송",
    description: "프로텍스특수운송은 반도체, 의료기기, 항공우주부품등 고가 정밀장비 운송을 위해 특수무진동 항온항습 리프트차량으로 최적의 운송서비스를 제공합니다",
    url: "https://xn--2o2bo3ogka6rr6n9os3kcc0g.com", // Adjust to actual production domain if known
    siteName: "프로텍스",
    images: [
      {
        url: "/images/메인트럭사진.jpg", // A high-quality representative image
        width: 1200,
        height: 630,
        alt: "프로텍스 무진동 특수운송 차량",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "무진동화물차·무진동항온항습·무진동리프트 | 프로텍스 특수운송",
    description: "프로텍스특수운송은 반도체, 의료기기, 항공우주부품등 고가 정밀장비 운송을 위해 특수무진동 항온항습 리프트차량으로 최적의 운송서비스를 제공합니다",
    images: ["/images/메인트럭사진.jpg"],
  },
  alternates: {
    canonical: "https://xn--2o2bo3ogka6rr6n9os3kcc0g.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google16f32476075c014d",
    other: {
      "naver-site-verification": "9fb14d979b6887f82d9b1f32b8ab25b8",
    },
  },
};

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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18131349273"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18131349273');
            gtag('config', 'G-SRBMYQ0S57');
          `}
        </Script>

        {/* 네이버 애널리틱스 */}
        <script type="text/javascript" src="//wcs.pstatic.net/wcslog.js" async />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              if(!wcs_add) var wcs_add = {};
              wcs_add["wa"] = "a8831f54e53660";
              if(window.wcs) {
                wcs_do();
              }
            `,
          }}
        />

        {/* 네이버 전환추적 (공통) */}
        <Script type="text/javascript" src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
        <Script id="naver-conversion" strategy="afterInteractive">
          {`
            if (!wcs_add) var wcs_add={};
            wcs_add["wa"] = "s_4b5a2383003";
            if (!_nasa) var _nasa={};
            if(window.wcs){
              wcs.inflow();
              wcs_do();
            }
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "프로텍스",
                "url": "https://xn--2o2bo3ogka6rr6n9os3kcc0g.com"
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "프로텍스",
                "url": "https://xn--2o2bo3ogka6rr6n9os3kcc0g.com",
                "logo": "https://xn--2o2bo3ogka6rr6n9os3kcc0g.com/images/로고_c.png",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "평택시",
                  "addressRegion": "경기도",
                  "addressCountry": "KR"
                }
              }
            ])
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-inter" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
