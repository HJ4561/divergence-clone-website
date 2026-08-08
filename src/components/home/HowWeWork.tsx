import React from 'react';

const steps = [
  {
    number: "1",
    id: "discovery",
    title: "Discovery",
    description: "Walk us through one workflow — a 30-minute screen share of the work your engineers repeat most. We tell you on the spot whether it's automatable, what a pilot looks like, and what it would save. Free, under NDA.",
  },
  {
    number: "2",
    id: "pilot",
    title: "Pilot",
    description: "We embed with your team and encode one workflow you already run — weekly working sessions, about an hour of your engineers' time per week. You judge the results against your own acceptance criteria.",
  },
  {
    number: "3",
    id: "deploy",
    title: "Deploy",
    description: "The automation moves into your environment — your security perimeter, your solvers, your data — with testing and validation before anything touches production work.",
  },
  {
    number: "4",
    id: "scale-support",
    title: "Scale & Support",
    description: "From one workflow to a fleet: engineers set direction and review while agents fan out across products, specs, and what-if studies. We maintain it as your solvers evolve.",
  },
];

export default function HowWeWork() {
  return (
    <section id="process" className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; 06 / METHOD
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          How We Work
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          Your team keeps operating normally throughout — about an hour of engineer time per week during a pilot. Agents do the clicking; your engineers review the results.
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
