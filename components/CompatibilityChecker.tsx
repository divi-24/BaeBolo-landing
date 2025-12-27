'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flame, Share2, Sparkles, TrendingUp, Check, Copy } from 'lucide-react';

interface Question {
    id: number;
    question: string;
    category: string;
    options: { text: string; value: number }[];
}

interface Answer {
    questionId: number;
    value: number;
}

// Expanded question pool
const questionPool: Question[] = [
    {
        id: 1,
        question: '🌙 It\'s 2 AM and you both are awake. What are you doing?',
        category: 'lifestyle',
        options: [
            { text: 'Deep conversations on life', value: 90 },
            { text: 'Laughing at memes together', value: 85 },
            { text: 'Just vibing, no phones', value: 80 },
            { text: 'Planning our next adventure', value: 95 },
        ],
    },
    {
        id: 2,
        question: '💔 You had a rough day. How do they help?',
        category: 'communication',
        options: [
            { text: 'Listen without judgment & hug it out', value: 95 },
            { text: 'Make me laugh & take my mind off it', value: 85 },
            { text: 'Fix the problem with action', value: 70 },
            { text: 'Give me space to vent', value: 80 },
        ],
    },
    {
        id: 3,
        question: '🍕 Your ideal college date is...',
        category: 'romance',
        options: [
            { text: 'Pizza in your room binge-watching shows', value: 85 },
            { text: 'Exploring a new city together', value: 90 },
            { text: 'Café hopping with deep talks', value: 85 },
            { text: 'Whatever makes them happy', value: 100 },
        ],
    },
    {
        id: 4,
        question: '🚀 Future together - what matters most?',
        category: 'values',
        options: [
            { text: 'Growing together & supporting each other\'s dreams', value: 95 },
            { text: 'Having fun & living in the moment', value: 80 },
            { text: 'Being comfortable & secure', value: 75 },
            { text: 'Just seeing where it goes', value: 70 },
        ],
    },
    {
        id: 5,
        question: '💕 You show love by...',
        category: 'affection',
        options: [
            { text: 'Random hugs, cuddles & physical affection', value: 85 },
            { text: 'Remembering small details about them', value: 90 },
            { text: 'Doing things that help them', value: 85 },
            { text: 'Telling them how much they mean', value: 95 },
        ],
    },
    {
        id: 6,
        question: '🎬 Movie night with your person?',
        category: 'lifestyle',
        options: [
            { text: 'Comedy to laugh together non-stop', value: 85 },
            { text: 'Something that makes us think', value: 80 },
            { text: 'Romantic film - all the feels', value: 90 },
            { text: 'Whatever they choose', value: 95 },
        ],
    },
    {
        id: 7,
        question: '🎁 Your crush surprises you. Ideal surprise?',
        category: 'romance',
        options: [
            { text: 'Thoughtful gift they picked personally', value: 90 },
            { text: 'Spontaneous adventure planned', value: 85 },
            { text: 'Their time & full attention', value: 95 },
            { text: 'Anything they chose is perfect', value: 100 },
        ],
    },
    {
        id: 8,
        question: '✈️ Weekend getaway - your vibe?',
        category: 'lifestyle',
        options: [
            { text: 'Beach with no plans, just us', value: 85 },
            { text: 'City exploration & trying new things', value: 90 },
            { text: 'Mountain hikes & nature', value: 80 },
            { text: 'Somewhere unexpected & different', value: 85 },
        ],
    },
    {
        id: 9,
        question: '😂 What\'s your love language?',
        category: 'affection',
        options: [
            { text: 'Funny jokes & inside humor', value: 85 },
            { text: 'Genuine compliments & appreciation', value: 90 },
            { text: 'Physical touch & closeness', value: 85 },
            { text: 'Actions over words always', value: 80 },
        ],
    },
    {
        id: 10,
        question: '🎵 Music taste matters to you?',
        category: 'values',
        options: [
            { text: 'Totally! We need the same vibe', value: 70 },
            { text: 'Somewhat - but I\'m open minded', value: 85 },
            { text: 'Not really - diversity is good', value: 90 },
            { text: 'Music doesn\'t matter, they do', value: 95 },
        ],
    },
    {
        id: 11,
        question: '💬 Conflict style - you prefer?',
        category: 'communication',
        options: [
            { text: 'Talk it out immediately', value: 90 },
            { text: 'Cool off, then discuss calmly', value: 85 },
            { text: 'Humor to lighten the mood', value: 75 },
            { text: 'Whatever keeps us together', value: 95 },
        ],
    },
    {
        id: 12,
        question: '📱 Phone habits in a relationship?',
        category: 'lifestyle',
        options: [
            { text: 'Put phones away, be present', value: 95 },
            { text: 'Share everything & scroll together', value: 75 },
            { text: 'Have our own space & time', value: 80 },
            { text: 'Depends on the moment', value: 85 },
        ],
    },
    {
        id: 13,
        question: '👥 Social life - how important?',
        category: 'lifestyle',
        options: [
            { text: 'Need an active social life together', value: 80 },
            { text: 'Prefer quality time alone mostly', value: 85 },
            { text: 'Mix of both works best', value: 90 },
            { text: 'Whatever they want', value: 85 },
        ],
    },
    {
        id: 14,
        question: '🎓 Future plans - alignment matters?',
        category: 'values',
        options: [
            { text: 'YES! Need similar goals', value: 95 },
            { text: 'Important but flexible', value: 85 },
            { text: 'Figure it out together as we go', value: 75 },
            { text: 'Love means supporting anything', value: 90 },
        ],
    },
    {
        id: 15,
        question: '🌟 What makes you feel loved?',
        category: 'affection',
        options: [
            { text: 'Words of affirmation constantly', value: 85 },
            { text: 'Acts of service & help', value: 80 },
            { text: 'Physical presence & cuddles', value: 90 },
            { text: 'Quality time doing nothing', value: 85 },
        ],
    },
    {
        id: 16,
        question: '🍷 Parties & going out - your style?',
        category: 'lifestyle',
        options: [
            { text: 'Love the party scene together', value: 80 },
            { text: 'Prefer chill hangouts', value: 85 },
            { text: 'Depends on the vibe', value: 90 },
            { text: 'Whatever they enjoy', value: 85 },
        ],
    },
    {
        id: 17,
        question: '💭 Overthinking vs spontaneous?',
        category: 'personality',
        options: [
            { text: 'Plan everything - no surprises', value: 70 },
            { text: 'Go with the flow always', value: 80 },
            { text: 'Plan big things, wing details', value: 90 },
            { text: 'Match their energy', value: 95 },
        ],
    },
    {
        id: 18,
        question: '💰 Money & spending - opinions?',
        category: 'values',
        options: [
            { text: 'Save & invest for future', value: 80 },
            { text: 'Spend & enjoy the moment', value: 75 },
            { text: 'Balance of both', value: 90 },
            { text: 'Support whatever they want', value: 85 },
        ],
    },
    {
        id: 19,
        question: '🎨 Same interests - dealbreaker?',
        category: 'values',
        options: [
            { text: 'Need EVERYTHING in common', value: 65 },
            { text: 'Most things, but have own hobbies', value: 85 },
            { text: 'Differences keep it interesting', value: 95 },
            { text: 'Don\'t care, love is enough', value: 100 },
        ],
    },
    {
        id: 20,
        question: '🌙 Late night - texting or sleeping?',
        category: 'lifestyle',
        options: [
            { text: 'All-nighters talking to them', value: 85 },
            { text: 'Send goodnight & sleep', value: 80 },
            { text: 'Sometimes texts, mostly sleep', value: 85 },
            { text: 'Whatever they need', value: 95 },
        ],
    },
    {
        id: 21,
        question: '🎯 First date vibes - what matters?',
        category: 'romance',
        options: [
            { text: 'Physical chemistry instantly', value: 75 },
            { text: 'Conversation flow & connection', value: 95 },
            { text: 'Genuine laugh together', value: 90 },
            { text: 'How they make me feel', value: 95 },
        ],
    },
    {
        id: 22,
        question: '🤝 Personal space - how much needed?',
        category: 'lifestyle',
        options: [
            { text: 'Together all the time', value: 75 },
            { text: 'Some independence is healthy', value: 90 },
            { text: 'Definitely need my own space', value: 80 },
            { text: 'Whatever keeps us happy', value: 95 },
        ],
    },
    {
        id: 23,
        question: '😍 First attraction - looks or vibe?',
        category: 'values',
        options: [
            { text: 'Physical attraction essential', value: 70 },
            { text: 'Energy & personality matter more', value: 95 },
            { text: 'Combination of both', value: 85 },
            { text: 'Personality grows attraction', value: 90 },
        ],
    },
    {
        id: 24,
        question: '🏠 Living together - timeline?',
        category: 'values',
        options: [
            { text: 'Soon as possible', value: 75 },
            { text: 'After we really know each other', value: 90 },
            { text: 'Married first', value: 80 },
            { text: 'Whatever feels right naturally', value: 95 },
        ],
    },
    {
        id: 25,
        question: '🎊 Celebrating together - your style?',
        category: 'affection',
        options: [
            { text: 'Big parties & lots of attention', value: 75 },
            { text: 'Intimate celebration with them', value: 95 },
            { text: 'Low-key but meaningful', value: 85 },
            { text: 'However they want to celebrate', value: 90 },
        ],
    },
];

