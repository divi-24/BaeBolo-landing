'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Flame, Sparkles } from 'lucide-react';
import VideoBackground from './VideoBackground';

const storySteps = [
  {
    icon: Sparkles,
    title: 'Create Your Profile',
    description: 'Show your true self with photos and interests',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Flame,
    title: 'Get Matched',
    description: 'Our AI finds people who vibe with you',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Heart,
    title: 'Connect & Chat',
    description: 'Have real conversations with real people',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Heart,
    title: 'Find Your Person',
    description: 'Build something meaningful and beautiful',
    color: 'from-red-500 to-pink-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function LoveStory() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-light rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Your Love Story Starts Here
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From first swipe to forever - watch how connections turn into something magical
          </p>
        </motion.div>

        {/* Video Background Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <VideoBackground />
        </motion.div>

        {/* Story Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {storySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                {/* Background gradient card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Card content */}
                <div className="relative p-6 md:p-8 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`mb-4 inline-block p-3 rounded-lg bg-gradient-to-br ${step.color}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Text content */}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover indicator line */}
                  {index < storySteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-12 py-4 bg-gradient-primary rounded-full font-semibold text-white shadow-lg shadow-primary-500/50 hover:shadow-xl hover:shadow-primary-500/60 transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
