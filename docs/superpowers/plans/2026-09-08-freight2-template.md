# freight2 특수운송 템플릿 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `freight` 원페이지 사이트와 구조·기능이 동일하되 브랜딩 값이 `src/config/site.config.ts` 한 곳으로 분리되고 새 팔레트가 적용된 재사용 템플릿 `freight2`를 만든다.

**Architecture:** freight 소스를 복사해 시작한다. 하드코딩된 상호·연락처·추적ID·SEO 값을 타입 있는 단일 설정 객체(`SiteConfig`)로 모으고 모든 컴포넌트가 이를 import 한다. 추적 스니펫은 `trackConversion()` 하나로 통합하고 ID가 비면 no-op. 팔레트는 `globals.css`의 CSS 변수 값만 교체(토큰명/클래스명 유지). 샘플 콘텐츠는 가상 업체 "한국정밀운송 / HANJUNG PRECISION"으로 채운다.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Swiper, solapi. 테스트 러너 없음 — 검증 게이트는 `npm run build`, `npm run lint`, `grep` 스팟체크.

**참조 원본:** `d:\작업실\study\외주\freight` (복사 후에는 참고용으로만)
**스펙:** `docs/superpowers/specs/2026-09-08-freight2-template-design.md`

---

## File Structure

| 파일 | 책임 |
|---|---|
| `src/config/site.config.ts` | 신규. `SiteConfig` 타입 + `siteConfig` 값 객체. 모든 브랜딩/연락처/추적/SEO 값의 단일 출처. |
| `src/lib/track.ts` | 신규. `trackConversion()` — GA/구글Ads/네이버 전환 스니펫 통합, ID 없으면 no-op. |
| `src/components/BrandLogo.tsx` | 신규. config에 로고 이미지가 있으면 `<Image>`, 없으면 텍스트 로고. Navbar/Footer 공용. |
| `src/app/globals.css` | 팔레트 CSS 변수 값 교체, `heading-gradient` 갱신. |
| `src/app/layout.tsx` | metadata를 config 경유, 추적 `<Script>`/verification 조건부 렌더. |
| `src/app/page.tsx` | 변경 없음. |
| `src/components/Navbar.tsx` | 로고·nav·전화번호 config 경유, BrandLogo 사용. |
| `src/components/Hero.tsx` | eyebrow·타이틀·설명·통계·이미지·CTA config 경유, `trackConversion()`, `rounded-lg`. |
| `src/components/ContactSection.tsx` | 전화·이메일·주소·대표자·supportNote config 경유, `trackConversion()`. |
| `src/components/Footer.tsx` | 상호·연락처·주소·약관 텍스트 config 경유, 오타 `프로펙스` 수정, BrandLogo. |
| `src/components/FloatingAction.tsx` | 카카오·전화 config 경유, `trackConversion()`. |
| `src/app/api/contact/route.ts` | SMS 본문 접두어 `[프로텍스]` → `[${brand.nameKo}]`. 그 외 로직 동일. |
| `src/app/robots.ts`, `src/app/sitemap.ts` | 하드코딩 도메인 → `siteConfig.site.url`. |
| `src/components/AboutSection.tsx`, `MiddleSection.tsx`, `ServiceSection.tsx`, `TechnologySpecs.tsx`, `PortfolioCarousel.tsx` | 하드코딩된 상호/실기업명 문구 정리 (grep 스윕). |
| `.env.example` | 신규. 솔라피 키 placeholder(값 비움). |
| `README.md` | 템플릿 사용법 간단 기술. |

---

### Task 0: 프로젝트 스캐폴드

**Files:**
- Create: `d:\작업실\study\외주\freight2\*` (freight에서 복사)

- [ ] **Step 1: freight 소스를 freight2로 복사 (제외 목록 준수)**

`freight2`에는 이미 `.git/`와 `docs/`가 있다. `docs/`는 유지, `.git/`도 유지(스펙 3항 "git init 새로 시작"이지만 이미 초기화됨 — 재초기화 불필요).

PowerShell:
```powershell
$src = "d:\작업실\study\외주\freight"
$dst = "d:\작업실\study\외주\freight2"
$exclude = @(".git","node_modules",".next","legacy",".env.local",".env copy.local","docs")
Get-ChildItem -Force $src | Where-Object { $exclude -notcontains $_.Name } | ForEach-Object {
  Copy-Item $_.FullName -Destination $dst -Recurse -Force
}
```

- [ ] **Step 2: 복사 결과 확인**

Run: `cd "d:\작업실\study\외주\freight2" && ls -la && ls src/components`
Expected: `package.json`, `src/`, `public/`, `next.config.ts` 등 존재. `node_modules/`, `.next/`, `legacy/`, `.env.local`, `.env copy.local` **없음**. `docs/` 유지.

