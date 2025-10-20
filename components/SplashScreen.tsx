'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({ onFinish, duration = 3000 }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinish, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FE4D89 0%, #FF6B9D 50%, #FF8AB3 100%)',
          }}
        >
          {/* Floating Hearts Background */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <FloatingHeart key={i} delay={i * 0.2} />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative"
            >
              {/* Pulsing Outer Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 -m-8 rounded-full bg-white/40 blur-2xl"
              />

              {/* Logo Circle */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(255, 255, 255, 0.6)',
                    '0 0 60px rgba(255, 255, 255, 0.8)',
                    '0 0 40px rgba(255, 255, 255, 0.6)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-32 h-32 bg-white rounded-full flex items-center justify-center relative"
              >
                {/* Heart Icon */}
                <Heart
                  className="w-16 h-16"
                  style={{
                    fill: 'url(#heart-gradient)',
                    stroke: 'url(#heart-gradient)',
                    strokeWidth: 2,
                  }}
                />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FE4D89" />
                      <stop offset="100%" stopColor="#FF6B9D" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>

            {/* App Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-6xl md:text-7xl font-black text-white mt-10 mb-2"
              style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              BaeBolo
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 font-light"
            >
              Find Your Perfect Match
            </motion.p>

            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-20"
            >
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Floating Heart Component
function FloatingHeart({ delay }: { delay: number }) {
  const randomX = Math.random() * 100;
  const randomSize = Math.random() * 20 + 10;
  const randomDuration = Math.random() * 3 + 4;
  const randomOpacity = Math.random() * 0.3 + 0.1;

  return (
    <motion.div
      initial={{
        x: `${randomX}vw`,
        y: '110vh',
        opacity: 0,
      }}
      animate={{
        y: '-10vh',
        opacity: [0, randomOpacity, randomOpacity, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
      className="absolute"
      style={{
        fontSize: `${randomSize}px`,
      }}
    >
      <motion.div
        animate={{
          x: [0, 20, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ❤️
      </motion.div>
    </motion.div>
  );
}
