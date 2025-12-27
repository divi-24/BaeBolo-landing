'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';

const FloatingHeart = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, x: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [-20, -60],
      x: [0, 8, -4, 2],
    }}
    transition={{
      duration: 2.8,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute pointer-events-none"
  >
    <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
  </motion.div>
);

const Sparkle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0.8, 0],
      scale: [0, 1, 1, 0],
    }}
    transition={{
      duration: 2.8,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute pointer-events-none"
  >
    <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full blur-sm" />
  </motion.div>
);

export default function AnimatedKissIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-white via-pink-50 to-yellow-50 border border-pink-100/50 shadow-xl shadow-pink-200/20 flex items-center justify-center"
    >
      {/* Soft background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
      </div>

      {/* Main animation container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center px-4 md:px-0"
      >
        {/* Illustration with subtle animations */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Boy's head group */}
          <motion.div
            animate={{
              y: [0, -2, 0],
              x: [0, 1, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            {/* Boy's hair */}
            <svg
              viewBox="0 0 300 400"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Boy's head */}
              <ellipse cx="120" cy="150" rx="45" ry="50" fill="#f5deb3" />

              {/* Boy's dark hair */}
              <path
                d="M 75 130 Q 75 90 120 85 Q 165 90 165 130"
                fill="#3d2817"
              />

              {/* Boy's hair strands */}
              <path d="M 85 110 Q 90 95 95 110" fill="#3d2817" opacity="0.8" />
              <path d="M 110 90 Q 115 80 120 90" fill="#3d2817" opacity="0.8" />
              <path d="M 145 110 Q 150 95 155 110" fill="#3d2817" opacity="0.8" />

              {/* Boy's eyes */}
              <circle cx="105" cy="140" r="4" fill="#1a1a1a" />
              <circle cx="135" cy="140" r="4" fill="#1a1a1a" />

              {/* Eye sparkle */}
              <circle cx="107" cy="138" r="1.5" fill="white" />
              <circle cx="137" cy="138" r="1.5" fill="white" />

              {/* Boy's happy mouth */}
              <motion.path
                d="M 110 160 Q 120 168 130 160"
                stroke="#333"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Boy's cheek blush */}
              <motion.ellipse
                cx="150"
                cy="155"
                rx="12"
                ry="8"
                fill="#ffb6c1"
                opacity={0.4}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Boy's shirt */}
              <rect x="75" y="200" width="90" height="80" fill="#faf5f0" rx="8" />
            </svg>
          </motion.div>

          {/* Girl's head group - leans in and out */}
          <motion.div
            animate={{
              x: [20, -8, 20],
              y: [10, 0, 10],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 300 400"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Girl's head */}
              <ellipse cx="220" cy="130" rx="42" ry="48" fill="#f5deb3" />

              {/* Girl's long dark hair */}
              <path
                d="M 178 125 Q 178 70 220 65 Q 262 70 262 140 Q 260 160 250 165 L 240 180 L 235 190 L 230 200 L 225 205 Q 200 210 180 205 L 175 195 L 173 180"
                fill="#4a3728"
              />

              {/* Girl's eyes closed (kissing) */}
              <motion.path
                d="M 205 120 Q 210 125 215 120"
                stroke="#1a1a1a"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <motion.path
                d="M 225 120 Q 230 125 235 120"
                stroke="#1a1a1a"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Girl's cute nose */}
              <line x1="220" y1="130" x2="220" y2="138" stroke="#d4a574" strokeWidth="1" />

              {/* Girl's lips - kissing pose */}
              <motion.path
                d="M 215 145 Q 220 150 225 145"
                stroke="#ffb6d9"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Girl's rosy cheeks */}
              <ellipse cx="190" cy="135" rx="10" ry="7" fill="#f4a9c8" opacity="0.5" />

              {/* Girl's shirt */}
              <rect x="178" y="175" width="84" height="75" fill="#fffacd" rx="6" />

              {/* Girl's hair strands flowing */}
              <path
                d="M 175 190 Q 170 200 168 215"
                stroke="#4a3728"
                strokeWidth="3"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating hearts - subtle */}
      <FloatingHeart delay={0} />
      <FloatingHeart delay={0.5} />
      <FloatingHeart delay={1} />

      {/* Sparkles near cheek */}
      <div className="absolute top-1/3 right-1/4 w-2 h-2">
        <Sparkle delay={0.3} />
      </div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2">
        <Sparkle delay={1} />
      </div>

      {/* Soft light glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5" />
      </div>
    </motion.div>
  );
}
