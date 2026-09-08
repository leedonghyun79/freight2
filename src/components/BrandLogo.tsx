import Image from "next/image";
import { siteConfig } from "@/config/site.config";

interface BrandLogoProps {
  /** dark = 어두운 배경 위(밝은 로고), light = 밝은 배경 위(어두운 로고) */
  variant: "dark" | "light";
  className?: string;
}

export default function BrandLogo({ variant, className = "" }: BrandLogoProps) {
  const { logoDark, logoLight, nameKo, nameEn } = siteConfig.brand;
  const src = variant === "dark" ? logoLight : logoDark;

  if (src) {
    return (
      <span className={`relative inline-block w-[160px] h-[50px] ${className}`}>
        <Image src={src} alt={`${nameKo} 로고`} fill className="object-contain" />
      </span>
    );
  }

  // 텍스트 로고 fallback
  const color = variant === "dark" ? "text-white" : "text-primary-navy";
  return (
    <span className={`inline-flex flex-col leading-none ${color} ${className}`}>
      <span className="font-outfit font-black text-lg tracking-tight">{nameKo}</span>
      <span className="text-[10px] font-bold tracking-[0.25em] text-primary-orange">
        {nameEn}
      </span>
    </span>
  );
}
