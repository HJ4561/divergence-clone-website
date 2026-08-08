import React from 'react';

export default function Stats() {
  return (
    <section className="py-12 md:py-16 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="font-serif text-4xl md:text-6xl font-semibold text-teal-300 mb-2">1.5 h</div>
            <p className="text-gray-400 text-sm">Unattended run replacing an engineer-day of solver work</p>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl md:text-6xl font-semibold text-teal-300 mb-2">20+</div>
            <p className="text-gray-400 text-sm">Full-wave design candidates explored per run</p>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl md:text-6xl font-semibold text-teal-300 mb-2">0</div>
            <p className="text-gray-400 text-sm">Setups done by hand — agents do the clicking, engineers review the results</p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs font-mono tracking-wide mt-8">
          FROM A PRODUCTION PILOT WITH AN ANTENNA-IN-PACKAGE MANUFACTURER — WALK THROUGH IT BELOW ↓
        </p>
      </div>
    </section>
  );
}