"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
  }
];

export default function MiddleSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden scroll-mt-24">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 z-0 scale-110">
        <Image
          src="/images/메인대표사진1.jpg"
          alt="Company Scale Representation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-navy/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-10 md:mb-16 max-w-4xl mx-auto">
          <span className="text-gray-300 font-bold text-sm tracking-widest uppercase mb-[5px] md:mb-4 block">
            WHY PROTEX
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-[36px] font-outfit font-black text-white mb-8 tracking-tight"
          >
            <span>고가의 장비,<br />그 가치를 그대로 전합니다.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-[15px]">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="border-l border-white/20 pl-8 h-full py-5 md:py-0">
                <h3 className="text-[18px] font-bold text-white mb-2 group-hover:text-primary-orange transition-colors flex items-start break-keep">
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
    </section>
  );
}
