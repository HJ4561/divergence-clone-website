// src/components/home/PlatformSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface PlatformFeature {
  id: number;
  platform: number;
  title: string;
  description: string;
  image: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

interface PlatformData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  features: PlatformFeature[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// SVG COMPONENTS
// ============================================================
function S11Chart() {
  const traces = [
    { d: 'M0,55 L20,50 L40,35 L52,15 L60,32 L80,50 L100,52 L120,48 L140,40 L160,44 L180,50 L200,52', color: '#5eead4', label: 'Feed A' },
    { d: 'M0,58 L20,55 L40,48 L60,38 L75,18 L85,30 L100,45 L120,50 L140,46 L160,42 L180,48 L200,54', color: '#f4f1ea', label: 'Feed B' },
    { d: 'M0,52 L20,48 L40,44 L60,42 L80,38 L95,20 L105,34 L120,44 L140,48 L160,50 L180,52 L200,50', color: '#94a3b8', label: 'Feed C' },
  ];
  return (
    <div>
      <svg viewBox="0 0 200 70" className="w-full h-auto" aria-hidden="true">
        {[0, 17.5, 35, 52.5, 70].map((y) => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="white" strokeOpacity="0.06" strokeWidth="0.5" />
        ))}
        {traces.map((t) => (
          <path key={t.label} d={t.d} fill="none" stroke={t.color} strokeOpacity="0.85" strokeWidth="1.3" />
        ))}
      </svg>
      <div className="flex items-center gap-4 mt-2">
        {traces.map((t) => (
          <div key={t.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
            <span className="text-[10px] font-mono text-gray-500">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeometryPreview() {
  return (
    <svg viewBox="0 0 100 90" className="w-full h-auto max-h-[110px]" aria-hidden="true">
      <rect x="20" y="15" width="60" height="40" rx="1" fill="none" stroke="#5eead4" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="50" y1="55" x2="50" y2="75" stroke="#5eead4" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="50" cy="78" r="2.5" fill="#5eead4" fillOpacity="0.6" />
      <line x1="20" y1="15" x2="8" y2="6" stroke="white" strokeOpacity="0.15" strokeWidth="0.8" />
      <line x1="80" y1="15" x2="92" y2="6" stroke="white" strokeOpacity="0.15" strokeWidth="0.8" />
      <line x1="20" y1="55" x2="8" y2="64" stroke="white" strokeOpacity="0.15" strokeWidth="0.8" />
      <line x1="80" y1="55" x2="92" y2="64" stroke="white" strokeOpacity="0.15" strokeWidth="0.8" />
      <rect x="8" y="6" width="60" height="40" rx="1" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.8" />
    </svg>
  );
}

function AgentChat() {
  return (
    <div className="flex flex-col gap-2.5 text-[11px] leading-snug">
      <div className="self-end max-w-[85%] bg-white/[0.06] text-gray-200 rounded-lg rounded-br-sm px-2.5 py-1.5">
        Compare S11 across the three feed positions
      </div>
      <div className="self-start max-w-[90%] bg-teal-400/[0.08] border border-teal-400/20 text-teal-100/90 rounded-lg rounded-bl-sm px-2.5 py-1.5">
        Running 3 variations in HFSS…
      </div>
      <div className="self-start max-w-[90%] bg-teal-400/[0.08] border border-teal-400/20 text-teal-100/90 rounded-lg rounded-bl-sm px-2.5 py-1.5">
        Done — plotted in Notebook →
      </div>
    </div>
  );
}

// ============================================================
// MAIN PLATFORM SECTION
// ============================================================
interface PlatformSectionProps {
  data?: PlatformData | null;
  loading?: boolean;
}

export default function PlatformSection({ data, loading = false }: PlatformSectionProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-6 md:mb-8">
              <div className="h-4 w-32 bg-ink-800 rounded"></div>
            </div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
            <div className="h-4 w-full bg-ink-800 rounded mb-6"></div>
            <div className="h-64 bg-ink-800 rounded-xl mb-4"></div>
            <div className="flex gap-4">
              <div className="h-10 w-40 bg-ink-800 rounded"></div>
              <div className="h-10 w-40 bg-ink-800 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Platform content not available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; 07 / PLATFORM
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          {data.heading}
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-3xl mb-6 md:mb-8 leading-relaxed">
          {data.description}
        </p>

        <div className="bg-ink-900 p-2 md:p-3 rounded-xl border border-white/10 mb-4">
          <div className="bg-ink-950 rounded-lg border border-white/10 overflow-hidden">
            {/* fake app chrome */}
            <div className="flex items-center gap-2 px-3 md:px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-5 md:gap-8 text-[10px] md:text-[11px] font-mono tracking-wide text-gray-500">
                <span>HFSS</span>
                <span className="text-teal-300">AGENT</span>
                <span>NOTEBOOK</span>
              </div>
              <div className="w-[52px]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="p-4 md:p-5 flex flex-col">
                <p className="text-[10px] font-mono text-gray-600 tracking-wide mb-3">3D MODEL</p>
                <div className="flex-1 flex items-center justify-center">
                  <GeometryPreview />
                </div>
              </div>

              <div className="p-4 md:p-5 flex flex-col">
                <p className="text-[10px] font-mono text-gray-600 tracking-wide mb-3">AGENT CHAT</p>
                <AgentChat />
              </div>

              <div className="p-4 md:p-5 flex flex-col">
                <p className="text-[10px] font-mono text-gray-600 tracking-wide mb-3">S11 (dB) vs FREQ (GHz)</p>
                <div className="flex-1 flex items-center">
                  <S11Chart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-[11px] font-mono tracking-wide uppercase mb-8 md:mb-10">
          S11 compared across design variations — generated from a natural-language request against a live HFSS project.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/platform" className="bg-transparent hover:bg-white/5 text-white font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg border border-white/15 transition-colors duration-200 text-sm md:text-base text-center">
            Explore the Platform &rarr;
          </Link>
          <Link to="/app/signup" className="bg-transparent hover:bg-white/5 text-white font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg border border-white/15 transition-colors duration-200 text-sm md:text-base text-center">
            Start Free Trial &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}