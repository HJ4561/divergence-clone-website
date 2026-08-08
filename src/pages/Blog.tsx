import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = ["All", "AI Agents", "Simulation", "RF Engineering"];

const posts = [
  {
    slug: 'ai-automation-simulation',
    title: 'AI Automation in Simulation Engineering',
    excerpt: 'How agentic workflows are replacing the manual setup, sweep, and report cycle that eats a senior engineer\'s week.',
    date: 'January 15, 2026',
    author: 'Gustavo Navarro',
    readTime: '5 min read',
    category: 'AI Agents',
    featured: true,
  },
  {
    slug: 'bayesian-optimization-hfss',
    title: 'Bayesian Optimization for Ansys HFSS',
    excerpt: 'Using Bayesian optimization to cut simulation time while still converging on a verified optimal design.',
    date: 'January 10, 2026',
    author: 'Volodymyr Shyianov',
    readTime: '7 min read',
    category: 'Simulation',
  },
  {
    slug: 'future-of-rf-engineering',
    title: 'The Future of RF Engineering with AI',
    excerpt: 'What happens to antenna and MIMO design work when a junior engineer can run a senior-grade workflow.',
    date: 'January 5, 2026',
    author: 'Bamelak Tadele',
    readTime: '4 min read',
    category: 'RF Engineering',
  },
  {
    slug: 'defeaturing-cad-automatically',
    title: 'Automatic Defeaturing: What Actually Gets Stripped',
    excerpt: 'A look inside the geometry-cleanup step most teams still do by hand — and why it\'s the highest-leverage place to automate first.',
    date: 'December 18, 2025',
    author: 'Volodymyr Shyianov',
    readTime: '6 min read',
    category: 'Simulation',
  },
  {
    slug: 'multi-user-information-theory-antennas',
    title: 'Information-Theoretically Consistent Antenna Design',
    excerpt: 'Why antenna design decisions made in isolation from system-level information theory tend to underperform in the field.',
    date: 'December 3, 2025',
    author: 'Bamelak Tadele',
    readTime: '8 min read',
    category: 'RF Engineering',
  },
  {
    slug: 'why-maintenance-sinks-internal-automation',
    title: 'Why Maintenance Sinks Most Internal Automation Builds',
    excerpt: 'Solver version drift quietly breaks internal scripts release after release. Here\'s what actually keeps automation alive long-term.',
    date: 'November 20, 2025',
    author: 'Gustavo Navarro',
    readTime: '5 min read',
    category: 'AI Agents',
  },
];

function ScanlineField() {
  const wavePath = "M0,60 Q50,20 100,60 T200,60 T300,60 T400,60";
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120px] opacity-[0.06]">
        <div className="flex w-[1600px] motion-safe:animate-[waveDriftBlog_26s_linear_infinite]">
          {[0, 1, 2, 3].map((i) => (
            <svg key={i} viewBox="0 0 400 120" className="w-[400px] h-[120px] shrink-0" preserveAspectRatio="none">
              <path d={wavePath} fill="none" stroke="#5eead4" strokeWidth="1" />
            </svg>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-teal-400/[0.05] to-transparent motion-safe:animate-[scanSweep_7s_ease-in-out_infinite]" />
    </div>
  );
}

function DiagramCover({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="220" fill="#0a0f14" />
      {variant === 0 && (
        <>
          <circle cx="200" cy="110" r="60" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
          <path d="M 200 50 A 60 60 0 1 1 199.9 50" fill="none" stroke="#5eead4" strokeOpacity="0.55" strokeWidth="1.4" />
          {[[200, 50], [260, 110], [200, 170], [140, 110]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#0a0f14" stroke="#5eead4" strokeWidth="1.2" />
          ))}
        </>
      )}
      {variant === 1 && (
        <path d="M20,140 L70,120 L110,60 L150,110 L200,150 L250,130 L300,60 L380,140" fill="none" stroke="#5eead4" strokeOpacity="0.55" strokeWidth="1.4" />
      )}
      {variant === 2 && (
        <g transform="translate(200,110)">
          <path d="M-60,-20 L0,-50 L60,-20 L60,30 L0,60 L-60,30 Z" fill="none" stroke="#5eead4" strokeOpacity="0.5" strokeWidth="1.3" />
          <path d="M-60,-20 L0,10 L60,-20 M0,10 L0,60" fill="none" stroke="#5eead4" strokeOpacity="0.5" strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}

function PostMeta({ author, date, readTime }: { author: string; date: string; readTime: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-gray-500 tracking-wide">
      <span>{author}</span>
      <span className="text-gray-700">&middot;</span>
      <span>{date}</span>
      <span className="text-gray-700">&middot;</span>
      <span>{readTime}</span>
    </div>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  const filtered = activeCategory === 'All' ? rest : rest.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-ink-950">
      <style>{`
        @keyframes waveDriftBlog { from { transform: translateX(0); } to { transform: translateX(-400px); } }
        @keyframes scanSweep { 0% { transform: translateX(-100px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(calc(100vw + 100px)); opacity: 0; } }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 bg-grid pt-20 pb-16 md:pt-24 md:pb-20 border-t border-white/10">
        <ScanlineField />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
            &sect; JOURNAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-5 max-w-2xl">
            Field Notes from the RF & Simulation Frontier
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
            Writing on agentic simulation, RF and antenna engineering, and what it actually takes to automate a workflow an expert trusts.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="border-t border-white/10 bg-ink-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-mono tracking-widest uppercase rounded-full px-3.5 py-1.5 border transition-colors duration-200 ${
                activeCategory === cat
                  ? 'text-teal-300 border-teal-400/40 bg-teal-400/10'
                  : 'text-gray-400 border-white/10 hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured post */}
      {featured && (
        <section className="border-t border-white/10 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="block text-[11px] font-mono text-teal-300/90 tracking-widest uppercase mb-5">
              Latest
            </span>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-ink-900 rounded-xl border border-white/10 hover:border-teal-400/30 transition-colors duration-300 overflow-hidden"
            >
              <div className="aspect-video md:aspect-auto md:h-full">
                <DiagramCover variant={0} />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="text-[11px] font-mono text-teal-300 border border-teal-400/30 rounded-full px-3 py-1 uppercase tracking-widest self-start mb-4">
                  {featured.category}
                </span>
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-white mb-3 leading-snug group-hover:text-teal-100 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <PostMeta author={featured.author} date={featured.date} readTime={featured.readTime} />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post list */}
      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-[11px] font-mono text-teal-300/90 tracking-widest uppercase mb-6">
            More Writing
          </span>

          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No posts in this category yet.</p>
          ) : (
            <div className="divide-y divide-white/10">
              {filtered.map((post, i) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5 md:gap-8 py-8 first:pt-0"
                >
                  <div className="aspect-video md:aspect-square rounded-lg overflow-hidden border border-white/10">
                    <DiagramCover variant={i % 3} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[11px] font-mono text-teal-300/90 tracking-widest uppercase mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-white mb-2 leading-snug group-hover:text-teal-100 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4 max-w-2xl">
                      {post.excerpt}
                    </p>
                    <PostMeta author={post.author} date={post.date} readTime={post.readTime} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}