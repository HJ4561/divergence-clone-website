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
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No field notes available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; 02B / FIELD NOTES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-white">
            {data.heading}
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            {data.sub_heading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {quotes.map((item) => (
            <div
              key={item.attribution}
              className="group relative bg-ink-950 p-6 md:p-8 overflow-hidden transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="pointer-events-none absolute -top-6 -left-1 font-serif text-8xl md:text-9xl text-white/[0.05] select-none leading-none">
                &ldquo;
              </span>

              <div className="relative">
                <p className="font-serif text-lg md:text-xl text-white leading-snug mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-[11px] font-mono text-teal-300/90 tracking-widest uppercase leading-relaxed">
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