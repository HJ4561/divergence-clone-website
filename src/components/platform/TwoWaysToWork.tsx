import React from 'react';
import { Link } from 'react-router-dom';

export default function TwoWaysToWork() {
  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 05 / WORK WITH US
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          Two Ways to Work With Us
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          Run the agents yourself, or have our team build the automation for you. Either way, you get the same RF and EM understanding layer — maintained against every solver release.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          <div className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col">
            <span className="text-[11px] font-mono text-teal-300/90 tracking-widest mb-3">
              SELF-SERVE
            </span>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Agents</h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
              Self-serve AI agents that run your EM simulations across solvers, built on our domain understanding layer and kept current with every solver release. HFSS today; CST coming soon.
            </p>
            <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/app/signup"
                className="bg-cream hover:bg-cream-dark text-ink-950 font-medium px-5 py-2.5 rounded-lg transition-colors duration-200 text-sm text-center"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-white/5 text-white font-medium px-5 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 text-sm text-center"
              >
                See Demo
              </Link>
            </div>
          </div>

          <div className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col">
            <span className="text-[11px] font-mono text-teal-300/90 tracking-widest mb-3">
              DONE-FOR-YOU
            </span>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Services</h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
              Custom automation, enablement, and subcontracting built by our PhDs — done-for-you, or built on our domain primitives so your team owns the workflow without owning the maintenance.
            </p>
            <div className="mt-auto pt-2">
              <Link
                to="/services"
                className="inline-block bg-transparent hover:bg-white/5 text-white font-medium px-5 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 text-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}