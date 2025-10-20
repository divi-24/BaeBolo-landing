'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Users, Heart, MessageCircle, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card entrance
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotationX: 45,
        duration: 0.9,
        stagger: {
          amount: 0.6,
          from: 'start',
          ease: 'power2.out'
        },
        ease: 'back.out(1.4)'
      });

      // Icon float on scroll
      gsap.to('.feature-icon', {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -20,
        ease: 'none'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'College Verified',
      description: 'Only verified college students. Safe and authentic connections.'
    },
    {
      icon: Sparkles,
      title: 'Smart Matching',
      description: 'AI-powered algorithm finds your perfect match based on interests.'
    },
    {
      icon: Users,
      title: 'Campus Network',
      description: 'Connect with students from your college and nearby campuses.'
    },
    {
      icon: Heart,
      title: 'Real Connections',
      description: 'Build meaningful relationships with like-minded people.'
    },
    {
      icon: MessageCircle,
      title: 'Private Messaging',
      description: 'Secure and private conversations. Your data, your control.'
    },
    {
      icon: Zap,
      title: 'Instant Matches',
      description: 'Get matched instantly when mutual interest is detected.'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6"
          >
            Why <span className="text-gradient">BaeBolo</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to find your perfect match
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative"
            >
              <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary-500/50 transition-all duration-500 h-full">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6 feature-icon">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-primary-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 relative">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed relative">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
