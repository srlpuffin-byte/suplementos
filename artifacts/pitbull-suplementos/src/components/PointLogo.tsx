interface PointLogoProps {
  size?: number;
  className?: string;
}

export function PointLogo({ size = 52, className = "" }: PointLogoProps) {
  const base = import.meta.env.BASE_URL;

  return (
    <picture className={`block shrink-0 ${className}`}>
      <source
        media="(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 2)"
        srcSet={`${base}logo@2x.png 2x, ${base}logo.png 1x`}
      />
      <img
        src={`${base}logo.png`}
        srcSet={`${base}logo@2x.png 2x`}
        width={size}
        height={size}
        alt="Suplementos Point"
        className="block h-auto w-full max-w-none object-contain drop-shadow-sm"
        style={{ width: size, height: size }}
        draggable={false}
        decoding="async"
      />
    </picture>
  );
}
