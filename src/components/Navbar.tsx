"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "회사 소개", href: "#about" },
  { name: "비즈니스 영역", href: "#services" },
  { name: "핵심 기술", href: "#technology" },
  { name: "운송 사례", href: "#portfolio" },
  { name: "견적 문의", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const isMobile = window.innerWidth < 1024;
    const scrollTarget = (isMobile && href === "#contact") ? "#contact-form" : href;
    const el = document.querySelector(scrollTarget);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white border-gray-100 shadow-sm py-4"
          : "bg-transparent border-white/10 py-6"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center cursor-pointer"
        >
          <div className="relative w-[160px] h-[50px]">
            <Image
              src={isScrolled ? "/images/로고_c.png" : "/images/로고_w.png"}
              alt="PROTEX Logo"
              fill
              className="object-contain transition-all duration-300"
            />
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => {
            const isContact = link.name === "견적 문의";
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "text-[13px] font-bold transition-colors hover:text-primary-orange uppercase tracking-wider cursor-pointer",
                  isContact
                    ? "text-primary-orange"
                    : isScrolled
                    ? "text-primary-navy"
                    : "text-white/90"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-primary-navy" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-primary-navy" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-primary-navy z-50 flex flex-col items-center justify-center space-y-8 lg:hidden transition-transform duration-500",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 p-2 text-white/70 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        {navLinks.map((link) => {
          const isContact = link.name === "견적 문의";
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "text-2xl font-bold transition-colors cursor-pointer",
                isContact
                  ? "text-primary-orange"
                  : "text-white hover:text-primary-orange"
              )}
            >
              {link.name}
            </a>
          );
        })}

        <div className="absolute bottom-10 flex items-center text-white/60 space-x-2">
          <Phone size={18} />
          <span>1833-6362</span>
        </div>
      </div>
    </nav>
  );
}
