// src/components/home/ServicesOverview.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, GitBranch, Users, Radio } from 'lucide-react';

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
// Same pattern as Hero.tsx / BringUsWorkflow.tsx / Header.tsx
// ============================================================
function PrimaryCtaButton({ to, label }: { to: string; label: string }) {
  const cleanLabel = label.replace(/[\s→\u2192]+$/, '').trim();

  return (
    <Link
      to={to}
      className="group relative inline-block bg-ink-800 hover:bg-ink-700 text-white font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base text-center border border-white/10 hover:border-teal-400/40"
    >
      <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-30 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300" />
      <span className="relative z-10">{cleanLabel} &rarr;</span>
    </Link>
  );
}

// ============================================================
// MAIN SERVICES OVERVIEW COMPONENT
// ============================================================
interface ServicesOverviewProps {
  data?: ServiceSectionData | null;
  loading?: boolean;
}

export default function ServicesOverview({ data, loading = false }: ServicesOverviewProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-10 md:mb-14 max-w-2xl">
              <div className="h-4 w-32 bg-ink-800 rounded mb-4"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
              <div className="h-4 w-1/2 bg-ink-800 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-ink-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Services content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API services to the format expected by the UI
  const services = data.services && data.services.length > 0
    ? data.services.map((service) => ({
        icon: getIcon(service.icon),
        title: service.heading,
        description: service.description,
        features: service.points_list && service.points_list.length > 0
          ? service.points_list
          : [],
      }))
    : [];

  // If no services, show empty state
  if (services.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No services available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="what-we-do" className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; 03 / SERVICES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-white">
            {data.heading}
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div className="flex items-center justify-between mb-5">
                <service.icon className="w-7 h-7 text-teal-300" strokeWidth={1.5} />
                <span className="text-xs font-mono text-gray-600 tracking-widest">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5">
                {service.description}
              </p>

              {service.features.length > 0 && (
                <ul className="space-y-2 border-t border-white/10 pt-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-300 flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-teal-400/70 mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
  );
}