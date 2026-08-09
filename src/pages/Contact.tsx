// src/pages/Contact.tsx
import React, { useState } from 'react';
import EnquiryForm from '../components/ui/EnquiryForm';
import { Link } from 'react-router-dom';

// ============================================================
// CONTACT PAGE
// ============================================================
export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // ============================================================
  // HANDLE FORM SUBMISSION
  // Endpoint: POST /api/leads/
  // ============================================================
  const handleFormSubmit = async (formData: {
    company_name: string;
    email: string;
    solver_used: string;
    workflow_description: string;
  }) => {
    setSubmitStatus('idle');
    setMessage('');

    try {
      const response = await fetch('https://client-divergent.vercel.app/api/leads/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setMessage('✅ Your message has been sent successfully! We\'ll get back to you within 24 hours.');
      } else {
        const errorMessages = Object.values(data).flat().join(' ');
        setSubmitStatus('error');
        setMessage(`❌ ${errorMessages || 'Please check your form and try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setMessage('❌ Failed to send. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 bg-grid flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6">
        <div className="relative bg-ink-900 p-5 sm:p-6 md:p-7 rounded-xl border border-white/10">
          <span className="absolute top-3 right-3 md:top-4 md:right-4 text-[10px] font-mono tracking-[0.15em] text-gray-500">
            &sect; CONTACT / 001
          </span>

          <span className="font-serif italic text-xl md:text-2xl text-violet-300">&#8711;&middot;AI</span>

          <div className="mt-3 pt-3 border-t border-white/10">
            <h1 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Tell Us About Your Project
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Describe your workflow and we'll reply within 24 hours.
            </p>
          </div>

          <div className="mt-4">
            <EnquiryForm onSubmit={handleFormSubmit} />
          </div>

          {/* Status messages */}
          {submitStatus === 'success' && (
            <div className="mt-3 p-2.5 bg-teal-400/10 border border-teal-400/30 rounded-lg">
              <p className="text-teal-300 text-xs sm:text-sm text-center">{message}</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-3 p-2.5 bg-red-400/10 border border-red-400/30 rounded-lg">
              <p className="text-red-400 text-xs sm:text-sm text-center">{message}</p>
            </div>
          )}
        </div>

        <div className="text-center mt-3">
          <p className="text-xs sm:text-sm text-gray-400">
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