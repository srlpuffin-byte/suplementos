interface PointLogoProps {
  size?: number;
  className?: string;
}

export function PointLogo({ size = 48, className = "" }: PointLogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.png`}
      width={size}
      height={size}
      alt="Suplementos Point"
      className={`rounded-full object-cover ${className}`}
      draggable={false}
    />
  );
}
