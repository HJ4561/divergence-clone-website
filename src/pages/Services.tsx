// src/pages/Services.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, GitBranch, Users, Radio, ArrowRight, CheckCircle, Download } from 'lucide-react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface ServiceCard {
  id: number;
  heading: string;
  description: string;
  icon: string;
  image: string | null;
  points: string;
  points_list: string[];
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ServiceSectionData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  services: ServiceCard[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// ICON MAP - Map API icon strings to Lucide components
// ============================================================
const iconMap: Record<string, React.ElementType> = {
  'cpu': Cpu,
  'git-branch': GitBranch,
  'users': Users,
  'radio': Radio,
  'Cpu': Cpu,
  'GitBranch': GitBranch,
  'Users': Users,
  'Radio': Radio,
};

function getIcon(iconName: string): React.ElementType {
  return iconMap[iconName] || Cpu;
}

// ============================================================
// PRIMARY CTA BUTTON — greyish fill, teal border glow on hover
// Same pattern as Hero.tsx / BringUsWorkflow.tsx / Header.tsx / ServicesOverview.tsx
// ============================================================
function PrimaryCtaButton({ to, label, className = '' }: { to: string; label: string; className?: string }) {
  const cleanLabel = label.replace(/[\s→\u2192]+$/, '').trim();

  return (
    <Link
      to={to}
      className={`group relative inline-block bg-ink-800 hover:bg-ink-700 text-white font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base text-center border border-white/10 hover:border-teal-400/40 ${className}`}
    >
      <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-30 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300" />
      <span className="relative z-10">{cleanLabel} &rarr;</span>
    </Link>
  );
}

// ============================================================
// ANIMATED BACKGROUND
// ============================================================
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-3xl animate-orb-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-3xl animate-orb-float-delay"></div>

      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="service-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#5eead4" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#service-grid)" />
        </svg>
      </div>

      <div className="absolute top-1/5 left-1/4 w-1.5 h-1.5 bg-teal-400/20 rounded-full animate-particle-float"></div>
      <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-teal-400/15 rounded-full animate-particle-float-delay"></div>
      <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-teal-400/20 rounded-full animate-particle-float-delay-2"></div>
      <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-teal-400/15 rounded-full animate-particle-float"></div>
    </div>
  );
}

// ============================================================
// STATS COUNTER
// ============================================================
function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let timer: NodeJS.Timeout;

    const startCounting = setTimeout(() => {
      timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCount(Math.floor(current));
      }, duration / steps);
    }, delay);

    return () => {
      clearTimeout(startCounting);
      clearInterval(timer);
    };
  }, [value, delay]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {value.includes('+') ? `${count}+` : count}
      </div>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
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
// MAIN SERVICES PAGE
// ============================================================
export default function ServicesPage() {
  const [data, setData] = useState<ServiceSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '1234567890';

  // ============================================================
  // FETCH SERVICES DATA
  // Endpoint: GET /api/website-data/ and extracts service_section
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

        // Extract service_section from the response
        const serviceData = json.service_section || null;
        console.log('Services Data:', serviceData); // Debug log
        setData(serviceData);
        setError(null);
      } catch (err) {
        console.error('Error fetching services data:', err);
        setError('Failed to load services. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ============================================================
  // SCROLL TO TOP ON PAGE LOAD
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading services...</p>
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
            Try again &rarr;
          </button>
        </div>
      </div>
    );
  }

  // If no data, show error state
  if (!data || !data.services || data.services.length === 0) {
    return (
      <div className="min-h-screen bg-ink-950 pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-24">
            <p className="text-gray-400">No services available</p>
          </div>
        </div>
      </div>
    );
  }

  // Map API services to the format expected by the UI
  const services = data.services.map((service) => ({
    icon: getIcon(service.icon),
    title: service.heading,
    description: service.description,
    features: service.points_list && service.points_list.length > 0
      ? service.points_list
      : [],
    whatsappMessage: `Hi! I'm interested in the ${service.heading} template. Can you share the code template for this service?`
  }));

  return (
    <div className="min-h-screen bg-ink-950 pt-16 overflow-hidden">
      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes orb-float-delay {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(20px, -30px) scale(1.5); opacity: 0.5; }
        }
        @keyframes particle-float-delay {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(-25px, -20px) scale(1.5); opacity: 0.5; }
        }
        @keyframes particle-float-delay-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(15px, 25px) scale(1.5); opacity: 0.5; }
        }
        @keyframes card-enter {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-orb-float {
          animation: orb-float 12s ease-in-out infinite;
        }
        .animate-orb-float-delay {
          animation: orb-float-delay 14s ease-in-out infinite;
        }
        .animate-particle-float {
          animation: particle-float 7s ease-in-out infinite;
        }
        .animate-particle-float-delay {
          animation: particle-float-delay 8s ease-in-out infinite;
        }
        .animate-particle-float-delay-2 {
          animation: particle-float-delay-2 9s ease-in-out infinite;
        }
        .animate-card-enter {
          animation: card-enter 0.6s ease-out both;
        }
        .animate-pulse-dot {
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out both;
        }
      `}</style>

      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up">
            <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
              &sect; 03 / SERVICES
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-5 max-w-2xl">
              {data.heading}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              {data.description}
            </p>
            <div className="mt-6">
              <PrimaryCtaButton to="/contact" label="Discuss Your Workflow" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Using static stats since they're not in the API */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatItem value="90" label="Reduction in Setup Time" delay={0} />
            <StatItem value="20" label="Design Candidates Per Run" delay={500} />
            <StatItem value="100" label="Audit Trail Coverage" delay={1000} />
            <StatItem value="24" label="Hour Support Response" delay={1500} />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] animate-card-enter"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <Icon className="w-7 h-7 text-teal-300" strokeWidth={1.5} />
                    <span className="text-xs font-mono text-gray-600 tracking-widest">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5 group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>

                  {service.features.length > 0 && (
                    <ul className="space-y-2 border-t border-white/10 pt-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm text-gray-300 flex items-start gap-2.5 group-hover:text-gray-200 transition-colors duration-300">
                          <CheckCircle className="w-4 h-4 text-teal-300/70 shrink-0 mt-0.5" strokeWidth={1.5} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/services/${service.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="text-teal-300 hover:text-teal-200 transition-colors inline-flex items-center gap-2 text-sm font-medium"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Get the Code Button */}
                    <button
                      onClick={() => handleWhatsAppClick(service.whatsappMessage)}
                      className="ml-auto inline-flex items-center gap-2 bg-teal-400/10 hover:bg-teal-400/20 text-teal-300 border border-teal-400/30 hover:border-teal-400/50 px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-medium"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                      </span>
                      <Download className="w-3.5 h-3.5" />
                      Get the Code
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12">
            <PrimaryCtaButton to="/contact" label="Discuss Your Workflow" />
            <Link
              to="/wireless"
              className="text-teal-300 hover:text-teal-200 transition-colors inline-flex items-center gap-2 text-sm md:text-base"
            >
              Explore our wireless system workflows &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}