const getFlameCount = (percentage: number): number => {
    if (percentage >= 90) return 5;
    if (percentage >= 75) return 4;
    if (percentage >= 60) return 3;
    if (percentage >= 45) return 2;
    return 1;
};

const getCompatibilityColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-500';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-pink-400';
};

const getCompatibilityMessage = (percentage: number): string => {
    if (percentage >= 90)
        return "🔥 COUPLE GOALS! Y'all are meant to be!";
    if (percentage >= 80)
        return '🔥 Absolutely fire! Insane chemistry!';
    if (percentage >= 70)
        return "💕 Great vibes! Real potential here!";
    if (percentage >= 60) return '✨ Solid match! You click!';
    if (percentage >= 45) return '💭 Worth exploring! Chemistry can grow!';
    return '🌱 Let feelings develop naturally!';
};

const getTips = (percentage: number): string[] => {
    if (percentage >= 90) {
        return [
            "You're basically soulmates, don't waste time!",
            'This person gets you on another level',
            'Plan something memorable together ASAP',
        ];
    }
    if (percentage >= 75) {
        return [
            'You two have serious spark - keep it going!',
            'Be vulnerable & let them in deeper',
            'Create inside jokes & memories together',
        ];
    }
    if (percentage >= 60) {
        return [
            'You have more in common than you think',
            'Take time to really know each other',
            'Let genuine feelings develop naturally',
        ];
    }
    return [
        'Sometimes chemistry takes time to build',
        'Focus on real conversations & genuine connection',
        'See if feelings grow as you get closer',
    ];
};

