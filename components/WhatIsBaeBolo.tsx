'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WhatIsBaeBolo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const words = "BaeBolo is India's Most Loved College Dating App".split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-4 md:px-6 bg-black overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500 rounded-full blur-[150px]"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Animated word reveal */}
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 overflow-hidden"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={child}
              className={`inline-block mr-2 md:mr-3 ${
                word === 'BaeBolo' ? 'text-gradient text-shadow-glow' : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Staggered paragraph reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-lg md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            We're building the future of college dating in India.
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="inline-block"
            >
              A platform where verified students can find meaningful connections,
              build lasting relationships, and create unforgettable memories.
            </motion.span>
          </p>
        </motion.div>

        {/* Decorative animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
          className="h-1 w-32 mx-auto mt-12 bg-gradient-to-r from-transparent via-primary-500 to-transparent origin-center"
        />
      </div>
    </section>
  );
}
