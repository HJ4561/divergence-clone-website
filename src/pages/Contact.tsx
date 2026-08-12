// src/pages/Contact.tsx
import React, { useEffect, useState } from 'react';
import EnquiryForm from '../components/ui/EnquiryForm';
import { Link } from 'react-router-dom';

// ============================================================
// SCROLL TO TOP COMPONENT
// ============================================================
function ScrollToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

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
  // State for dynamic settings
  const [settings, setSettings] = useState<{
    site_name: string;
    logo: string;
    logo_dark: string;
    calendar_link: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/site-settings/');
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();

        setSettings({
          site_name: data.site_name || 'Brand',
          logo: data.logo || '',
          logo_dark: data.logo_dark || '',
          calendar_link: data.calendar_link || '/contact',
        });
      } catch (error) {
        console.error('Error fetching contact settings:', error);
        // Fallback to null so it shows generic placeholders on failure
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 bg-grid flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6">
        <div className="relative bg-ink-900 p-5 sm:p-6 md:p-7 rounded-xl border border-white/10">
          <span className="absolute top-3 right-3 md:top-4 md:right-4 text-[10px] font-mono tracking-[0.15em] text-gray-500">
            &sect; CONTACT / 001
          </span>

          {/* Dynamic Brand Logo / Name */}
          <div className="h-8 flex items-center">
            {loading ? (
              <div className="w-24 h-6 bg-white/5 rounded animate-pulse" />
            ) : (
              <>
                {settings?.logo_dark ? (
                  <img
                    src={settings.logo_dark}
                    alt={settings.site_name}
                    className="h-6 w-auto object-contain"
                  />
                ) : settings?.logo ? (
                  <img
                    src={settings.logo}
                    alt={settings.site_name}
                    className="h-6 w-auto object-contain invert brightness-200"
                  />
                ) : (
                  <span className="font-serif italic text-xl md:text-2xl text-violet-300 tracking-wide">
                    {settings?.site_name || 'Brand'}
                  </span>
                )}
              </>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-white/10">
            <h1 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Tell Us About Your Project
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Describe your workflow and we'll reply within 24 hours.
            </p>
          </div>

          <div className="mt-4">
            <EnquiryForm />
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="text-xs sm:text-sm text-gray-400">
            Prefer to talk?{' '}
            <Link 
              to={settings?.calendar_link || '/contact'} 
              className="text-teal-300 hover:text-teal-200 transition-colors underline"
            >
              Book a call &rarr;
            </Link>
          </p>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}