'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, useInView } from 'framer-motion';
import WaitlistButton from './WaitlistButton';
import { VideoButton } from './VideoModal';

// Animated Counter Component
function AnimatedCounter({ target, suffix = '', delay = 0 }: { target: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [target, delay, isInView]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K`;
    }
    return num.toString();
  };

  return (
    <h3 ref={ref} className="text-3xl md:text-5xl font-black text-gradient mb-2">
      {formatNumber(count)}{suffix}
    </h3>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dramatic title animation
      gsap.from('.hero-word', {
        y: 120,
        opacity: 0,
        rotationX: 90,
        transformOrigin: 'center bottom',
        duration: 1.2,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 0.3
      });

      // Floating orbs with parallax
      gsap.to('.floating-orb', {
        y: 'random(-40, 40)',
        x: 'random(-40, 40)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.8,
          from: 'random'
        }
      });

      // Smooth gradient pulse
      gsap.to('.gradient-pulse', {
        scale: 1.3,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Scroll-triggered parallax for mobile
      gsap.to('.parallax-slow', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 100
      });

      gsap.to('.parallax-medium', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        },
        y: 150
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Background Mesh */}
      <div className="absolute inset-0">
        <div className="gradient-pulse absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-500/30 rounded-full blur-[120px]" />
        <div className="gradient-pulse absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-light/20 rounded-full blur-[100px]" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-orb absolute w-3 h-3 bg-primary-400/60 rounded-full blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
        {/* Main Title */}
        <div className="mb-8 md:mb-12 parallax-medium">
          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-tight tracking-tight"
            style={{ perspective: '1000px' }}
          >
            <span className="hero-word inline-block">Find</span>{' '}
            <span className="hero-word inline-block">Your</span>{' '}
            <span className="hero-word inline-block text-gradient text-shadow-glow">
              Perfect
            </span>
            <br />
            <span className="hero-word inline-block text-gradient text-shadow-glow">
              Match
            </span>
          </h1>
        </div>

        {/* Subtitle with stagger animation */}
        <motion.div
          className="parallax-slow"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 md:mb-16 max-w-3xl mx-auto font-light"
          >
            India's most loved college dating app.
            <br className="hidden sm:block" />
            Connect with verified students from your campus.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-20 md:mb-32"
        >
          <WaitlistButton size="large" />
          <VideoButton videoUrl="/assets/baebolo.mp4" />
        </motion.div>

        {/* Stats with Counter Animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: 50000, suffix: '+', label: 'Students' },
            { number: 100, suffix: '+', label: 'Colleges' },
            { number: 10000, suffix: '+', label: 'Matches' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 1.4 + index * 0.15, 
                duration: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="relative p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary-500/50 transition-all duration-500 overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent" />
                </div>
                <AnimatedCounter target={stat.number} suffix={stat.suffix} delay={1.6 + index * 0.15} />
                <p className="text-xs md:text-base text-gray-500 group-hover:text-gray-400 transition-colors">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary-500/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-primary-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
