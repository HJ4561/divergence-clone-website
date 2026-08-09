// src/pages/About.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  X,
  BookOpen,
  MapPin,
  Users,
  Target,
  CheckCircle,
} from 'lucide-react';

// ============================================================
// TYPES - Based on API response from /api/about/sections/
// ============================================================
interface TeamMember {
  id: number;
  name: string;
  designation: string;
  role: string;
  description: string;
  image: string | null;
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Publication {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  link: string;
  citation: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Patent {
  id: number;
  title: string;
  patent_number: string;
  inventors: string;
  year: number;
  link: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AboutStat {
  id: number;
  label: string;
  value: string;
  icon: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AboutSectionData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  team_members: TeamMember[];
  publications: Publication[];
  patents: Patent[];
  stats: AboutStat[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function LinkedinIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.56V8.99H3.56v11.46ZM22.22 0H1.78C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.25V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

// ============================================================
// PRIMARY CTA BUTTON — Matches Header.tsx button pattern
// ============================================================
function PrimaryCtaButton({
  to,
  label,
  onClick,
  className = '',
}: {
  to: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const cleanLabel = label.replace(/[\s→\u2192]+$/, '').trim();

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative inline-block bg-ink-800 hover:bg-ink-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 text-sm text-center border border-white/10 hover:border-teal-400/40 ${className}`}
    >
      <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-30 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300" />
      <span className="relative z-10">{cleanLabel} &rarr;</span>
    </Link>
  );
}

// ============================================================
// OUTLINE CTA BUTTON — For secondary actions
// ============================================================
function OutlineCtaButton({
  to,
  label,
  onClick,
  className = '',
}: {
  to: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const cleanLabel = label.replace(/[\s→\u2192]+$/, '').trim();

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative inline-block bg-transparent hover:bg-white/5 text-white font-medium px-6 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 text-sm text-center ${className}`}
    >
      <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-0 blur-sm -z-10 group-hover:opacity-20 transition-opacity duration-300" />
      <span className="relative z-10">{cleanLabel} &rarr;</span>
    </Link>
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
// HERO
// ============================================================
interface AboutHeroProps {
  heading?: string;
  description?: string;
  loading?: boolean;
}

function AboutHero({ heading, description, loading = false }: AboutHeroProps) {
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-ink-950 bg-grid pt-20 pb-16 md:pt-24 md:pb-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-ink-800 rounded mb-6"></div>
            <div className="h-12 w-3/4 bg-ink-800 rounded mb-4"></div>
            <div className="h-4 w-full bg-ink-800 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!heading || !description) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-ink-950 bg-grid pt-20 pb-16 md:pt-24 md:pb-20 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-float-slower"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 00 / ABOUT US
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-6">
          {heading}
        </h1>

        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 14s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

// ============================================================
// TEAM AVATAR
// ============================================================
function TeamAvatar({
  photo,
  initials,
  name,
}: {
  photo: string | null;
  initials: string;
  name: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored || !photo) {
    return (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-teal-400/40 bg-gradient-to-br from-teal-400/10 to-blue-400/10 flex items-center justify-center shrink-0">
        <span className="font-serif text-xl md:text-2xl text-teal-300 font-semibold">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="relative shrink-0">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300"></div>
      <img
        src={photo}
        alt={name}
        onError={() => setErrored(true)}
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border-2 border-white/10 group-hover:border-teal-400/50 transition-all duration-300"
      />
    </div>
  );
}

// ============================================================
// TEAM SECTION
// ============================================================
function TeamSection({ data, loading = false }: { data?: AboutSectionData | null; loading?: boolean }) {
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="max-w-3xl">
              <div className="h-4 w-32 bg-ink-800 rounded mb-6"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
              <div className="h-4 w-1/2 bg-ink-800 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-ink-800 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  // Map API team members to display format
  const teamMembers = data.team_members && data.team_members.length > 0
    ? data.team_members.map((member) => ({
        name: member.name,
        role: member.role || member.designation || 'Team Member',
        bio: member.description || `${member.name} is a key member of the Meshengg team.`,
        initials: getInitials(member.name),
        photo: member.image || null,
        education: 'View full profile for details',
        experience: ['View full profile for experience details'],
        expertise: ['RF Engineering', 'Simulation', 'AI'],
        publications: 0,
        patents: 0,
        location: 'Global',
        email: '',
        linkedin: member.linkedin || '',
        twitter: member.twitter || '',
      }))
    : [];

  if (teamMembers.length === 0) {
    return null;
  }

  const totalPublications = data.publications?.length || 0;
  const totalPatents = data.patents?.length || 0;
  const teamCount = data.team_members?.length || 0;

  return (
    <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
            &sect; 01 / TEAM
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-white">
            Meet the <span className="text-teal-300">Team</span>
          </h2>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            Meshengg is built by RF and information-theory researchers and engineers with deep antenna, MIMO, and electromagnetic simulation expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {teamMembers.map((person, index) => (
            <div
              key={person.name}
              className="group relative bg-ink-950 rounded-2xl border border-white/10 hover:border-teal-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-400/5 animate-card-enter overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute -inset-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>

              <div className="relative p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <TeamAvatar
                    photo={person.photo}
                    initials={person.initials}
                    name={person.name}
                  />

                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-mono text-teal-300/90 tracking-widest uppercase bg-teal-400/10 rounded-full px-3 py-1 mb-1.5">
                      {person.role}
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
                      {person.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      {person.linkedin && (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${person.name} LinkedIn`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-teal-400/20 text-gray-400 hover:text-teal-300 transition-all duration-200"
                        >
                          <LinkedinIcon />
                        </a>
                      )}
                      {person.twitter && (
                        <a
                          href={person.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${person.name} X`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-teal-400/20 text-gray-400 hover:text-teal-300 transition-all duration-200"
                        >
                          <X className="w-4 h-4" strokeWidth={1.5} />
                        </a>
                      )}
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          aria-label={`Email ${person.name}`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-teal-400/20 text-gray-400 hover:text-teal-300 transition-all duration-200"
                        >
                          <Mail className="w-4 h-4" strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative mt-4">
                  <div className="absolute -top-2 left-0 w-8 h-px bg-gradient-to-r from-teal-400/50 to-transparent"></div>
                  <p className="text-sm text-gray-400 leading-relaxed pt-2 group-hover:text-gray-300 transition-colors duration-300">
                    {person.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-300 bg-teal-400/10 rounded-full px-3 py-1.5 border border-teal-400/20">
                    <Award className="w-3 h-3" />
                    {person.publications} Publications
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-300 bg-teal-400/10 rounded-full px-3 py-1.5 border border-teal-400/20">
                    <Award className="w-3 h-3" />
                    {person.patents} Patents
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-400 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
                    <MapPin className="w-3 h-3" />
                    {person.location.split(',')[0]}
                  </span>
                </div>

                <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-[10px] font-mono text-teal-300 tracking-[0.15em] uppercase flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4" />
                      Education
                    </h4>
                    <p className="text-sm text-gray-300">
                      {person.education}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-[10px] font-mono text-teal-300 tracking-[0.15em] uppercase flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4" />
                      Experience
                    </h4>
                    <ul className="space-y-1.5">
                      {person.experience.map((exp) => (
                        <li key={exp} className="text-sm text-gray-400 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-teal-300/70 shrink-0 mt-0.5" />
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-[10px] font-mono text-teal-300 tracking-[0.15em] uppercase flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4" />
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {person.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-mono text-teal-300 bg-teal-400/10 rounded-full border border-teal-400/20 hover:bg-teal-400/20 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 rounded-xl p-4">
                    <MapPin className="w-4 h-4 text-teal-300/70" />
                    {person.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden">
          <div className="bg-ink-950 p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">{teamCount}</div>
            <div className="text-xs text-gray-400 font-mono tracking-wide">Team Members</div>
          </div>
          <div className="bg-ink-950 p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-teal-300">{totalPublications}</div>
            <div className="text-xs text-gray-400 font-mono tracking-wide">Total Publications</div>
          </div>
          <div className="bg-ink-950 p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-teal-300">{totalPatents}</div>
            <div className="text-xs text-gray-400 font-mono tracking-wide">Patents</div>
          </div>
          <div className="bg-ink-950 p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">10+</div>
            <div className="text-xs text-gray-400 font-mono tracking-wide">Years Combined Experience</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes card-enter {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-card-enter {
          animation: card-enter 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
}

// ============================================================
// WORK WITH US
// ============================================================
function WorkWithUsSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 bg-grid border-t border-white/10 py-16 md:py-24">
      <div className="pointer-events-none absolute -top-10 right-0 w-[480px] h-[480px] bg-teal-400/[0.06] rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-0 w-[480px] h-[480px] bg-blue-400/[0.04] rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 02 / WORK WITH US
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-white">
          Work With Us
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          See how Meshengg automates your HFSS and wireless workflows on top of your existing Ansys setup.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-ink-950 p-6 md:p-8 rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/5">
            <div className="w-12 h-12 rounded-lg bg-teal-400/10 border border-teal-400/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-teal-300" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Schedule a Demo</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Walk through the workflows with our team and discuss your systems.
            </p>
            <PrimaryCtaButton to="/contact" label="Schedule Demo" />
          </div>

          <div className="bg-ink-950 p-6 md:p-8 rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/5">
            <div className="w-12 h-12 rounded-lg bg-teal-400/10 border border-teal-400/20 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-teal-300" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Start Your Free Trial</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Get hands-on with Meshengg's automation across HFSS and wireless systems.
            </p>
            <OutlineCtaButton to="/contact" label="Start Free Trial" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
const footerLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Platform', href: '/platform' },
  { label: 'Wireless', href: '/wireless' },
  { label: 'About', href: '/about' },
  { label: 'Talk to us', href: '/contact' },
];

function AboutFooter() {
  return (
    <footer className="bg-ink-950 border-t border-white/10 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500 text-center sm:text-left">
          &copy; 2026 Meshengg, Inc.
          {' '}
          (formerly Meshengg). All rights reserved.
        </p>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-xs font-mono tracking-wide text-gray-400 hover:text-teal-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================
export default function AboutPage() {
  const [data, setData] = useState<AboutSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // SCROLL TO TOP ON PAGE LOAD
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ============================================================
  // FETCH ABOUT DATA
  // Endpoint: GET /api/about/sections/
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://client-divergent.vercel.app/api/about/sections/');
        
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
        
        setData(sectionData);
        setError(null);
      } catch (err) {
        console.error('Error fetching about data:', err);
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

  if (!data) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">No about data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink-950">
      <AboutHero 
        heading={data.heading}
        description={data.description}
        loading={loading}
      />
      <TeamSection data={data} loading={loading} />
      <WorkWithUsSection />
      <AboutFooter />
      <ScrollToTop />
    </div>
  );
}