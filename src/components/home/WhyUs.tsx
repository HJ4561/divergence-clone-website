import React from 'react';
import { Link } from 'react-router-dom';

const reasons = [
  {
    number: "01",
    title: "Engineers, Not Career Consultants",
    description: "Founded by three PhDs in electromagnetics and applied mathematics, with industry experience at companies including Apple and Ansys. The people on the call are the people in the code.",
    tags: ["3 PhDs", "Apple", "Ansys"],
    link: { label: "Meet the team →", to: "/about" },
  },
  {
    number: "02",
    title: "Trusted in Production",
    description: "Beyond the pilot above, we are delivering a milestone-gated automation program for the RF systems team of a Fortune-100 consumer-electronics manufacturer — invoiced against acceptance criteria, not hours. Developed with RF engineers across aerospace, telecom, defense, and advanced hardware.",
    tags: ["Fortune-100", "Aerospace", "Telecom", "Defense"],
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; 07 / WHY US
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 md:mb-12 text-white">
          Why Divergent Physics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col"
            >
              <span className="text-xs font-mono text-teal-300/90 tracking-widest mb-5">
                {reason.number}
              </span>

              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                {reason.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {reason.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-gray-400 border border-white/10 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {reason.link && (
                <Link
                  to={reason.link.to}
                  className="inline-block text-teal-300 hover:text-teal-200 transition-colors text-sm mt-5 underline underline-offset-2"
                >
                  {reason.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}