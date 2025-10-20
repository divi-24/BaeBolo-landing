'use client';

import { motion } from 'framer-motion';
import WaitlistButton from './WaitlistButton';
import { Sparkles } from 'lucide-react';

export default function WaitlistSection() {
  const colleges = [
    { name: 'IIT Delhi', count: '2.5K+' },
    { name: 'IIT Bombay', count: '3.1K+' },
    { name: 'DU', count: '5.2K+' },
    { name: 'VIT', count: '2.8K+' },
    { name: 'BITS Pilani', count: '1.9K+' },
    { name: 'NIT', count: '2.2K+' },
  ];

  return (
    <section className="relative py-24 md:py-40 px-4 md:px-6 bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-light/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Floating Icon */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block mb-8"
        >
          <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-primary-400" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8">
            Ready to Find
            <br />
            <span className="text-gradient text-shadow-glow">Your Perfect Match?</span>
          </h2>
          
          <p className="text-lg md:text-2xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto">
            Join <span className="text-primary-400 font-bold">50,000+</span> students already on the waitlist
          </p>

          <div className="flex flex-col items-center gap-6 mb-16 md:mb-20">
            <WaitlistButton size="large" />
            <p className="text-sm md:text-base text-gray-500">
              ✨ Early access • Exclusive perks • No credit card required
            </p>
          </div>

          {/* College Stats */}
          <div className="space-y-4">
            <p className="text-sm md:text-base text-gray-500 uppercase tracking-wider font-semibold mb-6">
              Students from top colleges
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {colleges.map((college, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer"
                >
                  <div className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 group-hover:border-primary-500/50 group-hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="text-primary-400 font-bold text-sm md:text-base relative z-10">{college.count}</span>
                    <span className="text-gray-500 group-hover:text-gray-400 ml-2 text-xs md:text-sm relative z-10 transition-colors">{college.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
