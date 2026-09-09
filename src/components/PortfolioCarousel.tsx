"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    title: "반도체 생산라인 증설 운송",
    description: "대규모 반도체 캠퍼스 신규 라인 도입을 위한 진동 흡수 시스템 가동. 수백억 원대 초정밀 장비를 완벽하게 안착.",
    category: "Semiconductor",
    image: "/images/20260311_102924.jpg",
    specs: ["Constant Temp", "Vibration Free", "Security"],
  },
  {
    id: 4,
    title: "철도차량 정밀장비 운송",
    description: "전국 주요 공공기관의 노후 서버 및 신규 서버센터 통합 이전 프로젝트. 보안 1등급 기술 인력 및 특수 에어 서스펜션 차량 대거 투입.",
    category: "Data Center",
    image: "/images/20260316_095955.jpg",
    specs: ["Multiple Trucks", "Safety Check"],
  },
  {
    id: 5,
    title: "항공우주 레이더 장비 운송",
    description: "항공우주 정밀 레이더 장비의 국가 전략 물자 특수 운송. 거대 중량물의 흔들림 없는 완벽 결박 및 실시간 보안 관제 시스템 가동.",
    category: "Aero & Defense",
    image: "/images/한화우주센터.jpg",
    specs: ["Strategic Cargo", "Security Control"],
  },
  {
    id: 6,
    title: "전시회 기업 전시물품 운송 및 철수",
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
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white overflow-x-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-row justify-between items-end mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-gray-400 font-bold text-sm tracking-[0.2em] uppercase">
                Actual Cases
              </span>
              <span className="h-px w-12 bg-gray-400" />
            </div>
            <h2 className="text-[26px] md:text-[44px] font-outfit font-black text-primary-navy tracking-tight break-keep">
              실제 <span className="text-primary-orange">운송 사례</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="work-prev"
              aria-label="이전 사례"
              className="w-11 h-11 flex items-center justify-center text-primary-navy hover:text-primary-orange transition-colors cursor-pointer"
            >
              <ArrowLeft size={22} />
            </button>
            <button
              id="work-next"
              aria-label="다음 사례"
              className="w-11 h-11 flex items-center justify-center text-primary-navy hover:text-primary-orange transition-colors cursor-pointer"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed rail */}
      <div className="pl-6 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          navigation={{ prevEl: "#work-prev", nextEl: "#work-next" }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="w-full pb-6"
        >
          {cases.map((item) => (
            <SwiperSlide key={item.id} className="!w-[300px] md:!w-[420px]">
              <article className="group relative bg-transparent">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/60 mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-black tracking-tight break-keep">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-[14px] text-gray-500 leading-relaxed break-keep line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
