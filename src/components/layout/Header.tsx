// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },  
  { name: 'Projects', href: '/projects' },
  { name: 'Case Study', href: '/#case-study' },
  { name: 'How We Work', href: '/#process' },
  { name: 'Platform', href: '/platform' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

// ============================================================
// PRIMARY CTA BUTTON — greyish fill, teal border glow on hover
// Matches the Hero.tsx / BringUsWorkflow.tsx button pattern.
// Hover-only teal (like Hero's), not always-on (like BringUsWorkflow's) —
// see note above on why for a persistent nav element.
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
      className={`group relative inline-block bg-ink-800 hover:bg-ink-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-200 text-sm text-center border border-white/10 hover:border-teal-400/40 ${className}`}
    >
      <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-30 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300" />
      <span className="relative z-10">{cleanLabel} &rarr;</span>
    </Link>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // New state for dynamic settings
  const [settings, setSettings] = useState<{
    site_name: string;
    logo: string;
    logo_dark: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // REPLACE THIS URL with your actual backend endpoint
        const response = await fetch('/api/settings'); 
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        
        setSettings({
          site_name: data.site_name || 'Meshengg', // Fallback to Meshengg if field is empty
          logo: data.logo || '',
          logo_dark: data.logo_dark || '',
        });
      } catch (error) {
        console.error('Error fetching header settings:', error);
        // Fallback text if the API completely fails
        setSettings({
          site_name: 'Meshengg',
          logo: '',
          logo_dark: '',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle scroll to section after navigation
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      }
    } else if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');

      if (location.pathname !== '/') {
        navigate(href);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-ink-950/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2.5">
            {/* Dynamic Logo and Site Name Area */}
            <div className="flex items-center gap-2.5">
              {loading ? (
                // Placeholder while loading to prevent layout shift
                <div className="w-24 h-8 bg-white/5 rounded animate-pulse" />
              ) : (
                <>
                  {/* Check if a dark logo exists (since header is dark theme) */}
                  {settings?.logo_dark ? (
                    <img 
                      src={settings.logo_dark} 
                      alt={settings.site_name} 
                      className="h-8 w-auto object-contain"
                    />
                  ) : settings?.logo ? (
                    // Fallback to light logo if dark isn't provided
                    <img 
                      src={settings.logo} 
                      alt={settings.site_name} 
                      className="h-8 w-auto object-contain invert brightness-200" // Added filters to make light logo readable on dark bg
                    />
                  ) : (
                    // TEXT FALLBACK: Changed to Meshengg
                    <span className="font-serif italic text-2xl text-violet-300 tracking-wide">
                      {settings?.site_name || 'Meshengg'}
                    </span>
                  )}
                </>
              )}

              {/* Dynamic Subtext - pulling from site_name */}
              <span className="hidden sm:inline text-[11px] font-mono tracking-[0.2em] text-gray-500 uppercase border-l border-white/15 pl-2.5">
                {loading ? '...' : (settings?.site_name || 'Meshengg')}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-300 hover:text-teal-300 transition-colors duration-200 text-sm cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <PrimaryCtaButton to="/contact" label="Book a Consultation" />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-teal-300 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-300 hover:text-teal-300 transition-colors text-sm cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
              <PrimaryCtaButton
                to="/contact"
                label="Book a Consultation"
                onClick={() => setIsOpen(false)}
                className="w-full"
              />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}