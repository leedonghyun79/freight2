"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const services = [
  {
    title: "반도체 및 디스플레이",
    shortTitle: "Semiconductor",
    description: "초정밀 노광, 세정 장비 등 미세 진동에 민감한 핵심 설비 전문 운송",
    longDesc: "반도체 8대 공정 핵심 장비부터 대형 디스플레이 패널까지, 수백억 원대 초정밀 장비를 위해 프로텍스만의 특수 에어서스펜션 차량과 숙련된 전담 엔지니어가 투입됩니다.",
    image: "/images/특수화물사진/정밀장비1.jpg",
  },
  {
    title: "데이터센터 서버",
    shortTitle: "Data Center",
    description: "대규모 서버 및 네트워크 장비의 체계적인 해체, 이전, 재설치 서비스",
    longDesc: "클라우드 및 AI 데이터센터의 무중단 이전을 위해 기술 인력이 장비의 무선 정전기 방지 포장부터 서버랙 단위의 충격 방지 이동까지 전 과정을 밀착 관리합니다.",
    image: "/images/특수화물사진/데이터센터 서버이전.jpg",
  },
  {
    title: "의료 및 바이오 기기",
    shortTitle: "Medical & Bio",
    description: "MRI, CT 등 고가 병원 장비를 안전하게 목적지까지 안착시키는 정밀 물류",
    longDesc: "MRI, CT, 수술용 로봇 등 초정밀 의료 기기를 안전하게 배송합니다. 외부 환경 변화에 민감한 바이오 냉동고 등을 위한 완벽한 온습도 조절 시스템을 제공합니다.",
    image: "/images/특수화물사진/정밀장비2.jpg",
  },
  {
    title: "항공우주 및 방위산업",
    shortTitle: "Aero & Defense",
    description: "항공기 부품, 정밀 레이더 등 국가 전략 물자에 특화된 보안 운송",
    longDesc: "복잡한 형상의 항공기 엔진부품부터 거대 지상 레이더까지, 국가 자산의 안전한 이동을 위해 특화된 결박 시스템과 24시간 실시간 위치 관제 서비스를 지원합니다.",
    image: "/images/특수화물사진/레이더장비항온항습운송.jpg",
  },
  {
    title: "문화예술품 및 전시",
    shortTitle: "Art & Exhibit",
    description: "박물관 유물, 미술관 회화 등 온습도 관리가 필수적인 자산 전문 이동",
    longDesc: "국가의 보물과 세계적인 미술품을 위해 박물관급 항온항습 무진동 차량을 투입합니다. 전문 아트 핸들러가 포장부터 전시 배치까지 전 과정을 책임집니다.",
    image: "/images/특수화물사진/스펀지안전포장및결박.jpg",
  },
  {
    title: "연구소 및 실험 장비",
    shortTitle: "Lab & Science",
    description: "대학 및 기업 연구소의 정밀 분석 장비 패키징 및 셋업 지원 운송",
    longDesc: "전자현미경, 정밀 계측기 등 섬세한 실험실 장비를 연구 환경 손상 없이 신속하게 이동합니다. 해체부터 도착지 셋업 보조까지 통합 서비스를 제공합니다.",
    image: "/images/특수화물사진/국가시설 설비이동.jpg",
  },
];

export default function ServiceSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="services" className="py-16 md:py-24 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 px-6">
          <span className="text-gray-400 font-bold text-sm tracking-widest uppercase mb-[5px] md:mb-4 block">
            MAJOR FIELDS
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[24px] md:text-[36px] font-outfit font-black text-primary-navy tracking-tight"
          >
            주요 <span className="text-primary-orange">운송 분야</span>
          </motion.h2>
        </div>

        {/* Desktop Tabs (Navigation) */}
        <div className="hidden md:flex flex-wrap justify-center gap-x-[65px] gap-y-3 mb-10">
          {services.map((service, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={service.title}
                onClick={() => setActiveIdx(idx)}
                className="group relative flex flex-col items-center pb-2 transition-all"
              >
                <span className={`text-sm lg:text-base font-bold transition-all duration-300 ${isActive ? "text-primary-navy scale-110" : "text-gray-400 hover:text-primary-navy"
                  }`}>
                  {service.title}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-line"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary-orange rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop Main Content Card (Slide) */}
        <div className="hidden md:block relative h-[600px] w-full bg-primary-navy rounded-[40px] overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={services[activeIdx].image}
                alt={services[activeIdx].title}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-center text-center px-20 text-white">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-5xl font-black mb-6 leading-tight">
                    {services[activeIdx].title}
                  </h3>
                  <p className="max-w-3xl mx-auto text-primary-orange text-2xl mb-6 font-bold leading-relaxed break-keep">
                    {services[activeIdx].description}
                  </p>
                  <p className="max-w-3xl mx-auto text-gray-300 text-lg mb-0 leading-relaxed font-light opacity-90 break-keep">
                    {services[activeIdx].longDesc}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile View: All Items as Cards */}
        <div className="md:hidden flex flex-col gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative min-h-[300px] h-auto w-full bg-primary-navy rounded-[30px] overflow-hidden shadow-xl"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 flex flex-col justify-end p-8 py-10 text-white">
                <h3 className="text-[22px] font-black mb-2.5 text-primary-orange tracking-tight">
                  {service.title}
                </h3>
                <p className="text-[15px] font-bold mb-4 leading-snug break-keep text-white/95">
                  {service.description}
                </p>
                <div className="w-12 h-[1px] bg-white/20 mb-4" />
                <p className="text-[13px] text-gray-400 font-medium leading-relaxed break-keep">
                  {service.longDesc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
