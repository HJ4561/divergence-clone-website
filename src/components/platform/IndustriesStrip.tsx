import React from 'react';

const industries = ["Aerospace", "Defense", "Telecom", "Semiconductor", "Automotive", "Advanced Hardware"];

export default function IndustriesStrip() {
  return (
    <section className="py-10 md:py-12 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {industries.map((name) => (
            <span
              key={name}
              className="text-[11px] md:text-xs font-mono tracking-wide text-gray-400 uppercase border border-white/10 rounded-full px-3 py-1"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-ink-950 border border-white/10 border-l-2 border-l-teal-400/50 rounded-lg px-5 py-4">
          <p className="text-center text-gray-400 text-xs md:text-sm leading-relaxed">
            Works on top of your existing Ansys HFSS setup — CST support coming soon. No migration. No retraining. Results on day one.
          </p>
        </div>
      </div>
    </section>
  );
}