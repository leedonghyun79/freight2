"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Truck, Thermometer, Box, ShieldCheck } from "lucide-react";

const techFeatures = [
  {
    icon: Truck,
    title: "무진동 에어서스펜션",
    description: "도로의 충격을 공기압으로 흡수해 적재물에 가해지는 충격을 최소화합니다.",
  },
  {
    icon: Thermometer,
    title: "항온·항습 시스템",
    description: "실시간 온·습도 모니터링으로 외부 날씨와 무관하게 내부 환경을 일정하게 유지합니다.",
  },
  {
    icon: Box,
    title: "대형 파워리프트",
    description: "고중량 장비도 지게차 없이 안전하고 신속하게 상하차할 수 있습니다.",
  },
  {
    icon: ShieldCheck,
    title: "안전포장 및 완충시스템",
    description: "정전기 방지·전면 완충 포장과 적재함 CCTV 모니터링으로 안전성을 극대화합니다.",
  },
];

const specChips = [
  { label: "폭", value: "2,400" },
  { label: "길이", value: "6,200" },
  { label: "높이", value: "2,500+" },
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

        {/* Wide image band — gradient overlay keeps the vehicle visible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[clamp(380px,56vh,580px)] rounded-2xl overflow-hidden bg-primary-navy ring-1 ring-black/5"
        >
          <Image
            src="/images/20260127_074853.jpg"
            alt="정밀 운송 전용 차량"
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover object-[60%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent hidden md:block" />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white">
            <span className="inline-block bg-primary-orange text-white px-3 py-1 rounded-md text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
              주력 차량
            </span>
            <h3 className="text-2xl md:text-4xl font-black leading-tight tracking-tight mb-5 break-keep">
              최신 독일제 MAN 트럭
              <br />
              <span className="text-white/80">1톤 ~ 25톤 무진동 화물차</span>
            </h3>

            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="text-white/70 text-[13px] md:text-sm mb-3">
                  4.2톤 대형 파워 리프트 장착 <span className="text-white/45">(mm)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {specChips.map((chip) => (
                    <div
                      key={chip.label}
                      className="flex items-baseline gap-2 rounded-lg bg-white/10 ring-1 ring-white/15 px-3.5 py-2"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/55">
                        {chip.label}
                      </span>
                      <span className="text-base md:text-lg font-black tabular-nums">
                        {chip.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:text-right">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1">
                  Standard Spec
                </div>
                <div className="font-black text-sm md:text-base">MAN TGX Vibration Free</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 p-6 lg:p-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f4] ring-1 ring-black/5">
                  <feature.icon size={22} strokeWidth={1.6} className="text-primary-navy" />
                </div>
                <span className="font-outfit text-4xl lg:text-5xl font-extralight leading-none tabular-nums tracking-tight text-gray-300">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h4 className="text-lg font-black text-primary-navy mb-2 tracking-tight break-keep">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed break-keep">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
