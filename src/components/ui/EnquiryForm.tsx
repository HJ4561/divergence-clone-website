// src/components/ui/EnquiryForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// ============================================================
// TYPES
// ============================================================
type FormData = {
  user_name: string;
  user_email: string;
  company: string;
  message: string;
  solver_used?: string;
};

interface EnquiryFormProps {
  onSubmit?: (data: {
    company_name: string;
    email: string;
    solver_used: string;
    workflow_description: string;
  }) => Promise<void>;
}

// ============================================================
// ENQUIRY FORM COMPONENT
// ============================================================
export default function EnquiryForm({ onSubmit }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // ============================================================
  // HANDLE FORM SUBMISSION
  // ============================================================
  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        // Use the parent's onSubmit handler (API endpoint)
        await onSubmit({
          company_name: data.company || data.user_name,
          email: data.user_email,
          solver_used: data.solver_used || '',
          workflow_description: data.message || '',
        });
        setSubmitStatus('success');
        setStatusMessage('✅ Your message has been sent successfully! We\'ll get back to you within 24 hours.');
        reset();
      } else {
        // No onSubmit handler provided - show error
        setSubmitStatus('error');
        setStatusMessage('❌ Form submission is not configured. Please contact us directly.');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setStatusMessage('❌ Failed to send. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
        <input
          {...register('user_name', { required: 'Name is required' })}
          className="w-full px-3 py-2 bg-ink-950 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all duration-200 text-sm"
          placeholder="Your name"
        />
        {errors.user_name && <p className="text-red-400 text-xs mt-1">{errors.user_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          {...register('user_email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-3 py-2 bg-ink-950 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all duration-200 text-sm"
          placeholder="your@email.com"
        />
        {errors.user_email && <p className="text-red-400 text-xs mt-1">{errors.user_email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
        <input
          {...register('company')}
          className="w-full px-3 py-2 bg-ink-950 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all duration-200 text-sm"
          placeholder="Your company name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Solver Used (Optional)</label>
        <input
          {...register('solver_used')}
          className="w-full px-3 py-2 bg-ink-950 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all duration-200 text-sm"
          placeholder="e.g., Ansys HFSS, CST, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={3}
          className="w-full px-3 py-2 bg-ink-950 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all duration-200 resize-none text-sm"
          placeholder="Tell us about the workflow your team repeats..."
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-cream hover:bg-cream-dark text-ink-950 font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitStatus === 'success' && (
        <p className="text-teal-300 text-center text-sm">{statusMessage}</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-400 text-center text-sm">{statusMessage}</p>
      )}
    </form>
  );
}