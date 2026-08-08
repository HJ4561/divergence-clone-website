// src/pages/Projects.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, GitBranch, Radio, Zap, Sparkles, Shield, Users, CheckCircle, Clock, TrendingUp, Award } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Antenna-in-Package Optimization',
    description: 'Automated HFSS workflow for configurable antenna modules, reducing setup time from days to 1.5 hours unattended.',
    fullDescription: 'A manufacturer of configurable antenna-in-package modules needed every customer configuration verified, optimized, and documented in Ansys HFSS — an engineer-day of expert work per part. We encoded their process as an agent-run workflow that automates the entire simulation pipeline.',
    tags: ['Ansys HFSS', 'Bayesian Optimization', 'Automation'],
    icon: Cpu,
    results: [
      '1.5 hours unattended run time',
      '90% reduction in manual setup',
      '20+ design candidates explored per run',
      'Full audit trail with replayable runs'
    ],
    technologies: ['Ansys HFSS', 'Python', 'Bayesian Optimization', 'AI Agents']
  },
  {
    id: 2,
    title: 'Fortune-100 Consumer Electronics',
    description: 'Milestone-gated automation program for RF systems team, delivering verified simulation workflows with acceptance criteria.',
    fullDescription: 'We delivered a milestone-gated automation program for the RF systems team of a Fortune-100 consumer-electronics manufacturer — invoiced against acceptance criteria, not hours. Developed with RF engineers across aerospace, telecom, defense, and advanced hardware.',
    tags: ['RF Systems', 'Integration', 'Enterprise'],
    icon: Shield,
    results: [
      'Milestone-gated delivery',
      'Verified simulation workflows',
      'Enterprise-grade integration',
      'Acceptance criteria based invoicing'
    ],
    technologies: ['RF Systems', 'Enterprise Integration', 'Automation']
  },
  {
    id: 3,
    title: 'Aerospace Defense Workflow',
    description: 'Automated meshing and simulation setup for complex radar systems, reducing manual errors and setup time.',
    fullDescription: 'Complex radar systems require precise meshing and simulation setup. We automated the entire workflow, eliminating manual errors that previously plagued the process. Engineers can now focus on analysis rather than setup.',
    tags: ['Radar', 'Meshing', 'Aerospace'],
    icon: Radio,
    results: [
      '100% reduction in manual errors',
      'Automated meshing setup',
      'Radar system optimization',
      'Reduced simulation time by 60%'
    ],
    technologies: ['Radar Systems', 'Meshing', 'Automation']
  },
  {
    id: 4,
    title: 'Medical Device Simulation',
    description: 'AI agent for medical device RF testing and compliance reporting, automating data extraction and validation.',
    fullDescription: 'Medical device manufacturers face stringent compliance requirements. Our AI agent automates RF testing and compliance reporting, extracting and validating data while maintaining complete audit trails for regulatory submissions.',
    tags: ['Medical Devices', 'Compliance', 'Testing'],
    icon: Users,
    results: [
      'Automated compliance reporting',
      'Complete audit trails',
      'Reduced testing time by 70%',
      'Regulatory-ready documentation'
    ],
    technologies: ['Medical Device Testing', 'Compliance', 'RF Testing']
  },
  {
    id: 5,
    title: '5G Massive MIMO Optimization',
    description: 'AI-driven optimization of massive MIMO antenna arrays for 5G base stations, reducing design cycle time by 60%.',
    fullDescription: 'Massive MIMO antenna arrays for 5G base stations require complex optimization. Our AI-driven approach explores thousands of design configurations automatically, reducing the design cycle from months to weeks.',
    tags: ['5G', 'MIMO', 'Antenna Arrays'],
    icon: Zap,
    results: [
      '60% reduction in design cycle',
      'Thousands of configurations explored',
      'Optimal antenna array design',
      'AI-driven optimization'
    ],
    technologies: ['5G', 'MIMO', 'Antenna Design', 'AI Optimization']
  },
  {
    id: 6,
    title: 'Satellite Communication System',
    description: 'End-to-end automation for satellite communication system simulation, from orbital mechanics to RF link budget analysis.',
    fullDescription: 'Satellite communication systems require complex multi-domain simulation. We built an end-to-end automation pipeline that handles everything from orbital mechanics calculations to RF link budget analysis, all in one integrated workflow.',
    tags: ['Satellite', 'RF Link', 'Orbital'],
    icon: Sparkles,
    results: [
      'End-to-end automation',
      'Integrated orbital + RF simulation',
      'Reduced analysis time by 80%',
      'Complete system optimization'
    ],
    technologies: ['Satellite Systems', 'RF Link', 'Orbital Mechanics']
  }
];

// Scanline background effect
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

export default function ProjectsPage() {
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
              Our <span className="text-teal-300">Projects</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              Real-world implementations of AI automation for simulation engineering.
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
                  
                  <p className="text-sm text-gray-300 leading-relaxed mb-4 border-l-2 border-teal-400/30 pl-3">
                    {project.fullDescription}
                  </p>
                  
                  {/* Technologies */}
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
                  
                  {/* Results */}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}