- [ ] **Step 3: package.json name 변경**

`package.json`: `"name": "freight"` → `"name": "freight2"`. 다른 필드는 그대로.

- [ ] **Step 4: .gitignore에 .env.local 포함 확인**

`.gitignore`에 이미 `.env*` 라인이 있음 (freight 원본 확인됨). 그대로 두면 `.env.local`, `.env.example` 모두 무시된다. `.env.example`는 커밋해야 하므로 `.env*` 아래에 예외 추가:
```
# env files (can opt-in for committing if needed)
.env*
!.env.example
```

- [ ] **Step 5: .env.example 작성 (placeholder, 값 비움)**

Create `.env.example`:
```
# 솔라피 API 정보 (https://solapi.com 콘솔에서 발급)
SOLAPI_API_KEY=
SOLAPI_API_SECRET=

# 발신번호 (솔라피에 등록된 번호, 숫자만)
SOLAPI_SENDER_NUMBER=

# 관리자 수신번호 (문의 알림 받을 번호, 숫자만)
ADMIN_RECEIVE_NUMBER=
```

- [ ] **Step 6: 의존성 설치 + 베이스라인 빌드**

Run: `cd "d:\작업실\study\외주\freight2" && npm install && npm run build`
Expected: 설치 성공, 빌드 성공(경고는 허용, 에러 0). 실패 시 원본 freight와 diff 비교로 원인 파악 후 진행.

- [ ] **Step 7: 커밋**

```bash
git add -A
git commit -m "chore: freight2 템플릿 스캐폴드 (freight 복사 + 이름/env 정리)"
```

---

### Task 1: `src/config/site.config.ts` — 설정 객체 + 타입

**Files:**
- Create: `src/config/site.config.ts`

- [ ] **Step 1: 파일 작성**

Create `src/config/site.config.ts`:
```ts
export interface SiteConfig {
  brand: {
    nameKo: string;
    nameEn: string;
    /** 비우면 BrandLogo가 텍스트 로고로 fallback */
    logoDark?: string;  // 밝은 배경용 (구 로고_c.png)
    logoLight?: string; // 어두운 배경용 (구 로고_w.png)
  };
  contact: {
    phoneDisplay: string; // "1600-0000"
    phoneTel: string;     // "16000000" (tel: href용, 숫자만)
    email: string;
    kakaoUrl: string;
  };
  company: {
    ceo: string;
    /** 첫 항목이 대표 주소로 쓰임 */
    addresses: { label: string; value: string }[];
    supportNote: string;
  };
  hero: {
    eyebrow: string;
    titleLines: string[]; // 강조 앞줄들
    highlight: string;    // 강조(accent 색) 줄
    description: string[]; // 문단 줄 배열
    stats: { icon: "shield" | "truck" | "thermometer" | "file"; label: string; value: string }[];
    images: string[];
  };
  nav: { name: string; href: string }[];
  analytics: {
    gaMeasurementId?: string;
    googleAdsId?: string;
    googleAdsConversionLabel?: string;
    naverWcsId?: string;            // wcs_add["wa"] 값
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
    addresses: [
      { label: "본사", value: "서울특별시 ○○구 ○○로 000, 0층" },
      { label: "물류센터", value: "경기도 ○○시 ○○면 산업로 000" },
    ],
    supportNote: "365일 24시간 실시간 관제 · 전국 배차",
  },
  hero: {
    eyebrow: "SPECIAL CARGO TRANSPORT",
    titleLines: ["한국정밀운송이 제안하는"],
    highlight: "운송의 새로운 기준",
    description: [
      "반도체·의료기기·정밀장비 등 고부가가치 화물을 가치 그대로 안전하게 전합니다.",
      "전담팀과 정밀 관제 시스템으로 처음부터 끝까지 책임집니다.",
    ],
    stats: [
      { icon: "shield", label: "적재물 보험", value: "10억+" },
      { icon: "truck", label: "무진동 배차", value: "1분 내" },
      { icon: "thermometer", label: "항온항습", value: "24/7" },
    ],
    images: ["/images/메인트럭사진.jpg", "/images/메인대표사진1.jpg"],
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
    ogImage: "/images/메인트럭사진.jpg",
  },
};
```

- [ ] **Step 2: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 0 (아직 import하는 곳 없음).

- [ ] **Step 3: 커밋**

```bash
git add src/config/site.config.ts
git commit -m "feat: site.config.ts — 브랜딩/연락처/추적/SEO 단일 설정 객체"
```

---

### Task 2: `src/lib/track.ts` — 전환 추적 통합

**Files:**
- Create: `src/lib/track.ts`

- [ ] **Step 1: 파일 작성**

