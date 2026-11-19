import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[4/3]',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`${aspectClassName} w-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Smartphone className="w-10 h-10 stroke-[1.5]" />
        <span className="text-xs font-medium text-slate-500 px-4 text-center line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`${aspectClassName} w-full object-cover bg-slate-100 ${className}`}
      loading="lazy"
    />
  );
};
