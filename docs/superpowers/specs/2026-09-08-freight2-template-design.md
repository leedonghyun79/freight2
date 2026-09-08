# freight2 — 특수운송 홈페이지 템플릿 설계

작성일: 2026-09-08
상태: 승인됨 (사용자 검토 대기)

## 1. 목적

`d:\작업실\study\외주\freight` (프로텍스 특수운송 원페이지 사이트)와 **구조·레이아웃·기능이 동일한 재사용 템플릿**을 별도 프로젝트 `freight2`로 만든다.

- 앞으로 특수운송 업체 사이트를 반복 제작할 때 재사용한다.
- 상호·연락처·색상·문구·추적 ID를 **한 곳(`src/config/site.config.ts`)에서** 교체하면 사이트가 바뀌도록 설정을 분리한다.
- 배포 즉시 그럴듯해 보이도록 **가상 업체 샘플 콘텐츠**로 채워둔다.
- 디자인은 freight와 **살짝 차별화**한다(새 팔레트 + 미세 조정). 구조는 100% 동일.

## 2. 비목표 (YAGNI)

- 멀티페이지 라우팅 도입 안 함 (원페이지 유지).
- CMS/관리자 화면 없음.
- freight 원본 리팩터링 안 함 (freight2에서만 정리).
- 다국어(i18n) 없음.
- 새 섹션 추가 없음.

## 3. 프로젝트 생성 방식

`freight` 폴더를 `freight2`로 복사하되 다음은 제외한다:

- `.git/` — freight2에서 `git init` 새로 시작
- `node_modules/`, `.next/` — 재설치/재빌드
- `legacy/`
- `.env.local`, `.env copy.local` — **실 API 키 포함, 복사 금지**

생성 후:

- `package.json`의 `name`을 `freight2`로 변경
- `.env.example` 새로 작성 (솔라피 키 placeholder만; 값 비움)
- `.gitignore`에 `.env.local` 포함 확인
- `npm install` 후 `npm run build` 통과 확인

## 4. 설정 분리 — `src/config/site.config.ts`

현재 freight 컴포넌트 곳곳에 하드코딩된 브랜딩 값을 단일 타입 있는 설정 객체로 모은다. 모든 컴포넌트는 이 설정을 import 해서 사용한다.

| 구분 | freight 현재 위치 / 값 | site.config 키 |
|---|---|---|
| 상호(국문) | `프로텍스` (footer 오타 `프로펙스` 포함) | `brand.nameKo` |
| 상호(영문) | `PROTEX` | `brand.nameEn` |
| 로고 이미지 | `/images/로고_c.png`, `/images/로고_w.png` | `brand.logoDark`, `brand.logoLight` (빈 값이면 텍스트 로고 fallback) |
| 대표번호(표시용) | `1833-6362` | `contact.phoneDisplay` |
| 대표번호(tel:) | `18336362` / `1833-6362` 혼재 | `contact.phoneTel` |
| 이메일 | `protexmove@gmail.com` | `contact.email` |
| 카카오 상담 URL | `https://pf.kakao.com/_qMeuX/chat` | `contact.kakaoUrl` |
| 본사/사업소 주소 | 안산·평택 주소 문자열 | `company.addresses[]` |
| 대표자 | `김태호` | `company.ceo` |
| 24/7 문구 등 | Contact/Footer 하드코딩 | `company.supportNote` |
| Hero 카피 | Hero.tsx `<h1>`, 서브카피 | `hero.eyebrow`, `hero.titleLines`, `hero.highlight`, `hero.description` |
| Hero 통계 | Hero.tsx `stats` 배열 (적재물 보험 10억+ 등) | `hero.stats[]` |
| Hero 배경 이미지 | `/images/메인트럭사진.jpg` 등 | `hero.images[]` |
| 네비 링크 | Navbar.tsx `navLinks` | `nav[]` |
| GA 측정 ID | `G-SRBMYQ0S57` | `analytics.gaMeasurementId` |
| Google Ads ID | `AW-18131349273` | `analytics.googleAdsId` |
| Ads 전환 라벨 | `cQG8COijsMIcEJne2cVD` | `analytics.googleAdsConversionLabel` |
| 네이버 wcs wa | `s_4b5a2383003`, `a8831f54e53660` | `analytics.naverWcsId` |
| 네이버 사이트 인증 | layout.tsx verification | `analytics.naverSiteVerification` |
| 구글 사이트 인증 | `google16f32476075c014d` | `analytics.googleSiteVerification` |
| 도메인 | `https://xn--...com` | `site.url` |
| SEO 타이틀/설명/키워드 | layout.tsx metadata | `seo.title`, `seo.description`, `seo.keywords`, `seo.ogImage` |

설정 파일은 `SiteConfig` 타입으로 형태를 고정하고, 값이 없을 수 있는 필드(추적 ID, 로고)는 옵셔널 처리한다.

## 5. 추적 코드 통합 — `src/lib/track.ts`

현재 freight는 `gtag('event','conversion',{send_to:'AW-...'})` + 네이버 `wcs`/`_nasa` 스니펫이 Hero·ContactSection·FloatingAction의 버튼 onClick마다 복붙되어 있다.

- `trackConversion()` 함수 하나로 통합한다.
- `site.config`에 해당 ID가 비어 있으면 **아무 동작도 하지 않는다(no-op)**. 템플릿 기본 상태는 ID가 전부 비어 있으므로 안전하다.
- 각 컴포넌트의 인라인 스니펫을 `trackConversion()` 호출로 교체한다.
- `layout.tsx`의 GA/구글Ads/네이버 `<Script>` 및 `<script>` 블록도 관련 ID가 있을 때만 렌더링한다. `metadata.verification`도 값 있을 때만 채운다.

