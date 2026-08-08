import React from 'react';

const steps = [
  {
    number: "01",
    title: "Intelligent CAD-to-Simulation",
    description: "AI automatically imports, defeatures, and optimizes your CAD geometry for your solver — removing irrelevant features and generating simulation-ready mesh settings without expert tuning.",
  },
  {
    number: "02",
    title: "Autonomous Simulation Management",
    description: "AI monitors solver jobs, detects convergence issues, and auto-adjusts settings. Get reliable results without manual debugging or restarts.",
  },
  {
    number: "03",
    title: "Post-Processing & Scenario Exploration",
    description: "Automatically extract key insights from your simulations in minutes instead of hours — S-parameters, field data, and performance metrics. Compare design scenarios with natural language requests and make engineering decisions faster.",
  },
];

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

export default function WorkflowSteps() {
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
            AGENT-RUN / divergenceAI
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