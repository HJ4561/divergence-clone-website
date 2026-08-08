# Create all React component files
# This will create the entire project structure with all components

# Function to create file with content
function Create-File {
    param($Path, $Content)
    $Content | Out-File -FilePath $Path -Encoding utf8
}

# Create Header
Create-File "src/components/layout/Header.tsx" @'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg"></div>
            <span className="font-bold text-xl">
              <span className="text-cyan-400">Divergent</span>
              <span className="text-white">Physics</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-gray-300 hover:text-white transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/#contact" className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 hover:text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href} className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              ))}
              <Link to="/#contact" className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg text-center hover:opacity-90 transition-opacity" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
'@

# Create Footer
Create-File "src/components/layout/Footer.tsx" @'
import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Services: [
    { name: 'Agentic Workflow Development', href: '/services/agentic-workflow' },
    { name: 'Integration & Deployment', href: '/services/integration' },
    { name: 'AI Enablement', href: '/services/ai-enablement' },
    { name: 'RF & EM Engineering', href: '/services/rf-engineering' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg"></div>
              <span className="font-bold text-xl">
                <span className="text-cyan-400">Divergent</span>
                <span className="text-white">Physics</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              We design, build, and maintain AI agents that run your real workflows — CAD to simulation to customer-ready datasheet.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Divergent Physics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
'@

# Create WhatsApp Button
Create-File "src/components/ui/WhatsAppButton.tsx" @'
import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '1234567890';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110" aria-label="Contact on WhatsApp">
      <MessageCircle size={28} />
    </a>
  );
}
'@

# Create Enquiry Form
Create-File "src/components/ui/EnquiryForm.tsx" @'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

type FormData = {
  user_name: string;
  user_email: string;
  company: string;
  message: string;
};