원본 인라인 스니펫 동작을 그대로 옮긴다: `gtag('event','conversion',{send_to: '<AdsId>/<Label>', value:1.0, currency:'KRW'})` + 네이버 `_nasa["cnv"] = wcs.cnv("4","1"); wcs_do(_nasa)`.

Create `src/lib/track.ts`:
```ts
import { siteConfig } from "@/config/site.config";

/**
 * 전환 이벤트 1회 발생. 관련 추적 ID가 config에 비어 있으면 아무 동작도 하지 않는다.
 * 원본 freight의 각 버튼 onClick 인라인 스니펫과 동일한 동작.
 */
export function trackConversion(): void {
  if (typeof window === "undefined") return;

  const w = window as any;
  const { googleAdsId, googleAdsConversionLabel } = siteConfig.analytics;

  if (w.gtag && googleAdsId && googleAdsConversionLabel) {
    w.gtag("event", "conversion", {
      send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
      value: 1.0,
      currency: "KRW",
    });
  }

  if (w.wcs && siteConfig.analytics.naverWcsId) {
    if (!w._nasa) w._nasa = {};
    w._nasa["cnv"] = w.wcs.cnv("4", "1");
    if (typeof w.wcs_do === "function") w.wcs_do(w._nasa);
  }
}
```

- [ ] **Step 2: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 0.

- [ ] **Step 3: 커밋**

```bash
git add src/lib/track.ts
git commit -m "feat: trackConversion() — 전환 추적 통합, ID 없으면 no-op"
```

---

### Task 3: `src/components/BrandLogo.tsx` — 로고 컴포넌트

**Files:**
- Create: `src/components/BrandLogo.tsx`

- [ ] **Step 1: 파일 작성**

Create `src/components/BrandLogo.tsx`:
```tsx
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

interface BrandLogoProps {
  /** dark = 어두운 배경 위(밝은 로고), light = 밝은 배경 위(어두운 로고) */
  variant: "dark" | "light";
  className?: string;
}

export default function BrandLogo({ variant, className = "" }: BrandLogoProps) {
  const { logoDark, logoLight, nameKo, nameEn } = siteConfig.brand;
  const src = variant === "dark" ? logoLight : logoDark;

  if (src) {
    return (
      <span className={`relative inline-block w-[160px] h-[50px] ${className}`}>
        <Image src={src} alt={`${nameKo} 로고`} fill className="object-contain" />
      </span>
    );
  }

  // 텍스트 로고 fallback
  const color = variant === "dark" ? "text-white" : "text-primary-navy";
  return (
    <span className={`inline-flex flex-col leading-none ${color} ${className}`}>
      <span className="font-outfit font-black text-lg tracking-tight">{nameKo}</span>
      <span className="text-[10px] font-bold tracking-[0.25em] text-primary-orange">
        {nameEn}
      </span>
    </span>
  );
}
```

- [ ] **Step 2: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 0.

- [ ] **Step 3: 커밋**

```bash
git add src/components/BrandLogo.tsx
git commit -m "feat: BrandLogo — 이미지 로고 또는 텍스트 로고 fallback"
```

---

### Task 4: `src/app/globals.css` — 팔레트 교체 (B안: 차콜 + 레드)

**Files:**
- Modify: `src/app/globals.css:3-14`, `:58-63`

- [ ] **Step 1: `:root` CSS 변수 값 교체**

토큰 **이름은 유지**하고 값만 바꾼다.
```css
:root {
  --primary-navy: #1F2328;   /* charcoal (구 navy) */
  --primary-orange: #D22F27; /* red (구 orange) */
  --accent-orange: #B0241D;  /* red hover */
  --surface: #F5F5F4;
  --glass: rgba(255, 255, 255, 0.7);
  --dark-surface: #111316;

  --background: #ffffff;
  --foreground: #18181B;
  --bg-gray: #f5f5f4;
}
```

- [ ] **Step 2: `heading-gradient` 유틸 갱신**

