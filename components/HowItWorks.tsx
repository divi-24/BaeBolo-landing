'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { UserPlus, Search, Heart, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Tilt Card Component with 3D effect
function TiltCard({ step, index, isLast }: { step: any; index: number; isLast: boolean }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="step-card relative">
      {/* Connecting Line */}
      {!isLast && (
        <div className="step-line hidden lg:block absolute top-1/4 left-full w-full h-[2px] bg-gradient-to-r from-primary-500/50 to-transparent origin-left" style={{ zIndex: 0 }} />
      )}

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
        className="relative group"
      >
        {/* Card */}
        <motion.div
          whileHover={{ scale: 1.05, z: 50 }}
          className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 hover:border-primary-500/50 transition-all duration-500"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Hover glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-transparent transition-all duration-500" />

          {/* Number Badge */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-primary-500/50 z-10"
            style={{ transform: 'translateZ(30px)' }}
          >
            {step.number}
          </motion.div>

          {/* Icon */}
          <div className="mb-6" style={{ transform: 'translateZ(20px)' }}>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center relative overflow-hidden"
            >
              {/* Icon shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <step.icon className="w-8 h-8 text-primary-400 relative z-10" />
            </motion.div>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold mb-3 relative" style={{ transform: 'translateZ(15px)' }}>
            {step.title}
          </h3>
          <p className="text-gray-400 leading-relaxed relative" style={{ transform: 'translateZ(10px)' }}>
            {step.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 75%',
        },
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.4)'
      });

      // Animate connecting lines
      gsap.from('.step-line', {
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 75%',
        },
        scaleX: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: 'Sign Up',
      description: 'Create your profile with college email verification'
    },
    {
      icon: Search,
      number: '02',
      title: 'Discover',
      description: 'Browse verified profiles from your campus'
    },
    {
      icon: Heart,
      number: '03',
      title: 'Match',
      description: 'Swipe right on people you like'
    },
    {
      icon: MessageCircle,
      number: '04',
      title: 'Connect',
      description: 'Start chatting and build connections'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-6 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Four simple steps to find your perfect match
          </p>
        </div>

        <div className="steps-container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <TiltCard key={index} step={step} index={index} isLast={index === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
