interface PointLogoProps {
  size?: number;
  className?: string;
}

export function PointLogo({ size = 48, className = "" }: PointLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Suplementos Point"
    >
      <circle cx="60" cy="60" r="59" fill="#1C1200" />
      <circle cx="60" cy="60" r="55" fill="#F5C518" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#1C1200" strokeWidth="2" />

      {/* Gorilla flexing — stylized silhouette */}
      <g fill="#1C1200">
        {/* Head */}
        <ellipse cx="60" cy="30" rx="11" ry="10" />
        {/* Brow ridge */}
        <path d="M 50,26 C 52,22 56,20 60,20 C 64,20 68,22 70,26 C 68,24 64,23 60,23 C 56,23 52,24 50,26 Z" />
        {/* Ears */}
        <ellipse cx="49" cy="30" rx="3" ry="4" />
        <ellipse cx="71" cy="30" rx="3" ry="4" />
        {/* Torso */}
        <path d="M 48,38 C 44,42 42,52 44,62 C 45,68 48,72 52,74 L 68,74 C 72,72 75,68 76,62 C 78,52 76,42 72,38 C 68,36 52,36 48,38 Z" />
        {/* Left flexed arm */}
        <path d="M 48,40 C 40,36 32,28 28,20 C 26,16 28,12 32,12 C 36,12 40,16 42,22 C 44,28 46,36 48,40 Z" />
        {/* Right flexed arm */}
        <path d="M 72,40 C 80,36 88,28 92,20 C 94,16 92,12 88,12 C 84,12 80,16 78,22 C 76,28 74,36 72,40 Z" />
        {/* Biceps bumps */}
        <ellipse cx="36" cy="26" rx="5" ry="7" />
        <ellipse cx="84" cy="26" rx="5" ry="7" />
        {/* Legs */}
        <rect x="50" y="72" width="8" height="14" rx="2" />
        <rect x="62" y="72" width="8" height="14" rx="2" />
      </g>

      <text
        x="60"
        y="98"
        textAnchor="middle"
        fontFamily="'Arial Black', 'Arial Bold', Arial, sans-serif"
        fontSize="16"
        fontWeight="900"
        fill="#1C1200"
        letterSpacing="2"
      >
        POINT
      </text>

      <path id="topArc" d="M 18,60 A 42,42 0 0 1 102,60" fill="none" />
      <text fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700" fill="#1C1200" letterSpacing="0.6">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          SUPLEMENTOS &amp; ACCESORIOS
        </textPath>
      </text>
    </svg>
  );
}