```css
.heading-gradient {
  background: linear-gradient(135deg, #1F2328 0%, #D22F27 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

- [ ] **Step 3: 하드코딩 색 잔여 확인**

Run: `grep -rn "#001a40\|#000c20\|#E87C00\|#C76A00\|#0A2342\|#1E40AF\|F8FAFC\|#0F172A" src/`
Expected: `src/` 안에서 위 hex가 **더 나오지 않음** (globals.css 외 컴포넌트에 박힌 게 있으면 새 팔레트 대응색으로 교체). 컴포넌트에 흔한 `bg-[#f8f9fa]`, `bg-[#0f1115]`, `bg-[#FEE500]`(카카오 노랑)는 유지 가능 — 카카오 브랜드색만 유지, 나머지 회색조는 `#f5f5f4`/`#111316`로 맞춤.

- [ ] **Step 4: 빌드 + 시각 확인**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 5: 커밋**

```bash
git add src/app/globals.css
git commit -m "feat: 팔레트 B안 적용 (차콜 그레이 + 레드), heading-gradient 갱신"
```

---

### Task 5: `src/app/layout.tsx` — metadata + 조건부 추적

**Files:**
- Modify: `src/app/layout.tsx` 전체 (metadata 객체 + `<head>` 스크립트)

- [ ] **Step 1: metadata를 config 경유로 재작성**

```tsx
import { siteConfig } from "@/config/site.config";

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
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: `${brand.nameKo} 특수운송 차량` }],
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
          ...(analytics.googleSiteVerification ? { google: analytics.googleSiteVerification } : {}),
          ...(analytics.naverSiteVerification
            ? { other: { "naver-site-verification": analytics.naverSiteVerification } }
            : {}),
        },
      }
    : {}),
};
```

- [ ] **Step 2: `<head>` 안 추적 스크립트를 조건부로**

GA/구글Ads 블록은 `analytics.gaMeasurementId || analytics.googleAdsId` 있을 때만, 네이버 블록은 `analytics.naverWcsId` 있을 때만 렌더. JSON-LD의 `name`/`url`/`logo`는 config 값 사용. 예:
```tsx
{(analytics.gaMeasurementId || analytics.googleAdsId) && (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAdsId || analytics.gaMeasurementId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      ${analytics.googleAdsId ? `gtag('config', '${analytics.googleAdsId}');` : ""}
      ${analytics.gaMeasurementId ? `gtag('config', '${analytics.gaMeasurementId}');` : ""}
    `}</Script>
  </>
)}
{analytics.naverWcsId && (
  <>
    <Script type="text/javascript" src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
    <Script id="naver-conversion" strategy="afterInteractive">{`
      if (!wcs_add) var wcs_add={};
      wcs_add["wa"] = "${analytics.naverWcsId}";
      if (!_nasa) var _nasa={};
      if(window.wcs){ wcs.inflow(); wcs_do(); }
    `}</Script>
  </>
)}
```
JSON-LD `<script type="application/ld+json">`는 유지하되 `name: brand.nameKo`, `url: site.url`, `logo: \`${site.url}${brand.logoDark || seo.ogImage}\``, address는 `company.addresses[0].value` 문자열로 단순화.

- [ ] **Step 3: 빌드 + 콘솔 확인**

Run: `npm run build && npm run dev`
`http://localhost:3000` 열어 콘솔 에러 0, `<head>`에 GA/네이버 스크립트 **없음**(기본 상태 ID 비어있음), 페이지 정상 렌더.

- [ ] **Step 4: 커밋**

```bash
git add src/app/layout.tsx
git commit -m "feat: layout metadata config 경유 + 추적 스크립트 조건부 렌더"
```

---

### Task 6: `src/components/Navbar.tsx`

**Files:**
- Modify: `src/components/Navbar.tsx:13-19` (navLinks), `:59-67` (로고), `:142-145` (전화)

- [ ] **Step 1: config import + navLinks 교체**

`const navLinks = [...]` 삭제 → `import { siteConfig } from "@/config/site.config";` 후 `const navLinks = siteConfig.nav;`. (`isContact` 판정이 `link.name === "견적 문의"` 문자열 비교 → config nav 마지막 항목 이름과 일치하므로 유지. 더 견고하게 하려면 `link.href === "#contact"` 로 교체.)

- [ ] **Step 2: 로고를 BrandLogo로 교체**

```tsx
import BrandLogo from "@/components/BrandLogo";
// ...
<button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center cursor-pointer">
  <BrandLogo variant={isScrolled ? "light" : "dark"} />
</button>
```
(`<Image src={isScrolled ? 로고_c : 로고_w}>` 블록 제거. `Image` import가 다른 곳에서 안 쓰이면 제거.)

- [ ] **Step 3: 모바일 메뉴 하단 전화번호**

`<span>1833-6362</span>` → `<span>{siteConfig.contact.phoneDisplay}</span>`

- [ ] **Step 4: 빌드**

Run: `npm run build`
Expected: 성공. lint에서 unused `Image` 경고 없도록 정리.

- [ ] **Step 5: 커밋**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: Navbar 로고/nav/전화 config 경유, 텍스트 로고 fallback"
```

---

### Task 7: `src/components/Hero.tsx`

**Files:**
- Modify: `src/components/Hero.tsx:6-17` (import/상수), `:71-122` (카피/CTA)

- [ ] **Step 1: config 값으로 상수 교체**

```tsx
import { siteConfig } from "@/config/site.config";
import { Shield, Truck, Thermometer, FileText } from "lucide-react";

