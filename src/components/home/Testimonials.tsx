// src/components/home/Testimonials.tsx
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
// MAIN TESTIMONIALS COMPONENT
// ============================================================
interface TestimonialsProps {
  data?: ProblemStatementData | null;
  loading?: boolean;
}

export default function Testimonials({ data, loading = false }: TestimonialsProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="relative py-16 md:py-20 bg-ink-900 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-6 md:mb-8">
              <div className="h-4 w-32 bg-ink-800 rounded"></div>
            </div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-ink-800 rounded mb-10"></div>
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
      <section className="relative py-16 md:py-20 bg-ink-900 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Testimonials content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API quotes to testimonials format
  const testimonials = data.quotes && data.quotes.length > 0
    ? data.quotes.map((quote) => ({
        quote: quote.quote_text,
        author: quote.author_title 
          ? `${quote.author}, ${quote.author_title}`
          : quote.author || 'Anonymous',
      }))
    : [];

  // If no testimonials, show empty state
  if (testimonials.length === 0) {
    return (
      <section className="relative py-16 md:py-20 bg-ink-900 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No testimonials available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-20 bg-ink-900 border-t border-white/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/3 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-1/4 w-1 h-1 bg-teal-400/20 rounded-full animate-float-particle"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-teal-400/15 rounded-full animate-float-particle-delay"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-teal-400/20 rounded-full animate-float-particle-delay-2"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-teal-400/15 rounded-full animate-float-particle"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &mdash;&mdash; &sect; 02B / FIELD NOTES
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          {data.heading}
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          {data.sub_heading}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="group bg-ink-950 p-6 md:p-8 rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/5 animate-card-enter"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                "{item.quote}"
              </p>
              <p className="text-teal-300 text-xs md:text-sm font-mono tracking-wide group-hover:text-teal-200 transition-colors duration-300">
                {item.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 20px) scale(1.2); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(20px, -30px) scale(1.5); opacity: 0.8; }
        }
        @keyframes float-particle-delay {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(-25px, -20px) scale(1.5); opacity: 0.8; }
        }
        @keyframes float-particle-delay-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(15px, 25px) scale(1.5); opacity: 0.8; }
        }
        @keyframes card-enter {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }
        .animate-float-particle-delay {
          animation: float-particle-delay 7s ease-in-out infinite;
        }
        .animate-float-particle-delay-2 {
          animation: float-particle-delay-2 8s ease-in-out infinite;
        }
        .animate-card-enter {
          animation: card-enter 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
}