동작·전환 추적 시점은 freight와 동일하게 유지한다(값만 config 경유).

## 6. 디자인 차별화 (B안)

### 팔레트: 차콜 그레이 + 레드

`src/app/globals.css`의 CSS 변수 **값만 교체**한다. 토큰 이름(`--primary-navy`, `--primary-orange`, `@theme`의 `--color-primary-navy` 등)과 컴포넌트의 Tailwind 클래스(`bg-primary-navy`, `text-primary-orange` 등)는 **그대로 유지**하여 대규모 클래스 치환을 피한다.

| 역할 | freight | freight2 |
|---|---|---|
| primary (구 navy) | `#001a40` | `#1F2328` (charcoal) |
| primary hover/dark surface | `#000c20` | `#111316` |
| accent (구 orange) | `#E87C00` | `#D22F27` (red) |
| accent hover | `#C76A00` | `#B0241D` |
| surface | `#F8FAFC` | `#F5F5F4` |
| foreground | `#0F172A` | `#18181B` |

`heading-gradient` 등 색을 직접 박아둔 유틸리티도 새 팔레트에 맞춰 갱신한다.

### 미세 조정

- Hero CTA 버튼: `rounded-full` → `rounded-lg` (각진 산업 느낌)
- 섹션 상하 여백: `py-24` → `py-28`
- 카드 그림자: `shadow-2xl` 톤 다운 (`shadow-xl` + 낮은 opacity)
- 폰트: Inter / Outfit 유지

구조·섹션 순서(`page.tsx`)·Framer Motion 애니메이션은 freight와 동일.

## 7. 샘플 콘텐츠 (가상 업체)

- 가상 상호: **한국정밀운송 / HANJUNG PRECISION** (범용 특수운송 — 반도체·의료기기·정밀장비 무진동 항온항습 운송)
- 대표번호: `1600-0000` (명백한 더미), 이메일: `contact@example.com`
- 카카오 URL: `#` placeholder
- 주소/대표자: 가상 값 ("서울특별시 ○○구 ...", 대표: 홍길동)
- Hero 배경/섹션 이미지: `public/images`의 트럭·운송 사진은 브랜드 식별 요소가 없으므로 그대로 재사용
- 로고: 이미지 대신 텍스트 로고 컴포넌트로 표시 (config `brand.logoLight/Dark` 비움)
- 운송사례 캐러셀 / 파트너 로고: freight의 기존 더미 데이터 유지 (상호 표기만 정리)

## 8. 그대로 유지 (로직 변경 없음)

- 솔라피 견적폼 API `src/app/api/contact/route.ts` — 로직 동일. SMS 본문 `[프로텍스]` → `[한국정밀운송]` (config `brand.nameKo` 사용). 환경변수 키 이름 동일.
- ContactSection 폼 필드·검증·전화번호 하이픈 포맷 로직
- 개인정보처리방침 / 이용약관 모달 텍스트 — 상호명만 치환, 오타 `프로펙스` 수정, 시행일 문구 유지
- `robots.ts` / `sitemap.ts` — 하드코딩 도메인을 `site.config`의 `site.url` 참조로 변경
- `netlify.toml`, `next.config.ts`, `tsconfig.json`, eslint/postcss 설정

## 9. 컴포넌트별 변경 요약

| 파일 | 변경 |
|---|---|
| `src/config/site.config.ts` | 신규 — 전체 설정 객체 + 타입 |
| `src/lib/track.ts` | 신규 — `trackConversion()` no-op 지원 |
| `src/app/layout.tsx` | metadata를 config 경유로, 추적 `<Script>` 조건부 렌더 |
| `src/app/globals.css` | 팔레트 값 교체, gradient 유틸 갱신 |
| `src/app/page.tsx` | 변경 없음 (섹션 순서 유지) |
| `src/components/Navbar.tsx` | 로고·nav·전화번호 config 경유, 텍스트 로고 fallback |
| `src/components/Hero.tsx` | 카피·통계·이미지·CTA config 경유, `trackConversion()`, `rounded-lg` |
| `src/components/ContactSection.tsx` | 연락처·주소·대표자 config 경유, `trackConversion()` |
| `src/components/Footer.tsx` | 상호·연락처·주소·약관 텍스트 config 경유, 오타 수정 |
| `src/components/FloatingAction.tsx` | 카카오·전화 config 경유, `trackConversion()` |
| 기타 섹션 컴포넌트 | 하드코딩된 상호/문구가 있으면 config 경유 (구현 시 grep 확인) |
| `src/app/robots.ts`, `sitemap.ts` | `site.url` 참조 |
| `.env.example` | 신규 (placeholder) |
| `README.md` | 템플릿 사용법(“site.config.ts만 고치면 됨”) 간단 기술 |

## 10. 검증

- `npm run build` 통과
- `npm run lint` 통과
- `npm run dev` 로 로컬 확인: 모든 섹션 렌더, 팔레트 적용, 견적폼 제출 시 (키 없으면) 서버 설정 오류 메시지 정상 반환, 추적 ID 없을 때 콘솔 에러 없음
- `site.config.ts` 값 하나(예: `brand.nameKo`) 바꿔서 여러 위치에 반영되는지 스팟 체크
- `.env.local`이 커밋에 포함되지 않는지 확인
