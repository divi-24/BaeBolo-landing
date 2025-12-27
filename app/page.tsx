'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhatIsBaeBolo from '@/components/WhatIsBaeBolo';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import LoveStory from '@/components/LoveStory';
import CompatibilityChecker from '@/components/CompatibilityChecker';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import ScrollProgress from '@/components/ScrollProgress';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash) {
      // Smooth scroll and page load animation after splash
      const ctx = gsap.context(() => {
        gsap.from('main', {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }, mainRef);

      return () => ctx.revert();
    }
  }, [showSplash]);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} duration={3000} />}
      {!showSplash && <ScrollProgress />}
      {!showSplash && <Navigation />}
      <main ref={mainRef} className="relative bg-black">
        <Hero />
        <LoveStory />
        <div id="compatibility-checker">
          <CompatibilityChecker />
        </div>
        <div id="what-is-baebolo">
          <WhatIsBaeBolo />
        </div>
        <Features />
        <HowItWorks />
        <WaitlistSection />
        <Footer />
      </main>
    </>
  );
}
