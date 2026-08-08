import React from 'react';
import { Link } from 'react-router-dom';

import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  X,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

const footerLinks = {
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },  // Changed from /#what-we-do to /services
    { name: 'Projects', href: '/projects' },
    { name: 'Platform', href: '/platform' },
    { name: 'Blog', href: '/blog' },
  ],


    Resources: [
      { name: 'Case Studies', href: '/#case-study' },
      { name: 'How We Work', href: '/#process' },
      { name: 'FAQ', href: '/#faq' },
    ],

    Contact: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Support', href: '/contact' },
    ],
  };

  const socialLinks = [
    {
      name: 'X',
      href: 'https://twitter.com/divergentphysics',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/divergentphysics',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/divergentphysics',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@divergentphysics',
    },
  ];

  /*
   * Brand icons are rendered as inline SVGs.
   * This avoids react-icons / lucide brand-icon
   * compatibility issues.
   */
  const SocialIcon = ({ name }: { name: string }) => {
    const className =
      'w-4 h-4 group-hover:scale-110 transition-transform duration-200';

    switch (name) {
      case 'X':
        return (
          <X
            className={className}
            strokeWidth={1.5}
          />
        );

      case 'LinkedIn':
        return (
          <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.56V8.99H3.56v11.46ZM22.22 0H1.78C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.25V1.75C24 .78 23.2 0 22.22 0Z" />
          </svg>
        );

      case 'GitHub':
        return (
          <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3Z" />
          </svg>
        );

      case 'YouTube':
        return (
          <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.4.58A3 3 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3 3 0 0 0 2.1 2.12c1.88.58 9.4.58 9.4.58s7.52 0 9.4-.58a3 3 0 0 0 2.1-2.12c.5-1.88.5-5.8.5-5.8s0-3.92-.5-5.8ZM9.55 15.5v-7l6.27 3.5-6.27 3.5Z" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <footer className="relative bg-ink-950 border-t border-white/10 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">

            <Link
              to="/"
              className="flex items-center gap-2.5 mb-4"
            >
              <span className="font-serif italic text-2xl text-violet-300">
                ∇·AI
              </span>

              <span className="text-[11px] font-mono tracking-[0.2em] text-gray-500 uppercase border-l border-white/15 pl-2.5">
                Divergent Physics
              </span>
            </Link>

            <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-4">
              AI agents that automate physics-based simulation end-to-end —
              from antenna design to complete wireless systems.
            </p>

            {/* Contact Information */}
            <div className="space-y-2.5">

              {/* Email */}
              <a
                href="mailto:hello@divergentphysics.com"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-teal-300 transition-colors duration-200 group"
              >
                <Mail
                  className="w-4 h-4 text-teal-400/70 group-hover:text-teal-300 transition-colors"
                  strokeWidth={1.5}
                />

                <span>
                  hello@divergentphysics.com
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-teal-300 transition-colors duration-200 group"
              >
                <Phone
                  className="w-4 h-4 text-teal-400/70 group-hover:text-teal-300 transition-colors"
                  strokeWidth={1.5}
                />

                <span>
                  +1 (234) 567-890
                </span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-2.5 text-sm text-gray-400 group">
                <MapPin
                  className="w-4 h-4 text-teal-400/70 group-hover:text-teal-300 transition-colors shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />

                <span>
                  San Francisco, CA
                </span>
              </div>

            </div>
          </div>

          {/* Footer Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>

              <h3 className="text-xs font-mono text-teal-300 tracking-[0.15em] uppercase mb-4">
                {title}
              </h3>

              <ul className="space-y-2.5">

                {links.map((link) => (
                  <li key={link.name}>

                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-teal-300 transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span>
                        {link.name}
                      </span>

                      <ArrowUpRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </Link>

                  </li>
                ))}

              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-6 md:py-8 flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center sm:text-left">
            &copy; {currentYear} Divergent Physics, Inc.
            {' '}
            (formerly Divergence AI). All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">

            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-2 rounded-lg bg-white/5 hover:bg-teal-400/10 border border-white/10 hover:border-teal-400/30 text-gray-400 hover:text-teal-300 transition-all duration-200 group"
              >
                <SocialIcon name={social.name} />
              </a>
            ))}

          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/5 py-4 flex flex-wrap justify-center gap-x-6 gap-y-2">

          <span className="text-[10px] font-mono tracking-[0.1em] text-gray-600 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400/50" />
            Secure & Private
          </span>

          <span className="text-[10px] font-mono tracking-[0.1em] text-gray-600 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400/50" />
            Enterprise Ready
          </span>

          <span className="text-[10px] font-mono tracking-[0.1em] text-gray-600 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400/50" />
            PhD Built
          </span>

          <span className="text-[10px] font-mono tracking-[0.1em] text-gray-600 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400/50" />
            NDA Protected
          </span>

        </div>

      </div>
    </footer>
  );
}