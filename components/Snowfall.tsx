import React from 'react';

const Snowfall: React.FC = () => {
  const snowflakeCount = 100; // Giảm số lượng để tối ưu performance
  const snowflakes = Array.from({ length: snowflakeCount }).map((_, i) => {
    const size = Math.random() * 6 + 2; // 2px to 8px - tăng kích thước
    const drift = (Math.random() - 0.5) * 12; // -6vw to 6vw
    const opacity = Math.random() * 0.4 + 0.6; // 0.6 to 1.0 - tăng độ rõ
    const style = {
      left: `${Math.random() * 100}vw`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: opacity,
      animationDuration: `${Math.random() * 10 + 5}s`, // 5 to 15 seconds
      animationDelay: `${Math.random() * 5}s`,
      '--drift': drift,
      '--start-opacity': opacity,
      '--size': size,
    } as React.CSSProperties;
    return <div key={i} className="snowflake-enhanced" style={style} />;
  });

  return (
    <>
      <style>{`
        @keyframes fall-enhanced {
          0% {
            transform: translateY(-10vh) translateX(0vw) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: var(--start-opacity);
          }
          50% {
            transform: translateX(calc(var(--drift) * 1vw)) rotate(180deg);
          }
          95% {
            opacity: var(--start-opacity);
          }
          100% {
            transform: translateY(110vh) translateX(calc(var(--drift) * 2vw)) rotate(360deg);
            opacity: 0;
          }
        }
        
        .snowflake-enhanced {
          position: fixed;
          top: 0;
          background: radial-gradient(circle, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(255, 255, 255, 0.95) 30%,
            rgba(255, 255, 255, 0.9) 60%,
            rgba(255, 255, 255, 0.7) 100%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 50;
          will-change: transform, opacity;
          box-shadow: 
            0 0 calc(var(--size) * 0.5px) rgba(255, 255, 255, 0.8),
            0 0 calc(var(--size) * 1px) rgba(255, 255, 255, 0.6),
            0 0 calc(var(--size) * 1.5px) rgba(255, 255, 255, 0.4);
          animation: fall-enhanced linear infinite;
          filter: blur(0.5px);
        }
      `}</style>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" aria-hidden="true">
        {snowflakes}
      </div>
    </>
  );
};

export default Snowfall;