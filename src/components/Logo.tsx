
// OAIA Digital - Logo Component
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* OA Advance Logo */}
      <div className="h-10 flex items-center">
        <img 
          src="/Horizontal Logo Lockup  T4.png" 
          alt="OA Advance" 
          className="h-24 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
