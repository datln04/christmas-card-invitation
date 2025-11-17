import React from 'react';

const Header: React.FC = () => {
  const title = "Bạn Được Mời";
  
  return (
    <header className="text-center mb-4 md:mb-8 pt-12 relative">
      {/* Decorative stars */}
      <div className="absolute top-0 left-1/4 star" style={{ animationDelay: '0s' }}>
        <span className="text-3xl">✨</span>
      </div>
      <div className="absolute top-4 right-1/4 star" style={{ animationDelay: '1s' }}>
        <span className="text-2xl">⭐</span>
      </div>
      <div className="absolute top-8 left-1/3 star" style={{ animationDelay: '0.5s' }}>
        <span className="text-2xl">✨</span>
      </div>
      
      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-rose-800 to-green-800 leading-tight header-glow relative">
        {title.split('').map((char, index) => (
          <span
            key={index}
            className="animate-letter-in inline-block hover:scale-110 transition-transform duration-300"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              transform: `perspective(1000px) rotateY(${index % 2 === 0 ? '5deg' : '-5deg'})`
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl mt-4 text-stone-700 font-christmas tracking-wider animate-pulse">
        đến một Bữa Tiệc Ngủ Giáng Sinh Ấm Áp! 🎄🎁
      </p>
    </header>
  );
};

export default Header;