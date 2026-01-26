import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '' }) => {
  // On dark backgrounds: text is near-white, dot is green
  // On light backgrounds: text is navy, dot is green
  const textColor = variant === 'dark' ? '#F5F7F9' : '#0B1F33';
  const dotColor = '#00C896';

  return (
    <div className={`flex items-center ${className}`}>
      <span 
        className="text-xl md:text-2xl font-bold tracking-tight"
        style={{ color: textColor }}
      >
        leads
      </span>
      <span 
        className="text-xl md:text-2xl font-bold"
        style={{ color: dotColor }}
      >
        .
      </span>
    </div>
  );
};

export default Logo;
