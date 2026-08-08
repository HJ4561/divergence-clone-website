import React from 'react';

const items = [
  {
    title: "Deploy AI Agents Across Your Solvers",
    description: "Automate repetitive tasks across your simulation workflow — from CAD to insights report — so engineers can focus on high-value design decisions.",
    impact: "Accelerate post-processing and design iteration",
  },
  {
    title: "Parallel Scenario Exploration",
    description: "Run multiple design variations simultaneously across solver instances. Compare antenna performance and optimize matching networks more efficiently.",
    impact: "Faster evaluation of design alternatives",
  },
  {
    title: "No Migration Required",
    description: "Enhance your existing solver workflows with AI automation — no retraining or process changes required.",
    impact: "Immediate value with zero migration risk",
  },
];

export default function ScaleImpact() {
  return (
    <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 04 / OPERATING BENEFITS
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 md:mb-12 text-white max-w-3xl">
          Scale Simulation Impact Without Increasing Headcount
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {items.map((item) => (
            <div
              key={item.title}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5">
                {item.description}
              </p>
              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-teal-300 text-xs font-mono tracking-wide">
                  Impact: {item.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}