// src/components/home/QuestionsSection.tsx
import React, { useState } from 'react';
import { ChevronDown, Shield, Users, Sparkles, Zap } from 'lucide-react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN QUESTIONS SECTION
// ============================================================
interface QuestionsSectionProps {
  data?: FAQ[];
  loading?: boolean;
}

export default function QuestionsSection({ data, loading = false }: QuestionsSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // If loading, show skeleton
  if (loading) {
    return (
      <section className="relative py-16 md:py-20 bg-ink-900 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-4 w-32 bg-ink-800 rounded mb-6"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-ink-800 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data || data.length === 0) {
    return (
      <section className="relative py-16 md:py-20 bg-ink-900 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-12">
              <p className="text-gray-400">FAQ content not available</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Map API data to questions format with icons
  const questions = data.map((faq, index) => ({
    q: faq.question,
    a: faq.answer,
    // Cycle through icons based on index
    icon: [Shield, Users, Sparkles, Zap][index % 4] || Shield,
  }));

  return (
    <section className="relative py-16 md:py-20 bg-ink-900 border-t border-white/10 overflow-hidden">
      {/* Animated background - subtle and minimal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl animate-float-slower"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
              &sect; 08 / FAQ
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-white">
            Questions Engineering <span className="text-teal-300">Leaders Ask First</span>
          </h2>

          <div className="mt-6 border border-white/10 rounded-xl overflow-hidden bg-ink-950/50">
            {questions.map((item, i) => {
              const isOpen = openIndex === i;
              const Icon = item.icon;
              return (
                <div 
                  key={item.q} 
                  className={`border-b border-white/10 last:border-0 transition-all duration-300 ${
                    isOpen ? 'bg-white/[0.02]' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-3 text-left py-4 px-4 md:px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400/60 group hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <div className={`p-1.5 rounded-lg transition-all duration-300 shrink-0 ${
                      isOpen ? 'bg-teal-400/20 text-teal-300' : 'bg-white/5 text-gray-500 group-hover:text-teal-300'
                    }`}>
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-white group-hover:text-teal-300 transition-colors duration-200 flex-1">
                      {item.q}
                    </span>
                    <div className={`p-1 rounded-full transition-all duration-300 shrink-0 ${
                      isOpen ? 'bg-teal-400/20' : 'bg-white/5 group-hover:bg-white/10'
                    }`}>
                      <ChevronDown
                        className={`w-4 h-4 text-teal-300 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={2}
                      />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 md:px-5 pb-4 pt-1">
                        <div className="h-px w-8 bg-gradient-to-r from-teal-400/40 to-transparent mb-3"></div>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 20px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}