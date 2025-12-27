'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Particle heart burst animation component
function HeartBurst() {
    const hearts = Array.from({ length: 12 }, (_, i) => i);

    return (
        <>
            {hearts.map((i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1
                    }}
                    animate={{
                        x: Math.cos((i / 12) * Math.PI * 2) * 80,
                        y: Math.sin((i / 12) * Math.PI * 2) * 80,
                        scale: 0.1,
                        opacity: 0
                    }}
                    transition={{
                        duration: 1.2,
                        ease: 'easeOut',
                        delay: i * 0.05
                    }}
                    className="absolute w-6 h-6 text-pink-400"
                >
                    ❤️
                </motion.div>
            ))}
        </>
    );
}

// Sparkle effect
function Sparkles() {
    const sparkles = Array.from({ length: 20 }, (_, i) => i);

    return (
        <>
            {sparkles.map((i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1
                    }}
                    animate={{
                        x: (Math.random() - 0.5) * 120,
                        y: (Math.random() - 0.5) * 120,
                        scale: 0,
                        opacity: 0
                    }}
                    transition={{
                        duration: 1.5,
                        ease: 'easeOut',
                        delay: i * 0.03
                    }}
                    className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full blur-sm"
                />
            ))}
        </>
    );
}

// Main expandable circle with heart
function ExpandingHeartCircle({ isAnimating }: { isAnimating: boolean }) {
    return (
        <div className="relative w-32 h-32 mx-auto">
            {/* Outer pulsing ring */}
            <motion.div
                animate={isAnimating ? {
                    scale: [1, 1.3, 1.1],
                    opacity: [1, 0.8, 0.3]
                } : {
                    scale: 1,
                    opacity: 1
                }}
                transition={isAnimating ? {
                    duration: 1.2,
                    ease: 'easeOut',
                    times: [0, 0.5, 1]
                } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-full border-2 border-primary-500/50"
            />

            {/* Middle pulsing ring */}
            <motion.div
                animate={isAnimating ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 0.4, 0]
                } : {
                    scale: 1,
                    opacity: 0.5
                }}
                transition={isAnimating ? {
                    duration: 1.2,
                    ease: 'easeOut',
                    times: [0, 0.5, 1],
                    delay: 0.1
                } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.2
                }}
                className="absolute inset-2 rounded-full border-2 border-accent-light/40"
            />

            {/* Inner circle with heart */}
            <motion.div
                animate={isAnimating ? {
                    scale: [1, 1.15, 1],
                } : {
                    scale: [1, 1.08, 1]
                }}
                transition={isAnimating ? {
                    duration: 0.8,
                    ease: 'easeOut'
                } : {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-light/20 flex items-center justify-center border-2 border-primary-500/80 shadow-lg shadow-primary-500/50"
            >
                <motion.div
                    animate={isAnimating ? {
                        scale: [1, 1.2, 0.8],
                        rotate: [0, 10, -10, 0]
                    } : {
                        scale: [1, 1.05, 1],
                        rotate: 0
                    }}
                    transition={isAnimating ? {
                        duration: 0.9,
                        ease: 'easeOut'
                    } : {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <Heart className="w-16 h-16 text-primary-500 fill-primary-500 drop-shadow-lg" />
                </motion.div>
            </motion.div>

            {/* Glow effect */}
            <motion.div
                animate={isAnimating ? {
                    opacity: [0, 1, 0.5, 0],
                    scale: [0.8, 1.2, 1.1, 0.9]
                } : {
                    opacity: 0.5
                }}
                transition={isAnimating ? {
                    duration: 1.2,
                    ease: 'easeOut'
                } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-accent-light to-primary-500 blur-xl opacity-50"
            />

            {/* Burst particles */}
            {isAnimating && (
                <>
                    <div className="absolute inset-0">
                        <HeartBurst />
                    </div>
                    <div className="absolute inset-0">
                        <Sparkles />
                    </div>
                </>
            )}
        </div>
    );
}

interface AnimatedCoupleProps {
    compatibility?: number;
    enableOnMobile?: boolean;
}

export default function AnimatedCouple({ compatibility = 85, enableOnMobile = false }: AnimatedCoupleProps) {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [animate, setAnimate] = useState(false);
    const animationTriggeredRef = useRef(false);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);

        // Trigger animation on mount
        const timer = setTimeout(() => {
            setAnimate(true);
            animationTriggeredRef.current = true;
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Re-trigger animation every 4 seconds
    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            setAnimate(false);
            setTimeout(() => setAnimate(true), 100);
        }, 4000);

        return () => clearInterval(interval);
    }, [mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="relative w-full px-4 py-8 sm:py-12"
        >
            <div className="bg-gradient-to-br from-primary-900/20 via-transparent to-accent-light/10 rounded-3xl p-8 sm:p-12 border border-primary-500/20 backdrop-blur-sm overflow-hidden">

                {/* Background gradient */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-accent-light/5 rounded-full blur-2xl" />
                </div>

                {/* Main content */}
                <div className="relative z-10 text-center">
                    {/* Heart burst animation */}
                    <motion.div
                        className="mb-8 sm:mb-12 flex justify-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                    >
                        <ExpandingHeartCircle isAnimating={animate} />
                    </motion.div>

                    {/* Text content */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-primary-400 via-pink-400 to-accent-light bg-clip-text text-transparent mb-3">
                            Love in the Air ✨
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 max-w-md mx-auto leading-relaxed px-2">
                            When two hearts beat as one, magic happens. Get ready to find your perfect match!
                        </p>
                    </motion.div>

                    {/* Floating hearts decoration */}
                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 2 + i * 0.3,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                                className="text-2xl sm:text-3xl"
                            >
                                {i === 0 ? '💕' : i === 1 ? '❤️' : '💗'}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
