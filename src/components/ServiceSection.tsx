"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const services = [
  {
    title: "반도체 및 디스플레이",
    shortTitle: "Semiconductor",
    description: "초정밀 노광, 세정 장비 등 미세 진동에 민감한 핵심 설비 전문 운송",
    longDesc: "반도체 8대 공정 핵심 장비부터 대형 디스플레이 패널까지, 수백억 원대 초정밀 장비를 위해 자사만의 특수 에어서스펜션 차량과 숙련된 전담 엔지니어가 투입됩니다.",
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
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-white overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gray-400 font-bold text-sm tracking-[0.2em] uppercase">
              Major Fields
            </span>
            <span className="h-px w-12 bg-gray-400" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[26px] md:text-[44px] font-outfit font-black text-primary-navy tracking-tight break-keep"
          >
            주요 <span className="text-primary-orange">운송 분야</span>
          </motion.h2>
        </div>

        {/* Desktop: expanding accordion row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:flex gap-3 h-[520px]"
          onMouseLeave={() => setActiveIdx(null)}
        >
          {services.map((service, idx) => {
            const active = activeIdx === idx;
            return (
              <article
                key={service.title}
                onMouseEnter={() => setActiveIdx(idx)}
                style={{
                  flexGrow: active ? 3 : 1,
                  flexBasis: 0,
                  willChange: "flex-grow",
                }}
                className="relative min-w-0 rounded-2xl overflow-hidden bg-primary-navy ring-1 ring-black/5 cursor-pointer transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 40vw, 600px"
                  className={`object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active ? "scale-105 opacity-70" : "scale-100 opacity-90"
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t ${
                    active
                      ? "from-black/95 via-black/60 to-black/25"
                      : "from-black/80 via-black/15 to-transparent"
                  }`}
                />

                {/* Text block — always mounted; only opacity/transform animate (no layout thrash) */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-white pointer-events-none">
                  <div
                    className={`w-[280px] lg:w-[360px] mb-3 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                  >
                    <p className="text-primary-orange text-sm lg:text-base font-bold mb-2 break-keep">
                      {service.description}
                    </p>
                    <p className="text-gray-200 text-[13px] lg:text-sm leading-relaxed break-keep">
                      {service.longDesc}
                    </p>
                  </div>

                  <h3 className="font-black tracking-tight break-keep text-xl lg:text-2xl">
                    {service.title}
                  </h3>
                </div>
              </article>
            );
          })}
        </motion.div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden flex flex-col gap-5">
          {services.map((service, idx) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="relative rounded-2xl overflow-hidden bg-primary-navy ring-1 ring-black/5"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 text-white text-xl font-black tracking-tight break-keep">
                  {service.title}
                </h3>
              </div>
              <div className="p-5 text-white/90">
                <p className="text-primary-orange text-[14px] font-bold mb-2 break-keep">
                  {service.description}
                </p>
                <p className="text-gray-400 text-[13px] leading-relaxed break-keep">
                  {service.longDesc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
