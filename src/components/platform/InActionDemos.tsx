// src/components/platform/InActionDemos.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface Demonstration {
  id: number;
  heading: string;
  description: string;
  video_url: string;
  video_thumbnail: string | null;
  cta_label: string;
  cta_link: string;
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
  demonstrations: Demonstration[];
  built_for_production: any[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// VISUAL PANES
// ============================================================
function ChatPane() {
  return (
    <div className="w-[38%] h-full bg-ink-900 p-2.5 flex flex-col gap-1.5">
      <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
      <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
      <div className="h-1.5 w-full rounded-full bg-teal-400/25 mt-1" />
      <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
      <div className="h-1.5 w-5/6 rounded-full bg-white/10" />
      <div className="mt-auto h-4 w-full rounded bg-white/5 border border-white/10" />
    </div>
  );
}

function GeometryPane() {
  return (
    <svg viewBox="0 0 100 70" className="w-[62%] h-full" aria-hidden="true">
      <rect width="100" height="70" fill="#0a0f14" />
      <g transform="translate(50,35)">
        <path d="M-22,-8 L0,-18 L22,-8 L22,10 L0,20 L-22,10 Z" fill="none" stroke="#5eead4" strokeOpacity="0.6" strokeWidth="1" />
        <path d="M-22,-8 L0,2 L22,-8 M0,2 L0,20" fill="none" stroke="#5eead4" strokeOpacity="0.6" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

function LoopPane() {
  return (
    <svg viewBox="0 0 100 70" className="w-[62%] h-full" aria-hidden="true">
      <rect width="100" height="70" fill="#0a0f14" />
      <circle cx="50" cy="35" r="20" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
      <path d="M 50 15 A 20 20 0 1 1 49.9 15" fill="none" stroke="#5eead4" strokeOpacity="0.6" strokeWidth="1.2" />
      {[[50, 15], [70, 35], [50, 55], [30, 35]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#0a0f14" stroke="#5eead4" strokeWidth="1" />
      ))}
    </svg>
  );
}

function ChartPane() {
  return (
    <svg viewBox="0 0 100 70" className="w-[62%] h-full" aria-hidden="true">
      <rect width="100" height="70" fill="#0a0f14" />
      <path d="M8,50 L25,45 L38,20 L48,38 L60,50 L75,46 L92,50" fill="none" stroke="#5eead4" strokeOpacity="0.7" strokeWidth="1.2" />
      <path d="M8,55 L25,52 L38,42 L48,48 L60,55 L75,52 L92,55" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
    </svg>
  );
}

const visuals: Record<string, React.ComponentType> = {
  geometry: GeometryPane,
  loop: LoopPane,
  chart: ChartPane,
};

// ============================================================
// DEMO THUMBNAIL
// ============================================================
function DemoThumbnail({ visual, label }: { visual: string; label: string }) {
  const Pane = visuals[visual] || GeometryPane;
  return (
    <div className="relative bg-black rounded-lg border border-white/10 overflow-hidden aspect-video group/thumb cursor-pointer">
      <div className="flex w-full h-full">
        <ChatPane />
        <Pane />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover/thumb:bg-black/25 transition-colors duration-200">
        <div className="w-12 h-12 rounded-full bg-black/50 border border-teal-400/50 flex items-center justify-center backdrop-blur-sm group-hover/thumb:scale-105 transition-transform duration-200">
          <div className="w-0 h-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-teal-300 ml-1" />
        </div>
      </div>
      <span className="absolute bottom-2 left-3 text-[10px] font-mono tracking-wide text-gray-400 uppercase">
        {label}
      </span>
    </div>
  );
}

// ============================================================
// MAIN IN ACTION DEMOS COMPONENT
// ============================================================
interface InActionDemosProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function InActionDemos({ data, loading = false }: InActionDemosProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-ink-800 rounded mb-6"></div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-ink-800 rounded mb-10"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-ink-800 rounded-xl mb-6"></div>
            ))}
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
            <p className="text-gray-400">Demonstrations content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API demonstrations to the format expected by the UI
  const demos = data.demonstrations && data.demonstrations.length > 0
    ? data.demonstrations.map((demo, index) => ({
        title: demo.heading,
        description: demo.description,
        tags: [],
        label: demo.cta_label || `Demo ${index + 1}`,
        visual: ['geometry', 'loop', 'chart'][index % 3] || 'geometry',
      }))
    : [];

  // If no demos, show empty state
  if (demos.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No demonstrations available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 05 / DEMONSTRATIONS
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-white">
          {data.heading}
        </h2>
        <p className="text-sm md:text-base text-gray-400 mb-10 md:mb-12">
          {data.description}
        </p>

        <div className="divide-y divide-white/10">
          {demos.map((demo, index) => (
            <div
              key={demo.title}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-x-10 gap-y-6 py-10 first:pt-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="font-serif text-lg md:text-xl font-semibold text-white">
                {demo.title}
              </h3>

              <div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {demo.description}
                </p>
                {demo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono tracking-wide text-teal-300 border border-teal-400/30 rounded-full px-3 py-1 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-start-1">
                <DemoThumbnail visual={demo.visual} label={demo.label} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}