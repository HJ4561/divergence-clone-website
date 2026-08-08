/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Editorial serif for all headings and the logo mark
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        // Plain sans for body copy
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        // Tracked-out mono for eyebrows, status pills, trust badges
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // Near-black background tiers (not pure gray -- slightly ink-tinted)
        ink: {
          950: '#08080a',
          900: '#0d0d10',
          850: '#111114',
          800: '#18181c',
          700: '#232328',
        },
        // Primary CTA color -- warm ivory, not a cyan gradient
        cream: {
          DEFAULT: '#EDE6D6',
          dark: '#DED2B4',
        },
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(94, 234, 212, 0.25)' },
          '50%': { boxShadow: '0 0 0 6px rgba(94, 234, 212, 0)' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '44px 44px' },
        },
        travelDot: {
          '0%': { top: '0%', opacity: '0' },
          '6%': { opacity: '1' },
          '94%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        pulseChase: {
          '0%, 18%, 100%': { boxShadow: '0 0 0 0 rgba(94, 234, 212, 0)', borderColor: 'rgba(255,255,255,0.1)' },
          '6%': { boxShadow: '0 0 24px 5px rgba(94, 234, 212, 0.55)', borderColor: 'rgba(94, 234, 212, 0.6)' },
        },
        svgDraw: {
          '0%, 100%': { strokeDashoffset: '260' },
          '45%, 55%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(16px, -14px)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'draw-line': 'drawLine 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-ring': 'pulseRing 2.4s ease-in-out infinite',
        'grid-pan': 'gridPan 8s linear infinite',
        'travel-dot': 'travelDot 6s linear infinite',
        'pulse-chase': 'pulseChase 6s ease-in-out infinite',
        'svg-draw': 'svgDraw 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};