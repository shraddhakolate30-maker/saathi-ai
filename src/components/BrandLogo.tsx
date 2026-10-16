interface BrandLogoProps {
  className?: string;
  shieldColor?: string;
  heartColor?: string;
  textColor?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({
  className = '',
  shieldColor = '#FFFFFF',
  heartColor = '#FFFFFF',
  textColor = 'text-white',
  showText = true,
  size = 'md',
}: BrandLogoProps) {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
  }[size];

  const textStyles = {
    sm: 'text-base font-bold tracking-wider',
    md: 'text-lg font-bold tracking-wider',
    lg: 'text-xl font-bold tracking-wider',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Shield Icon closely styled to reference emblem */}
      <div className={`relative ${iconDimensions} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Outer Shield with double bevel styling */}
          <path
            d="M12 2.5L4.5 5.8V11.5C4.5 16.5 7.7 20.8 12 22C16.3 20.8 19.5 16.5 19.5 11.5V5.8L12 2.5Z"
            stroke={shieldColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Internal Dignity/Heart Emblem */}
          <path
            d="M12 7.2C10.5 5.8 8.2 6.4 8.2 8.5C8.2 10.6 12 14.2 12 14.2C12 14.2 15.8 10.6 15.8 8.5C15.8 6.4 13.5 5.8 12 7.2Z"
            fill={heartColor}
            fillOpacity="0.85"
            stroke={shieldColor}
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {showText && (
        <span className={`font-display ${textColor} ${textStyles} uppercase whitespace-nowrap`}>
          SAATHI <span className="font-light tracking-widest text-white/90">AI</span>
        </span>
      )}
    </div>
  );
}
