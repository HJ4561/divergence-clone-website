// src/pages/Platform.tsx
import React, { useState, useEffect } from 'react';
import PlatformHero from '../components/platform/Platformhero'; // Fixed: match actual filename
import IndustriesStrip from '../components/platform/IndustriesStrip';
import ProblemsGrid from '../components/platform/ProblemsGrid';
import PlatformStats from '../components/platform/PlatformStats';
import WorkflowSteps from '../components/platform/WorkflowSteps';
import ScaleImpact from '../components/platform/ScaleImpact';
import TwoWaysToWork from '../components/platform/TwoWaysToWork';
import CustomModels from '../components/platform/CustomModels';
import InActionDemos from '../components/platform/InActionDemos';
import EnterpriseFeatures from '../components/platform/EnterpriseFeatures';
import PricingPlans from '../components/platform/PricingPlans';
import PlatformFinalCTA from '../components/platform/PlatformFinalCTA';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface PlatformSectionData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  operating_benefits: any[];
  work_with_us: any[];
  coming_soon: any[];
  demonstrations: any[];
  built_for_production: any[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
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
// MAIN PLATFORM PAGE
// ============================================================
export default function Platform() {
  const [data, setData] = useState<PlatformSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // SCROLL TO TOP ON PAGE LOAD
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ============================================================
  // FETCH PLATFORM DATA
  // Endpoint: GET /api/platform/sections/
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://client-divergent.vercel.app/api/platform/sections/');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const json = await response.json();
        
        // Handle different response formats
        let sectionData = null;
        if (Array.isArray(json) && json.length > 0) {
          sectionData = json[0];
        } else if (json && typeof json === 'object' && json.id) {
          sectionData = json;
        } else if (json && json.results && Array.isArray(json.results) && json.results.length > 0) {
          sectionData = json.results[0];
        }
        
        console.log('Platform Data:', sectionData); // Debug log
        setData(sectionData);
        setError(null);
      } catch (err) {
        console.error('Error fetching platform data:', err);
        setError('Failed to load platform content. Please refresh the page.');
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
          <p className="text-gray-400">Loading platform...</p>
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

  if (!data) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">No platform data available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PlatformHero data={data} loading={loading} />
      <IndustriesStrip data={data} loading={loading} />
      <ProblemsGrid data={data} loading={loading} />
      <PlatformStats data={data} loading={loading} />
      <WorkflowSteps data={data} loading={loading} />
      <ScaleImpact data={data} loading={loading} />
      <TwoWaysToWork data={data} loading={loading} />
      <CustomModels data={data} loading={loading} />
      <InActionDemos data={data} loading={loading} />
      <EnterpriseFeatures data={data} loading={loading} />
      <PricingPlans data={data} loading={loading} />
      <PlatformFinalCTA data={data} loading={loading} />
      <ScrollToTop />
    </>
  );
}