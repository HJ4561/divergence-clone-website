// src/pages/Projects.tsx
import React, { useState, useEffect } from 'react';
import { Cpu, Radio, Zap, Sparkles, Shield, Users, CheckCircle } from 'lucide-react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface ProjectCard {
  id: number;
  number: string;
  heading: string;
  description: string;
  icon: string;
  image: string | null;
  points: string;
  points_list: string[];
  technologies: string;
  technologies_list: string[];
  key_results: string;
  key_results_list: string[];
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ProjectSectionData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  projects: ProjectCard[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// ICON MAP - Map API icon strings to Lucide components
// ============================================================
const iconMap: Record<string, React.ElementType> = {
  'cpu': Cpu,
  'radio': Radio,
  'zap': Zap,
  'sparkles': Sparkles,
  'shield': Shield,
  'users': Users,
  'Cpu': Cpu,
  'Radio': Radio,
  'Zap': Zap,
  'Sparkles': Sparkles,
  'Shield': Shield,
  'Users': Users,
};

function getIcon(iconName: string): React.ElementType {
  return iconMap[iconName] || Cpu;
}

// ============================================================
// SCANLINE BACKGROUND
// ============================================================
function ScanlineField() {
  const wavePath = "M0,60 Q50,20 100,60 T200,60 T300,60 T400,60";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120px] opacity-[0.06]">
        <div className="flex w-[1600px] motion-safe:animate-[waveDrift_26s_linear_infinite]">
          {[0, 1, 2, 3].map((i) => (
            <svg key={i} viewBox="0 0 400 120" className="w-[400px] h-[120px] shrink-0" preserveAspectRatio="none">
              <path d={wavePath} fill="none" stroke="#5eead4" strokeWidth="1" />
            </svg>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-teal-400/[0.05] to-transparent motion-safe:animate-[scanSweep_7s_ease-in-out_infinite]" />
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
// MAIN PROJECTS PAGE
// ============================================================
export default function ProjectsPage() {
  const [data, setData] = useState<ProjectSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // FETCH PROJECTS DATA
  // Endpoint: GET /api/projects/sections/
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://client-divergent.vercel.app/api/projects/sections/');
        
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
        
        console.log('Projects Data:', sectionData); // Debug log
        setData(sectionData);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects data:', err);
        setError('Failed to load projects. Please refresh the page.');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
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

  // If no data, show error state
  if (!data || !data.projects || data.projects.length === 0) {
    return (
      <div className="min-h-screen bg-ink-950 pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-24">
            <p className="text-gray-400">No projects available</p>
          </div>
        </div>
      </div>
    );
  }

  // Map API projects to the format expected by the UI
  const projects = data.projects.map((project) => ({
    id: project.id,
    title: project.heading,
    description: project.description,
    fullDescription: project.points_list && project.points_list.length > 0 
      ? project.points_list.join(' ') 
      : '',
    tags: project.technologies_list && project.technologies_list.length > 0
      ? project.technologies_list.slice(0, 4)
      : [],
    icon: getIcon(project.icon),
    results: project.key_results_list && project.key_results_list.length > 0
      ? project.key_results_list
      : [],
    technologies: project.technologies_list && project.technologies_list.length > 0
      ? project.technologies_list
      : [],
  }));

  return (
    <div className="min-h-screen bg-ink-950 pt-16 overflow-hidden">
      <style>{`
        @keyframes waveDrift { from { transform: translateX(0); } to { transform: translateX(-400px); } }
        @keyframes scanSweep { 0% { transform: translateX(-100px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(calc(100vw + 100px)); opacity: 0; } }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -40px) scale(1.1); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 30px) scale(1.2); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(30px, -40px) scale(1.5); opacity: 0.8; }
        }
        @keyframes float-particle-delay {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(-35px, -30px) scale(1.5); opacity: 0.8; }
        }
        @keyframes float-particle-delay-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(25px, 35px) scale(1.5); opacity: 0.8; }
        }
        @keyframes card-enter {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shimmer-delay {
          0% { transform: translateX(-100%); opacity: 0; }
          30% { opacity: 0; }
          80% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 14s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle 7s ease-in-out infinite;
        }
        .animate-float-particle-delay {
          animation: float-particle-delay 8s ease-in-out infinite;
        }
        .animate-float-particle-delay-2 {
          animation: float-particle-delay-2 9s ease-in-out infinite;
        }
        .animate-card-enter {
          animation: card-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-shimmer {
          animation: shimmer 5s ease-in-out infinite;
        }
        .animate-shimmer-delay {
          animation: shimmer-delay 6s ease-in-out infinite;
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out both;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/3 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="absolute top-1/5 left-1/4 w-2 h-2 bg-teal-400/30 rounded-full animate-float-particle"></div>
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-teal-400/20 rounded-full animate-float-particle-delay"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2.5 h-2.5 bg-teal-400/25 rounded-full animate-float-particle-delay-2"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-teal-400/20 rounded-full animate-float-particle"></div>
        <div className="absolute bottom-1/5 left-1/3 w-2 h-2 bg-teal-400/25 rounded-full animate-float-particle-delay"></div>
        
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="projects-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#5eead4" strokeWidth="0.5" strokeOpacity="0.3">
                  <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="6s" repeatCount="indefinite" />
                </path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#projects-grid)" />
          </svg>
        </div>

        <div className="absolute top-0 left-0 w-1/4 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent animate-shimmer"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent animate-shimmer-delay"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-ink-950/80 bg-grid pt-20 pb-16 md:pt-24 md:pb-20 border-b border-white/10">
        <ScanlineField />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up">
            <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
              &sect; 04 / PROJECTS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-5 max-w-2xl">
              {data.heading}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-16 md:py-24 bg-ink-900/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="group bg-ink-950 p-6 md:p-8 rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-500 hover:shadow-lg hover:shadow-teal-400/5 animate-card-enter"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-teal-400/10 border border-teal-400/20">
                      <Icon className="w-6 h-6 text-teal-300" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-mono text-gray-500 tracking-widest group-hover:text-teal-300 transition-colors duration-300">
                      0{project.id}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  
                  {project.fullDescription && (
                    <p className="text-sm text-gray-300 leading-relaxed mb-4 border-l-2 border-teal-400/30 pl-3">
                      {project.fullDescription}
                    </p>
                  )}
                  
                  {/* Technologies */}
                  {project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-mono text-teal-300 tracking-[0.15em] uppercase mb-2">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/5 rounded-full border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Results */}
                  {project.results.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono text-teal-300 tracking-[0.15em] uppercase mb-2">
                        Key Results
                      </h4>
                      <ul className="space-y-1.5">
                        {project.results.map((result) => (
                          <li key={result} className="text-sm text-gray-400 flex items-start gap-2 group-hover:text-gray-300 transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 text-teal-300/70 shrink-0 mt-0.5" strokeWidth={1.5} />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}