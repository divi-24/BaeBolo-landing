import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface ScorecardData {
    compatibilityScore: number;
    communication?: number;
    chemistry?: number;
    values?: number;
    couple?: {
        name1?: string;
        name2?: string;
    };
}

const CompatibilityScorecard: React.FC<{ data?: ScorecardData }> = ({
    data = {
        compatibilityScore: 82,
        communication: 85,
        chemistry: 82,
        values: 79,
        couple: {
            name1: 'You',
            name2: 'Them',
        },
    },
}) => {
    const scoreCardRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);

    const downloadScorecard = async () => {
        if (!scoreCardRef.current) return;
        setDownloading(true);

        try {
            const canvas = await html2canvas(scoreCardRef.current, {
                scale: 3,
                backgroundColor: null,
                logging: false,
                useCORS: true,
                allowTaint: true,
            });

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `baebolo-${data.couple?.name1}-${data.couple?.name2}-${Date.now()}.png`;
            link.click();
        } catch (err) {
            console.error('Error downloading scorecard:', err);
        } finally {
            setDownloading(false);
        }
    };

    const getFlameCount = (score: number) => {
        if (score >= 90) return 5;
        if (score >= 80) return 4;
        if (score >= 70) return 3;
        if (score >= 60) return 2;
        return 1;
    };

    const flameCount = getFlameCount(data.compatibilityScore);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 gap-8">
            {/* Scorecard - Optimized for Instagram Stories (1080x1920px) */}
            <div
                ref={scoreCardRef}
                className="w-full max-w-[540px] aspect-video rounded-2xl overflow-hidden relative flex flex-col justify-between p-6 md:p-8"
                style={{
                    background: 'linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 40%, #0f0f1e 100%)',
                    boxShadow: '0 20px 60px rgba(236, 72, 153, 0.3)',
                }}
            >
                {/* Decorative Corners */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-pink-500/60"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-pink-500/60"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-pink-500/60"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-pink-500/60"></div>

                {/* Subtle background glow - Enhanced */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div
                        className="absolute -top-1/3 -right-1/3 w-80 h-80 bg-pink-600 rounded-full"
                        style={{ filter: 'blur(80px)' }}
                    ></div>
                    <div
                        className="absolute -bottom-1/4 -left-1/4 w-64 h-64 bg-purple-600 rounded-full"
                        style={{ filter: 'blur(80px)', opacity: 0.5 }}
                    ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* TOP SECTION - Couple Names */}
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-xs tracking-widest text-pink-300/80 font-semibold uppercase">Compatibility Score</p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-sm md:text-base font-semibold text-white truncate">{data.couple?.name1}</span>
                            <span className="text-pink-400 text-xl md:text-2xl">💕</span>
                            <span className="text-sm md:text-base font-semibold text-white truncate">{data.couple?.name2}</span>
                        </div>
                    </div>

                    {/* MIDDLE SECTION - Score Display */}
                    <div className="flex flex-col items-center gap-3 py-2">
                        {/* Large Score */}
                        <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-none tracking-tight">
                            {data.compatibilityScore}%
                        </div>

                        {/* Flame Rating - More Prominent */}
                        <div className="flex justify-center gap-1 text-4xl md:text-5xl">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < flameCount ? 'animate-pulse' : ''}>
                                    {i < flameCount ? '🔥' : '✨'}
                                </span>
                            ))}
                        </div>

                        {/* Vibe Statement */}
                        <p className="text-base md:text-xl font-bold text-white text-center">
                            {data.compatibilityScore >= 80 ? '🚀 Seriously Hot!' : data.compatibilityScore >= 70 ? '💫 Pretty Great!' : '🌟 Good Vibes!'}
                        </p>
                    </div>

                    {/* BOTTOM SECTION - Score Breakdown with Percentages */}
                    <div className="border border-pink-500/30 rounded-xl p-4 md:p-5 bg-gradient-to-r from-gray-900/40 to-purple-900/20 backdrop-blur-sm">
                        <div className="flex justify-between items-center gap-2 md:gap-3">
                            {/* Communication */}
                            <div className="flex flex-col items-center flex-1 gap-1">
                                <span className="text-2xl md:text-3xl">💬</span>
                                <p className="text-xs md:text-sm font-semibold text-white text-center">{data.communication || 85}%</p>
                            </div>

                            {/* Chemistry */}
                            <div className="flex flex-col items-center flex-1 gap-1">
                                <span className="text-2xl md:text-3xl">⚡</span>
                                <p className="text-xs md:text-sm font-semibold text-white text-center">{data.chemistry || 82}%</p>
                            </div>

                            {/* Values */}
                            <div className="flex flex-col items-center flex-1 gap-1">
                                <span className="text-2xl md:text-3xl">🎯</span>
                                <p className="text-xs md:text-sm font-semibold text-white text-center">{data.values || 79}%</p>
                            </div>
                        </div>
                    </div>

                    {/* TOP SECTION - Branding & CTA */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        {/* BaeBolo Logo - Subtle */}
                        <div className="flex items-center justify-center gap-1">
                            <span className="text-lg md:text-xl font-black text-pink-400">BaeBolo</span>
                            <span className="text-base">💕</span>
                        </div>

                        {/* Tagline */}
                        <p className="text-gray-200 text-xs md:text-sm font-medium leading-tight">
                            India's Dating App for Your Love Story
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-[540px]">
                {/* Download Button */}
                <button
                    onClick={downloadScorecard}
                    disabled={downloading}
                    className="flex-1 px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-sm md:text-base flex items-center justify-center gap-2"
                >
                    {downloading ? (
                        <>
                            <span className="animate-spin">⏳</span>
                            Saving...
                        </>
                    ) : (
                        <>
                            📥 Download
                        </>
                    )}
                </button>

                {/* Share Prompt */}
                <button
                    onClick={() => alert('Share this on Instagram Stories, WhatsApp Status, or with your special someone!')}
                    className="flex-1 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 text-sm md:text-base flex items-center justify-center gap-2"
                >
                    📤 Share Story
                </button>
            </div>

            {/* Subtle Social Hint */}
            <p className="text-xs md:text-sm text-gray-400 text-center max-w-[540px]">
                ✨ Perfect for Instagram Stories, WhatsApp Status & Screenshots • Find your match on BaeBolo
            </p>
        </div>
    );
};

export default CompatibilityScorecard;
