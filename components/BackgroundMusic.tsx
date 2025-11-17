import React, { useState, useEffect, useRef } from 'react';
import santaBaby from '../assets/music/Eartha Kitt - Santa Baby.mp3';

interface BackgroundMusicProps {
  autoPlay?: boolean;
  volume?: number;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ 
  autoPlay = true,
  volume = 0.3 // Volume mặc định 30%
}) => {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume ban đầu
    audio.volume = volume;

    // Thử phát nhạc tự động sau khi user tương tác
    const tryPlay = async () => {
      try {
        if (autoPlay && hasUserInteracted) {
          await audio.play();
        }
      } catch (error) {
        // Browser chặn autoplay, sẽ thử lại sau user interaction
        console.log('Autoplay bị chặn, đợi user interaction');
      }
    };

    // Lắng nghe user interaction để enable autoplay
    const enableAutoplay = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        tryPlay();
      }
    };

    // Thêm event listeners cho user interaction
    document.addEventListener('click', enableAutoplay, { once: true });
    document.addEventListener('touchstart', enableAutoplay, { once: true });
    document.addEventListener('keydown', enableAutoplay, { once: true });

    // Thử phát ngay nếu đã có interaction
    if (hasUserInteracted) {
      tryPlay();
    }

    // Xử lý khi nhạc kết thúc - tự động loop
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('click', enableAutoplay);
      document.removeEventListener('touchstart', enableAutoplay);
      document.removeEventListener('keydown', enableAutoplay);
    };
  }, [autoPlay, hasUserInteracted, volume]);

  // Component không render gì - hoàn toàn ẩn
  return (
    <audio
      ref={audioRef}
      src={santaBaby}
      loop
      preload="auto"
    />
  );
};

export default BackgroundMusic;

