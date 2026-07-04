import { PointLogo } from "@/components/PointLogo";
import { siteConfig } from "@/data/siteConfig";

interface BrandMarkProps {
  logoSize?: number;
  className?: string;
  variant?: "dark" | "light";
  showTagline?: boolean;
  stacked?: boolean;
}

export function BrandMark({
  logoSize = 52,
  className = "",
  variant = "dark",
  showTagline = true,
  stacked = false,
}: BrandMarkProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`flex items-center gap-3 shrink-0 ${stacked ? "flex-col text-center" : ""} ${className}`}
    >
      <PointLogo size={logoSize} />
      <div className={`flex flex-col leading-tight ${stacked ? "items-center" : "min-w-0"}`}>
        <span
          className={`font-heading text-lg sm:text-xl uppercase tracking-wide whitespace-nowrap ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Suplementos{" "}
          <span
            className={`font-black tracking-wider ${
              isDark ? "text-primary" : "text-black"
            }`}
          >
            POINT
          </span>
        </span>
        {showTagline && (
          <span
            className={`text-[9px] sm:text-[10px] uppercase tracking-[0.18em] mt-0.5 ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            {siteConfig.fullName}
          </span>
        )}
      </div>
    </div>
  );
}
