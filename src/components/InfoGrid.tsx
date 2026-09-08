"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  FileCheck, 
  History, 
  Megaphone, 
  Building2 
} from "lucide-react";

const infoItems = [
  {
    icon: FileCheck,
    title: "인증내역",
    description: "국제 표준 규격 준수 및 주요 기관 인증 현황입니다.",
    image: "/images/info-1.png",
  },
  {
    icon: History,
    title: "작업이력",
    description: "탑로지스가 걸어온 수많은 성공적인 프로젝트 기록입니다.",
    image: "/images/info-2.png",
  },
  {
    icon: Megaphone,
    title: "공지사항",
    description: "탑로지스의 새로운 소식과 물류 관련 정보를 전합니다.",
    image: "/images/info-3.png",
  },
  {
    icon: Building2,
    title: "회사소개",
    description: "탑로지스의 기업 이념과 핵심 가치를 소개합니다.",
    image: "/images/info-4.png",
  },
];

export default function InfoGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[400px]">
      {infoItems.map((item, idx) => (
        <motion.div
           key={item.title}
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: idx * 0.1 }}
           className="relative group h-[400px] cursor-pointer overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 scale-110 group-hover:scale-100 transition-transform duration-1000">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-primary-navy/70 group-hover:bg-primary-navy/40 transition-colors"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-10 border-r border-white/10 last:border-0 md:border-b last:md:border-b-0 lg:border-b-0">
             <div className="mb-6 text-white group-hover:scale-110 transition-transform">
                <item.icon size={48} strokeWidth={1} />
             </div>
             <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
             <p className="text-white/60 text-sm max-w-[200px] leading-relaxed group-hover:text-white transition-colors">
               {item.description}
             </p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
