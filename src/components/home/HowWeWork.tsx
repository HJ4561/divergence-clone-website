// src/components/home/HowWeWork.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface HowWeWorkStep {
  id: number;
  how_we_work: number;
  step_number: number;
  title: string;
  description: string;
  image: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

interface HowWeWorkData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  steps: HowWeWorkStep[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN HOW WE WORK COMPONENT
// ============================================================
interface HowWeWorkProps {
  data?: HowWeWorkData | null;
  loading?: boolean;
}

export default function HowWeWork({ data, loading = false }: HowWeWorkProps) {
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
            <div className="h-4 w-1/2 bg-ink-800 rounded mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-ink-800 rounded-xl"></div>
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
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">How We Work content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API steps to the format expected by the UI
  const steps = data.steps && data.steps.length > 0
    ? data.steps.map((step) => ({
        number: String(step.step_number),
        id: step.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
        title: step.title,
        description: step.description,
      }))
    : [];

  // If no steps, show empty state
  if (steps.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No steps available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="process" className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; 06 / METHOD
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          {data.heading}
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          {data.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden">
          {steps.map((step, i) => {
            const n = parseInt(step.number, 10);
            return (
              <div
                key={step.number}
                id={`step-${step.id}`}
                className="group relative bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                {/* progress track — literally shows how far along the process this step is */}
                <div className="h-px w-full bg-white/10 mb-6 overflow-hidden">
                  <div
                    className="h-full bg-teal-400/70"
                    style={{ width: `${(n / steps.length) * 100}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs font-mono text-teal-300/90 tracking-widest">
                    STEP {step.number}/{steps.length}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {/* connecting tick to the next step, desktop only */}
                {i < steps.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -right-px w-px h-8 bg-white/10 -translate-y-1/2 z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}