const { hero, contact } = siteConfig;
const images = hero.images;
const iconMap = { shield: Shield, truck: Truck, thermometer: Thermometer, file: FileText } as const;
const stats = hero.stats.map((s) => ({ ...s, icon: iconMap[s.icon] }));
```
(로컬 `const images`, `const stats` 배열 삭제.)

- [ ] **Step 2: eyebrow / h1 / p 교체**

```tsx
<span className="text-primary-orange ...">{hero.eyebrow}</span>

<h1 className="...">
  {hero.titleLines.map((line, i) => (<span key={i}>{line}<br /></span>))}
  <span className="text-primary-orange text-[32px] md:text-[72px]">{hero.highlight}</span>
</h1>

<p className="...">
  {hero.description.map((line, i) => (
    <span key={i}>{line}{i < hero.description.length - 1 && <br />}</span>
  ))}
</p>
```

- [ ] **Step 3: CTA — href config 경유 + trackConversion + rounded-lg**

카카오 버튼: `href={contact.kakaoUrl}`, 전화 버튼: `href={\`tel:${contact.phoneTel}\`}`, 표시 텍스트 `{contact.phoneDisplay}`.
두 버튼의 `onClick={() => { ...인라인 gtag/wcs... }}` → `onClick={() => trackConversion()}` (`import { trackConversion } from "@/lib/track";`).
버튼 className의 `rounded-full` → `rounded-lg` (2곳).

- [ ] **Step 4: 빌드 + 시각 확인**

Run: `npm run build && npm run dev`
Hero 렌더, 카피가 config 값으로 표시, CTA 각진 모서리, 콘솔 에러 0 (trackConversion no-op).

- [ ] **Step 5: 커밋**

```bash
git add src/components/Hero.tsx
git commit -m "feat: Hero 카피/통계/이미지/CTA config 경유, trackConversion, rounded-lg"
```

---

### Task 8: `src/components/ContactSection.tsx`

**Files:**
- Modify: `src/components/ContactSection.tsx:78-85` (submit 추적), `:125-165` (전화/이메일), `:174-187` (주소/대표/note)

- [ ] **Step 1: import**

```tsx
import { siteConfig } from "@/config/site.config";
import { trackConversion } from "@/lib/track";
const { contact, company } = siteConfig;
```

- [ ] **Step 2: submit 성공 시 인라인 추적 → trackConversion()**

`if (typeof window !== 'undefined' && (window as any).gtag) { ... }` 블록 전체를 `trackConversion();` 한 줄로.

- [ ] **Step 3: 전화 링크**

`href="tel:18336362"` → `href={\`tel:${contact.phoneTel}\`}`, `window.location.href = 'tel:18336362'` → `` window.location.href = `tel:${contact.phoneTel}` ``, 표시 `1833-6362` → `{contact.phoneDisplay}`, onClick 인라인 추적 → `trackConversion()`.

- [ ] **Step 4: 이메일 링크**

`href="mailto:protexmove@gmail.com"` → `href={\`mailto:${contact.email}\`}`, 표시 텍스트 → `{contact.email}`, onClick 인라인 추적 → `trackConversion()`.

- [ ] **Step 5: 주소 / 대표자 / 24/7 문구**

`경기도 평택시 고덕동 1234-5 프로젝트 타워 801호` → `{company.addresses[0].value}`
`김태호` → `{company.ceo}`
`Available 24/7 National Wide Support` 아래 한글 안내가 있으면 `{company.supportNote}` 사용. (상단 `365일 24시간 실시간 관제 시스템 가동.` 문구도 `company.supportNote`로 교체 가능 — 유지해도 무방하나 config화 권장.)

- [ ] **Step 6: 빌드 + 폼 제출 확인**

Run: `npm run build && npm run dev`
견적폼 제출 → `.env.local` 없으면 `서버 설정 오류입니다.` alert 정상, 콘솔 에러 0.

- [ ] **Step 7: 커밋**

```bash
git add src/components/ContactSection.tsx
git commit -m "feat: ContactSection 연락처/주소/대표자 config 경유, trackConversion"
```

---

### Task 9: `src/components/Footer.tsx`

**Files:**
- Modify: `src/components/Footer.tsx:17-58` (약관 텍스트), `:74-83` (로고/소개), `:94-134` (연락처/주소/대표), `:148` (카피라이트)

- [ ] **Step 1: import + 약관 텍스트 상호/오타 수정**

```tsx
import { siteConfig } from "@/config/site.config";
import BrandLogo from "@/components/BrandLogo";
const { brand, contact, company } = siteConfig;
```
`PRIVACY_POLICY_TEXT`, `TERMS_OF_SERVICE_TEXT`를 템플릿 리터럴로 바꿔 `프로펙스` → `${brand.nameKo}` (오타 수정 겸). **시행일 `2024. 04. 01.` 문구는 유지** (스펙 8항). 예:
```tsx
const PRIVACY_POLICY_TEXT = `
**${brand.nameKo} (이하 '회사'라 한다)**는 개인정보 보호법 제30조에 따라 ...
...
이 개인정보 처리방침은 **2024. 04. 01.** 부터 적용됩니다.
`;
```

- [ ] **Step 2: 로고 → BrandLogo, 소개 문구**

`<Image src="/images/로고_w.png" ...>` → `<BrandLogo variant="dark" />`.
`프로텍스 특수운송은 반도체, 의료기기, 전산장비 ...` → `{brand.nameKo} 특수운송은 반도체·의료기기·정밀장비 등 고가의 정밀 자산을 ...` (상호만 config, 나머지 문구 유지 가능).

- [ ] **Step 3: 연락처 / 주소 / 대표**

`1833-6362` → `{contact.phoneDisplay}`, `protexmove@gmail.com` → `{contact.email}`.
`본사: 경기도 안산시 ... <br /> 사업소(고덕): ...` → `company.addresses.map((a) => <div key={a.label}>{a.label}: {a.value}</div>)`.
`대표: 김태호` → `대표: {company.ceo}`.

- [ ] **Step 4: 카피라이트**

`© 2026 PROTEX Special Cargo. ALL RIGHTS RESERVED.` → `© {new Date().getFullYear()} {brand.nameEn}. ALL RIGHTS RESERVED.` (또는 `{brand.nameKo}`).
`alt="PROTEX Logo"` 잔여 제거(BrandLogo로 대체됨). `Image` import 미사용 시 제거.

- [ ] **Step 5: 빌드 + 모달 확인**

Run: `npm run build && npm run dev`
Footer 렌더, 개인정보처리방침/이용약관 모달에 `한국정밀운송` 표시, `프로펙스` 잔여 0.

Run: `grep -rn "프로펙스" src/`
Expected: 결과 없음.

- [ ] **Step 6: 커밋**

```bash
git add src/components/Footer.tsx
git commit -m "feat: Footer 상호/연락처/주소/약관 config 경유, 오타 프로펙스 수정"
```

---

### Task 10: `src/components/FloatingAction.tsx`

**Files:**
- Modify: `src/components/FloatingAction.tsx:33-68`

- [ ] **Step 1: import + 링크/추적 교체**

```tsx
import { siteConfig } from "@/config/site.config";
import { trackConversion } from "@/lib/track";
const { contact } = siteConfig;
```
카카오 `<motion.a href="https://pf.kakao.com/_qMeuX/chat" ...>` → `href={contact.kakaoUrl}`, onClick 인라인 블록 → `onClick={() => trackConversion()}`.
전화 `<motion.a href="tel:1833-6362" ...>` → `href={\`tel:${contact.phoneTel}\`}`, onClick → `trackConversion()`.

- [ ] **Step 2: 빌드**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 3: 커밋**

```bash
git add src/components/FloatingAction.tsx
git commit -m "feat: FloatingAction 카카오/전화 config 경유, trackConversion"
```

---

### Task 11: `src/app/api/contact/route.ts`

**Files:**
- Modify: `src/app/api/contact/route.ts:45`

- [ ] **Step 1: SMS 접두어 config 경유**

파일 상단에 `import { siteConfig } from "@/config/site.config";` 추가.
`'[프로텍스] 새 견적 문의가 도착했습니다.'` → `` `[${siteConfig.brand.nameKo}] 새 견적 문의가 도착했습니다.` ``
나머지 로직·환경변수 키 이름 **변경 없음**.

- [ ] **Step 2: 빌드**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 3: 커밋**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: 견적 SMS 접두어를 brand.nameKo 경유로"
```

---

### Task 12: `robots.ts` / `sitemap.ts` — 도메인 참조

**Files:**
- Modify: `src/app/robots.ts:9`, `src/app/sitemap.ts:4`

- [ ] **Step 1: robots.ts**

```ts
import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site.config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.site.url}/sitemap.xml`,
  }
}
```