// Function to randomly select unique questions
function getRandomQuestions(pool: Question[], count: number): Question[] {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Confetti Component
function Confetti() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(40)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: -10,
                        opacity: 1,
                        rotate: 0,
                    }}
                    animate={{
                        y: window.innerHeight + 10,
                        opacity: 0,
                        rotate: 360,
                    }}
                    transition={{
                        duration: 2.5 + Math.random() * 1,
                        ease: 'easeIn',
                        delay: Math.random() * 0.3,
                    }}
                    className="absolute w-3 h-3"
                >
                    <Heart className="w-full h-full text-primary-500 fill-primary-500" />
                </motion.div>
            ))}
        </div>
    );
}

// Premium Scorecard Component - BaeBolo Style
function PremiumScorecard({ compatibility }: { compatibility: number }) {
    const getFlameCount = (score: number) => {
        if (score >= 90) return 5;
        if (score >= 80) return 4;
        if (score >= 70) return 3;
        if (score >= 60) return 2;
        return 1;
    };

    const flameCount = getFlameCount(compatibility);

    return (
        <div
            className="w-full aspect-square rounded-3xl overflow-hidden relative flex flex-col justify-between p-10 text-center shadow-2xl"
            id="premium-scorecard"
            style={{
                background: 'linear-gradient(135deg, #3d1a3d 0%, #1a0f2e 50%, #0f0f1e 100%)',
                boxShadow: '0 25px 50px rgba(236, 72, 153, 0.25)',
            }}
        >
            {/* Decorative Corners */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-3 border-l-3 border-pink-500/70"></div>
            <div className="absolute top-6 right-6 w-8 h-8 border-t-3 border-r-3 border-pink-500/70"></div>
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-3 border-l-3 border-pink-500/70"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-3 border-r-3 border-pink-500/70"></div>

            {/* Subtle background glow */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div
                    className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-pink-600 rounded-full"
                    style={{ filter: 'blur(100px)' }}
                ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between py-8">
                {/* TOP SECTION - Header */}
                <div className="flex flex-col items-center gap-4">
                    {/* Compatibility Header with Hearts */}
                    <h1 className="text-7xl font-black text-pink-400 tracking-wider flex items-center justify-center gap-6">
                        <span className="text-6xl">💖</span>
                        Compatibility
                        <span className="text-6xl">💖</span>
                    </h1>
                </div>

                {/* MIDDLE SECTION - Large Score */}
                <div className="flex flex-col items-center gap-8 -mt-16">
                    {/* Large Percentage */}
                    <div className="text-9xl font-black text-orange-500 leading-none tracking-tight drop-shadow-lg">
                        {compatibility}%
                    </div>

                    {/* Vibe Statement */}
                    <p className="text-3xl font-bold text-white px-4">
                        AMAZING CHEMISTRY
                    </p>

                    {/* Heart Rating */}
                    <div className="text-7xl drop-shadow-md">
                        💗
                    </div>
                </div>

                {/* SCORE BREAKDOWN - Three Categories */}
                <div className="border-2 border-pink-500/40 rounded-3xl p-8 bg-gradient-to-b from-gray-900/60 to-gray-900/20 backdrop-blur-sm mx-4 shadow-xl shadow-pink-500/10">
                    <div className="flex justify-between items-center gap-6">
                        {/* Communication */}
                        <div className="flex flex-col items-center flex-1">
                            <span className="text-6xl mb-3 drop-shadow-lg">💭</span>
                            <p className="text-white font-bold text-lg">Communication</p>
                        </div>

                        {/* Chemistry */}
                        <div className="flex flex-col items-center flex-1 border-l-2 border-r-2 border-pink-500/20 px-4">
                            <span className="text-6xl mb-3 drop-shadow-lg">✨</span>
                            <p className="text-white font-bold text-lg">Chemistry</p>
                        </div>

                        {/* Values */}
                        <div className="flex flex-col items-center flex-1">
                            <span className="text-6xl mb-3 drop-shadow-lg">💎</span>
                            <p className="text-white font-bold text-lg">Values</p>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION - Branding */}
                <div className="flex flex-col items-center gap-3 pt-4 px-4">
                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>

                    {/* Logo & Tagline */}
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-pink-400 text-3xl font-black">
                            BaeBolo
                        </p>
                        <p className="text-gray-200 text-sm font-semibold text-center">India's Most Loved College Dating App</p>
                    </div>

                    {/* CTA */}
                    <p className="text-pink-300 text-base font-bold">Share your love story!</p>
                </div>
            </div>
        </div>
    );
}

// Score Card Component
function ScoreCard({ compatibility, showShare = false, compact = false }: { compatibility: number; showShare?: boolean; compact?: boolean }) {
    const flameCount = getFlameCount(compatibility);

    if (compact) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full aspect-square rounded-3xl overflow-hidden relative flex flex-col justify-between p-10 text-center max-w-md"
                id="compatibility-scorecard"
                style={{
                    background: 'linear-gradient(135deg, #3d1a3d 0%, #1a0f2e 50%, #0f0f1e 100%)',
                }}
            >
                {/* Decorative Corners */}
                <div className="absolute top-6 left-6 w-8 h-8 border-t-3 border-l-3 border-pink-500/70"></div>
                <div className="absolute top-6 right-6 w-8 h-8 border-t-3 border-r-3 border-pink-500/70"></div>
                <div className="absolute bottom-6 left-6 w-8 h-8 border-b-3 border-l-3 border-pink-500/70"></div>
                <div className="absolute bottom-6 right-6 w-8 h-8 border-b-3 border-r-3 border-pink-500/70"></div>

                {/* Subtle background glow */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div
                        className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-pink-600 rounded-full"
                        style={{ filter: 'blur(100px)' }}
                    ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-around py-4">
                    {/* TOP SECTION - Header */}
                    <div className="flex flex-col items-center gap-2">
                        {/* Compatibility Header with Hearts */}
                        <h1 className="text-3xl sm:text-4xl font-black text-pink-400 tracking-wider flex items-center justify-center gap-3">
                            <span className="text-3xl">💖</span>
                            Compatibility
                            <span className="text-3xl">💖</span>
                        </h1>
                    </div>

                    {/* MIDDLE SECTION - Large Score */}
                    <div className="flex flex-col items-center gap-3">
                        {/* Large Percentage */}
                        <div className="text-7xl sm:text-8xl font-black text-orange-500 leading-none tracking-tight drop-shadow-lg">
                            {compatibility}%
                        </div>

                        {/* Vibe Statement */}
                        <p className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-3">
                            <span className="text-2xl sm:text-3xl">🔥</span>
                            AMAZING CHEMISTRY
                            <span className="text-2xl sm:text-3xl">🔥</span>
                        </p>

                        {/* Flame Rating */}
                        <div className="flex justify-center gap-2 text-4xl sm:text-5xl mt-1">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="drop-shadow-md">
                                    {i < flameCount ? '🔥' : '🤍'}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* SCORE BREAKDOWN - Three Categories */}
                    <div className="border-2 border-pink-500/30 rounded-2xl p-4 bg-gray-900/40 backdrop-blur-sm">
                        <div className="flex justify-between items-center gap-3">
                            {/* Communication */}
                            <div className="flex flex-col items-center flex-1">
                                <span className="text-3xl mb-1">💬</span>
                                <p className="text-white font-bold text-xs sm:text-sm">Communication</p>
                            </div>

                            {/* Chemistry */}
                            <div className="flex flex-col items-center flex-1 border-l-2 border-r-2 border-pink-500/20 px-2">
                                <span className="text-3xl mb-1">⚡</span>
                                <p className="text-white font-bold text-xs sm:text-sm">Chemistry</p>
                            </div>

                            {/* Values */}
                            <div className="flex flex-col items-center flex-1">
                                <span className="text-3xl mb-1">🎯</span>
                                <p className="text-white font-bold text-xs sm:text-sm">Values</p>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM SECTION - Branding */}
                    <div className="flex flex-col items-center gap-2 pt-1">
                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"></div>

                        {/* Logo & Tagline */}
                        <p className="text-white text-sm font-black flex items-center justify-center gap-1">
                            <span className="text-lg">✨</span>
                            BaeBolo - India's Most Loved College Dating App
                            <span className="text-lg">💖</span>
                        </p>

                        {/* CTA */}
                        <p className="text-gray-300 text-xs font-medium">Share your love story!</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-900/90 via-gray-900/80 to-black border-3 border-primary-500/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md mx-auto text-center relative overflow-hidden shadow-2xl backdrop-blur-sm"
            id="compatibility-scorecard"
        >
            {/* Background glow effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl" />
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent-light/10 rounded-full blur-2xl" />
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-primary-500/70" />
            <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-primary-500/70" />
            <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-primary-500/70" />
            <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-primary-500/70" />

            {/* Header */}
            <div className="mb-4 sm:mb-6 relative z-10">
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-light bg-clip-text text-transparent mb-1 sm:mb-2 flex items-center justify-center gap-1.5 sm:gap-2">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-primary-500 text-primary-500 drop-shadow-lg" />
                    Compatibility
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-primary-500 text-primary-500 drop-shadow-lg" />
                </h3>
            </div>

            {/* Big Score with glow */}
            <div className="mb-6 sm:mb-8 relative z-10">
                <div className="relative inline-block">
                    {/* Glow background */}
                    <div className={`absolute inset-0 ${getCompatibilityColor(compatibility)} blur-2xl opacity-30 rounded-full`} />
                    <div className={`text-5xl sm:text-6xl md:text-7xl font-black ${getCompatibilityColor(compatibility)} drop-shadow-xl relative`}>
                        {compatibility}%
                    </div>
                </div>
                <p className="text-gray-300 font-bold text-sm sm:text-base mt-3">
                    {compatibility >= 90
                        ? '🔥 COUPLE GOALS 🔥'
                        : compatibility >= 80
                            ? '🔥 AMAZING CHEMISTRY 🔥'
                            : compatibility >= 70
                                ? '💕 GREAT VIBES 💕'
                                : compatibility >= 60
                                    ? '✨ SOLID MATCH ✨'
                                    : compatibility >= 45
                                        ? '💭 WORTH EXPLORING 💭'
                                        : '🌱 KEEP GROWING 🌱'}
                </p>
            </div>

            {/* Flames */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 flex-wrap relative z-10">
                {[...Array(5)].map((_, i) => (
                    <motion.span
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.1
                        }}
                        className="text-2xl sm:text-3xl"
                    >
                        {i < flameCount ? '🔥' : '🤍'}
                    </motion.span>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 p-4 sm:p-5 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} className="transform transition-transform">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-400">💬</div>
                    <div className="text-xs text-gray-300 font-semibold mt-1">Communication</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="transform transition-transform">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-400">⚡</div>
                    <div className="text-xs text-gray-300 font-semibold mt-1">Chemistry</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="transform transition-transform">
                    <div className="text-2xl sm:text-3xl font-bold text-pink-400">🎯</div>
                    <div className="text-xs text-gray-300 font-semibold mt-1">Values</div>
                </motion.div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent mb-4 relative z-10" />

            {/* Footer Message */}
            <div className="text-xs sm:text-sm text-gray-200 font-semibold relative z-10">
                ✨ BaeBolo - India's Most Loved College Dating App 💕
            </div>

            {showShare && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4 border-t border-white/10 relative z-10"
                >
                    <p className="text-xs text-gray-400 mb-3">Share your love story!</p>
                </motion.div>
            )}
        </motion.div>
    );
}

