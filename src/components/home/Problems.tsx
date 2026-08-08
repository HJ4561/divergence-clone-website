import React from 'react';

const problems = [
  {
    title: 'The Compute Is No Longer the Limiting Factor. The Manual Work Is.',
    description: "The best AI use case isn't the problem your team never cracked. It's the simulation setup, sweep, and report your engineers repeat for the tenth time this month.",
    icon: '🔄',
  },
  {
    title: 'Expertise Trapped in Few Hands',
    description: 'Complex EM setups depend on a handful of senior engineers — many nearing retirement. We encode their process as reviewable, versioned workflows any agent and any junior engineer can execute.',
    icon: '🧠',
  },
  {
    title: 'Your Workflows Are an Asset',
    description: 'Every workflow your team runs by hand evaporates when the run ends. Encoded, it becomes property: automation today, training data for your own models next.',
    icon: '💎',
  },
];

export default function Problems() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Not Moonshots — <span className="text-cyan-400">Bottlenecks</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div key={problem.title} className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all">
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-gray-400">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}