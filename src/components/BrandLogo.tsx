import Image from "next/image";
import { siteConfig } from "@/config/site.config";

interface BrandLogoProps {
  /** dark = 어두운 배경 위(밝은 로고), light = 밝은 배경 위(어두운 로고) */
  variant: "dark" | "light";
  className?: string;
}

export default function BrandLogo({ variant, className = "" }: BrandLogoProps) {
  const { logoDark, logoLight, nameKo } = siteConfig.brand;
  const src = variant === "dark" ? logoLight : logoDark;
  const useWhiteVersion = variant === "dark" && logoLight === logoDark;

  if (src) {
    return (
      <span className={`relative inline-block shrink-0 w-[132px] sm:w-[170px] aspect-[3/1] ${className}`}>
        <Image
          src={src}
          alt={`${nameKo} 로고`}
          fill
          sizes="(min-width: 640px) 170px, 132px"
          className={`object-contain ${useWhiteVersion ? "brightness-0 invert" : ""}`}
        />
      </span>
    );
  }

  // 텍스트 로고 fallback
  const color = variant === "dark" ? "text-white" : "text-primary-navy";
  return (
    <span className={`inline-flex flex-col leading-none ${color} ${className}`}>
      <span className="font-outfit font-black text-lg tracking-tight">{nameKo}</span>
    </span>
  );
}
