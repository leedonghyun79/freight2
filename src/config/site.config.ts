export interface SiteConfig {
  brand: {
    nameKo: string;
    nameEn: string;
    /** 비우면 BrandLogo가 텍스트 로고로 fallback */
    logoDark?: string; // 밝은 배경용 (구 로고_c.png)
    logoLight?: string; // 어두운 배경용 (구 로고_w.png)
  };
  contact: {
    phoneDisplay: string; // "1600-0000"
    phoneTel: string; // "16000000" (tel: href용, 숫자만)
    email: string;
    kakaoUrl: string;
  };
  company: {
    ceo: string;
    /** 사업자등록번호 */
    bizNo: string;
    /** 첫 항목이 대표 주소로 쓰임 */
    addresses: { label: string; value: string }[];
    supportNote: string;
  };
  hero: {
    eyebrow: string;
    titleLines: string[]; // 강조 앞줄들
    highlight: string; // 강조(accent 색) 줄
    description: string[]; // 문단 줄 배열
    stats: {
      icon: "shield" | "truck" | "thermometer" | "file";
      label: string;
      value: string;
    }[];
    images: string[];
  };
  nav: { name: string; href: string }[];
  analytics: {
    gaMeasurementId?: string;
    googleAdsId?: string;
    googleAdsConversionLabel?: string;
    naverWcsId?: string; // wcs_add["wa"] 값
    naverSiteVerification?: string;
    googleSiteVerification?: string;
  };
  site: { url: string };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    nameKo: "한국정밀운송",
    nameEn: "HANJUNG PRECISION",
    logoDark: "",
    logoLight: "",
  },
  contact: {
    phoneDisplay: "1600-0000",
    phoneTel: "16000000",
    email: "contact@example.com",
    kakaoUrl: "#",
  },
  company: {
    ceo: "홍길동",
    bizNo: "000-00-00000",
    addresses: [
      { label: "본사", value: "서울특별시 ○○구 ○○로 000, 0층" },
      { label: "물류센터", value: "경기도 ○○시 ○○면 산업로 000" },
    ],
    supportNote: "365일 24시간 실시간 관제 · 전국 배차",
  },
  hero: {
    eyebrow: "SPECIAL CARGO TRANSPORT",
    titleLines: ["단 1mm의 흔들림 없이,"],
    highlight: "가치를 그대로 옮깁니다",
    description: [
      "반도체·의료기기·항공우주 정밀장비를 무진동 항온항습 전용 차량으로 운송합니다.",
      "전담 엔지니어와 실시간 관제로 상차부터 도착지 설치까지 책임집니다.",
    ],
    stats: [
      { icon: "shield", label: "적재물 보험", value: "10억+" },
      { icon: "truck", label: "무진동 배차", value: "1분 내" },
      { icon: "thermometer", label: "항온항습", value: "24/7" },
    ],
    images: ["/images/hero_truck_v4.jpg", "/images/hero_truck_night.jpg"],
  },
  nav: [
    { name: "회사 소개", href: "#about" },
    { name: "비즈니스 영역", href: "#services" },
    { name: "핵심 기술", href: "#technology" },
    { name: "운송 사례", href: "#portfolio" },
    { name: "견적 문의", href: "#contact" },
  ],
  analytics: {
    gaMeasurementId: "",
    googleAdsId: "",
    googleAdsConversionLabel: "",
    naverWcsId: "",
    naverSiteVerification: "",
    googleSiteVerification: "",
  },
  site: { url: "https://example.com" },
  seo: {
    title: "무진동 특수운송 · 정밀장비 운송 | 한국정밀운송",
    description:
      "한국정밀운송은 반도체·의료기기·정밀장비 등 고가 자산을 무진동 항온항습 리프트 차량으로 안전하게 운송합니다.",
    keywords:
      "특수운송, 무진동운송, 정밀장비운송, 반도체장비운송, 의료기기운송, 항온항습운송, 장비이전, 데이터센터이전",
    ogImage: "/images/hero_truck_v4.jpg",
  },
};
