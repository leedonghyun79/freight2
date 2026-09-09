"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

const items = [
  {
    title: "적재물 파손 보장보험 10억 가입",
    description: "적재물 배상책임보험 10억 가입으로 사고 발생 시 완벽한 보상을 보장합니다.",
  },
  {
    title: "완벽한 항습(제습) 시스템",
    description: "온도만으로 항습(제습)하던 방법이 아닌 실시간습도계(운행중 모니터링), 제습전용장비, 수출용방습제구비 무시동(정차)시에도 제습 및 운송 완료후 제습 데이터 로그 제공<br><span class='text-[13px] text-gray-500 mt-2 block'>(*실제 제주우주센터 장비납품시 적용중)</span>",
  },
  {
    title: "무진동화물차주 네트워크",
    description: "1톤, 5톤, 10톤이상 전국무진동특수차 차주와 직접배차공유로 가장 빠른 배차",
  },
  {
    title: "제품안전포장 및 완충시스템",
    description: "정전기 방지 포장 및 제품결박시 완충스펀지 포장결박으로 제품보호를 완료했습니다. 미술품 및 문화재 전문 포장팀운영",
  },
];

export default function MiddleSection() {
  return (
    <section
      id="about"
      className="relative z-10 bg-primary-navy py-24 md:py-36 overflow-hidden scroll-mt-24 shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.45)]"
    >
      {/* Faint hero image backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={siteConfig.hero.images[0]}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/80 via-primary-navy/60 to-primary-navy/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          {/* Left: Sticky Statement */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-primary-orange font-bold text-xs tracking-[0.2em] uppercase">
                Why Us
              </span>
              <span className="h-px w-12 bg-primary-orange" />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-outfit font-black tracking-tight leading-[1.15] text-[32px] md:text-[44px] lg:text-[52px] break-keep"
            >
              고가의 장비,
              <br />그 가치를 그대로 전합니다.
            </motion.h2>
          </div>

          {/* Right: Numbered rows */}
          <div>
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-8 md:py-10 border-t border-white/10 first:border-t-0 first:pt-0"
              >
                <span className="font-outfit font-black text-primary-orange text-xl md:text-2xl tabular-nums leading-none pt-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-white text-lg md:text-xl font-bold mb-3 break-keep group-hover:text-primary-orange transition-colors">
                    {item.title}
                  </h3>
                  <p
                    className="text-gray-400 text-[15px] leading-relaxed break-keep"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
