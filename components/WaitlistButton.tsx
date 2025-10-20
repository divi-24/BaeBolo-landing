'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface WaitlistButtonProps {
  size?: 'small' | 'medium' | 'large';
}

interface FormData {
  name: string;
  email: string;
  college: string;
}

export default function WaitlistButton({ size = 'medium' }: WaitlistButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  
  // Magnetic button effect
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const sizeClasses = {
    small: 'px-6 py-3 text-base',
    medium: 'px-8 py-4 text-lg',
    large: 'px-10 py-5 text-lg md:px-12 md:text-xl',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.15);
    mouseY.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error(`You're already on the waitlist! Position #${result.position}`);
        } else {
          toast.error(result.error || 'Something went wrong!');
        }
        setIsSubmitting(false);
        return;
      }

      toast.success(`🎉 Welcome aboard! You're #${result.position} on the waitlist!`, {
        duration: 5000,
      });
      
      setIsModalOpen(false);
      reset();
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Oops! Something went wrong. Try again!');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Magnetic Button with shimmer effect */}
      <motion.button
        ref={buttonRef}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className={`${sizeClasses[size]} font-bold rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/60 transition-all duration-500 flex items-center gap-2 relative overflow-hidden group`}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="relative">Join the Waitlist</span>
      </motion.button>

      {/* Modern Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black p-6 md:p-8 rounded-3xl max-w-md w-full border border-white/10 relative overflow-hidden"
            >
              {/* Animated gradient orbs */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/30 rounded-full blur-3xl" 
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl" 
              />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-gradient mb-2">Join the Waitlist</h2>
                  <p className="text-gray-400 mb-6">Be the first to experience BaeBolo 🚀</p>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 md:py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-500 focus:bg-white/10 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      placeholder="College Email"
                      className="w-full px-4 py-3 md:py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-500 focus:bg-white/10 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <input
                      {...register('college', { required: 'College name is required' })}
                      type="text"
                      placeholder="Your College"
                      className="w-full px-4 py-3 md:py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-500 focus:bg-white/10 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    />
                    {errors.college && <p className="text-red-400 text-sm mt-1">{errors.college.message}</p>}
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/60 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <>
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <span>Reserve My Spot 🎉</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
