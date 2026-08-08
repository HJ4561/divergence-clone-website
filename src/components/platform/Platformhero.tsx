import React from 'react';
import { Link } from 'react-router-dom';

const pipeline = [
  { label: 'CAD', description: 'Your model, pulled straight from the CAD file you already have.', icon: 'cad' },
  { label: 'SIMULATE', description: 'The agent runs the solver — setup, sweep, and optimization, unattended.', icon: 'sim' },
  { label: 'VERIFY', description: 'Results checked against your spec before anything is called done.', icon: 'check' },
  { label: 'DATASHEET', description: 'A customer-ready report, generated automatically from the run.', icon: 'doc' },
];

function StepIcon({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" aria-hidden="true">
      {type === 'cad' && (
        <>
          <path d="M6,9 L12,6 L18,9 L18,16 L12,19 L6,16 Z" fill="none" stroke="#5eead4" strokeWidth="1.3" />
          <path d="M6,9 L12,12 L18,9 M12,12 L12,19" fill="none" stroke="#5eead4" strokeWidth="1.1" />
        </>
      )}
      {type === 'sim' && (
        <path d="M3,12 Q7,4 11,12 T19,12" fill="none" stroke="#5eead4" strokeWidth="1.4" strokeLinecap="round" />
      )}
      {type === 'check' && (
        <path d="M5,12 L10,17 L19,6" fill="none" stroke="#5eead4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {type === 'doc' && (
        <>
          <rect x="6" y="4" width="12" height="16" rx="1.2" fill="none" stroke="#5eead4" strokeWidth="1.2" />
          <line x1="9" y1="9" x2="15" y2="9" stroke="#5eead4" strokeWidth="1" />
          <line x1="9" y1="13" x2="15" y2="13" stroke="#5eead4" strokeWidth="1" />
          <line x1="9" y1="17" x2="13" y2="17" stroke="#5eead4" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

function LivePipelinePanel() {
  return (
    <div className="relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute -bottom-14 -left-10 w-44 h-44 bg-violet-400/10 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]" />

      <div className="relative bg-ink-900 p-2 rounded-xl border border-white/10 h-full">
        <div className="bg-ink-950 rounded-lg border border-white/10 p-6 md:p-7 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 text-[10px] font-mono tracking-widest">PIPELINE</p>
            <div className="flex items-center gap-1.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400" />
              </span>
              <span className="text-teal-300 text-[10px] font-mono tracking-widest">LIVE</span>
            </div>
          </div>

          <div className="relative mb-7">
            <div className="absolute left-[22px] top-8 bottom-8 w-px bg-white/10" />
            <div
              className="absolute left-[21.5px] w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_3px_rgba(94,234,212,0.7)] animate-travel-dot"
              style={{ marginLeft: '-2px' }}
            />
            <div className="flex flex-col gap-8">
              {pipeline.map((step, i) => (
                <div key={step.label} className="relative flex gap-4 items-start">
                  <div
                    className="relative z-10 w-11 h-11 rounded-full bg-ink-950 border border-white/10 flex items-center justify-center shrink-0 animate-pulse-chase"
                    style={{ animationDelay: `${-(i * 1.5)}s` }}
                  >
                    <StepIcon type={step.icon} />
                  </div>
                  <div className="pt-1.5">
                    <p className="text-xs font-mono text-teal-300 tracking-widest mb-1.5">{step.label}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-[10px] font-mono tracking-widest">S11 (dB)</p>
              <p className="text-gray-600 text-[10px] font-mono tracking-widest">2.0&ndash;3.0 GHz</p>
            </div>
            <svg viewBox="0 0 260 60" className="w-full h-14" aria-hidden="true">
              <path
                d="M0,20 C40,20 55,20 70,22 C95,26 105,52 125,54 C145,52 155,26 180,22 C195,20 210,20 260,20"
                fill="none"
                stroke="#5eead4"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="260"
                className="animate-svg-draw"
              />
              <line x1="0" y1="46" x2="260" y2="46" stroke="white" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="2 3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 bg-grid pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-stretch">
          <div>
            <span
              className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.05s' }}
            >
              &sect; 01 / ENGINEERING BRIEF
            </span>

            <h1
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white opacity-0 animate-fade-up"
              style={{ animationDelay: '0.15s' }}
            >
              AI Transformation for Simulation Engineering
            </h1>

            <p
              className="mt-5 text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed opacity-0 animate-fade-up"
              style={{ animationDelay: '0.25s' }}
            >
              We design, build, and maintain AI agents that run your real workflows — CAD to simulation to customer-ready datasheet — inside the solver stack your team already uses.
            </p>

            <p
              className="mt-4 text-sm md:text-base text-gray-400 max-w-xl leading-relaxed opacity-0 animate-fade-up"
              style={{ animationDelay: '0.35s' }}
            >
              Every workflow we encode becomes an{' '}
              <a href="#workflow-asset" className="text-teal-300 hover:text-teal-200 transition-colors underline underline-offset-2">
                asset you own
              </a>{' '}
              — compounding as automation today, and as custom models trained on your own data next.
            </p>

            <p
              className="mt-3 text-sm md:text-base text-gray-400 max-w-xl italic opacity-0 animate-fade-up"
              style={{ animationDelay: '0.42s' }}
            >
              Built by PhDs in electromagnetics and applied mathematics who write automation code every day.
            </p>

            <div
              className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.5s' }}
            >
              <Link
                to="/contact"
                className="relative inline-block bg-ink-800 hover:bg-ink-700 text-white font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base text-center border border-white/5 hover:border-white/10"
              >
                <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 opacity-40 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300"></span>
                <span className="relative z-10">Book a Free Scoping Call &rarr;</span>
              </Link>
              <a
                href="#case-study"
                className="bg-transparent hover:bg-white/5 text-white font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg border border-white/15 transition-colors duration-200 text-sm md:text-base text-center"
              >
                Walk Through a Real Pilot
              </a>
            </div>

            <div
              className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-xs md:text-sm font-mono tracking-wide text-gray-400 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.58s' }}
            >
              <span>Bring one workflow — we'll scope it live</span>
              <span className="text-gray-600">&middot;</span>
              <span>NDA before we see anything</span>
              <span className="text-gray-600">&middot;</span>
              <span>Pilot running in weeks, not quarters</span>
            </div>

            <div
              className="mt-6 flex flex-wrap gap-2 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.65s' }}
            >
              <span className="text-[11px] font-mono text-gray-400 border border-white/10 rounded-full px-2.5 py-1">
                Ansys Electronics Desktop
              </span>
              <span className="text-[11px] font-mono text-gray-400 border border-white/10 rounded-full px-2.5 py-1">
                Dassault CST
              </span>
              <span className="text-[11px] font-mono text-gray-400 border border-white/10 rounded-full px-2.5 py-1">
                Other solvers
              </span>
              <span className="text-[11px] font-mono text-teal-300 border border-teal-400/30 bg-teal-400/10 rounded-full px-2.5 py-1 animate-pulse-ring">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <LivePipelinePanel />
          </div>
        </div>
      </div>
    </section>
  );
}