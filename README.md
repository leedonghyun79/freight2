# freight2 — 특수운송 홈페이지 템플릿

Next.js 원페이지 특수운송 사이트 템플릿. 새 업체용으로 재사용한다.

## 커스터마이징

**`src/config/site.config.ts` 한 파일만 고치면 된다.**

- `brand` — 상호(국/영), 로고 이미지 경로(비우면 텍스트 로고로 표시)
- `contact` — 대표번호(표시용/tel용), 이메일, 카카오 상담 URL
- `company` — 대표자, 주소 목록(첫 항목이 대표 주소), 안내 문구
- `hero` — 메인 카피(eyebrow/타이틀/강조/설명), 통계, 배경 이미지
- `nav` — 상단 메뉴
- `analytics` — GA / 구글Ads / 네이버 추적 ID. **비우면 추적 코드가 삽입되지 않는다(안전 기본값).**
- `site.url` — 도메인 (robots.txt / sitemap.xml / OG 태그에 사용)
- `seo` — 메타 타이틀·설명·키워드·OG 이미지

이미지는 `public/images/` 에 넣고 경로를 config에 지정.

## 개발

```bash
cp .env.example .env.local   # 견적폼 SMS 알림을 쓸 때만 값 채우기
npm install
npm run dev
```

http://localhost:3000

## 견적폼 (솔라피 SMS)

`src/app/api/contact/route.ts` 가 솔라피로 관리자에게 문의 알림 SMS를 보낸다.
쓰려면 아래 환경변수를 `.env.local`(로컬) 또는 배포 환경에 설정:

- `SOLAPI_API_KEY`, `SOLAPI_API_SECRET`
- `SOLAPI_SENDER_NUMBER` (발신번호, 숫자만)
- `ADMIN_RECEIVE_NUMBER` (수신번호, 숫자만)

키가 없으면 폼 제출 시 "서버 설정 오류입니다." 를 반환한다(사이트 자체는 정상 동작).

## 배포

```bash
npm run build
```

Netlify 설정(`netlify.toml`) 포함.

## 스택

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Swiper
# freight2
