"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "누적 운송 거리", value: "1,200,000km+", icon: TrendingUp },
  { label: "함께하는 차주 네트워크", value: "2,500+", icon: Users },
  { label: "사고 무결점 지수", value: "99.9%", icon: ShieldCheck },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Detailed Content */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <span className="text-primary-orange font-bold text-sm tracking-widest uppercase mb-4 block">
                COMPANY OVERVIEW
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-outfit font-black text-primary-navy leading-tight tracking-tight"
              >
                고정밀 장비 운송의 <br />
                <span className="text-primary-orange">최전선</span>에 있습니다.
              </motion.h2>
            </div>
            
            <p className="text-gray-500 mb-10 leading-relaxed text-lg font-light">
              프로펙스 특수운송은 외부 충격과 미세한 온습도 변화에도 민감한 <strong>반도체 설비, 의료 장비, 기술 자산</strong>을 가장 안전하고 전문적으로 운반하기 위해 탄생했습니다. 
              우리는 단순한 운송을 넘어, 고객사의 비즈니스 연속성을 보장하는 핵심 물류 파트너입니다.
            </p>

            <ul className="space-y-6 mb-12">
              {[
                "적재물 파손보상 보험 10억 의무가입 (전차량)",
                "에어서스펜션 및 항온항습 무진동 특수 사양 차량 보유",
                "삼성전자, SK하이닉스 등 국가핵심시설 보안 교육 이수",
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
                   <span className="text-primary-navy font-bold text-base">{text}</span>
                </motion.li>
              ))}
            </ul>

             <div className="flex flex-wrap gap-8 items-center border-t border-gray-100 pt-10">
                {stats.map((stat, idx) => (
                   <div key={idx} className="flex flex-col items-center">
                      <div className="text-primary-orange mb-2">
                         <stat.icon size={20} />
                      </div>
                      <div className="text-3xl font-black text-primary-navy mb-2">{stat.value}</div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.label}</div>
                   </div>
                ))}
             </div>
          </div>

          {/* Visual Element (Professional Shield Image) */}
          <div className="lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-primary-navy/5 rounded-[60px] translate-x-10 translate-y-10 group-hover:translate-x-12 group-hover:translate-y-12 transition-transform duration-700"></div>
            <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
               <Image
                  src="/images/case-1.png"
                  alt="Precision Transport Quality"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
               />
               {/* Floating Overlay Badge */}
               <div className="absolute top-10 right-10 p-6 glass rounded-3xl max-w-[200px]">
                  <div className="text-primary-orange text-xs font-bold mb-2">PARTNERSHIP</div>
                  <div className="text-white text-base font-bold leading-snug">국내 대기업 및 국가연구 시설 전담 운송사</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
