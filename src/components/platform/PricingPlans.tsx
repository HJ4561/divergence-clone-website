// src/components/platform/PricingPlans.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  what_included: string;
  included_list: string[];
  best_for: string;
  cta_label: string;
  cta_link: string;
  is_featured: boolean;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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
  pricing_plans: PricingPlan[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN PRICING PLANS COMPONENT
// ============================================================
interface PricingPlansProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function PricingPlans({ data, loading = false }: PricingPlansProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-ink-950 bg-grid border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-ink-800 rounded mb-6"></div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-ink-800 rounded mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-96 bg-ink-800 rounded-xl"></div>
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
      <section className="relative overflow-hidden bg-ink-950 bg-grid border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Pricing content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Get pricing plans from API
  const plans = data.pricing_plans && data.pricing_plans.length > 0
    ? data.pricing_plans
    : [];

  // If no plans, show empty state
  if (plans.length === 0) {
    return (
      <section className="relative overflow-hidden bg-ink-950 bg-grid border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No pricing plans available</p>
          </div>
        </div>
      </section>
    );
  }

  // Professional plan (first plan or default)
  const proPlan = plans.find(p => !p.is_featured) || plans[0];
  
  // Enterprise plan (featured plan or second plan)
  const enterprisePlan = plans.find(p => p.is_featured) || (plans.length > 1 ? plans[1] : plans[0]);

  const proFeatures = proPlan?.included_list || [];
  const enterpriseFeatures = enterprisePlan?.included_list || [];

  return (
    <section className="relative overflow-hidden bg-ink-950 bg-grid border-t border-white/10 py-16 md:py-24">
      <div className="pointer-events-none absolute top-24 right-0 w-[420px] h-[420px] bg-teal-400/[0.07] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 08 / PRICING
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-white">
          {data.heading}
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          {data.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {/* Professional Plan */}
          <div className="bg-ink-950 p-6 md:p-8 flex flex-col">
            <span className="text-[11px] font-mono text-gray-500 tracking-widest mb-4">
              {proPlan.name}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl md:text-5xl font-semibold text-white">
                {proPlan.price}
              </span>
            </div>
            <span className="text-[11px] font-mono text-gray-500 tracking-widest mt-1 mb-6">
              {proPlan.price?.includes('$') ? 'PER MONTH' : ''}
            </span>

            <div className="border-t border-white/10 pt-6">
              <ul className="space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="text-sm text-gray-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-teal-300 mt-1 text-[10px]">&#9656;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mt-6 mb-8">
              {proPlan.best_for}
            </p>

            <Link
              to={proPlan.cta_link}
              className="mt-auto inline-block group relative bg-ink-800 hover:bg-ink-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 text-sm text-center border border-white/10 hover:border-teal-400/40"
            >
              <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-30 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300" />
              <span className="relative z-10">{proPlan.cta_label} &rarr;</span>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="relative bg-ink-900/60 p-6 md:p-8 flex flex-col">
            {enterprisePlan.is_featured && (
              <span className="absolute top-6 right-6 md:right-8 text-[10px] font-mono text-teal-300 tracking-widest uppercase border border-teal-400/40 bg-teal-400/10 rounded px-2.5 py-1">
                Recommended
              </span>
            )}

            <span className="text-[11px] font-mono text-gray-500 tracking-widest mb-4">
              {enterprisePlan.name}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif italic text-4xl md:text-5xl font-semibold text-teal-300">
                {enterprisePlan.price}
              </span>
            </div>
            <span className="text-[11px] font-mono text-gray-500 tracking-widest mt-1 mb-6">
              {enterprisePlan.price?.includes('Custom') ? 'PRICING' : ''}
            </span>

            <div className="border-t border-white/10 pt-6">
              <ul className="space-y-3">
                {enterpriseFeatures.map((f) => (
                  <li key={f} className="text-sm text-gray-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-teal-300 mt-1 text-[10px]">&#9656;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mt-6 mb-5">
              {enterprisePlan.best_for}
            </p>

            <div className="border border-white/10 rounded-lg p-4 mb-5">
              <span className="block text-[11px] font-mono text-teal-300 tracking-widest mb-2">
                PRODUCT + ENGINEERING SERVICES
              </span>
              <p className="text-sm text-gray-400 leading-relaxed">
                From one-off automation to a fully integrated agentic simulation workflow, our engineers build and maintain it alongside your team — and keep it working as your solvers evolve.{' '}
                <Link to="/services" className="text-teal-300 hover:text-teal-200 underline underline-offset-2">
                  Explore our services &rarr;
                </Link>
              </p>
            </div>

            <p className="text-gray-500 text-xs mb-6">
              {enterprisePlan.description}
            </p>

            <Link
              to={enterprisePlan.cta_link}
              className="mt-auto inline-block group relative bg-transparent hover:bg-white/5 text-white font-medium px-6 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 text-sm text-center"
            >
              <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-0 blur-sm -z-10 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10">{enterprisePlan.cta_label} &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}