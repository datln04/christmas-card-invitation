import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Section from './components/Section';
import IconListItem from './components/IconListItem';
import Snowfall from './components/Snowfall';
import Sparkle from './components/Sparkle';
import ImageSlider from './components/ImageSlider';
import BackgroundMusic from './components/BackgroundMusic';
import SurveyButton from './components/SurveyButton';
import { DETAILS, ACTIVITIES, WHAT_TO_BRING, ChristmasTree, FairyLights } from './constants';
import { CalendarIcon, ClockIcon, LocationMarkerIcon, RsvpIcon } from './constants';

const App: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        // Chỉ update nếu scroll thay đổi đáng kể (giảm re-render)
        if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
          setScrollPosition(currentScrollY);
          lastScrollY.current = currentScrollY;
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return (
    <div className="animated-gradient text-stone-800 min-h-screen overflow-x-hidden relative">
      <Snowfall />
      <Sparkle />
      
      {/* Floating Christmas Trees with parallax - Optimized with CSS variables */}
      <div 
        className="absolute top-1/4 -left-32 opacity-50 z-0 floating-ornament parallax-tree-left" 
        style={{ 
          '--scroll-y': `${scrollPosition * -0.1}px`,
          '--scroll-rotate': `${scrollPosition * 0.01}deg`,
        } as React.CSSProperties}
        aria-hidden="true"
      >
        <ChristmasTree />
      </div>
      <div 
        className="absolute top-1/3 -right-32 opacity-50 z-0 floating-ornament parallax-tree-right" 
        style={{ 
          '--scroll-y': `${scrollPosition * -0.15}px`,
          '--scroll-rotate': `${scrollPosition * -0.01}deg`,
        } as React.CSSProperties}
        aria-hidden="true"
      >
        <ChristmasTree />
      </div>

      {/* Floating decorative elements - Giảm số lượng */}
      <div className="absolute top-20 left-10 floating-ornament z-0 opacity-30" style={{ animationDelay: '0s' }}>
        <span className="text-4xl">🎄</span>
      </div>
      <div className="absolute top-40 right-20 floating-ornament z-0 opacity-30" style={{ animationDelay: '1s' }}>
        <span className="text-3xl">🎁</span>
      </div>

      <main className="relative z-10 container mx-auto px-6 py-12 md:py-20">
        <div 
          className="absolute top-0 left-0 right-0 z-20 px-4 opacity-70 parallax-lights" 
          style={{ 
            '--scroll-y': `${scrollPosition * 0.05}px`,
          } as React.CSSProperties}>
          <FairyLights />
        </div>
        <Header />
        
        <div className="my-12 md:my-20 flex justify-center px-4">
          <ImageSlider autoPlayInterval={4000} />
        </div>


        <Section title="Thông Tin Chi Tiết">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <IconListItem icon={<CalendarIcon />} text={DETAILS.date} />
            <IconListItem icon={<ClockIcon />} text={DETAILS.time} />
            <IconListItem icon={<LocationMarkerIcon />} text={DETAILS.location} />
          </div>
        </Section>

        <Section title="Hoạt Động Vui Vẻ">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVITIES.map((activity) => (
              <IconListItem key={activity.text} icon={activity.icon} text={activity.text} />
            ))}
          </div>
        </Section>
        
        <Section title="Những Gì Cần Mang Theo">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_TO_BRING.map((item) => (
              <IconListItem key={item.text} icon={item.icon} text={item.text} />
            ))}
          </div>
        </Section>

        <Section title="Vui Lòng Phản Hồi">
           <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-lg relative border-2 border-transparent overflow-hidden group" style={{
             borderImage: 'linear-gradient(to bottom right, #DC2626, #D4AF37, #16A34A) 1',
           }}>
             {/* Animated background gradient - Christmas theme */}
             <div className="absolute inset-0 bg-gradient-to-r from-red-200/0 via-yellow-200/0 via-green-200/0 to-blue-200/0 group-hover:from-red-200/15 group-hover:via-yellow-200/12 group-hover:via-green-200/12 group-hover:to-blue-200/10 transition-all duration-500 rounded-xl" />
             
             <div className="flex flex-col items-center text-center relative z-10">
                <div className="text-red-800 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <RsvpIcon />
                </div>
                <p className="mt-4 text-lg text-stone-700 group-hover:text-stone-900 transition-colors duration-300">
                  Vui lòng cho chúng tôi biết nếu bạn có thể tham gia trước ngày 20 tháng 12 để các chú lùn của ông già Noel có thể đếm số người tham gia!
                </p>
                <a 
                  href="tel:123-456-7890" 
                  className="mt-6 font-bold text-2xl text-stone-800 hover:text-red-700 transition-all duration-300 transform hover:scale-110 hover:drop-shadow-lg relative inline-block"
                >
                  <span className="relative z-10">Gọi hoặc Nhắn tin: (84) 397957537</span>
                  <span className="absolute inset-0 bg-yellow-300/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </a>
             </div>
           </div>
        </Section>
      </main>
      <footer className="relative z-10 text-center p-8 text-stone-500">
        <p className="font-christmas text-4xl text-stone-700 hover:scale-110 transition-transform duration-300 inline-block cursor-default" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>
          Hãy cùng nhau tạo ra những kỉ niệm đẹp nhé! 🎉
        </p>
      </footer>
      
      {/* Background Music - Ẩn điều khiển, tự động phát */}
      <BackgroundMusic 
        autoPlay={true}
        volume={0.3}
      />
      
      {/* Survey Button */}
      <SurveyButton />
    </div>
  );
};

export default App;