import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    title: "Your Data, Your Models",
    description: "Train AI surrogate models on your proprietary CAE and simulation datasets. Get near-instant predictions for design parameters that currently require full simulation runs.",
    tag: "Automotive · Aerospace · Wind Energy · Manufacturing",
  },
  {
    title: "Accelerate Design Exploration",
    description: "Explore thousands of design variations in minutes using AI predictions. Identify optimal configurations before committing to expensive full-fidelity simulations.",
  },
  {
    title: "Enterprise-Grade & Secure",
    description: "Models are trained and deployed within your secure environment. Your proprietary simulation data and trained models never leave your infrastructure.",
  },
];

const nodes: [number, number][] = [
  [80, 60], [220, 140], [150, 280], [340, 90], [420, 230], [520, 60],
  [610, 180], [700, 300], [780, 80], [860, 220], [950, 120], [1040, 260],
  [1120, 60], [300, 340], [540, 340], [900, 340], [60, 220], [1150, 200],
];

const links: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [6, 8],
  [8, 9], [9, 10], [10, 11], [11, 12], [2, 13], [4, 14], [9, 15],
  [16, 2], [10, 17], [7, 14],
];

function NeuralField() {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full motion-safe:animate-[fieldBreathe_9s_ease-in-out_infinite]"
      aria-hidden="true"
    >
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#5eead4" strokeOpacity="0.15" strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#5eead4" fillOpacity="0.35" />
      ))}
    </svg>
  );
}

export default function CustomModels() {
  return (
    <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
      <style>{`
        @keyframes fieldBreathe { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.9; } }
      `}</style>

      <NeuralField />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-amber-400 border border-amber-400/40 bg-amber-400/5 rounded px-3 py-1 mb-5 md:mb-6">
          Coming Soon
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white max-w-3xl">
          Turn Your Simulation Data Into Custom AI Models
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          Your team runs thousands of simulations. Divergent Physics helps you train proprietary AI models on that data — so you can predict performance in seconds instead of hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden mb-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">{item.description}</p>
              {item.tag && (
                <p className="text-gray-500 text-xs font-mono tracking-wide mt-auto pt-4 border-t border-white/10 uppercase">
                  {item.tag}
                </p>
              )}
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="inline-block bg-cream hover:bg-cream-dark text-ink-950 font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-colors duration-200 text-sm md:text-base"
        >
          Join Early Access &rarr;
        </Link>
      </div>
    </section>
  );
}