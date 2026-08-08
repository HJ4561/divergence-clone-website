// src/components/home/Problems.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface ProblemQuote {
  id: number;
  problem_statement: number;
  quote_text: string;
  author: string;
  author_title: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface ProblemStatementData {
  id: number;
  heading: string;
  sub_heading: string;
  is_active: boolean;
  quotes: ProblemQuote[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN PROBLEMS COMPONENT
// ============================================================
interface ProblemsProps {
  data?: ProblemStatementData | null;
  loading?: boolean;
}

export default function Problems({ data, loading = false }: ProblemsProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-10 md:mb-14">
              <div className="h-4 w-32 bg-ink-800 rounded mb-4"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded mb-3"></div>
              <div className="h-4 w-1/2 bg-ink-800 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-ink-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Problem statement content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API quotes to problems format
  const problems = data.quotes && data.quotes.length > 0
    ? data.quotes.map((quote, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: quote.quote_text.split('.')[0] + '.',
        description: quote.quote_text,
      }))
    : [];

  // If no quotes, show empty state
  if (problems.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No problem statements available</p>
          </div>
        </div>
      </section>
    );
  }

  // Split heading for display
  const headingParts = data.heading.split('—');
  const headingBefore = headingParts[0] || '';
  const headingAfter = headingParts[1]?.trim() || 'Bottlenecks';

  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; 02 / BOTTLENECKS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            {headingBefore}— <span className="text-teal-300">{headingAfter}</span>
          </h2>
          {data.sub_heading && (
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mt-3 md:mt-4 leading-relaxed">
              {data.sub_heading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative bg-ink-950 p-6 md:p-8 overflow-hidden transition-colors duration-300 hover:bg-white/[0.02] animate-card-enter"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="pointer-events-none absolute -top-3 right-4 text-7xl md:text-8xl font-semibold text-white/[0.04] select-none leading-none">
                {problem.number}
              </span>

              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs font-mono text-teal-300/90 tracking-widest">
                    {problem.number}
                  </span>
                  <span className="h-px w-6 bg-teal-400/40 transition-all duration-300 group-hover:w-10" />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes card-enter {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-card-enter {
          animation: card-enter 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
}