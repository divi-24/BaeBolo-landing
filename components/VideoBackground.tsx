'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function VideoBackground() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/10 group"
    >
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/assets/couple.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-all duration-500" />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">
        {/* Animated heart icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-4 md:mb-6"
        >
          <div className="relative">
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary-500 fill-primary-500" />
            <motion.div
              animate={{ scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-primary-500"
            />
          </div>
        </motion.div>

        {/* Main Text */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4 drop-shadow-lg"
        >
          Two Hearts, One Connection
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-gray-200 max-w-md drop-shadow-md"
        >
          Experience the magic of finding your perfect match on BaeBolo
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 md:mt-8 h-1 w-16 bg-gradient-to-r from-primary-500 to-accent-light rounded-full origin-left"
        />
      </div>

      {/* Animated floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: '100vh',
              x: `${Math.random() * 100 - 50}px`
            }}
            animate={{ 
              opacity: [0, 1, 0],
              y: '-100vh',
              x: `${Math.random() * 100 - 50}px`
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeIn'
            }}
            className="absolute text-primary-400/60"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-primary-400" />
          </motion.div>
        ))}
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}
