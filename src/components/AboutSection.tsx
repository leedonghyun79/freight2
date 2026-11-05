"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

const stats = [
  { label: "누적 운송 거리", value: "1,200,000km+", icon: TrendingUp },
  { label: "함께하는 차주 네트워크", value: "2,500+", icon: Users },
  { label: "사고 무결점 지수", value: "99.9%", icon: ShieldCheck },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Detailed Content */}
          <div className="w-full lg:w-1/2 min-w-0">
            <div className="mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[24px] md:text-5xl font-outfit font-black text-primary-navy leading-[1.3] tracking-tight break-keep"
              >
                고정밀 장비 운송의 <br />
                <span className="text-primary-orange">최전선</span>에 있습니다.
              </motion.h2>
            </div>
            
            <p className="text-gray-500 mb-10 leading-relaxed text-[15px] md:text-[18px] font-light break-keep">
              {siteConfig.brand.nameKo}은 외부 충격과 미세한 온습도 변화에도 민감한 <strong>반도체 설비, 의료 장비, 기술 자산</strong>을 가장 안전하고 전문적으로 운반하기 위해 탄생했습니다.
              우리는 단순한 운송을 넘어, 고객사의 비즈니스 연속성을 보장하는 핵심 물류 파트너입니다.
            </p>

            <ul className="space-y-6 mb-12">
              {[
                "적재물 파손보상 보험 10억 의무가입 (전차량)",
                "에어서스펜션 및 항온항습 무진동 특수 사양 차량 보유",
                "국가핵심시설 출입 보안 교육 이수 전담팀 운영",
                "박물관 유물 및 미술품 전용 프리미엄 포장팀 운영"
              ].map((text, idx) => (
                <motion.li 
                   key={idx}
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.3 + idx * 0.1 }}
                   className="flex items-start space-x-3 group"
                >
                   <div className="w-6 h-6 rounded-full bg-primary-orange/20 flex items-center justify-center text-primary-orange group-hover:bg-primary-orange group-hover:text-white transition-colors mt-0.5">
                      <CheckCircle2 size={14} />
                   </div>
                   <span className="text-primary-navy font-bold text-[14px] md:text-base break-keep">{text}</span>
                </motion.li>
              ))}
            </ul>

             <div className="grid grid-cols-3 gap-4 md:flex md:flex-wrap md:gap-8 items-start border-t border-gray-100 pt-10">
                {stats.map((stat, idx) => (
                   <div key={idx} className="flex min-w-0 flex-col items-center text-center">
                      <div className="text-primary-orange mb-2">
                         <stat.icon size={20} />
                      </div>
                      <div className="text-xl md:text-3xl font-black text-primary-navy mb-2 tabular-nums whitespace-nowrap">{stat.value}</div>
                      <div className="text-[11px] md:text-xs text-gray-400 font-bold uppercase tracking-wider md:tracking-widest break-keep">{stat.label}</div>
                   </div>
                ))}
             </div>
          </div>

          {/* Visual Element (Professional Shield Image) */}
          <div className="w-full lg:w-1/2 relative group min-w-0">
            {/* 장식 블록: 모바일에선 살짝만 밀어 화면 밖으로 잘리지 않게 */}
            <div className="absolute inset-0 bg-primary-navy/5 rounded-[32px] md:rounded-[60px] translate-x-3 translate-y-3 md:translate-x-10 md:translate-y-10 group-hover:translate-x-4 group-hover:translate-y-4 md:group-hover:translate-x-12 md:group-hover:translate-y-12 transition-transform duration-700"></div>
            <div className="relative aspect-[4/5] rounded-[32px] md:rounded-[60px] overflow-hidden shadow-xl border-4 md:border-8 border-white">
               <Image
                  src="/images/case-1.png"
                  alt="Precision Transport Quality"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
               />
               {/* Floating Overlay Badge */}
               <div className="absolute top-5 left-5 right-5 md:top-10 md:left-auto md:right-10 p-4 md:p-6 glass rounded-2xl md:rounded-3xl md:max-w-[200px]">
                  <div className="text-primary-orange text-xs font-bold mb-2">PARTNERSHIP</div>
                  <div className="text-white text-base font-bold leading-snug">정밀장비·연구시설 전담 운송</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