- [ ] **Step 2: sitemap.ts**

`const baseUrl = 'https://xn--...com'` → `const baseUrl = siteConfig.site.url` (+ import).

- [ ] **Step 3: 빌드 + 확인**

Run: `npm run build`
Expected: 성공. `.next/server/app/robots.txt` / `sitemap.xml` 에 `https://example.com` 반영.

- [ ] **Step 4: 커밋**

```bash
git add src/app/robots.ts src/app/sitemap.ts
git commit -m "feat: robots/sitemap 도메인을 site.config.url 참조로"
```

---

### Task 13: 잔여 섹션 컴포넌트 — 상호/실기업명 정리

**Files:**
- Modify: `src/components/MiddleSection.tsx:42`, `src/components/ServiceSection.tsx:13,41`, `src/components/TechnologySpecs.tsx:69`, `src/components/AboutSection.tsx:37,45,90`, `src/components/PortfolioCarousel.tsx:36,44` (그 외 grep 결과)

- [ ] **Step 1: 브랜드 문자열 grep 스윕**

Run: `grep -rn "프로텍스\|프로펙스\|PROTEX\|1833-6362\|18336362\|protexmove\|qMeuX\|AW-1813\|G-SRBMYQ\|xn--2o2bo\|s_4b5a2383003\|a8831f54e53660" src/`
Expected: Task 4~12 이후 남는 건 잔여 섹션 컴포넌트뿐. 각각 처리:
- `MiddleSection.tsx` `WHY PROTEX` → `WHY {siteConfig.brand.nameEn}` 또는 `WHY US` (import 추가).
- `ServiceSection.tsx` `프로텍스만의` → `자사만의` / `{siteConfig.brand.nameKo}만의`.
- `TechnologySpecs.tsx` `alt="PROTEX Professional Fleet"` → `alt={\`${siteConfig.brand.nameEn} Fleet\`}` 또는 일반 문구.
- `AboutSection.tsx:37` `프로펙스 특수운송은` → `{siteConfig.brand.nameKo} 특수운송은` (client 컴포넌트라 import 가능).

