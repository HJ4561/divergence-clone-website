import React from 'react';

const quotes = [
  {
    quote: "I spent 3 hours manually fixing an asymmetric mesh — then gave up for the day.",
    attribution: "RF Engineer, Medical-Device Startup",
  },
  {
    quote: "Waiting 10 hours and then nothing. That's an entire day lost.",
    attribution: "Antenna Engineer, Wireless Hardware Company",
  },
  {
    quote: "A lot of the RF experts are baby boomers — we are going to lose a lot of these people.",
    attribution: "Engineering Leader, Aerospace & Defense",
  },
];

export default function FieldNotes() {
  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; 02B / FIELD NOTES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-white">
            The Problem, in Engineers&rsquo; Own Words
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            From 80+ interviews with RF and simulation engineers across aerospace, telecom, semiconductors, and medical devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {quotes.map((item) => (
            <div
              key={item.attribution}
              className="group relative bg-ink-950 p-6 md:p-8 overflow-hidden transition-colors duration-300 hover:bg-white/[0.02]"
            >
              {/* ghost quotation mark — same quiet-signature idea as the ghost numeral before, now matched to what the content actually is */}
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