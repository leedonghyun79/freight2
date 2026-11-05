"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { trackConversion } from "@/lib/track";

const { hero, contact } = siteConfig;
const images = hero.images;

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.12]);
  // Parallax curtain: content drifts up slower than scroll and dims as the next section rises over it
  const contentY = useTransform(scrollY, [0, 700], [0, -140]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const dimOpacity = useTransform(scrollY, [0, 600], [0, 0.55]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="sticky top-0 min-h-[100svh] flex flex-col justify-center bg-primary-navy overflow-hidden z-0">
      {/* Full-bleed background image carousel */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 bg-primary-navy">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex]}
              alt={`${siteConfig.brand.nameEn} special cargo transport`}
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Legibility scrims — weighted to the left where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-primary-navy/85" />
      </motion.div>

      {/* Ambient accent glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-orange/15 blur-[150px] pointer-events-none z-[1]" />

      {/* Scroll-driven dim: intensifies as the next section curtains up */}
      <motion.div
        style={{ opacity: dimOpacity }}
        className="absolute inset-0 bg-primary-navy z-30 pointer-events-none"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 w-full pt-28 pb-[280px] md:pt-24 md:pb-0"
      >
        {/* Type block */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <h1 className="font-outfit font-black text-white tracking-tight break-keep drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
            {hero.titleLines.map((line, i) => (
              <span
                key={i}
                className="block text-[clamp(1.5rem,6vw,3.625rem)] leading-[1.18]"
              >
                {line}
              </span>
            ))}
            <span className="block text-primary-orange text-[clamp(1.5rem,6vw,3.625rem)] leading-[1.18]">
              {hero.highlight}
            </span>
          </h1>

          <div className="mt-6 md:mt-9 max-w-2xl space-y-1.5">
            {hero.description.map((line, i) => (
              <p
                key={i}
                className="text-[15px] md:text-[18px] text-gray-200 font-medium leading-relaxed break-keep drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-8 md:mt-11 flex flex-row items-center gap-3 md:gap-4">
            <a
              href="#contact"
              onClick={() => trackConversion()}
              className="flex-1 md:flex-none h-12 md:h-[54px]px-4 md:px-10 bg-primary-orange text-white font-bold rounded-lg hover:bg-accent-orange transition-all duration-300 shadow-2xl shadow-primary-orange/30 uppercase tracking-widest text-[13px] md:text-[15px] flex items-center justify-center cursor-pointer whitespace-nowrap box-border"
            >
              빠른 견적 문의
            </a>
            <a
              href={`tel:${contact.phoneTel}`}
              onClick={() => trackConversion()}
              className="flex-1 md:flex-none h-12 md:h-[54px]px-3 md:px-10 border border-white/40 bg-white/5 backdrop-blur-sm text-white rounded-lg hover:bg-white/15 transition-all duration-300 uppercase tracking-widest whitespace-nowrap cursor-pointer flex items-center justify-center box-border"
            >
              <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 leading-none">
                <span className="text-[13px] md:text-[15px] text-white/80 md:text-white font-medium">전화상담</span>
                <span className="text-[14px] md:text-[15px] font-bold">{contact.phoneDisplay}</span>
              </div>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Desktop Right-side Scroll Indicator — orange pulse running down a hairline rail */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute right-8 bottom-28 lg:bottom-32 hidden lg:flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-white/45 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="relative w-[4px] h-16 rounded-full bg-white/15 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn" }}
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-primary-orange to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
