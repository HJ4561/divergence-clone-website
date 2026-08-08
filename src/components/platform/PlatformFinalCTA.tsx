import React from 'react';
import { Link } from 'react-router-dom';

export default function PlatformFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-900 bg-grid border-t border-white/10 py-16 md:py-24">
      <div className="pointer-events-none absolute -top-10 left-0 w-[480px] h-[480px] bg-teal-400/[0.06] rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          Ready to Accelerate Your Simulations?
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          The same agents that run our production services pilots — on your own projects, inside your existing Ansys setup.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          <div className="bg-ink-950 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-2">Schedule a Demo</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Get a personalized demo and discuss your specific simulation needs.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-cream hover:bg-cream-dark text-ink-950 font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm"
            >
              Schedule Demo &rarr;
            </Link>
          </div>

          <div className="bg-ink-950 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-2">Start Your Free Trial</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Experience the power of AI simulation with unlimited access for 14 days.
            </p>
            <Link
              to="/app/signup"
              className="inline-block bg-transparent hover:bg-white/5 text-white font-medium px-6 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 text-sm"
            >
              Start Free Trial &rarr;
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono tracking-[0.1em] text-gray-400 uppercase mt-8 pt-6 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <span className="text-teal-300">&#10003;</span> No payment charged until your trial ends
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-teal-300">&#10003;</span> Full feature access during trial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-teal-300">&#10003;</span> Setup support included
          </span>
        </div>
      </div>
    </section>
  );
}