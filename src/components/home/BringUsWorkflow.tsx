import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const logLines = [
  { text: '$ agent run feed_position_sweep.aedt', delay: 200 },
  { text: '→ loading catalog model… done', delay: 900 },
  { text: '→ solving 3 variations in HFSS… done', delay: 1000 },
  { text: '→ verifying results against spec… passed', delay: 1000 },
  { text: '→ generating datasheet.pdf', delay: 800 },
  { text: '✓ workflow complete — 6h 47m saved', delay: 900, accent: true },
];

function WorkflowTerminal() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisible(logLines.length);
      return;
    }
    let cancelled = false;
    let i = 0;
    const step = () => {
      if (cancelled || i >= logLines.length) return;
      i += 1;
      setVisible(i);
      if (i < logLines.length) {
        window.setTimeout(step, logLines[i].delay);
      }
    };
    const first = window.setTimeout(step, logLines[0].delay);
    return () => {
      cancelled = true;
      window.clearTimeout(first);
    };
  }, []);

  const done = visible >= logLines.length;

  return (
    <div className="bg-ink-950 rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
        </div>
        <span className="flex-1 text-center text-[10px] font-mono text-gray-500 tracking-wide">
          agent-run.log
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-teal-300/80">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="p-5 md:p-6 font-mono text-[12.5px] md:text-sm leading-[1.9] min-h-[220px]">
        {logLines.slice(0, visible).map((line, i) => (
          <div
            key={line.text}
            className={line.accent ? 'text-teal-300' : i === 0 ? 'text-gray-300' : 'text-gray-400'}
          >
            {line.text}
          </div>
        ))}
        <span
          className={`inline-block w-[7px] h-[14px] bg-teal-300/80 align-middle ${
            done ? 'animate-pulse' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}

export default function BringUsWorkflow() {
  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5">
              &sect; 09 / GET STARTED
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6 text-white leading-[1.1]">
              Bring Us the Workflow Your Engineers Hate Repeating
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              In one call we'll tell you whether it's automatable, what a pilot looks like, and what it would save you. No slideware — we show you a real workflow running.
            </p>

            <div className="bg-ink-900 p-6 md:p-7 rounded-xl border border-white/10 max-w-md">
              <h3 className="text-lg font-semibold text-white mb-2">Book a Consultation</h3>
              <p className="text-gray-400 text-sm md:text-base mb-5 leading-relaxed">
                30 minutes with the engineers who will actually build your automation.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-cream hover:bg-cream-dark text-ink-950 font-medium px-5 py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                Book a Consultation &rarr;
              </Link>
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                Not ready for a call?{' '}
                <Link to="/contact" className="text-teal-300 hover:text-teal-200 transition-colors underline underline-offset-2">
                  Describe your workflow
                </Link>{' '}
                and we'll reply within 24 hours.
              </p>
            </div>
          </div>

          <div>
            <WorkflowTerminal />
            <div className="flex flex-wrap justify-end gap-x-6 gap-y-2.5 text-[11px] font-mono tracking-[0.1em] text-gray-400 uppercase mt-5">
              <span className="flex items-center gap-1.5">
                <span className="text-teal-300">&#10003;</span> Free initial consultation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal-300">&#10003;</span> NDA-friendly from the first call
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal-300">&#10003;</span> Pilot scoped in weeks, not quarters
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}