- [ ] **Step 2: 실기업명 name-drop 제거 (가상 업체 신뢰성)**

가상 업체 템플릿이 실제 대기업을 고객으로 사칭하면 안 됨:
- `AboutSection.tsx:45` `"삼성전자, SK하이닉스 등 국가핵심시설 보안 교육 이수"` → `"국가핵심시설 출입 보안 교육 이수"`.
- `AboutSection.tsx:90` `"국내 대기업 및 국가연구 시설 전담 운송사"` → `"정밀장비·연구시설 전담 운송"` (약하게).
- `PortfolioCarousel.tsx:36` `"현대로템 정밀장비 운송"` → `"철도차량 정밀장비 운송"`; `:44` `"한화우주센터 레이더 운송"` → `"항공우주 부품 운송"`. 이미지 파일명(`한화우주센터.jpg` 등)은 그대로 재사용, `title`/`desc` 텍스트만 일반화.
- `PortfolioCarousel.tsx:20` `"국가연구소 정밀 설비 이전"`, `ServiceSection` 박물관/미술품 문구는 일반 명사이므로 유지.

- [ ] **Step 3: 빌드 + 재확인**

Run: `npm run build && grep -rn "프로텍스\|프로펙스\|PROTEX\|삼성\|하이닉스\|현대로템\|한화우주" src/`
Expected: 빌드 성공, grep 결과 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/components/
git commit -m "feat: 잔여 섹션 컴포넌트 상호 config화 + 실기업명 일반화"
```

---

### Task 14: 디자인 미세 조정 (섹션 여백 / 그림자)

**Files:**
- Modify: `src/components/*.tsx` 중 `py-24`, `shadow-2xl` 사용 파일 (Task 데이터 기준 8개 파일)

- [ ] **Step 1: 섹션 상하 여백 `py-24` → `py-28`**

각 섹션 컴포넌트 최상위 `<section>` 의 `py-24` → `py-28`. (Hero는 `h-screen`이라 해당 없음.)
Run 후: `grep -rn "py-24" src/` → 결과 없음(의도적으로 남길 것 있으면 문서화).

- [ ] **Step 2: 카드 그림자 톤 다운**

주요 카드 컨테이너의 `shadow-2xl` → `shadow-xl`. 강조가 필요한 곳(ContactSection 좌측 패널 등)은 `shadow-xl` + 유지. `shadow-primary-navy/20` 같은 낮은 opacity는 그대로.

- [ ] **Step 3: 빌드 + 시각 확인**

Run: `npm run build && npm run dev`
전 섹션 렌더, 여백/그림자 변화 확인, 레이아웃 깨짐 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/components/
git commit -m "style: 섹션 여백 py-28, 카드 그림자 톤 다운"
```

---

### Task 15: README + 최종 검증

**Files:**
- Modify: `README.md`

- [ ] **Step 1: README 교체**

Create/overwrite `README.md`:
```markdown
# freight2 — 특수운송 홈페이지 템플릿

Next.js 원페이지 특수운송 사이트 템플릿. 새 업체용으로 재사용한다.

## 커스터마이징

**`src/config/site.config.ts` 한 파일만 고치면 된다.**
- `brand` — 상호(국/영), 로고 이미지 경로(비우면 텍스트 로고)
- `contact` — 대표번호, 이메일, 카카오 상담 URL
- `company` — 대표자, 주소 목록, 안내 문구
- `hero` — 메인 카피, 통계, 배경 이미지
- `nav` — 상단 메뉴
- `analytics` — GA / 구글Ads / 네이버 추적 ID (비우면 추적 코드 미삽입, 안전)
- `site.url`, `seo` — 도메인, 메타 태그

이미지는 `public/images/` 에 교체.

## 개발

```bash
cp .env.example .env.local   # 솔라피 견적폼 알림 쓸 때만 값 채우기
npm install
npm run dev
```

## 배포

`npm run build` → Netlify (`netlify.toml` 포함).
견적폼 SMS 알림을 쓰려면 배포 환경변수에 `SOLAPI_*`, `ADMIN_RECEIVE_NUMBER` 설정.
```

- [ ] **Step 2: 전체 검증 게이트**

```bash
npm run build   # 성공
npm run lint    # 통과 (경고 0 목표, 최소 에러 0)
grep -rn "프로텍스\|프로펙스\|PROTEX\|1833-6362\|protexmove\|xn--2o2bo\|AW-1813\|G-SRBMYQ" src/   # 결과 없음
git status --porcelain   # .env.local 없음 (git이 무시)
```

- [ ] **Step 3: 설정 반영 스팟체크**

`src/config/site.config.ts` 의 `brand.nameKo` 를 임시로 `"테스트상호"` 로 바꾸고 `npm run dev` → Navbar(텍스트 로고), Footer, 약관 모달, `<title>` 에 반영되는지 확인 후 원복.

- [ ] **Step 4: dev 수동 확인 체크리스트**

- [ ] 모든 섹션 렌더 (Navbar/Hero/Middle/Service/Technology/Portfolio/Contact/Floating/Footer)
- [ ] 새 팔레트(차콜+레드) 적용
- [ ] Hero CTA `rounded-lg`
- [ ] 견적폼 제출 시 (키 없음) `서버 설정 오류입니다.` 정상 반환
- [ ] 브라우저 콘솔 에러 0 (추적 ID 없음 → no-op)
- [ ] robots.txt / sitemap.xml 에 `example.com`

- [ ] **Step 5: 커밋**

```bash
git add README.md
git commit -m "docs: freight2 템플릿 사용법 README"
```

---

## Self-Review

**스펙 커버리지:**
- 스펙 3 (프로젝트 생성/제외/env/gitignore/build) → Task 0 ✅
- 스펙 4 (site.config.ts 전 항목) → Task 1 ✅ (모든 표 행이 `SiteConfig` 키로 매핑됨)
- 스펙 5 (track.ts no-op, 인라인 스니펫 교체, layout 조건부) → Task 2, 4, 6, 8, 10 ✅
- 스펙 6 (팔레트 값만 교체, gradient, rounded-lg, py-28, shadow, 폰트 유지) → Task 4, 7(rounded-lg), 14 ✅
- 스펙 7 (가상 업체 샘플, 텍스트 로고, 이미지 재사용, 캐러셀 더미 유지) → Task 1(값), 3(BrandLogo), 13 ✅
- 스펙 8 (route.ts 로직 동일 + 접두어, 폼 검증 유지, 약관 상호만 치환+오타+시행일 유지, robots/sitemap) → Task 9, 11, 12 ✅
- 스펙 9 (컴포넌트별 변경 표) → Task 5~14 개별 매핑 ✅
- 스펙 10 (검증: build/lint/dev/스팟체크/.env.local 미커밋) → Task 15 ✅

**갭:** `page.tsx` 변경 없음(스펙과 일치, 태스크 불필요). `netlify.toml`/`next.config.ts`/`tsconfig.json` 유지(복사만, 태스크 불필요). `PortfolioCarousel` 이미지 파일은 유지, 텍스트만 일반화 — Task 13에 반영.

**타입 일관성:** `SiteConfig` 인터페이스(Task 1)에서 정의한 키(`contact.phoneTel`, `contact.phoneDisplay`, `company.addresses[].value`, `hero.stats[].icon` 리터럴, `analytics.*` 옵셔널)를 Task 4~13에서 동일 이름으로 참조. `trackConversion()` (Task 2) 시그니처 인자 없음 — Task 6/8/10에서 `trackConversion()` 로 호출 일치. `BrandLogo` `variant: "dark" | "light"` (Task 3) — Task 6(Navbar), Task 9(Footer)에서 동일 사용.

**Placeholder 스캔:** 코드 스텝은 모두 실제 코드/명령 포함. "grep 결과 처리" 스텝은 대상 파일·라인·교체 문구를 구체 명시.
