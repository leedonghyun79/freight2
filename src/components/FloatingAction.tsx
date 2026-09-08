"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingAction() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 right-[20px] z-[100] flex flex-col items-end space-y-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col items-end space-y-4"
          >
            <motion.a
              href="https://pf.kakao.com/_qMeuX/chat"
              target="_blank"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18131349273/cQG8COijsMIcEJne2cVD', 'value': 1.0, 'currency': 'KRW' });
                  if (typeof window !== 'undefined' && (window as any).wcs) {
                    if (!(window as any)._nasa) (window as any)._nasa = {};
                    (window as any)._nasa["cnv"] = (window as any).wcs.cnv("4", "1");
                    (window as any).wcs_do((window as any)._nasa);
                  }
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-[#FEE500] rounded-full shadow-2xl flex items-center justify-center text-[#3c1e1e] group relative"
            >
              <MessageCircle size={24} fill="currentColor" />
              <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-primary-navy">
                카카오톡 1:1 상담
              </span>
            </motion.a>

            {/* Direct Call Button (Mobile Only) */}
            <motion.a
              href="tel:1833-6362"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18131349273/cQG8COijsMIcEJne2cVD', 'value': 1.0, 'currency': 'KRW' });
                  if (typeof window !== 'undefined' && (window as any).wcs) {
                    if (!(window as any)._nasa) (window as any)._nasa = {};
                    (window as any)._nasa["cnv"] = (window as any).wcs.cnv("4", "1");
                    (window as any).wcs_do((window as any)._nasa);
                  }
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-primary-navy rounded-full shadow-2xl flex items-center justify-center text-white group relative border border-white/10 md:hidden"
            >
              <Phone size={24} />
              <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-primary-navy">
                전화 즉시 연결
              </span>
            </motion.a>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-400 border border-gray-100"
            >
              <ArrowUp size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
