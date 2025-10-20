'use client';

import { Heart, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Brand */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-black text-gradient mb-4 flex items-center justify-center gap-2">
            BaeBolo <Heart className="w-6 h-6 md:w-7 md:h-7 text-primary-400 fill-primary-400" />
          </h3>
          <p className="text-sm md:text-base text-gray-400 mb-8 max-w-md mx-auto">
            India's #1 college dating app. Making campus connections fun, safe, and meaningful.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 justify-center">
            {[
              { icon: Instagram, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Mail, href: 'mailto:baebolo.dating@gmail.com' },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 flex items-center justify-center transition-all duration-300 group"
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © 2025 BaeBolo. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-500/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
            </span>
            <span className="text-sm font-semibold">Coming Soon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
