import React from 'react';

const Sparkle: React.FC = () => {
  const sparkleCount = 15; // Giảm số lượng để tối ưu performance
  const sparkles = Array.from({ length: sparkleCount }).map((_, i) => {
    const size = Math.random() * 4 + 2; // 2px to 6px
    const style = {
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${Math.random() * 3 + 2}s`, // 2 to 5 seconds
      animationDelay: `${Math.random() * 2}s`,
    };
    return <div key={i} className="sparkle" style={style} />;
  });

  return (
    <>
      <style>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        
        .sparkle {
          position: fixed;
          background: radial-gradient(circle, #FFD700 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 40;
          will-change: transform, opacity;
          animation: sparkle ease-in-out infinite;
          box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
        }
      `}</style>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40" aria-hidden="true">
        {sparkles}
      </div>
    </>
  );
};

export default Sparkle;

