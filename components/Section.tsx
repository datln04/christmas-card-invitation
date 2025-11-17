import React, { useState, useEffect, useRef } from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const useScrollAnimation = <T extends HTMLElement>() => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section 
      ref={ref}
      className={`py-12 md:py-16 border-t border-stone-300/50 ${isVisible ? 'opacity-100 translate-y-0 section-entrance' : 'opacity-0 translate-y-10'}`}
      style={{
        transition: isVisible ? 'opacity 0.6s ease-out, transform 0.6s ease-out' : 'none',
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
    >
      <h2 
        className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-stone-800 relative inline-block"
        style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}
      >
        <span className="relative z-10">{title}</span>
        {/* Decorative underline with animation */}
        <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </h2>
      <div className="relative">{children}</div>
    </section>
  );
};

export default Section;