// Animated Couple Component
function AnimatedCouple({ compatibility }: { compatibility: number }) {
    const isHighCompatibility = compatibility >= 75;

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="relative w-56 h-56 mx-auto mb-8 flex items-center justify-center"
        >
            {/* Rotating gradient circle */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-light to-primary-500 rounded-full opacity-25 blur-3xl"
            />

            {/* Main circle */}
            <div className="relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 backdrop-blur-md overflow-hidden">
                <img 
                    src="/i.jpeg" 
                    alt="Couple" 
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            </motion.div>
            );
            }

// Compatibility Breakdown Component
function CompatibilityBreakdown({ compatibility }: { compatibility: number }) {
    const breakdown = [
        { name: '💬 Communication', base: 70 },
        { name: '⚡ Chemistry', base: 65 },
        { name: '🎯 Values Alignment', base: 60 },
        { name: '🎉 Fun Factor', base: 75 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12 space-y-4 bg-white/5 rounded-2xl p-6 border border-white/10"
        >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Compatibility Breakdown
            </h3>
            {breakdown.map((cat, index) => {
                const value = Math.min(
                    100,
                    cat.base + (compatibility - 50) * 0.6 + Math.random() * 10
                );
                return (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.15 }}
                        className="space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-300">
                                {cat.name}
                            </span>
                            <span className="text-sm font-bold text-primary-400">
                                {Math.round(value)}%
                            </span>
                        </div>
                        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(value, 100)}%` }}
                                transition={{ delay: 1.2 + index * 0.15, duration: 1 }}
                                className="h-full bg-gradient-to-r from-primary-500 to-accent-light rounded-full"
                            />
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}

// Tips Section
function RelationshipTips({ compatibility }: { compatibility: number }) {
    const tips = getTips(compatibility);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-10 space-y-3"
        >
            <h3 className="text-lg font-bold text-white mb-4">💡 Our Tips For You</h3>
            {tips.map((tip, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.15 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-primary-500/10 border border-primary-500/20"
                >
                    <span className="text-primary-400 font-bold mt-0.5">•</span>
                    <p className="text-sm text-gray-300">{tip}</p>
                </motion.div>
            ))}
        </motion.div>
    );
}

// Share Modal Component
function ShareModal({ compatibility, isOpen, onClose }: { compatibility: number; isOpen: boolean; onClose: () => void }) {
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/baebolo-compatibility?score=${compatibility}`;

    const getShareMessage = () => {
        if (compatibility >= 90) {
            return `We're ${compatibility}% compatible on BaeBolo - literally SOULMATES!\n\nTake the test NOW & discover your true connection with the #1 college dating app.\n\nFind out if you're our couple goals match!`;
        } else if (compatibility >= 80) {
            return `${compatibility}% COMPATIBLE on BaeBolo! That's INSANE chemistry!\n\nTake the test in 2 mins & find your perfect match. Your crush might just be waiting.\n\nDon't miss out - test your compatibility NOW!`;
        } else if (compatibility >= 70) {
            return `We scored ${compatibility}% on BaeBolo's compatibility test!\n\nWant to know if you two have REAL connection? It's quick, fun & totally accurate.\n\nChallenge your crush on BaeBolo today!`;
        } else if (compatibility >= 60) {
            return `${compatibility}% match found on BaeBolo!\n\nJoin thousands of college couples discovering their real chemistry. 2-minute test. Real results.\n\nFind YOUR perfect match on BaeBolo now!`;
        } else {
            return `Just tested our chemistry on BaeBolo & got ${compatibility}%!\n\nReady to discover YOUR compatibility score? Test now & see if you're the match made in heaven.\n\nTake the BaeBolo challenge!`;
        }
    };

    const shareText = getShareMessage();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateScoreImage = async () => {
        try {
            setDownloading(true);
            const { default: html2canvas } = await import('html2canvas');

            // Get the premium scorecard element
            const element = document.getElementById('premium-scorecard');
            if (!element) {
                console.error('Premium scorecard element not found');
                alert('Error: Could not find scorecard. Please refresh and try again.');
                return null;
            }

            // Create a clone to render without animations
            const clone = element.cloneNode(true) as HTMLElement;
            clone.style.position = 'fixed';
            clone.style.left = '-9999px';
            clone.style.top = '-9999px';
            clone.style.width = '1080px';
            clone.style.height = '1080px';
            clone.style.zIndex = '-9999';
            document.body.appendChild(clone);

            // Wait for rendering
            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(clone, {
                backgroundColor: '#0a0a0a',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
                width: 1080,
                height: 1080,
                windowWidth: 1080,
                windowHeight: 1080,
            });

            const image = canvas.toDataURL('image/png', 1);

            // Clean up
            document.body.removeChild(clone);

            return image;
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Error downloading scorecard. Please try again!');
            return null;
        } finally {
            setDownloading(false);
        }
    };

    const handleDownloadImage = async () => {
        const image = await generateScoreImage();
        if (image) {
            try {
                const link = document.createElement('a');
                link.href = image;
                link.download = `baebolo-card.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                alert('✨ Scorecard downloaded! Share it everywhere! 💕');
            } catch (error) {
                console.error('Error downloading file:', error);
                alert('Error downloading. Try opening in a different browser.');
            }
        }
    };

    const handleShareSocial = async (platform: 'whatsapp' | 'twitter' | 'instagram') => {
        try {
            const shareTextForUrl = shareText.split('\n').join(' ');
            const encodedText = encodeURIComponent(shareTextForUrl);

            if (platform === 'whatsapp') {
                // Open WhatsApp with pre-filled message including link
                const whatsappUrl = `https://wa.me/?text=${encodedText}%0A%0A${encodeURIComponent(shareUrl)}`;
                window.open(whatsappUrl, '_blank');
            } else if (platform === 'twitter') {
                // Open Twitter with text and URL
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(shareUrl)}&hashtags=BaeBolo,compatibility`;
                window.open(twitterUrl, '_blank');
            } else if (platform === 'instagram') {
                // For Instagram, copy caption and download image
                await generateScoreImage();
                navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}\n\n@baebolo`);
                alert('📋 Caption copied!\n\n🎨 Steps:\n1. Open Instagram\n2. Create a new post\n3. Upload your compatibility card (tap "Download Your Card" first)\n4. Paste the caption\n5. Share!\n\n💕 Don\'t forget to tag @baebolo!');
                handleDownloadImage();
            }
        } catch (error) {
            console.error('Share error:', error);
            alert('Error sharing. Please try again!');
        }
    };

    const handleNativeShare = async () => {
        if (typeof window !== 'undefined' && 'share' in navigator) {
            try {
                setDownloading(true);
                const image = await generateScoreImage();

                const shareData: ShareData = {
                    title: 'BaeBolo Compatibility Test',
                    text: shareText,
                    url: shareUrl,
                };

                // Try to share with image if supported
                if (image && typeof navigator.share === 'function') {
                    try {
                        const blob = await fetch(image).then(res => res.blob());
                        const file = new File([blob], `baebolo-compatibility-${compatibility}%.png`, { type: 'image/png' });

                        if (navigator.canShare?.({ files: [file] })) {
                            await navigator.share({
                                ...shareData,
                                files: [file],
                            });
                        } else {
                            // Fallback: share without image
                            await navigator.share(shareData);
                        }
                    } catch (fileShareErr) {
                        console.log('Could not share with file, trying text only');
                        await navigator.share(shareData);
                    }
                } else {
                    await navigator.share(shareData);
                }
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    console.log('Share error:', err);
                }
            } finally {
                setDownloading(false);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-primary-500/40 rounded-3xl p-4 sm:p-6 max-w-sm w-full shadow-2xl"
                    >
                        {/* Header with close button */}
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-white">
                                Share Score! 🎉
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white text-2xl leading-none transition-colors"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed">
                            Show your compatibility & challenge your crush
                        </p>

                        {/* Score Preview - Optimized for Modal */}
                        <div className="mb-6 rounded-2xl overflow-hidden border-2 border-primary-500/50 bg-gradient-to-br from-purple-900/30 via-black to-black p-6 shadow-2xl shadow-primary-500/30">
                            {/* Scorecard Content */}
                            <div className="space-y-4">
                                {/* Title */}
                                <div className="text-center">
                                    <p className="text-xs text-pink-300/70 font-semibold tracking-widest uppercase mb-2">Compatibility Score</p>
                                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                                        {compatibility}%
                                    </div>
                                </div>

                                {/* Heart Rating */}
                                <div className="flex justify-center">
                                    <span className="text-4xl animate-pulse">💗</span>
                                </div>

                                {/* Vibe Message */}
                                <p className="text-center text-sm font-bold text-white">
                                    {compatibility >= 80 ? '🚀 Seriously Hot!' : compatibility >= 70 ? '💫 Pretty Great!' : '🌟 Good Vibes!'}
                                </p>

                                {/* Score Breakdown */}
                                <div className="border-t border-pink-500/20 pt-4 grid grid-cols-3 gap-3">
                                    <div className="text-center">
                                        <span className="text-3xl drop-shadow">💭</span>
                                        <p className="text-xs text-gray-300 font-semibold mt-1">Communication</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-3xl drop-shadow">✨</span>
                                        <p className="text-xs text-gray-300 font-semibold mt-1">Chemistry</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-3xl drop-shadow">💎</span>
                                        <p className="text-xs text-gray-300 font-semibold mt-1">Values</p>
                                    </div>
                                </div>

                                {/* BaeBolo Branding */}
                                <div className="border-t border-pink-500/20 pt-4 text-center">
                                    <p className="text-xs text-gray-300">
                                        <span className="font-bold text-pink-400">BaeBolo</span>
                                        <span className="mx-1">💕</span>
                                        India's Dating App
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Hidden Premium Scorecard for Download */}
                        <div className="hidden">
                            <PremiumScorecard compatibility={compatibility} />
                        </div>

                        {/* Share Options */}
                        <div className="space-y-2 mb-2">
                            {typeof window !== 'undefined' && 'share' in navigator && (
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleNativeShare}
                                    className="w-full py-3 bg-gradient-to-r from-primary-500 via-pink-500 to-accent-light rounded-xl font-bold text-white hover:shadow-xl hover:shadow-primary-500/50 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm shadow-lg"
                                >
                                    <Share2 className="w-4 h-4" />
                                    📤 Share My Score
                                </motion.button>
                            )}

                            {/* Download Image Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDownloadImage}
                                disabled={downloading}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-600 disabled:opacity-50 rounded-xl font-bold text-white active:scale-95 transition-all flex items-center justify-center gap-2 text-sm shadow-lg"
                            >
                                {downloading ? (
                                    <>
                                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="inline-block">
                                            ✨
                                        </motion.span>
                                        Creating magic...
                                    </>
                                ) : (
                                    <>
                                        <span>📥</span>
                                        Download Your Card
                                    </>
                                )}
                            </motion.button>

                            {/* Social Buttons */}
                            <div className="grid grid-cols-3 gap-2 pt-1">
                                <motion.button
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleShareSocial('whatsapp')}
                                    className="py-3 bg-gradient-to-b from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:via-green-500 hover:to-green-600 rounded-lg font-bold text-white active:scale-95 transition-all text-xs sm:text-sm flex flex-col items-center gap-1 shadow-lg hover:shadow-green-500/50"
                                >
                                    <span className="text-2xl">💬</span>
                                    <span className="hidden sm:inline text-xs font-bold">Chat</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleShareSocial('twitter')}
                                    className="py-3 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 hover:from-blue-300 hover:via-blue-400 hover:to-blue-500 rounded-lg font-bold text-white active:scale-95 transition-all text-xs sm:text-sm flex flex-col items-center gap-1 shadow-lg hover:shadow-blue-500/50"
                                >
                                    <span className="text-2xl">𝕏</span>
                                    <span className="hidden sm:inline text-xs font-bold">Post</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleShareSocial('instagram')}
                                    className="py-3 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:from-pink-400 hover:via-red-400 hover:to-yellow-400 rounded-lg font-bold text-white active:scale-95 transition-all text-xs sm:text-sm flex flex-col items-center gap-1 shadow-lg hover:shadow-pink-500/50"
                                >
                                    <span className="text-2xl">📸</span>
                                    <span className="hidden sm:inline text-xs font-bold">Story</span>
                                </motion.button>
                            </div>

                            {/* Copy Link */}
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCopyLink}
                                className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 text-xs sm:text-sm ${copied
                                    ? 'bg-gradient-to-r from-green-600 to-green-500 border border-green-400 text-white shadow-lg shadow-green-500/50'
                                    : 'bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/30 hover:border-white/50 shadow-md'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5 }}>
                                            <Check className="w-4 h-4" />
                                        </motion.span>
                                        Copied! 🎉
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy Link
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function CompatibilityChecker() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [compatibility, setCompatibility] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    // Initialize with random questions on mount
    useEffect(() => {
        setQuestions(getRandomQuestions(questionPool, 5));
    }, []);

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers];
        const existingIndex = newAnswers.findIndex(
            (a) => a.questionId === questions[currentQuestion].id
        );

        if (existingIndex >= 0) {
            newAnswers[existingIndex].value = value;
        } else {
            newAnswers.push({ questionId: questions[currentQuestion].id, value });
        }

        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const avg =
                newAnswers.reduce((sum, a) => sum + a.value, 0) / newAnswers.length;
            const finalScore = Math.round(avg);
            setCompatibility(finalScore);
            setShowResult(true);

            if (finalScore >= 80) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3500);
            }
        }
    };

    const resetChecker = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResult(false);
        setCompatibility(0);
        setShowConfetti(false);
        setShowShareModal(false);
        // Load new random questions
        setQuestions(getRandomQuestions(questionPool, 5));
    };

    const flameCount = getFlameCount(compatibility);

    // Don't render until questions are loaded
    if (questions.length === 0) {
        return null;
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-black">
            {showConfetti && <Confetti />}
            <ShareModal compatibility={compatibility} isOpen={showShareModal} onClose={() => setShowShareModal(false)} />

            {/* Animated background */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-screen filter blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-light rounded-full mix-blend-screen filter blur-3xl"
            />

            <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-12"
                >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                        <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-primary-500 animate-pulse" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-primary-500 via-pink-500 to-accent-light bg-clip-text text-transparent">
                            How Compatible?
                        </h2>
                        <Flame className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500 fill-orange-500 animate-pulse" />
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-lg mx-auto font-medium px-2">
                        Answer honestly & find out your real chemistry 💕
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-white/20 shadow-2xl"
                        >
                            {/* Progress */}
                            <div className="mb-8 sm:mb-10">
                                <div className="flex justify-between mb-2 sm:mb-3">
                                    <span className="text-xs sm:text-sm font-semibold text-gray-400">
                                        Q{currentQuestion + 1} of {questions.length}
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-primary-400">
                                        {Math.round(
                                            ((currentQuestion + 1) / questions.length) * 100
                                        )}%
                                    </span>
                                </div>
                                <div className="w-full h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary-500 to-accent-light rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${((currentQuestion + 1) / questions.length) * 100
                                                }%`,
                                        }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <motion.div
                                key={questions[currentQuestion].id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-8 sm:mb-10"
                            >
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 leading-relaxed">
                                    {questions[currentQuestion].question}
                                </h3>

                                {/* Answer options */}
                                <div className="grid grid-cols-1 gap-2.5 sm:gap-3 md:gap-4">
                                    {questions[currentQuestion].options.map((option, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAnswer(option.value)}
                                            className="group py-3 sm:py-4 px-4 sm:px-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-primary-500/30 hover:to-primary-400/20 text-white transition-all duration-300 font-medium text-left text-sm sm:text-base border border-white/15 hover:border-primary-500/50 flex items-center justify-between gap-3"
                                        >
                                            <span className="block flex-1">{option.text}</span>
                                            <motion.div
                                                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white/30 group-hover:border-primary-400 group-hover:bg-primary-500/20 transition-all flex-shrink-0"
                                                whileHover={{ scale: 1.1 }}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-white/10">
                                <button
                                    onClick={() =>
                                        setCurrentQuestion(Math.max(0, currentQuestion - 1))
                                    }
                                    disabled={currentQuestion === 0}
                                    className="px-3 sm:px-5 py-2 text-xs sm:text-sm text-gray-400 hover:text-white disabled:opacity-30 transition-colors font-medium"
                                >
                                    ← Back
                                </button>
                                <div className="flex gap-1.5">
                                    {[...Array(questions.length)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`h-1.5 sm:h-2 rounded-full transition-all ${i < currentQuestion + 1
                                                ? 'w-6 sm:w-8 bg-primary-500'
                                                : 'w-1.5 sm:w-2 bg-white/20'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6 sm:space-y-8"
                        >
                            {/* Couple Animation */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
                            >
                                <AnimatedCouple compatibility={compatibility} />
                            </motion.div>

                            {/* Score */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.3, type: 'spring' }}
                                className="text-center"
                            >
                                <div
                                    className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black ${getCompatibilityColor(
                                        compatibility
                                    )} drop-shadow-lg mb-2 sm:mb-4 animate-pulse`}
                                >
                                    {compatibility}%
                                </div>
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-bold px-2">
                                    {getCompatibilityMessage(compatibility)}
                                </p>
                            </motion.div>

                            {/* Flames */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex justify-center gap-2 sm:gap-3 flex-wrap"
                            >
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 150 }}
                                    >
                                        <Flame
                                            className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${i < flameCount
                                                ? 'text-orange-500 fill-orange-500 drop-shadow-lg animate-bounce'
                                                : 'text-gray-700'
                                                }`}
                                            style={{
                                                animationDelay: i < flameCount ? `${i * 0.1}s` : 'unset',
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Score Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="w-full"
                            >
                                <ScoreCard compatibility={compatibility} showShare={true} />
                            </motion.div>

                            {/* Breakdown & Tips */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <CompatibilityBreakdown compatibility={compatibility} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <RelationshipTips compatibility={compatibility} />
                            </motion.div>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full pt-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetChecker}
                                    className="px-5 py-3 sm:py-4 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl font-semibold text-white transition-all text-sm sm:text-base"
                                >
                                    Try Again
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowShareModal(true)}
                                    className="col-span-1 sm:col-span-1 lg:col-span-1 px-5 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-light rounded-lg sm:rounded-xl font-bold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Share Score
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-3 sm:py-4 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 text-sm sm:text-base col-span-1 sm:col-span-2 lg:col-span-1"
                                >
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Find Your Match
                                </motion.button>
                            </motion.div>

                            {/* Playful footer */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="text-center text-xs sm:text-sm text-gray-400 italic px-2"
                            >
                                ✨ Ready to find your perfect match on BaeBolo?
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
