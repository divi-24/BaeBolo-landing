import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f6',
          100: '#ffe4ed',
          200: '#ffcade',
          300: '#ffa1c2',
          400: '#ff6b9d',
          500: '#fe4d89',
          600: '#ed2468',
          700: '#d01554',
          800: '#ac1447',
          900: '#8f163f',
        },
        accent: {
          light: '#ff8ab3',
          DEFAULT: '#ff6b9d',
          dark: '#fe4d89',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #fe4d89 0%, #ff6b9d 50%, #ff8ab3 100%)',
        'gradient-mesh': 'radial-gradient(at 0% 0%, #fe4d89 0px, transparent 50%), radial-gradient(at 100% 100%, #ff8ab3 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'heartbeat': 'heartbeat 1.3s ease-in-out infinite',
        'flame-flicker': 'flame-flicker 0.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'float-up': 'float-up 3s ease-in infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(254, 60, 114, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(254, 60, 114, 1)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
        },
        'flame-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'float-up': {
          '0%': { transform: 'translateY(100vh) rotateZ(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotateZ(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
