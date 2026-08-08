// src/components/home/CaseStudy.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface CaseStudyCard {
  id: number;
  title: string;
  description: string;
  image: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

interface CaseStudyData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  cards: CaseStudyCard[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// SVG COMPONENTS
// ============================================================
function SequenceDiagram() {
  const lanes = [
    { x: 30, label: 'SPEC' },
    { x: 130, label: 'AGENT' },
    { x: 230, label: 'SOLVER' },
  ];
  return (
    <svg viewBox="0 0 260 150" className="w-full h-full max-h-[130px]" aria-hidden="true">
      {lanes.map((lane) => (
        <g key={lane.label}>
          <text x={lane.x} y="12" textAnchor="middle" className="fill-gray-500" style={{ fontSize: 8, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            {lane.label}
          </text>
          <line x1={lane.x} y1="20" x2={lane.x} y2="140" stroke="white" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ))}
      <line x1="30" y1="45" x2="126" y2="45" stroke="#5eead4" strokeOpacity="0.7" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="130" y1="70" x2="226" y2="70" stroke="#5eead4" strokeOpacity="0.7" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="230" y1="95" x2="134" y2="95" stroke="white" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="2 2" markerEnd="url(#arrowGrey)" />
      <line x1="130" y1="120" x2="34" y2="120" stroke="#5eead4" strokeOpacity="0.7" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#5eead4" fillOpacity="0.7" />
        </marker>
        <marker id="arrowGrey" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="white" fillOpacity="0.3" />
        </marker>
      </defs>
    </svg>
  );
}

function OptimizationLoop() {
  const steps = [
    { label: 'BASELINE', x: 130, y: 20 },
    { label: 'KPI CHECK', x: 225, y: 75 },
    { label: 'OPTIMIZE', x: 130, y: 130 },
    { label: 'VERIFY', x: 35, y: 75 },
  ];
  return (
    <svg viewBox="0 0 260 150" className="w-full h-full max-h-[130px]" aria-hidden="true">
      <circle cx="130" cy="75" r="46" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
      <path
        d="M 130 30 A 46 46 0 1 1 129.9 30"
        fill="none"
        stroke="#5eead4"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        markerEnd="url(#loopArrow)"
      />
      {steps.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="4" fill="#0a0f14" stroke="#5eead4" strokeWidth="1.2" />
          <text
            x={s.x}
            y={s.y + (s.y < 75 ? -10 : 18)}
            textAnchor="middle"
            className="fill-gray-400"
            style={{ fontSize: 7.5, fontFamily: 'monospace', letterSpacing: '0.04em' }}
          >
            {s.label}
          </text>
        </g>
      ))}
      <defs>
        <marker id="loopArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#5eead4" fillOpacity="0.7" />
        </marker>
      </defs>
    </svg>
  );
}

function FileTree() {
  const rows = [
    { text: 'run_2024_0091/', depth: 0, dim: false },
    { text: 'request.json', depth: 1, dim: true },
    { text: 'decision_log.md', depth: 1, dim: true },
    { text: 'solver_project.aedt', depth: 1, dim: true },
    { text: 'datasheet.pdf', depth: 1, dim: false, accent: true },
  ];
  return (
    <div className="w-full max-w-[220px] font-mono text-[11px] leading-[1.9] text-left">
      {rows.map((row, i) => (
        <div
          key={row.text}
          className={`whitespace-nowrap ${row.accent ? 'text-teal-300' : row.dim ? 'text-gray-500' : 'text-gray-300'}`}
        >
          {row.depth === 0 ? '' : i === rows.length - 1 ? '└─ ' : '├─ '}
          {row.text}
        </div>
      ))}
    </div>
  );
}

const FLEET_ACTIVE = [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1];

function FleetGrid() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-4 gap-2">
        {FLEET_ACTIVE.map((active, i) => (
          <div
            key={i}
            className={`w-8 h-8 md:w-9 md:h-9 rounded-sm border ${
              active
                ? 'bg-teal-400/20 border-teal-400/50'
                : 'bg-white/[0.02] border-white/10'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-500 text-[10px] font-mono tracking-wide">
        10 / 12 SOLVER SEATS ACTIVE
      </p>
    </div>
  );
}

// ============================================================
// MAIN CASE STUDY COMPONENT
// ============================================================
interface CaseStudyProps {
  data?: CaseStudyData | null;
  loading?: boolean;
}

export default function CaseStudy({ data, loading = false }: CaseStudyProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-ink-800 rounded mb-4"></div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
            <div className="h-4 w-full bg-ink-800 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-ink-800 rounded-xl"></div>
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
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Case study content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API cards to stages
  const stages = data.cards && data.cards.length > 0
    ? data.cards.map((card, index) => ({
        title: card.title,
        description: card.description,
        caption: index === 0 ? 'SEQUENCE DIAGRAM' : 
                 index === 1 ? 'OPTIMIZATION LOOP' : 
                 index === 2 ? 'WORKSPACE FILE TREE' : 
                 'FLEET OF AGENTS',
        Visual: index === 0 ? SequenceDiagram : 
                index === 1 ? OptimizationLoop : 
                index === 2 ? FileTree : 
                FleetGrid,
      }))
    : [];

  // If no cards, show empty state
  if (stages.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No case study cards available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="case-study" className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; 04 / CASE STUDY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-white">
            {data.heading}
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {stages.map((stage) => (
            <div key={stage.title}>
              <h3 className="text-base md:text-lg font-semibold text-white mb-3">
                {stage.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {stage.description}
              </p>
              <div className="bg-ink-950 rounded-lg border border-white/10 p-4 flex flex-col items-center justify-center gap-3 min-h-[170px]">
                <div className="w-full flex items-center justify-center flex-1">
                  <stage.Visual />
                </div>
                <p className="text-gray-500 text-[10px] font-mono tracking-wide">
                  {stage.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12">
          <Link
            to="/contact"
            className="inline-block bg-cream hover:bg-cream-dark text-ink-950 font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-colors duration-200 text-sm md:text-base"
          >
            Walk Through the Full Pilot &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}