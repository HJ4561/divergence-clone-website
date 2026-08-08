// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import FieldNotes from '../components/home/FieldNotes';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import ServicesOverview from '../components/home/ServicesOverview';
import CaseStudy from '../components/home/CaseStudy';
import AssetSection from '../components/home/AssetSection';
import HowWeWork from '../components/home/HowWeWork';
import WhyUs from '../components/home/WhyUs';
import PlatformSection from '../components/home/PlatformSection';
import QuestionsSection from '../components/home/QuestionsSection';
import BringUsWorkflow from '../components/home/BringUsWorkflow';
import Problems from '../components/home/Problems';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface WebsiteData {
  hero: any | null;
  pipeline_steps: any[];
  problem_statement: any | null;
  statistic: any | null;
  field_note: any | null;
  service_section: any | null;
  case_study: any | null;
  asset_section: any | null;
  how_we_work: any | null;
  why_us: any | null;
  platform: any | null;
  faqs: any[];
  get_started: any | null;
  projects: any | null;
  about: any | null;
}

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
// MAIN HOME PAGE
// ============================================================
export default function Home() {
  const [data, setData] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // SCROLL TO TOP ON PAGE LOAD
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ============================================================
  // FETCH WEBSITE DATA
  // Endpoint: GET /api/website-data/
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://client-divergent.vercel.app/api/website-data/');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.error('Error fetching website data:', err);
        setError('Failed to load content. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-teal-300 hover:text-teal-200 transition-colors"
          >
            Try again →
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero data={data?.hero} pipelineSteps={data?.pipeline_steps || []} />
      <Problems data={data?.problem_statement} />
      <Stats data={data?.statistic} />
      <Testimonials data={data?.problem_statement} />
      <FieldNotes data={data?.field_note} />
      <ServicesOverview data={data?.service_section} />
      <CaseStudy data={data?.case_study} />
      <AssetSection data={data?.asset_section} />
      <HowWeWork data={data?.how_we_work} />
      <WhyUs data={data?.why_us} />
      <PlatformSection data={data?.platform} />
      <QuestionsSection data={data?.faqs} />
      <BringUsWorkflow data={data?.get_started} />
      <ScrollToTop />
    </>
  );
}