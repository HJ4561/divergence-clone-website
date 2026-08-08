import React from 'react';

const notes = [
  {
    number: "01",
    title: "The Compute Is No Longer the Limiting Factor. The Manual Work Is.",
    description: "The best AI use case isn't the problem your team never cracked. It's the simulation setup, sweep, and report your engineers repeat for the tenth time this month. We find those workflows and remove them.",
  },
  {
    number: "02",
    title: "Expertise trapped in few hands",
    description: "Complex EM setups depend on a handful of senior engineers — many nearing retirement. We encode their process as reviewable, versioned workflows any agent, and any junior engineer, can execute with the same rigor. The expertise stays when they go.",
  },
  {
    number: "03",
    title: "Your workflows are an asset",
    description: "Every workflow your team runs by hand evaporates when the run ends — the judgment behind it lives in someone's head. Encoded, it becomes property: automation today, training data for your own models next. See where it compounds ↓",
  },
];

export default function FieldNotes() {
  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; 02 / BOTTLENECKS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            Not Moonshots — Bottlenecks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {notes.map((note, index) => (
            <div
              key={index}
              className="group relative bg-ink-950 p-6 md:p-8 overflow-hidden transition-colors duration-300 hover:bg-white/[0.02]"
            >
              {/* ghost numeral — the one signature element, quiet everywhere else */}
              <span className="pointer-events-none absolute -top-3 right-4 text-7xl md:text-8xl font-semibold text-white/[0.04] select-none leading-none">
                {note.number}
              </span>

              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs font-mono text-teal-300/90 tracking-widest">
                    {note.number}
                  </span>
                  <span className="h-px w-6 bg-teal-400/40 transition-all duration-300 group-hover:w-10" />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
                  {note.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {note.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}