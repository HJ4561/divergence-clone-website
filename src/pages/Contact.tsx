import React from 'react';
import EnquiryForm from '../components/ui/EnquiryForm';
import { Link } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-ink-950 bg-grid pt-16 pb-8 flex items-center">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-ink-900 p-6 md:p-8 rounded-xl border border-white/10">
          <span className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] font-mono tracking-[0.15em] text-gray-500">
            &sect; CONTACT / 001
          </span>

          <span className="font-serif italic text-xl md:text-2xl text-violet-300">&#8711;&middot;AI</span>

          <div className="mt-4 pt-4 border-t border-white/10">
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-white">
              Tell Us About Your Project
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Describe your workflow and we'll reply within 24 hours.
            </p>
          </div>

          <div className="mt-5">
            <EnquiryForm />
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Prefer to talk?{' '}
            <Link to="/contact" className="text-teal-300 hover:text-teal-200 transition-colors underline">
  Book a call &rarr;
</Link>
          </p>
        </div>
      </div>
    </div>
  );
}