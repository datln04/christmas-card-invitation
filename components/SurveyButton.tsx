import React, { useState, useRef, useEffect, useCallback } from 'react';

const SurveyButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [noButtonOpacity, setNoButtonOpacity] = useState(1);
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });

  // Khi cố click vào nút "Không" - làm nó nhỏ dần, mờ dần và nhảy chỗ khác
  const handleNoButtonClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Nút nhỏ dần và mờ dần mỗi lần click
    setNoButtonScale(current => {
      const newScale = Math.max(0, current - 0.15);
      // Nếu scale <= 0.1 thì ẩn hoàn toàn
      if (newScale <= 0.1) {
        setIsNoButtonVisible(false);
      }
      return newScale;
    });
    
    setNoButtonOpacity(current => {
      const newOpacity = Math.max(0, current - 0.2);
      return newOpacity;
    });
    
    // Di chuyển ngay lập tức sang vị trí ngẫu nhiên
    const modal = modalRef.current;
    if (modal) {
      const modalRect = modal.getBoundingClientRect();
      const randomX = (Math.random() - 0.5) * (modalRect.width - 200);
      const randomY = (Math.random() - 0.5) * (modalRect.height - 200);
      setNoButtonPosition({ x: randomX, y: randomY });
    }
  }, []);

  // Hiệu ứng dí dỏm: nút "Không" di chuyển tự động và né chuột/touch
  useEffect(() => {
    if (showModal && !hasResponded && isNoButtonVisible) {
      const noButton = noButtonRef.current;
      const modal = modalRef.current;
      if (!noButton || !modal) return;

      let animationFrameId: number;
      let lastTime = 0;
      const speed = 2.5; // Tốc độ di chuyển (pixel per frame)
      
      // Khởi tạo hướng ngẫu nhiên
      directionRef.current = { 
        x: (Math.random() - 0.5) * 2, 
        y: (Math.random() - 0.5) * 2 
      };

      // Di chuyển liên tục không nghỉ bằng requestAnimationFrame
      const continuousMove = (currentTime: number) => {
        if (currentTime - lastTime >= 16) { // ~60fps
          const modalRect = modal.getBoundingClientRect();
          const buttonRect = noButton.getBoundingClientRect();
          
          setNoButtonPosition(prev => {
            let newX = prev.x + directionRef.current.x * speed;
            let newY = prev.y + directionRef.current.y * speed;
            
            // Giới hạn trong modal (tránh ra ngoài)
            const maxX = (modalRect.width - buttonRect.width) / 2 - 20;
            const maxY = (modalRect.height - buttonRect.height) / 2 - 20;
            
            // Đổi hướng khi chạm biên
            if (newX > maxX || newX < -maxX) {
              directionRef.current.x *= -1;
              newX = Math.max(-maxX, Math.min(maxX, newX));
            }
            if (newY > maxY || newY < -maxY) {
              directionRef.current.y *= -1;
              newY = Math.max(-maxY, Math.min(maxY, newY));
            }
            
            // Thỉnh thoảng đổi hướng ngẫu nhiên để tự nhiên hơn (2% mỗi frame)
            if (Math.random() < 0.02) {
              directionRef.current.x = (Math.random() - 0.5) * 2;
              directionRef.current.y = (Math.random() - 0.5) * 2;
            }
            
            return { x: newX, y: newY };
          });
          
          lastTime = currentTime;
        }
        
        animationFrameId = requestAnimationFrame(continuousMove);
      };

      animationFrameId = requestAnimationFrame(continuousMove);

      // Né chuột (desktop) - tăng tốc độ né khi chuột đến gần
      const handleMouseMove = (e: MouseEvent) => {
        const rect = noButton.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + 
          Math.pow(e.clientY - buttonCenterY, 2)
        );
        
        // Nếu chuột gần nút (trong vòng 100px), đẩy nút ra xa
        if (distance < 100) {
          const angle = Math.atan2(
            e.clientY - buttonCenterY,
            e.clientX - buttonCenterX
          );
          
          // Đẩy mạnh hơn khi chuột gần hơn
          const pushStrength = (100 - distance) / 100 * 200 + 100;
          const newX = Math.cos(angle + Math.PI) * pushStrength;
          const newY = Math.sin(angle + Math.PI) * pushStrength;
          
          setNoButtonPosition({ x: newX, y: newY });
        }
      };

      // Né touch (mobile) - tăng tốc độ né khi ngón tay đến gần
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const rect = noButton.getBoundingClientRect();
          const buttonCenterX = rect.left + rect.width / 2;
          const buttonCenterY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(touch.clientX - buttonCenterX, 2) + 
            Math.pow(touch.clientY - buttonCenterY, 2)
          );
          
          // Nếu touch gần nút, đẩy nút ra xa
          if (distance < 120) {
            const angle = Math.atan2(
              touch.clientY - buttonCenterY,
              touch.clientX - buttonCenterX
            );
            
            // Đẩy mạnh hơn khi ngón tay gần hơn
            const pushStrength = (120 - distance) / 120 * 250 + 150;
            const newX = Math.cos(angle + Math.PI) * pushStrength;
            const newY = Math.sin(angle + Math.PI) * pushStrength;
            
            setNoButtonPosition({ x: newX, y: newY });
          }
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (moveIntervalRef.current) {
          clearInterval(moveIntervalRef.current);
        }
      };
    }
  }, [showModal, hasResponded]);

  const handleYes = () => {
    setResponse('yes');
    setHasResponded(true);
  };

  const handleNo = () => {
    // Không cho phép click vào nút "Không" - chỉ có thể click "Có"!
    // Nhưng nếu họ thực sự muốn, có thể bấm phím ESC hoặc đóng modal
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setHasResponded(false);
      setResponse(null);
      setNoButtonPosition({ x: 0, y: 0 });
      setNoButtonScale(1);
      setNoButtonOpacity(1);
      setIsNoButtonVisible(true);
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    }, 300);
  };

  return (
    <>
      {/* Button mở khảo sát */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-red-500/50 animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        📋 Khảo Sát Tham Gia
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-green-50 opacity-50" />
            
            {!hasResponded ? (
              <>
                {/* Question */}
                <div className="relative z-10 text-center mb-8">
                  <div className="text-6xl mb-4">🎄</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">
                    Bạn có chắc chắn sẽ tham gia?
                  </h3>
                  <p className="text-stone-600">
                    Hãy cho chúng tôi biết nhé! 🎁
                  </p>
                </div>

                {/* Buttons */}
                <div className="relative z-10 flex gap-4 justify-center items-center min-h-[100px]">
                  <button
                    onClick={handleYes}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-full shadow-lg hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 z-20"
                  >
                    ✅ Có
                  </button>
                  {isNoButtonVisible && (
                    <button
                      ref={noButtonRef}
                      onClick={handleNoButtonClick}
                      onTouchStart={handleNoButtonClick}
                      style={{
                        transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonScale})`,
                        opacity: noButtonOpacity,
                        transition: 'transform 0.1s linear, opacity 0.2s ease-out',
                        position: 'absolute',
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-full shadow-lg hover:scale-110 hover:shadow-red-500/50 transition-all duration-300 relative cursor-pointer z-10 pointer-events-auto"
                    >
                      ❌ Không
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Success Message */}
                {response === 'yes' && (
                  <div className="relative z-10 text-center">
                    <div className="text-8xl mb-6 animate-bounce" style={{ animationDuration: '1s' }}>
                      🎉
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
                      Tuyệt vời!
                    </h3>
                    <p className="text-xl text-stone-700 mb-6">
                      Chúng tôi rất vui khi được đón tiếp bạn! 🎄✨
                    </p>
                    <p className="text-lg text-stone-600 mb-8">
                      Hẹn gặp bạn tại bữa tiệc nhé! 🎁🎅
                    </p>
                    <div className="flex gap-4 justify-center">
                      <span className="text-4xl animate-spin" style={{ animationDuration: '3s' }}>⭐</span>
                      <span className="text-4xl animate-pulse">✨</span>
                      <span className="text-4xl animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>⭐</span>
                    </div>
                    <button
                      onClick={closeModal}
                      className="mt-8 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:scale-110 transition-all duration-300"
                    >
                      Đóng
                    </button>
                  </div>
                )}

                {/* No Response Message */}
                {response === 'no' && (
                  <div className="relative z-10 text-center">
                    <div className="text-8xl mb-6 animate-pulse">
                      😢
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                      Rất tiếc!
                    </h3>
                    <p className="text-xl text-stone-700 mb-6">
                      Chúng tôi sẽ nhớ bạn! 💔
                    </p>
                    <p className="text-lg text-stone-600 mb-8">
                      Nếu bạn thay đổi ý định, hãy liên hệ với chúng tôi nhé! 📞
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-8 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full hover:scale-110 transition-all duration-300"
                    >
                      Đóng
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Close button (X) */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 text-2xl font-bold transition-colors duration-300 z-20"
              aria-label="Đóng"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SurveyButton;

