// src/components/home/FieldNotes.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface FieldNoteItem {
  id: number;
  field_note: number;
  quote: string;
  author: string;
  author_title: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface FieldNoteData {
  id: number;
  heading: string;
  sub_heading: string;
  is_active: boolean;
  notes: FieldNoteItem[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN FIELD NOTES COMPONENT
// ============================================================
interface FieldNotesProps {
  data?: FieldNoteData | null;
  loading?: boolean;
}

export default function FieldNotes({ data, loading = false }: FieldNotesProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-12 md:mb-16">
              <div className="h-4 w-32 bg-ink-800 rounded mb-4"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded mb-3"></div>
              <div className="h-4 w-1/2 bg-ink-800 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-56 bg-ink-800 rounded-xl"></div>
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
      <section className="py-20 md:py-28 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Field notes content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API notes to quotes
  const quotes = data.notes && data.notes.length > 0
    ? data.notes.map((note) => ({
        quote: note.quote,
        attribution: note.author_title 
          ? `${note.author}, ${note.author_title}`
          : note.author || 'Anonymous',
      }))
    : [];

  // If no quotes, show empty state
  if (quotes.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No field notes available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-ink-950 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow for depth */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5">
            &sect; 02B / FIELD NOTES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-white leading-tight">
            {data.heading}
          </h2>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            {data.sub_heading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {quotes.map((item, index) => (
            <div
              key={index}
              className="group relative bg-ink-900/50 p-8 md:p-10 rounded-2xl border border-white/5 hover:border-teal-400/20 hover:bg-ink-900 transition-all duration-300 flex flex-col justify-between min-h-[240px]"
            >
              {/* Invisible background for hover shadow glow */}
              <div className="absolute inset-0 rounded-2xl bg-teal-400/0 group-hover:bg-teal-400/5 blur-xl -z-10 transition-all duration-500" />

              <div className="relative flex-grow">
                <p className="font-serif text-lg md:text-xl text-white leading-relaxed">
                  {item.quote}
                </p>
              </div>
              
              <div className="relative mt-6 pt-6 border-t border-white/5 group-hover:border-teal-400/20 transition-colors duration-300">
                <p className="text-xs font-mono text-teal-300/90 tracking-widest uppercase leading-relaxed">
                  {item.attribution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}