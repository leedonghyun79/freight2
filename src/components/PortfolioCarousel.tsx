"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Controller } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const cases = [
  {
    id: 1,
    title: "국가연구소 정밀 설비 이전",
    description: "국가 연구소 내 초정밀 실험 장비의 안전한 이전. 무진동 차량과 전문 인력을 통한 완벽한 운송 솔루션 제공.",
    category: "Precision Equipment",
    image: "/images/국가연구소.jpg",
    specs: ["Air Suspension", "Power Lift", "Clean Room"],
  },
  {
    id: 2,
    title: "대기업 반도체 라인 증설 운송",
    description: "S사 평택 캠퍼스 신규 라인 도입을 위한 진동 흡수 시스템 가동. 수백억 원대 초정밀 장비를 완벽하게 안착.",
    category: "Semiconductor",
    image: "/images/20260311_102924.jpg",
    specs: ["Constant Temp", "Vibration Free", "Security"],
  },
  {
    id: 4,
    title: "현대로템 정밀장비 운송",
    description: "전국 주요 공공기관의 노후 서버 및 신규 서버센터 통합 이전 프로젝트. 보안 1등급 기술 인력 및 특수 에어 서스펜션 차량 대거 투입.",
    category: "Data Center",
    image: "/images/20260316_095955.jpg",
    specs: ["Multiple Trucks", "Safety Check"],
  },
  {
    id: 5,
    title: "한화우주센터 레이더 운송",
    description: "항공우주 정밀 레이더 장비의 국가 전략 물자 특수 운송. 거대 중량물의 흔들림 없는 완벽 결박 및 실시간 보안 관제 시스템 가동.",
    category: "Aero & Defense",
    image: "/images/한화우주센터.jpg",
    specs: ["Strategic Cargo", "Security Control"],
  },
  {
    id: 6,
    title: "코엑스 기업전시물품 운송 및 철수",
    description: "연구 시설 내 다수의 분석 장비를 한 번에 안전하게 이동. 이중 밴드 결박 시스템과 전용 스펀지 완충제로 미세 흠집까지 방지.",
    category: "Bulk Transport",
    image: "/images/KakaoTalk_20241118_172833856_07.jpg",
    specs: ["Double Strapping", "Shock Absorption"],
  },
  {
    id: 7,
    title: "대형 기기 전면 완충 포장",
    description: "반도체 클린룸 내부 정밀 장비의 외부 반출 전 특수 포장. 정전기 방지 비닐과 전면 우레탄 완충제를 이용한 완벽한 외부 충격 차단.",
    category: "Safety Packing",
    image: "/images/KakaoTalk_20240925_171228899_09.jpg",
    specs: ["Anti-Static", "Padding"],
  },
  {
    id: 8,
    title: "원자력발전소내 실험장비 이전",
    description: "운송 중 적재함 내부의 실시간 상태 확인. 항온항습 모니터링 및 CCTV를 통해 도착지까지 화물의 안전 상태를 실시간으로 모니터링.",
    category: "Monitoring",
    image: "/images/원자력발전소내실험장비.jpg",
    specs: ["Real-time CCTV", "Climate Log"],
  },
  {
    id: 9,
    title: "1톤무진동 그림/미술품/문화재 포장 및 운송",
    description: "1톤 무진동차량 갤러리 그림을 포장하여 안전운송 및 갤러리 설치작업까지 완료!",
    category: "Art Transport",
    image: "/images/1톤무진동_그림_미술품.png",
    specs: ["Vibration Free", "Art Packing", "Installation"],
  },
];

export default function PortfolioCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Standardized Section Header with Navigation */}
        <div className="flex flex-row justify-between items-end mb-10 md:mb-16">
          <div className="flex-1">
            <span className="text-gray-400 font-bold text-xs md:text-sm tracking-widest uppercase mb-[5px] md:mb-4 block">
              ACTUAL CASES
            </span>
            <h2 className="text-2xl md:text-[36px] font-black text-primary-navy tracking-tight whitespace-nowrap">
              실제 <span className="text-primary-orange">운송 사례</span>
            </h2>
          </div>

          {/* Header Navigation Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              id="work-prev"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary-navy hover:text-white hover:border-primary-navy transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              id="work-next"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary-navy hover:text-white hover:border-primary-navy transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView="auto" // Changed to auto to support fixed width slides
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              prevEl: "#work-prev",
              nextEl: "#work-next",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="w-full pb-10"
          >
            {cases.map((item) => (
              <SwiperSlide key={item.id} className="!w-[320px]">
                <div className="bg-white rounded-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl group/card h-[408px] flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                  </div>
                  {/* Content Area */}
                  <div className="p-5 flex-grow border-t border-gray-50">
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {/* Added description subtly for context */}
                    <p className="mt-3 text-[15px] text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