export default function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
      );
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
        <input
          {...register('user_name', { required: 'Name is required' })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
          placeholder="Your name"
        />
        {errors.user_name && <p className="text-red-400 text-sm mt-1">{errors.user_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input
          {...register('user_email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
          placeholder="your@email.com"
        />
        {errors.user_email && <p className="text-red-400 text-sm mt-1">{errors.user_email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
        <input
          {...register('company')}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
          placeholder="Your company name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={5}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
          placeholder="Tell us about the workflow your team repeats..."
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitStatus === 'success' && <p className="text-green-400 text-center">✅ Your message has been sent successfully!</p>}
      {submitStatus === 'error' && <p className="text-red-400 text-center">❌ Failed to send. Please try again or contact us directly.</p>}
    </form>
  );
}
'@

# Create Hero
Create-File "src/components/home/Hero.tsx" @'
import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Transformation</span>
            <br />
            <span className="text-white">for Simulation Engineering</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            We design, build, and maintain AI agents that run your real workflows — CAD to simulation to customer-ready datasheet — inside the solver stack your team already uses.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact" className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Start Your Pilot
            </Link>
            <Link to="/services" className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold border border-gray-700 hover:bg-gray-700 transition-colors">
              Learn More
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>✅ NDA before we see anything</span>
            <span>⚡ Pilot running in weeks</span>
            <span>🔒 Your workflows stay yours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
'@

# Create Problems
Create-File "src/components/home/Problems.tsx" @'
import React from 'react';

const problems = [
  {
    title: 'The Compute Is No Longer the Limiting Factor. The Manual Work Is.',
    description: "The best AI use case isn't the problem your team never cracked. It's the simulation setup, sweep, and report your engineers repeat for the tenth time this month.",
    icon: '🔄',
  },
  {
    title: 'Expertise Trapped in Few Hands',
    description: 'Complex EM setups depend on a handful of senior engineers — many nearing retirement. We encode their process as reviewable, versioned workflows any agent and any junior engineer can execute.',
    icon: '🧠',
  },
  {
    title: 'Your Workflows Are an Asset',
    description: 'Every workflow your team runs by hand evaporates when the run ends. Encoded, it becomes property: automation today, training data for your own models next.',
    icon: '💎',
  },
];

export default function Problems() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Not Moonshots — <span className="text-cyan-400">Bottlenecks</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div key={problem.title} className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all">
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-gray-400">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@

# Create Stats
Create-File "src/components/home/Stats.tsx" @'
import React from 'react';

const stats = [
  { value: '1.5h', label: 'Unattended run replacing an engineer-day of solver work' },
  { value: '20+', label: 'Full-wave design candidates explored per run' },
  { value: '0', label: 'Setups done by hand — agents do the clicking' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@

# Create ServicesOverview
Create-File "src/components/home/ServicesOverview.tsx" @'
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, GitBranch, Users, Radio } from 'lucide-react';

const services = [
  {
    icon: Cpu,
    title: 'Agentic Workflow Development',
    description: 'Turn your workflow into an AI agent that runs end to end, unattended, with every step logged.',
    href: '/services/agentic-workflow',
  },
  {
    icon: GitBranch,
    title: 'Integration & Deployment',
    description: 'AI automation deployed inside your solver environment and security perimeter.',
    href: '/services/integration',
  },
  {
    icon: Users,
    title: 'AI Enablement for Engineering Teams',
    description: 'Your engineers build the automation themselves on our platform and domain primitives.',
    href: '/services/ai-enablement',
  },
  {
    icon: Radio,
    title: 'Dedicated RF & EM Engineering',
    description: 'Deep electromagnetic expertise on demand for complex simulations.',
    href: '/services/rf-engineering',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          What <span className="text-cyan-400">We Do</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          End-to-end AI automation for simulation-driven engineering teams — done for you, or built with your engineers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link key={service.title} to={service.href} className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all group">
              <service.icon className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
'@

# Create HowWeWork
Create-File "src/components/home/HowWeWork.tsx" @'
import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: "Walk us through one workflow — a 30-minute screen share. We tell you on the spot whether it's automatable.",
  },
  {
    number: '02',
    title: 'Pilot',
    description: 'We embed with your team and encode one workflow you already run — weekly sessions, about an hour of your time.',
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'The automation moves into your environment — your security perimeter, your solvers, your data.',
  },
  {
    number: '04',
    title: 'Scale & Support',
    description: 'From one workflow to a fleet. We maintain it as your solvers evolve.',
  },
];

export default function HowWeWork() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How <span className="text-cyan-400">We Work</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="text-5xl font-bold text-cyan-400/20 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@

# Create WhyUs
Create-File "src/components/home/WhyUs.tsx" @'
import React from 'react';

export default function WhyUs() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why <span className="text-cyan-400">Divergent Physics</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-white mb-3">Engineers, Not Career Consultants</h3>
            <p className="text-gray-400">Founded by three PhDs in electromagnetics and applied mathematics, with industry experience at Apple and Ansys.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">🏭</div>
            <h3 className="text-xl font-semibold text-white mb-3">Trusted in Production</h3>
            <p className="text-gray-400">Delivering milestone-gated automation programs for Fortune-100 consumer-electronics manufacturers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
'@

# Create ContactSection
Create-File "src/components/home/ContactSection.tsx" @'
import React from 'react';
import EnquiryForm from '../ui/EnquiryForm';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Tell Us About <span className="text-cyan-400">Your Project</span>
          </h2>
          <p className="text-gray-400 mt-4">Describe the workflow your team repeats and we'll reply within 24 hours.</p>
        </div>
        <div className="bg-gray-950 p-8 rounded-xl border border-gray-800">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
'@

# Create Pages
Create-File "src/pages/Home.tsx" @'
import React from 'react';
import Hero from '../components/home/Hero';
import Problems from '../components/home/Problems';
import Stats from '../components/home/Stats';
import ServicesOverview from '../components/home/ServicesOverview';
import HowWeWork from '../components/home/HowWeWork';
import WhyUs from '../components/home/WhyUs';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Stats />
      <ServicesOverview />
      <HowWeWork />
      <WhyUs />
      <ContactSection />
    </>
  );
}
'@

Create-File "src/pages/About.tsx" @'
import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          About <span className="text-cyan-400">Divergent Physics</span>
        </h1>
        <div className="space-y-8 text-gray-300">
          <p className="text-xl">We design, build, and maintain AI agents that run your real workflows — CAD to simulation to customer-ready datasheet — inside the solver stack your team already uses.</p>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p>Every workflow we encode becomes an asset you own — compounding as automation today, and as custom models trained on your own data next.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
            <p>Built by PhDs in electromagnetics and applied mathematics who write automation code every day, with industry experience at companies including Apple and Ansys.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Our Approach</h2>
            <p>Bring one workflow — we'll scope it live · NDA before we see anything · Pilot running in weeks, not quarters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
'@

# Create Services page (simplified version - copy the full version from earlier)
Create-File "src/pages/Services.tsx" @'
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, GitBranch, Users, Radio } from 'lucide-react';

const services = [
  {
    icon: Cpu,
    slug: 'agentic-workflow',
    title: 'Agentic Workflow Development',
    description: 'We take a workflow you already run — spec to simulation to report — and turn it into an AI agent that runs it end to end, unattended.',
    features: ['Automated geometry, meshing, and setup', 'Optimization loops with verified results', 'Auto-generated customer-facing reports', 'Integration with CAD, PLM, and your pipeline'],
  },
  {
    icon: GitBranch,
    slug: 'integration',
    title: 'Integration & Deployment',
    description: 'AI automation deployed inside your solver environment and your security perimeter — tested, validated, and maintained as vendor releases ship.',
    features: ['Enterprise solver environment setup', 'On-premises or private deployment', 'Security and compliance configuration', 'We carry the maintenance burden'],
  },
  {
    icon: Users,
    slug: 'ai-enablement',
    title: 'AI Enablement for Engineering Teams',
    description: 'Your engineers build the automation themselves — on our platform and domain primitives — so you capture the capability without carrying the maintenance burden alone.',
    features: ['Hands-on automation workshops', 'Build on our solver-integration layer', 'Playbooks, documentation, and mentorship'],
  },
  {
    icon: Radio,
    slug: 'rf-engineering',
    title: 'Dedicated RF & EM Engineering',
    description: 'Deep electromagnetic expertise on demand — for complex simulations, wireless system modeling, and trusted subcontracting on third-party projects.',
    features: ['Antenna, MIMO, and multi-user network studies', 'Ray-traced propagation with Ansys SBR+', 'OFDMA and link-level KPI extraction', 'Complex simulation troubleshooting'],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Our <span className="text-cyan-400">Services</span></h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">End-to-end AI automation for simulation-driven engineering teams.</p>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {services.map((service) => (
            <div key={service.slug} className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-gray-800 rounded-lg"><service.icon className="w-8 h-8 text-cyan-400" /></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-gray-300 flex items-center gap-2"><span className="text-cyan-400">▸</span>{feature}</li>
                    ))}
                  </ul>
                  <Link to={`/services/${service.slug}`} className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">Learn more →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
'@

Create-File "src/pages/ServiceDetail.tsx" @'
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const servicesData: Record<string, { title: string; description: string; details: string[]; benefits: string[]; }> = {
  'agentic-workflow': {
    title: 'Agentic Workflow Development',
    description: 'We take a workflow you already run — spec to simulation to report — and turn it into an AI agent that runs it end to end, unattended, with every step logged and reviewable.',
    details: ['Automated geometry, meshing, and setup', 'Optimization loops with verified results', 'Auto-generated customer-facing reports', 'Integration with CAD, PLM, and your pipeline'],
    benefits: ['Reduces manual work by up to 90%', 'Ensures consistency across runs', 'Creates an audit trail of every decision', 'Frees engineers for higher-value work'],
  },
  'integration': {
    title: 'Integration & Deployment',
    description: 'AI automation deployed inside your solver environment and your security perimeter — tested, validated, and maintained as vendor releases ship.',
    details: ['Enterprise solver environment setup', 'On-premises or private deployment', 'Security and compliance configuration', 'We carry the maintenance burden'],
    benefits: ['Works within your existing infrastructure', 'No data leaves your network', 'Handles vendor updates automatically', 'Scales with your needs'],
  },
  'ai-enablement': {
    title: 'AI Enablement for Engineering Teams',
    description: 'Your engineers build the automation themselves — on our platform and domain primitives — so you capture the capability without carrying the maintenance burden alone.',
    details: ['Hands-on automation workshops', 'Build on our solver-integration layer', 'Playbooks, documentation, and mentorship'],
    benefits: ['Your team gains AI skills', 'Builds internal capability', 'Reduces dependency on external consultants', 'Creates lasting institutional knowledge'],
  },
  'rf-engineering': {
    title: 'Dedicated RF & EM Engineering',
    description: 'Deep electromagnetic expertise on demand — for complex simulations, wireless system modeling, and trusted subcontracting on third-party projects.',
    details: ['Antenna, MIMO, and multi-user network studies', 'Ray-traced propagation with Ansys SBR+', 'OFDMA and link-level KPI extraction', 'Complex simulation troubleshooting & custom algorithms'],
    benefits: ['Access to PhD-level expertise', 'Faster problem resolution', 'Domain-specific knowledge', 'Cost-effective subcontracting'],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : undefined;

  if (!service) {
    return <div className="min-h-screen bg-gray-950 py-20 text-center text-white">Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/services" className="text-cyan-400 hover:text-cyan-300 transition-colors mb-8 inline-block">← Back to Services</Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{service.title}</h1>
        <p className="text-xl text-gray-300 mb-12">{service.description}</p>
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What We Deliver</h2>
            <ul className="space-y-3">
              {service.details.map((item) => (
                <li key={item} className="text-gray-300 flex items-start gap-3"><span className="text-cyan-400 mt-1">▸</span>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Key Benefits</h2>
            <ul className="space-y-3">
              {service.benefits.map((item) => (
                <li key={item} className="text-gray-300 flex items-start gap-3"><span className="text-green-400 mt-1">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-6">Contact us to discuss how we can help automate your workflow.</p>
            <Link to="/#contact" className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
'@

Create-File "src/pages/Projects.tsx" @'
import React from 'react';

export default function Projects() {
  const projects = [
    {
      title: 'Antenna-in-Package Optimization',
      description: 'Automated HFSS workflow for configurable antenna modules, reducing setup time from days to 1.5 hours unattended.',
      tags: ['Ansys HFSS', 'Bayesian Optimization', 'Automation'],
    },
    {
      title: 'Fortune-100 Consumer Electronics',
      description: 'Milestone-gated automation program for RF systems team, delivering verified simulation workflows with acceptance criteria.',
      tags: ['RF Systems', 'Integration', 'Enterprise'],
    },
    {
      title: 'Aerospace Defense Workflow',
      description: 'Automated meshing and simulation setup for complex radar systems, reducing manual errors and setup time.',
      tags: ['Radar', 'Meshing', 'Aerospace'],
    },
    {
      title: 'Medical Device Simulation',
      description: 'AI agent for medical device RF testing and compliance reporting, automating data extraction and validation.',
      tags: ['Medical Devices', 'Compliance', 'Testing'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our <span className="text-cyan-400">Projects</span></h1>
        <p className="text-gray-400 mb-12 max-w-2xl">Real-world implementations of AI automation for simulation engineering.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all">
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-800 text-cyan-400 text-sm rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
'@

Create-File "src/pages/Blog.tsx" @'
import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    slug: 'ai-automation-simulation',
    title: 'AI Automation in Simulation Engineering',
    excerpt: 'How AI agents are transforming the way engineers approach simulation workflows.',
    date: '2024-01-15',
    author: 'Dr. Sarah Chen',
    readTime: '5 min read',
  },
  {
    slug: 'bayesian-optimization-hfss',
    title: 'Bayesian Optimization for Ansys HFSS',
    excerpt: 'Using Bayesian optimization to reduce simulation time while finding optimal designs.',
    date: '2024-01-10',
    author: 'Dr. Michael Torres',
    readTime: '7 min read',
  },
  {
    slug: 'future-of-engineering',
    title: 'The Future of Engineering with AI',
    excerpt: 'Exploring how AI is reshaping the engineering profession and what it means for the future.',
    date: '2024-01-05',
    author: 'Dr. Emily Nakamura',
    readTime: '4 min read',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our <span className="text-cyan-400">Blog</span></h1>
        <p className="text-gray-400 mb-12">Insights on AI automation, simulation engineering, and more.</p>
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">{post.title}</h2>
                <span className="text-sm text-gray-400 whitespace-nowrap ml-4">{post.readTime}</span>
              </div>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{post.author}</span>
                <span className="text-gray-500">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
'@

Create-File "src/pages/BlogPost.tsx" @'
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const blogContent: Record<string, { title: string; date: string; author: string; content: string; }> = {
  'ai-automation-simulation': {
    title: 'AI Automation in Simulation Engineering',
    date: 'January 15, 2024',
    author: 'Dr. Sarah Chen',
    content: '<p>Artificial Intelligence is rapidly transforming the field of simulation engineering...</p>',
  },
  'bayesian-optimization-hfss': {
    title: 'Bayesian Optimization for Ansys HFSS',
    date: 'January 10, 2024',
    author: 'Dr. Michael Torres',
    content: '<p>Bayesian optimization is revolutionizing how we approach design optimization...</p>',
  },
  'future-of-engineering': {
    title: 'The Future of Engineering with AI',
    date: 'January 5, 2024',
    author: 'Dr. Emily Nakamura',
    content: '<p>AI is not just a tool - it\'s a fundamental shift in how engineering work gets done...</p>',
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug] : undefined;

  if (!post) {
    return <div className="min-h-screen bg-gray-950 py-20 text-center text-white">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="text-cyan-400 hover:text-cyan-300 transition-colors mb-8 inline-block">← Back to Blog</Link>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <div className="prose prose-invert prose-cyan max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  );
}
'@

# Create App.tsx
Create-File "src/App.tsx" @'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
'@

# Update index.tsx
Create-File "src/index.tsx" @'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
'@

Write-Host "✅ All files created successfully!"
Write-Host "Run 'npm start' to start the development server"