// src/pages/Contact.tsx
import React, { useState, useEffect } from 'react';
import EnquiryForm from '../components/ui/EnquiryForm';
import { Link } from 'react-router-dom';

// ============================================================
// SCROLL TO TOP COMPONENT
// ============================================================
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 p-3 bg-teal-400/10 hover:bg-teal-400/20 text-teal-300 rounded-full border border-teal-400/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-110 shadow-lg shadow-teal-500/10"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================
  // SCROLL TO TOP ON PAGE LOAD
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    setIsSubmitting(true);
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
        // Handle validation errors
        const errorMessages = Object.values(data).flat().join(' ');
        setSubmitStatus('error');
        setMessage(`❌ ${errorMessages || 'Please check your form and try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setMessage('❌ Failed to send. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <EnquiryForm onSubmit={handleFormSubmit} />
          </div>

          {/* Status messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-3 bg-teal-400/10 border border-teal-400/30 rounded-lg">
              <p className="text-teal-300 text-sm text-center">{message}</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-400/10 border border-red-400/30 rounded-lg">
              <p className="text-red-400 text-sm text-center">{message}</p>
            </div>
          )}
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
      <ScrollToTop />
    </div>
  );
}