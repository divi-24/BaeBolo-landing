'use client';

import { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

export default function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createHeart = () => {
      if (!containerRef.current) return;

      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
      heart.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      heart.innerHTML = '💕';
      
      containerRef.current.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 7000);
    };

    const interval = setInterval(createHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style jsx>{`
        .floating-heart {
          position: absolute;
          bottom: -50px;
          font-size: 2rem;
          animation: float-up linear forwards;
        }
        
        @keyframes float-up {
          to {
            bottom: 110%;
            transform: translateX(100px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
