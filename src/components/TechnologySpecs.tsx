"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Truck, Thermometer, Box, ShieldCheck } from "lucide-react";

const techFeatures = [
  {
    icon: Truck,
    title: "무진동 에어서스펜션",
    description: "도로의 충격을 공기압으로 흡수하여 적재물에 가해지는 충격을 제로에 가깝게 최소화합니다.",
  },
  {
    icon: Thermometer,
    title: "항온·항습 시스템",
    description: "365일 실시간 온도 및 습도 모니터링 시스템을 가동하여 외부 날씨와 상관없이 적재함 내부 환경을 일정하게 유지합니다.",
  },
  {
    icon: Box,
    title: "대형 파워리프트",
    description: "고중량 장비도 지게차 없이 안전하고 신속하게 상하차 작업이 가능합니다.",
  },
  {
    icon: ShieldCheck,
    title: "제품안전포장 및 완충시스템",
    description: "정전기 방지 포장 및 진동방지 전면 완충재(스펀지) 포장으로 안전성을 극대화하며, 적재함 내부 CCTV로 실시간 모니터링을 진행합니다.",
  },
];

export default function TechnologySpecs() {
  return (
    <section
      id="technology"
      className="py-20 md:py-28 bg-[#f5f5f4] overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gray-400 font-bold text-sm tracking-[0.2em] uppercase">
              Technology &amp; Spec
            </span>
            <span className="h-px w-12 bg-gray-400" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[26px] md:text-[44px] font-outfit font-black text-primary-navy tracking-tight break-keep"
          >
            보유차량 <span className="text-primary-orange">제원 및 핵심기술</span>
          </motion.h2>
        </div>

        {/* Wide image band + frosted-glass spec block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[clamp(320px,52vh,560px)] rounded-2xl overflow-hidden ring-1 ring-black/5"
        >
          <Image
            src="/images/20260127_074853.jpg"
            alt="정밀 운송 전용 차량"
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover object-[18%_28%]"
          />

          <div className="absolute inset-x-4 bottom-4 md:inset-auto md:left-8 md:bottom-8 md:max-w-md">
            <div className="bg-white/10 backdrop-blur-xl ring-1 ring-white/15 rounded-xl p-6 md:p-8 text-white shadow-2xl shadow-black/30">
              <span className="inline-block bg-primary-orange text-white px-3 py-1 rounded-md text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
                주력 차량
              </span>
              <h3 className="text-lg lg:text-xl font-black leading-snug tracking-tight mb-3 break-keep">
                최신 독일제 MAN트럭 &amp; 1톤무진동 부터 25톤무진동 화물차
              </h3>
              <p className="text-white/70 text-[13px] lg:text-sm leading-relaxed mb-5">
                4.2톤 대형 파워 리프트 장착
                <br />
                <span className="text-white/55">(폭 2,400 / 길이 6,200 / 높이 2,500 이상)</span>
              </p>
              <div className="pt-4 border-t border-white/15">
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45 mb-1">
                  Standard Spec
                </div>
                <div className="font-bold text-sm">MAN TGX Vibration Free</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature strip */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {techFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group py-6 lg:py-2 lg:px-8 border-t sm:border-t-0 border-black/10 lg:border-t-0 lg:border-l lg:first:border-l-0 lg:first:pl-0"
            >
              <feature.icon
                size={22}
                strokeWidth={2}
                className="text-primary-orange mb-4"
              />
              <h4 className="text-base lg:text-lg font-black text-primary-navy mb-2 tracking-tight group-hover:text-primary-orange transition-colors break-keep">
                {feature.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed break-keep">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
