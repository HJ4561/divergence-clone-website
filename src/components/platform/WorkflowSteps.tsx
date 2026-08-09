// src/components/platform/WorkflowSteps.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface OperatingBenefit {
  id: number;
  heading: string;
  description: string;
  impact: string;
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
  operating_benefits: OperatingBenefit[];
  work_with_us: any[];
  coming_soon: any[];
  demonstrations: any[];
  built_for_production: any[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// ANIMATED BACKGROUND
// ============================================================
function WaveformBackground() {
  const wavePath = "M0,100 Q87.5,30 175,100 T350,100 T525,100 T700,100";
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[200px] overflow-hidden opacity-[0.35]">
      <div className="flex w-[1400px] motion-safe:animate-[waveDrift_22s_linear_infinite]">
        <svg viewBox="0 0 700 200" className="w-[700px] h-[200px] shrink-0" preserveAspectRatio="none" aria-hidden="true">
          <path d={wavePath} fill="none" stroke="#5eead4" strokeWidth="1" />
        </svg>
        <svg viewBox="0 0 700 200" className="w-[700px] h-[200px] shrink-0" preserveAspectRatio="none" aria-hidden="true">
          <path d={wavePath} fill="none" stroke="#5eead4" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

function RadiationArc() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute left-1/2 -translate-x-1/2 -top-6 w-[320px] md:w-[420px] h-auto opacity-40 motion-safe:animate-[archPulse_5s_ease-in-out_infinite]"
      aria-hidden="true"
    >
      <path d="M40,190 A160,160 0 0 1 360,190" fill="none" stroke="#5eead4" strokeWidth="1" />
      <path d="M80,190 A120,120 0 0 1 320,190" fill="none" stroke="#5eead4" strokeWidth="0.75" strokeOpacity="0.6" />
    </svg>
  );
}

// ============================================================
// MAIN WORKFLOW STEPS COMPONENT
// ============================================================
interface WorkflowStepsProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function WorkflowSteps({ data, loading = false }: WorkflowStepsProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-ink-950 bg-grid py-20 md:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="max-w-2xl mx-auto bg-ink-800/50 rounded-xl p-6 md:p-8">
              <div className="h-6 w-32 bg-ink-800 rounded mb-4"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded mb-8"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-5 border-t border-ink-800">
                  <div className="flex items-baseline gap-3 mb-2">
                    <div className="h-4 w-8 bg-ink-800 rounded"></div>
                    <div className="h-6 w-1/2 bg-ink-800 rounded"></div>
                  </div>
                  <div className="h-4 w-full bg-ink-800 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data) {
    return (
      <section className="relative overflow-hidden bg-ink-950 bg-grid py-20 md:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Workflow steps not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API operating_benefits to steps format - ONLY from API
  const steps = data.operating_benefits && data.operating_benefits.length > 0
    ? data.operating_benefits.map((benefit, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: benefit.heading,
        description: benefit.description,
      }))
    : [];

  // If no steps from API, show error state (no dummy data)
  if (steps.length === 0) {
    return (
      <section className="relative overflow-hidden bg-ink-950 bg-grid py-20 md:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No workflow steps available from API</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-ink-950 bg-grid py-20 md:py-28 border-t border-white/10">
      <style>{`
        @keyframes waveDrift { from { transform: translateX(0); } to { transform: translateX(-700px); } }
        @keyframes archPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.55; } }
      `}</style>

      <WaveformBackground />
      <RadiationArc />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-8 md:mb-10">
          &sect; 03 / THE WORKFLOW
        </span>

        <div className="max-w-2xl mx-auto bg-ink-950/90 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl shadow-black/50">
          <span className="block text-[11px] font-mono text-teal-300/90 tracking-widest mb-3">
            AGENT-RUN / Meshengg
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-8 leading-tight">
            The Agent-Run EM Simulation Workflow
          </h2>

          <div className="divide-y divide-white/10">
            {steps.map((step) => (
              <div key={step.number} className="py-5 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="text-xs font-mono text-teal-300 tracking-wide">
                    {step.number}
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed pl-7">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}