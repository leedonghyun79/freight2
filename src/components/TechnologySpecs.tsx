"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Truck, Thermometer, Box, ShieldCheck } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    <section id="technology" className="py-24 bg-[#f8f9fa] overflow-hidden relative scroll-mt-24">
      {/* Background Watermark Icon */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 opacity-[0.03] select-none pointer-events-none z-0">
        <Truck size={800} strokeWidth={1} className="text-primary-navy" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-10 md:mb-16 lg:mb-24">
          <span className="text-gray-400 font-bold text-sm tracking-widest uppercase mb-[5px] md:mb-4 block">
            TECHNOLOGY & SPEC
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-[36px] font-outfit font-black text-primary-navy tracking-tight"
          >
            보유차량 <span className="text-primary-orange">제원 및 핵심기술</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-6 items-stretch"
        >
          {/* Left: Featured Image Card (Integrated Text) */}
          <div className="lg:w-[500px] flex-shrink-0 relative rounded-[40px] overflow-hidden shadow-2xl group bg-primary-navy">
            <Image
              src="/images/20260127_074853.jpg"
              alt="PROTEX Professional Fleet"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="space-y-6">
                <div className="bg-primary-orange text-white px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-widest uppercase inline-block font-inter">
                  주력 차량
                </div>
                <div>
                  <h3 className="text-2xl lg:text-[28px] font-black text-white leading-[1.3] tracking-tighter mb-4">
                    최신 독일제 MAN트럭 & <br />
                    1톤무진동 부터 25톤무진동 화물차
                  </h3>
                  <p className="text-gray-300 text-sm lg:text-[15px] font-medium leading-relaxed font-inter opacity-90">
                    4.2톤 대형 파워 리프트 장착 <br />
                    <span className="text-[14px] font-normal">(폭 2,400 / 길이 6,200 / 높이 2,500 이상)</span>
                  </p>
                </div>
              </div>
              
              {/* Bottom Status Info */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Standard Spec</div>
                    <div className="text-white text-xs font-bold font-inter">MAN TGX Vibration Free</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
                    <Truck size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 2-Column Grid of Features (Maintained as cards) */}
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-6">
            {techFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "bg-white rounded-[40px] p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group/card flex flex-col justify-between"
                )}
              >
                <div>
                  <div className="w-16 h-16 mb-8 flex items-center justify-center transition-all duration-500 relative group/icon">
                    <div className="absolute inset-0 bg-primary-orange/5 rounded-3xl blur-xl group-hover/card:bg-primary-orange/10 transition-all"></div>
                    <div className="relative z-10 w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-orange group-hover/card:bg-primary-orange group-hover/card:text-white transition-all">
                      <feature.icon size={24} strokeWidth={2} />
                    </div>
                  </div>
                  <h4 className="text-lg lg:text-xl font-black text-primary-navy mb-4 group-hover/card:text-primary-orange transition-colors tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm lg:text-[15px] leading-relaxed font-inter opacity-80 group-hover/card:opacity-100 transition-opacity">
                    {feature.description}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center text-[10px] font-bold text-gray-300 tracking-widest uppercase group-hover/card:text-primary-orange transition-colors">
                  Technical Feature <div className="ml-2 h-px flex-grow bg-gray-100 group-hover/card:bg-primary-orange/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
