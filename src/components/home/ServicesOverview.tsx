import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, GitBranch, Users, Radio } from 'lucide-react';

const services = [
  {
    icon: Cpu,
    title: "Agentic Workflow Development",
    description: "We take a workflow you already run — spec to simulation to report — and turn it into an AI agent that runs it end to end, unattended, with every step logged and reviewable.",
    features: [
      "Automated geometry, meshing, and setup",
      "Optimization loops with verified results",
      "Auto-generated customer-facing reports",
      "Integration with CAD, PLM, and your pipeline"
    ]
  },
  {
    icon: GitBranch,
    title: "Integration & Deployment",
    description: "AI automation deployed inside your solver environment and your security perimeter — tested, validated, and maintained as vendor releases ship.",
    features: [
      "Enterprise solver environment setup",
      "On-premises or private deployment",
      "Security and compliance configuration",
      "We carry the maintenance burden"
    ]
  },
  {
    icon: Users,
    title: "AI Enablement for Engineering Teams",
    description: "Your engineers build the automation themselves — on our platform and domain primitives — so you capture the capability without carrying the maintenance burden alone.",
    features: [
      "Hands-on automation workshops",
      "Build on our solver-integration layer",
      "Playbooks, documentation, and mentorship"
    ]
  },
  {
    icon: Radio,
    title: "Dedicated RF & EM Engineering",
    description: "Deep electromagnetic expertise on demand — for complex simulations, wireless system modeling, and trusted subcontracting on third-party projects.",
    features: [
      "Antenna, MIMO, and multi-user network studies",
      "Ray-traced propagation with Ansys SBR+",
      "OFDMA and link-level KPI extraction (SINR, capacity, BLER)",
      "Complex simulation troubleshooting & custom algorithms"
    ]
  },
];

export default function ServicesOverview() {
  return (
    <section id="what-we-do" className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; 03 / SERVICES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-white">
            What We Do
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            End-to-end AI automation for simulation-driven engineering teams — done for you, or built with your engineers so your team owns it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div className="flex items-center justify-between mb-5">
                <service.icon className="w-7 h-7 text-teal-300" strokeWidth={1.5} />
                <span className="text-xs font-mono text-gray-600 tracking-widest">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5">
                {service.description}
              </p>

              <ul className="space-y-2 border-t border-white/10 pt-4">
                {service.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-300 flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-teal-400/70 mt-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12">
          <Link
            to="/contact"
            className="relative inline-block bg-ink-800 hover:bg-ink-700 text-white font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base text-center border border-white/5 hover:border-white/10"
          >
            <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 opacity-40 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300"></span>
            <span className="relative z-10">Discuss Your Workflow</span>
          </Link>
          <Link
            to="/wireless"
            className="text-teal-300 hover:text-teal-200 transition-colors inline-flex items-center gap-2 text-sm md:text-base"
          >
            Explore our wireless system workflows &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}