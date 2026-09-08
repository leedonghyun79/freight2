"use client";

import { motion } from "framer-motion";
import { Shield, Thermometer, Truck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "무진동 에어서스펜션",
    desc: "충격에 민감한 고가 장비를 위한 최첨단 에어서스펜션 시스템 완비",
  },
  {
    icon: Thermometer,
    title: "항온·항습 시스템",
    desc: "온도와 습도 조절이 필수적인 장비의 가치를 유지하며 안전하게 운송",
  },
  {
    icon: Shield,
    title: "대형 파워리프트",
    desc: "중량물 상하차 시 발생하는 충격을 최소화하는 정밀 기술 확보",
  },
];

export default function FeatureStrip() {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center space-x-6 p-6 rounded-2xl hover:bg-gray-50 transition-all group"
            >
              <div className="w-16 h-16 bg-primary-navy/5 rounded-2xl flex items-center justify-center text-primary-navy group-hover:bg-primary-orange group-hover:text-white transition-all">
                <feature.icon size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary-navy group-hover:text-primary-orange transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-snug">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
