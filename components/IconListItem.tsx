import React, { useState } from 'react';

interface IconListItemProps {
  icon: React.ReactNode;
  text: string;
}

const IconListItem: React.FC<IconListItemProps> = ({ icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="icon-list-item flex flex-col items-center text-center p-6 rounded-xl transition-all duration-500 hover:bg-white/60 hover:shadow-2xl cursor-pointer relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background glow - Christmas colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-200/0 via-yellow-200/0 to-green-200/0 group-hover:from-red-200/25 group-hover:via-yellow-200/15 group-hover:to-green-200/25 transition-all duration-500 rounded-xl" />
      
      {/* Floating icon with glow */}
      <div className="mb-4 text-red-600 relative z-10 icon-container">
        <div className="icon-glow absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
        {icon}
      </div>
      
      {/* Text with fade animation */}
      <p className="text-lg leading-relaxed text-stone-700 relative z-10 transform group-hover:scale-105 transition-transform duration-300 font-medium">
        {text}
      </p>
      
      {/* Decorative sparkles on hover */}
      {isHovered && (
        <>
          <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-red-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
        </>
      )}
    </div>
  );
};

export default IconListItem;