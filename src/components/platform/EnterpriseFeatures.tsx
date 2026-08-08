import React from 'react';
import { Link } from 'react-router-dom';

const infraFeatures = [
  {
    title: "IP Protection & Data Security",
    description: "Runs inside your secure environment, with support for enterprise encryption and isolated compute.",
    icon: "shield",
  },
  {
    title: "Solver-Native Integration",
    description: "Uses official vendor APIs and licensing — Ansys HFSS today, Dassault CST next — to ensure compatibility without hacks or reverse engineering.",
    icon: "plug",
  },
  {
    title: "Maintained Against Every Release",
    description: "We track solver version drift and the PyAEDT integration quirks so your automation keeps working release after release — the maintenance burden that sinks internal builds, carried by us.",
    icon: "sync",
  },
];

const teamFeature = {
  title: "Built by RF Engineers, for RF Engineers",
  description: "Founded by PhDs in electromagnetics and applied mathematics, with industry experience at companies including Apple — and developed in collaboration with RF engineers across aerospace, telecom, and advanced hardware.",
  link: { label: "Meet the team", to: "/about" },
};

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
    </svg>
  );
}

export default function EnterpriseFeatures() {
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
          Built for Enterprise Simulation Workflows
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden mb-px">
          {infraFeatures.map((f) => (
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
        <div className="bg-teal-400/[0.04] border border-teal-400/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <div className="w-10 h-10 rounded-full border border-teal-400/40 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" fill="none" stroke="#5eead4" strokeWidth="1.3" />
              <path d="M5,20 C5,15.5 8,13 12,13 C16,13 19,15.5 19,20" fill="none" stroke="#5eead4" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-1.5">{teamFeature.title}</h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">{teamFeature.description}</p>
          </div>
          <Link
            to={teamFeature.link.to}
            className="shrink-0 text-teal-300 hover:text-teal-200 transition-colors text-sm underline underline-offset-2 whitespace-nowrap"
          >
            {teamFeature.link.label} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}