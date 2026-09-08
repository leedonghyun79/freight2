import { siteConfig } from "@/config/site.config";

/**
 * 전환 이벤트 1회 발생. 관련 추적 ID가 config에 비어 있으면 아무 동작도 하지 않는다.
 * 원본 freight의 각 버튼 onClick 인라인 스니펫과 동일한 동작.
 */
export function trackConversion(): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    wcs?: { cnv: (a: string, b: string) => string };
    wcs_do?: (nasa: Record<string, string>) => void;
    _nasa?: Record<string, string>;
  };
  const { googleAdsId, googleAdsConversionLabel } = siteConfig.analytics;

  if (w.gtag && googleAdsId && googleAdsConversionLabel) {
    w.gtag("event", "conversion", {
      send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
      value: 1.0,
      currency: "KRW",
    });
  }

  if (w.wcs && siteConfig.analytics.naverWcsId) {
    const nasa = w._nasa ?? (w._nasa = {});
    nasa["cnv"] = w.wcs.cnv("4", "1");
    if (typeof w.wcs_do === "function") w.wcs_do(nasa);
  }
}
