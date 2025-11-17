import React from 'react';

export const DETAILS = {
  date: 'Thứ Sáu, 22 tháng 12',
  time: '6:00 PM trở đi',
  location: '123 Đường Kẹo Gậy, Bắc Cực',
};

// Icons
export const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LocationMarkerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const RsvpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const MovieIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
);

const CookieIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.23 8.38a.5.5 0 01.52-.66h6.5a.5.5 0 010 1h-6.5a.5.5 0 01-.52-.34zm.02 2.64a.5.5 0 01.52-.66h4.5a.5.5 0 110 1h-4.5a.5.5 0 01-.52-.34zM10 4a.5.5 0 01.5.5v1.5a.5.5 0 01-1 0V4.5A.5.5 0 0110 4z" />
    </svg>
);

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-8-8h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 11.5h14v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a3.5 3.5 0 00-3.5 3.5c0 .5.5 1.5 3.5 1.5s3.5-1 3.5-1.5A3.5 3.5 0 0012 4.5z" />
    </svg>
);

const PajamasIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l-9 4 9 4 9-4-9-4zm0 16l-9-4v- decisione 4l9 4 9-4v4l-9 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8v8m18-8v8" />
    </svg>
);

const SleepingBagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const ToothbrushIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export const ChristmasTree = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-72 h-72 text-green-900/10"
    fill="currentColor"
  >
    <path d="M19.33 20.83h-3.28l-1.05-1.05a4.03 4.03 0 0 0-5.99 0l-1.05 1.05H4.67a1 1 0 0 1-1-1V18.5a1 1 0 0 1 1-1h1.34l.7-1.16a4 4 0 0 0-4.04-5.34 1 1 0 0 1-1.15-.83 1 1 0 0 1 .83-1.15 4 4 0 0 0 6.64-2.35l.7-1.16a1 1 0 0 1 1.74 0l.7 1.16a4 4 0 0 0 6.64 2.35 1 1 0 0 1 .83 1.15 1 1 0 0 1-1.15.83 4 4 0 0 0-4.04 5.34l.7 1.16h1.34a1 1 0 0 1 1 1v1.33a1 1 0 0 1-1 1ZM11 22.83h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2Z" />
  </svg>
);

export const FairyLights = () => {
    const lights = [
      { cx: 50, cy: 35, delay: '0s' }, { cx: 75, cy: 50, delay: '0.5s' },
      { cx: 100, cy: 50, delay: '0.2s' }, { cx: 125, cy: 35, delay: '0.8s' },
      { cx: 150, cy: 50, delay: '0.3s' }, { cx: 175, cy: 50, delay: '1s' },
      { cx: 200, cy: 50, delay: '0.1s' }, { cx: 225, cy: 35, delay: '0.6s' },
      { cx: 250, cy: 50, delay: '0.4s' }, { cx: 275, cy: 50, delay: '0.9s' },
      { cx: 300, cy: 50, delay: '0s' }, { cx: 325, cy: 35, delay: '0.7s' },
      { cx: 350, cy: 50, delay: '0.2s' }, { cx: 375, cy: 50, delay: '0.5s' },
    ];
  
    return (
      <svg viewBox="0 0 400 60" className="w-full h-auto" stroke="#D4AF37" strokeWidth="0.5" fill="none">
        <path d="M0,50 Q50,20 100,50 T200,50 T300,50 T400,50" strokeDasharray="3 3" />
        {lights.map((light, i) => (
          <g key={i}>
            <line x1={light.cx} y1={light.cy} x2={light.cx} y2={light.cy > 45 ? 50 : 35} />
            <circle cx={light.cx} cy={light.cy} r="4" fill="#FFD700" className="light" style={{ animationDelay: light.delay }} />
          </g>
        ))}
      </svg>
    );
};

// Christmas images từ Unsplash - Hình ảnh Giáng sinh phù hợp
export const ACTIVITIES = [
  { 
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3', 
    text: 'Xem Phim Giáng Sinh' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1519869325930-2817931507c7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3', 
    text: 'Cuộc Thi Trang Trí Bánh Quy' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3', 
    text: 'Trao Đổi Quà Secret Santa' 
  },
];

export const WHAT_TO_BRING = [
  { 
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3', 
    text: 'Bộ Pijama Ấm Áp Nhất' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3', 
    text: 'Túi Ngủ & Gối' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3', 
    text: 'Bàn Chải Đánh Răng & Đồ Dùng Cá Nhân' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3', 
    text: 'Một món quà nhỏ (giới hạn 15$) cho Secret Santa' 
  },
];