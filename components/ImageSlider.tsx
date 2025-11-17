import React, { useState, useEffect, useCallback } from 'react';
import christmasImage1 from '../assets/imgs/img1.jpg';

// Images - bạn có thể thêm nhiều ảnh vào thư mục assets/imgs và import ở đây
// Ví dụ: import img2 from '../assets/imgs/img2.jpg';
const images = [
  { src: christmasImage1, alt: 'Cozy Christmas sleepover setting' },
  { src: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1200&auto=format&fit=crop', alt: 'Christmas decorations' },
  { src: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=1200&auto=format&fit=crop', alt: 'Christmas tree' },
  // { src: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=1200&auto=format&fit=crop', alt: 'Christmas lights' },
  { src: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=1200&auto=format&fit=crop', alt: 'Cozy Christmas atmosphere' },
];

interface ImageSliderProps {
  autoPlayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext]);

  return (
    <div 
      className="ken-burns-container rounded-2xl shadow-2xl w-full max-w-4xl border-4 border-white relative overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Animated border glow - Christmas colors */}
      <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-red-600 via-yellow-400 via-green-500 to-blue-400 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl blur-sm z-30" />
      
      {/* Image container - Full frame display */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`ken-burns-image absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            loading="lazy"
          />
        ))}
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8 scale-110'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Overlay sparkles on image */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-4 left-4 star">
          <span className="text-2xl">✨</span>
        </div>
        <div className="absolute top-8 right-8 star" style={{ animationDelay: '0.5s' }}>
          <span className="text-xl">⭐</span>
        </div>
        <div className="absolute bottom-8 left-8 star" style={{ animationDelay: '1s' }}>
          <span className="text-2xl">✨</span>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;

