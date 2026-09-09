"use client";

import { useEffect, useState } from "react";

/**
 * 스크롤을 올리면 true, 내리면 false. threshold 아래(페이지 상단)에서는 항상 false.
 * 하단 고정 CTA 배너 노출 제어에 사용.
 */
export function useScrollReveal(threshold = 400) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (y <= threshold) {
        setRevealed(false);
      } else if (y < last - 4) {
        setRevealed(true); // 올리는 중
      } else if (y > last + 4) {
        setRevealed(false); // 내리는 중
      }
      last = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return revealed;
}
