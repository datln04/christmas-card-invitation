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
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [hasTriedAutoplay, setHasTriedAutoplay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume ban đầu
    audio.volume = volume;

    // Xử lý khi nhạc kết thúc - tự động loop
    const handleEnded = () => {
      audio.currentTime = 0;
      if (isPlaying) {
        audio.play().catch(() => {
          setIsPlaying(false);
        });
      }
    };

    // Xử lý khi nhạc bắt đầu phát
    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };

    // Xử lý khi nhạc dừng
    const handlePause = () => {
      setIsPlaying(false);
    };

    // Xử lý lỗi phát nhạc
    const handleError = () => {
      setIsPlaying(false);
      setShowPlayButton(true);
      console.log('Lỗi phát nhạc');
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Thử phát tự động sau khi user tương tác với trang
    const tryAutoPlay = async () => {
      if (hasTriedAutoplay || isPlaying) return;
      
      try {
        if (autoPlay) {
          await audio.play();
          setHasTriedAutoplay(true);
        }
      } catch (error) {
        // Mobile browsers thường chặn autoplay
        // Hiển thị button để user bật nhạc thủ công
        setShowPlayButton(true);
        setHasTriedAutoplay(true);
      }
    };

    // Lắng nghe user interaction để thử autoplay
    const enableAutoplay = () => {
      if (!hasTriedAutoplay) {
        tryAutoPlay();
      }
    };

    // Thêm event listeners
    document.addEventListener('click', enableAutoplay, { once: true });
    document.addEventListener('touchstart', enableAutoplay, { once: true });
    document.addEventListener('keydown', enableAutoplay, { once: true });

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      document.removeEventListener('click', enableAutoplay);
      document.removeEventListener('touchstart', enableAutoplay);
      document.removeEventListener('keydown', enableAutoplay);
    };
  }, [autoPlay, volume, isPlaying, hasTriedAutoplay]);

  // Hàm bật nhạc thủ công (cho mobile)
  const handlePlayMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      // Trên mobile, cần user interaction TRỰC TIẾP với audio element
      await audio.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    } catch (error) {
      console.log('Không thể phát nhạc:', error);
      // Nếu vẫn lỗi, giữ button hiển thị
      setShowPlayButton(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={santaBaby}
        loop
        preload="auto"
        playsInline // Quan trọng cho iOS
      />
      
      {/* Button để bật nhạc trên mobile - chỉ hiển thị khi cần */}
      {showPlayButton && (
        <button
          onClick={handlePlayMusic}
          onTouchStart={(e) => {
            e.preventDefault();
            handlePlayMusic();
          }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse flex items-center gap-2"
          aria-label="Bật nhạc nền Santa Baby"
          style={{ animationDuration: '2s' }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-sm font-bold hidden sm:inline">🎵 Nhạc</span>
        </button>
      )}
    </>
  );
};

export default BackgroundMusic;

