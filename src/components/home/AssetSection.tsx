// src/components/home/AssetSection.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface AssetItem {
  id: number;
  title: string;
  description: string;
  image: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

interface AssetSectionData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  assets: AssetItem[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// SVG COMPONENTS
// ============================================================
function SingleNode() {
  return (
    <svg viewBox="0 0 80 50" className="w-16 h-10" aria-hidden="true">
      <circle cx="40" cy="25" r="6" fill="#5eead4" fillOpacity="0.25" stroke="#5eead4" strokeWidth="1.5">
        <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.25;0.4;0.25" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="25" r="2" fill="#5eead4" fillOpacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function SeveralNodes() {
  const points = [
    [16, 14], [40, 10], [64, 16],
    [14, 34], [40, 38], [66, 33],
  ];
  return (
    <svg viewBox="0 0 80 50" className="w-16 h-10" aria-hidden="true">
      {points.map(([x, y], i) => (
        <circle 
          key={i} 
          cx={x} cy={y} r="3.5" 
          fill="#5eead4" fillOpacity="0.3" 
          stroke="#5eead4" strokeWidth="1.2"
        >
          <animate 
            attributeName="fill-opacity" 
            values="0.3;0.6;0.3" 
            dur={`${2 + i * 0.3}s`} 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="r" 
            values="3.5;4.5;3.5" 
            dur={`${2.5 + i * 0.2}s`} 
            repeatCount="indefinite" 
          />
        </circle>
      ))}
    </svg>
  );
}

function ConvergingNodes() {
  const points = [
    [10, 8], [10, 25], [10, 42],
    [26, 14], [26, 36],
  ];
  return (
    <svg viewBox="0 0 80 50" className="w-16 h-10" aria-hidden="true">
      {points.map(([x, y], i) => (
        <line 
          key={i} 
          x1={x} y1={y} x2="58" y2="25" 
          stroke="#5eead4" strokeOpacity="0.35" strokeWidth="1"
        >
          <animate 
            attributeName="stroke-opacity" 
            values="0.35;0.6;0.35" 
            dur={`${3 + i * 0.4}s`} 
            repeatCount="indefinite" 
          />
        </line>
      ))}
      {points.map(([x, y], i) => (
        <circle 
          key={i} 
          cx={x} cy={y} r="2.5" 
          fill="#5eead4" fillOpacity="0.4"
        >
          <animate 
            attributeName="fill-opacity" 
            values="0.4;0.7;0.4" 
            dur={`${2 + i * 0.3}s`} 
            repeatCount="indefinite" 
          />
        </circle>
      ))}
      <circle cx="58" cy="25" r="8" fill="#5eead4" fillOpacity="0.15" stroke="#5eead4" strokeWidth="1.5">
        <animate 
          attributeName="r" 
          values="8;10;8" 
          dur="3s" 
          repeatCount="indefinite" 
        />
        <animate 
          attributeName="fill-opacity" 
          values="0.15;0.25;0.15" 
          dur="3s" 
          repeatCount="indefinite" 
        />
      </circle>
      <circle cx="58" cy="25" r="3" fill="#5eead4" fillOpacity="0.5">
        <animate 
          attributeName="r" 
          values="3;4;3" 
          dur="2s" 
          repeatCount="indefinite" 
        />
        <animate 
          attributeName="fill-opacity" 
          values="0.5;0.8;0.5" 
          dur="2s" 
          repeatCount="indefinite" 
        />
      </circle>
    </svg>
  );
}

// ============================================================
// DEFAULT STAGES (Fallback if API doesn't return data)
// ============================================================
const defaultStages = [
  {
    number: '01',
    title: 'One workflow',
    description:
      'An engineer-day of expert solver work becomes a 1.5-hour unattended run — logged, reviewable, repeatable.',
    Visual: SingleNode,
  },
  {
    number: '02',
    title: 'Several workflows',
    description:
      'Setup, sweeps, optimization, and reporting all agent-run. Junior engineers execute senior-grade processes; the rarest expertise is worth the most to encode.',
    Visual: SeveralNodes,
  },
  {
    number: '03',
    title: 'Your own models',
    description:
      "Every run's paper trail — requests, decisions, solved projects — is training data you own. It feeds custom AI models built on your simulation data, so your operational knowledge compounds inside your walls instead of being sold outside them.",
    Visual: ConvergingNodes,
  },
];

// ============================================================
// MAIN ASSET SECTION
// ============================================================
interface AssetSectionProps {
  data?: AssetSectionData | null;
}

export default function AssetSection({ data }: AssetSectionProps) {
  // Use API data if available, otherwise fallback to defaults
  const heading = data?.heading || 'Your Workflows Are an Asset You Keep';
  const description = data?.description || 
    "AI labs now pay companies six and seven figures for recordings of how their teams work — that's the market price of operational knowledge. They buy it to train models for everyone else. We do the inverse: every workflow we encode, and every logged agent run it produces, stays yours — and compounds inside your walls.";

  // Map API assets to stages
  const stages = data?.assets && data.assets.length > 0
    ? data.assets.map((asset, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: asset.title,
        description: asset.description,
        // Use different SVG based on index
        Visual: index === 0 ? SingleNode : index === 1 ? SeveralNodes : ConvergingNodes,
      }))
    : defaultStages;

  return (
    <section id="workflow-asset" className="relative py-16 md:py-24 bg-ink-950 border-t border-white/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/3 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#5eead4" strokeWidth="0.5" strokeOpacity="0.3">
                  <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
                </path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="absolute top-1/5 left-1/4 w-1.5 h-1.5 bg-teal-400/30 rounded-full animate-float-particle"></div>
        <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-teal-400/20 rounded-full animate-float-particle-delay"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-teal-400/25 rounded-full animate-float-particle-delay-2"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-teal-400/20 rounded-full animate-float-particle"></div>
        <div className="absolute bottom-1/5 left-1/3 w-1.5 h-1.5 bg-teal-400/25 rounded-full animate-float-particle-delay"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-teal-400/20 rounded-full animate-float-particle-delay-2"></div>
        
        <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent animate-shimmer"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent animate-shimmer-delay"></div>
        <div className="absolute top-0 right-0 w-px h-1/3 bg-gradient-to-b from-transparent via-teal-400/20 to-transparent animate-shimmer-vertical"></div>
        <div className="absolute bottom-0 left-0 w-px h-1/3 bg-gradient-to-b from-transparent via-teal-400/20 to-transparent animate-shimmer-vertical-delay"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; 05 / THE ASSET
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          {heading}
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-3xl mb-10 md:mb-12 leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {stages.map((stage, i) => (
            <div
              key={stage.number}
              className="group relative bg-ink-950 p-6 md:p-8 transition-all duration-500 hover:bg-white/[0.02] hover:shadow-lg hover:shadow-teal-400/5 animate-card-enter"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-px bg-gradient-to-r from-teal-400/10 via-teal-400/5 to-transparent rounded-xl blur-sm"></div>
              </div>

              {i < stages.length - 1 && (
                <span className="hidden md:block absolute top-1/2 -right-px w-px h-8 bg-white/10 -translate-y-1/2 z-10">
                  <span className="block w-full h-full bg-teal-400/20 animate-pulse-line"></span>
                </span>
              )}

              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-teal-300/90 tracking-widest group-hover:text-teal-300 transition-colors duration-300">
                  {stage.number}
                </span>
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <stage.Visual />
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                {stage.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 20px) scale(1.2); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(25px, -35px) scale(1.5); opacity: 0.8; }
        }
        @keyframes float-particle-delay {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(-30px, -25px) scale(1.5); opacity: 0.8; }
        }
        @keyframes float-particle-delay-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(20px, 30px) scale(1.5); opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shimmer-delay {
          0% { transform: translateX(-100%); opacity: 0; }
          30% { opacity: 0; }
          80% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shimmer-vertical {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes shimmer-vertical-delay {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 0; }
          80% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes card-enter {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }
        .animate-float-particle-delay {
          animation: float-particle-delay 7s ease-in-out infinite;
        }
        .animate-float-particle-delay-2 {
          animation: float-particle-delay-2 8s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }
        .animate-shimmer-delay {
          animation: shimmer-delay 5s ease-in-out infinite;
        }
        .animate-shimmer-vertical {
          animation: shimmer-vertical 4s ease-in-out infinite;
        }
        .animate-shimmer-vertical-delay {
          animation: shimmer-vertical-delay 5s ease-in-out infinite;
        }
        .animate-card-enter {
          animation: card-enter 0.7s ease-out both;
        }
        .animate-pulse-line {
          animation: pulse-line 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}