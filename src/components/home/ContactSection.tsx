import React from 'react';
import EnquiryForm from '../ui/EnquiryForm';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Tell Us About <span className="text-cyan-400">Your Project</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-3 md:mt-4">
            Not ready for a call? Describe your workflow and we'll reply within 24 hours.
          </p>
        </div>
        <div className="bg-gray-950 p-6 md:p-8 rounded-xl border border-gray-800">
          <EnquiryForm />
        </div>
        <div className="text-center mt-6 md:mt-8">
          <p className="text-sm text-gray-400">
            Talk to us: <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Book a call →</a>
          </p>
        </div>
      </div>
    </section>
  );
}