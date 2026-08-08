import React from 'react';
import { Link } from 'react-router-dom';

const proFeatures = [
  "Access to core simulation agents (Ansys HFSS today; CST coming soon)",
  "Automated post-processing (plotting, reporting, beam steering, sidelobe control, etc.)",
  "Unlimited projects & saved configurations",
  "Email support & setup tutorials",
  "Export results for further analysis",
];

const enterpriseFeatures = [
  "Everything in Professional",
  "A complete agentic workflow set up for your RF/EM simulation",
  "Integration with your existing solvers, CAD/PLM, and pipelines",
  "Custom workflow development & automation, built for your team",
  "Enablement so your engineers own the workflow on our platform",
  "Private deployment or on-premises integration, with enhanced data isolation",
  "Priority support, roadmap input & early access to AI Model Building (coming soon)",
];

export default function PricingPlans() {
  return (
    <section className="relative overflow-hidden bg-ink-950 bg-grid border-t border-white/10 py-16 md:py-24">
      {/* soft glow behind the recommended tier — draws the eye without shouting */}
      <div className="pointer-events-none absolute top-24 right-0 w-[420px] h-[420px] bg-teal-400/[0.07] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 08 / PRICING
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-white">
          Pricing Plans
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          Choose the plan that fits your workflow. Start with a trial or contact us for enterprise options.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {/* Professional */}
          <div className="bg-ink-950 p-6 md:p-8 flex flex-col">
            <span className="text-[11px] font-mono text-gray-500 tracking-widest mb-4">
              PROFESSIONAL
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl md:text-5xl font-semibold text-white">$400</span>
            </div>
            <span className="text-[11px] font-mono text-gray-500 tracking-widest mt-1 mb-6">
              PER MONTH
            </span>

            <div className="border-t border-white/10 pt-6">
              <ul className="space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="text-sm text-gray-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-teal-300 mt-1 text-[10px]">&#9656;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mt-6 mb-8">
              Best for individual engineers and small teams who want to speed up antenna array workflows and reduce manual post-processing time.
            </p>

            <Link
              to="/app/signup"
              className="mt-auto inline-block bg-cream hover:bg-cream-dark text-ink-950 font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm text-center"
            >
              Start Pro Trial
            </Link>
          </div>

          {/* Enterprise */}
          <div className="relative bg-ink-900/60 p-6 md:p-8 flex flex-col">
            <span className="absolute top-6 right-6 md:right-8 text-[10px] font-mono text-teal-300 tracking-widest uppercase border border-teal-400/40 bg-teal-400/10 rounded px-2.5 py-1">
              Recommended
            </span>

            <span className="text-[11px] font-mono text-gray-500 tracking-widest mb-4">
              ENTERPRISE
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif italic text-4xl md:text-5xl font-semibold text-teal-300">Custom</span>
            </div>
            <span className="text-[11px] font-mono text-gray-500 tracking-widest mt-1 mb-6">
              PRICING
            </span>

            <div className="border-t border-white/10 pt-6">
              <ul className="space-y-3">
                {enterpriseFeatures.map((f) => (
                  <li key={f} className="text-sm text-gray-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-teal-300 mt-1 text-[10px]">&#9656;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mt-6 mb-5">
              A partnership, not a subscription: we design and deploy a complete agentic workflow on the solvers and pipelines you already run — done-for-you, or built with your team so you own it.
            </p>

            <div className="border border-white/10 rounded-lg p-4 mb-5">
              <span className="block text-[11px] font-mono text-teal-300 tracking-widest mb-2">
                PRODUCT + ENGINEERING SERVICES
              </span>
              <p className="text-sm text-gray-400 leading-relaxed">
                From one-off automation to a fully integrated agentic simulation workflow, our engineers build and maintain it alongside your team — and keep it working as your solvers evolve.{' '}
                <Link to="/services" className="text-teal-300 hover:text-teal-200 underline underline-offset-2">
                  Explore our services &rarr;
                </Link>
              </p>
            </div>

            <p className="text-gray-500 text-xs mb-6">
              Flexible pricing based on your team's scale and security needs.
            </p>

            <Link
              to="/contact"
              className="mt-auto inline-block bg-transparent hover:bg-white/5 text-white font-medium px-6 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 text-sm text-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}