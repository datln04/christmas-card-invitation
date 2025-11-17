import React, { useState, useEffect, useRef } from 'react';

interface IconListItemProps {
  icon?: React.ReactNode;
  image?: string;
  text: string;
  animationDelay?: number;
}

const IconListItem: React.FC<IconListItemProps> = ({ icon, image, text, animationDelay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, animationDelay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [animationDelay]);

  return (
    <div 
      ref={itemRef}
      className="icon-list-item flex flex-col items-center text-center p-6 rounded-xl transition-all duration-500 hover:bg-white/60 hover:shadow-2xl cursor-pointer relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background glow - Christmas colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-200/0 via-yellow-200/0 to-green-200/0 group-hover:from-red-200/25 group-hover:via-yellow-200/15 group-hover:to-green-200/25 transition-all duration-500 rounded-xl" />
      
      {/* Image or Icon container with animations */}
      <div className={`mb-4 relative z-10 icon-container ${isVisible ? 'animate-image-in' : 'opacity-0 scale-0'}`}>
        {/* Glow effect behind image */}
        <div className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full" style={{ transform: 'scale(1.5)' }} />
        <div className="icon-glow absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
        {image ? (
          <div className="relative">
            {/* Decorative ring on hover */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-yellow-300/50 transition-all duration-500 animate-pulse-ring" />
            <img
              src={image}
              alt={text}
              className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full border-4 border-white shadow-2xl group-hover:border-red-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative z-10"
              loading="lazy"
            />
            {/* Sparkle overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <span className="absolute top-0 left-1/2 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
              <span className="absolute top-1/2 right-0 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
              <span className="absolute bottom-0 left-0 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
            </div>
          </div>
        ) : (
          <div className="text-red-600">{icon}</div>
        )}
      </div>
      
      {/* Text with fade animation */}
      <p className={`text-lg leading-relaxed text-stone-700 relative z-10 transform group-hover:scale-105 transition-all duration-300 font-medium ${isVisible ? 'animate-text-in' : 'opacity-0 translate-y-4'}`}>
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