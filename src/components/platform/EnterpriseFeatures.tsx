// src/components/platform/EnterpriseFeatures.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface BuiltForProduction {
  id: number;
  heading: string;
  description: string;
  icon: string;
  image: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PlatformSectionData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  operating_benefits: any[];
  work_with_us: any[];
  coming_soon: any[];
  demonstrations: any[];
  built_for_production: BuiltForProduction[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// FEATURE ICON
// ============================================================
function FeatureIcon({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" aria-hidden="true">
      {type === 'shield' && (
        <path d="M12,3 L19,6 L19,12 C19,16.5 16,19.5 12,21 C8,19.5 5,16.5 5,12 L5,6 Z" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinejoin="round" />
      )}
      {type === 'plug' && (
        <>
          <path d="M9,3 L9,9 M15,3 L15,9" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M6,9 L18,9 L18,12 C18,15 15.5,17 12,17 C8.5,17 6,15 6,12 Z" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinejoin="round" />
          <line x1="12" y1="17" x2="12" y2="21" stroke="#5eead4" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
      {type === 'sync' && (
        <>
          <path d="M4,12 A8,8 0 0 1 19,7.5" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M20,12 A8,8 0 0 1 5,16.5" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M19,4 L19,7.5 L15.5,7.5" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5,20 L5,16.5 L8.5,16.5" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {type === 'users' && (
        <>
          <circle cx="12" cy="8" r="3.2" fill="none" stroke="#5eead4" strokeWidth="1.3" />
          <path d="M5,20 C5,15.5 8,13 12,13 C16,13 19,15.5 19,20" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ============================================================
// PRIMARY CTA BUTTON — Matches Header.tsx button pattern
// ============================================================
function PrimaryCtaButton({
  to,
  label,
  onClick,
  className = '',
}: {
  to: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const cleanLabel = label.replace(/[\s→\u2192]+$/, '').trim();

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative inline-block bg-ink-800 hover:bg-ink-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-200 text-sm text-center border border-white/10 hover:border-teal-400/40 ${className}`}
    >
      <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-30 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300" />
      <span className="relative z-10">{cleanLabel} &rarr;</span>
    </Link>
  );
}

// ============================================================
// MAIN ENTERPRISE FEATURES COMPONENT
// ============================================================
interface EnterpriseFeaturesProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function EnterpriseFeatures({ data, loading = false }: EnterpriseFeaturesProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-ink-800 rounded mb-6"></div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-10"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-ink-800 rounded-xl"></div>
              ))}
            </div>
            <div className="h-24 bg-ink-800 rounded-xl mt-6"></div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data) {
    return (
      <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Enterprise Features content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API built_for_production items to the format expected by the UI
  const features = data.built_for_production && data.built_for_production.length > 0
    ? data.built_for_production.map((item) => ({
        title: item.heading,
        description: item.description,
        icon: item.icon?.toLowerCase() || 'shield',
      }))
    : [];

  // Team feature - use from API or show empty state
  const teamFeature = {
    title: "Built by RF Engineers, for RF Engineers",
    description: data.description || "",
    link: { label: "Meet the team", to: "/about" },
  };

  // If no features, show empty state
  if (features.length === 0) {
    return (
      <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No enterprise features available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
      {/* faint circuit-board texture — quiet, "enterprise infrastructure" without being literal */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 06 / BUILT FOR PRODUCTION
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 md:mb-12 text-white">
          {data.heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden mb-px">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col"
            >
              <div className="w-10 h-10 rounded-full border border-teal-400/40 flex items-center justify-center mb-6">
                <FeatureIcon type={f.icon} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* team credibility — a different kind of claim, so it's set apart rather than folded into the grid above */}
        {teamFeature.description && (
          <div className="bg-teal-400/[0.04] border border-teal-400/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="w-10 h-10 rounded-full border border-teal-400/40 flex items-center justify-center shrink-0">
              <FeatureIcon type="users" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1.5">{teamFeature.title}</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">{teamFeature.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                to={teamFeature.link.to}
                className="text-teal-300 hover:text-teal-200 transition-colors text-sm underline underline-offset-2 whitespace-nowrap"
              >
                {teamFeature.link.label} &rarr;
              </Link>
              <PrimaryCtaButton 
                to="/contact" 
                label="Book a Consultation" 
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}