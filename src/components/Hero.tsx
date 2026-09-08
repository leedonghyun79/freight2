"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Shield, Truck, Thermometer, FileText } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { trackConversion } from "@/lib/track";

const { hero, contact } = siteConfig;
const images = hero.images;
const iconMap = {
  shield: Shield,
  truck: Truck,
  thermometer: Thermometer,
  file: FileText,
} as const;
const stats = hero.stats.map((s) => ({ ...s, icon: iconMap[s.icon] }));

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-primary-navy z-0"
    >
      {/* Background Image Carousel with Dynamic Overlay */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0 bg-primary-navy">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex]}
              alt={`${siteConfig.brand.nameEn} special cargo transport`}
              fill
              priority
              className={`object-cover object-center transition-all duration-700 ${currentImageIndex === 1 ? "md:object-left" : "md:object-right"
                }`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Adjusted Gradients to Reveal the Truck Brand (MAN Logo Area) while protecting text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80 z-10 md:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80 z-10 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-primary-navy/80 z-10"></div>
      </motion.div>

      <motion.div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex justify-center md:justify-end mt-[100px] md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center md:items-start md:text-left max-w-4xl"
        >
          <span className="text-primary-orange text-xs md:text-sm font-black tracking-[0.4em] uppercase mb-4 md:mb-6 block drop-shadow-md">
            {hero.eyebrow}
          </span>

          <h1 className="text-[28px] md:text-[64px] font-outfit font-black text-white leading-[1.2] md:leading-[1.1] mb-6 md:mb-8 tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] break-keep">
            {hero.titleLines.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
            <span className="text-primary-orange text-[32px] md:text-[72px]">{hero.highlight}</span>
          </h1>

          <p className="text-[14px] md:text-[20px] text-gray-100 font-medium mb-10 md:mb-12 max-w-2xl leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] opacity-90 break-keep">
            {hero.description.map((line, i) => (
              <span key={i}>
                {line}
                {i < hero.description.length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="flex flex-row justify-center md:justify-start items-center gap-3 md:gap-4 w-full">
            <a
              href={contact.kakaoUrl}
              target="_blank"
              onClick={() => trackConversion()}
              className="flex-1 md:flex-none px-4 md:px-10 py-3.5 md:py-5 bg-primary-orange text-white font-bold rounded-lg hover:bg-accent-orange transition-all duration-300 shadow-2xl shadow-primary-orange/40 uppercase tracking-widest text-[11px] md:text-[15px] flex items-center justify-center cursor-pointer whitespace-nowrap"
            >
              빠른 견적 문의
            </a>
            <a
              href={`tel:${contact.phoneTel}`}
              onClick={() => trackConversion()}
              className="flex-1 md:flex-none px-2 md:px-10 py-3.5 md:py-5 border border-white/50 bg-transparent text-white rounded-lg hover:bg-white/10 transition-all duration-300 uppercase tracking-widest whitespace-nowrap cursor-pointer flex items-center justify-center"
            >
              <div className="flex flex-row items-center gap-1.5 md:gap-2 leading-none">
                <span className="text-[11px] md:text-[15px] text-white/80 md:text-white font-medium">고객센터</span>
                <span className="text-[13px] md:text-[15px] font-bold">{contact.phoneDisplay}</span>
              </div>
            </a>
          </div>

          {/* Mobile Scroll Indicator (Below Buttons) */}
          <div className="flex flex-col items-center gap-4 mt-12 md:hidden">
            <div className="w-[20px] h-[34px] border-2 border-white/30 rounded-full flex justify-center p-1">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  opacity: [1, 0, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1 h-1 bg-white rounded-full"
              />
            </div>
            <span className="text-[10px] text-white font-bold tracking-[0.3em] uppercase">
              SCROLL DOWN
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop Left-side Vertical Scroll Indicator */}
      <div className="absolute left-8 bottom-10 hidden md:flex flex-col items-center gap-8 z-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-white/50"></div>
          <span className="text-[10px] text-white font-bold tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
            SCROLL DOWN
          </span>
        </div>

        <div className="w-[20px] h-[34px] border-2 border-white/30 rounded-full flex justify-center p-1 group">
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-1 bg-white rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
