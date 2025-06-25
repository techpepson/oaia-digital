
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Symbol */}
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-oaia-blue to-oaia-orange rounded-lg flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-oaia-orange rounded-full"></div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-bold text-oaia-blue">OAIA</span>
          <span className="text-xs text-oaia-gray">One Africa Invoice Advance</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
