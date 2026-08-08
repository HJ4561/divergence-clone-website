// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },  // Changed from /#what-we-do to /services
  { name: 'Projects', href: '/projects' },
  { name: 'Case Study', href: '/#case-study' },
  { name: 'How We Work', href: '/#process' },
  { name: 'Platform', href: '/platform' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
            <span className="font-serif italic text-2xl text-violet-300">&#8711;&middot;AI</span>
            <span className="hidden sm:inline text-[11px] font-mono tracking-[0.2em] text-gray-500 uppercase border-l border-white/15 pl-2.5">
              Website AI
            </span>
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
            <Link
              to="/contact"
              className="bg-cream hover:bg-cream-dark text-ink-950 font-medium px-5 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              Book a Consultation &rarr;
            </Link>
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
              <Link
                to="/contact"
                className="bg-cream hover:bg-cream-dark text-ink-950 font-medium px-4 py-2 rounded-lg text-center transition-colors duration-200 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Book a Consultation &rarr;
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}