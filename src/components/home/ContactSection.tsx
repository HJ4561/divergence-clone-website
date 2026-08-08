// src/components/home/ContactSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import EnquiryForm from '../ui/EnquiryForm';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface GetStartedData {
  id: number;
  heading: string;
  description: string;
  image: string | null;
  call_to_action: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN CONTACT SECTION
// ============================================================
interface ContactSectionProps {
  data?: GetStartedData | null;
  loading?: boolean;
}

export default function ContactSection({ data, loading = false }: ContactSectionProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-ink-900 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="text-center">
              <div className="h-4 w-32 bg-ink-800 rounded mx-auto mb-4"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded mx-auto mb-4"></div>
              <div className="h-4 w-1/2 bg-ink-800 rounded mx-auto mb-8"></div>
              <div className="h-64 bg-ink-800 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data) {
    return (
      <section className="py-16 md:py-20 bg-ink-900 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Contact section content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Extract the part before "Your Project" for the heading
  const headingParts = data.heading.split('Your Project');
  const headingBefore = headingParts[0] || 'Tell Us About ';

  return (
    <section id="contact" className="py-16 md:py-20 bg-ink-900 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; CONTACT
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            {headingBefore}<span className="text-teal-300">Your Project</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-3 md:mt-4">
            {data.description}
          </p>
        </div>
        <div className="bg-ink-950 p-6 md:p-8 rounded-xl border border-white/10">
          <EnquiryForm />
        </div>
        <div className="text-center mt-6 md:mt-8">
          <p className="text-sm text-gray-400">
            Talk to us:{' '}
            <Link to="/contact" className="text-teal-300 hover:text-teal-200 transition-colors">
              {data.call_to_action}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}