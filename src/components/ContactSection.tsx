import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS, SERVICES } from '../data/companyData';
import { ArrowUpRight, CheckCircle2, Copy, Mail, Loader2 } from 'lucide-react';
import { EASINGS, fadeInUpVariants, lineExpandVariants } from './animations/motionVariants';

interface ContactSectionProps {
  initialService?: string;
}

interface FormState {
  fullName: string;
  businessEmail: string;
  companyName: string;
  phoneNumber: string;
  serviceRequired: string;
  projectDescription: string;
  honeypot: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phoneNumber: '',
    serviceRequired: initialService || SERVICES[0].title,
    projectDescription: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceId: string;
    timestamp: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceRequired: initialService }));
    }
  }, [initialService]);

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.businessEmail.trim()) {
      errs.businessEmail = 'Business email is required.';
    } else if (!emailRegex.test(formData.businessEmail.trim())) {
      errs.businessEmail = 'Please provide a valid business email address.';
    }

    if (!formData.companyName.trim()) {
      errs.companyName = 'Company name is required.';
    }

    if (!formData.serviceRequired) {
      errs.serviceRequired = 'Please select a service category.';
    }

    if (!formData.projectDescription.trim()) {
      errs.projectDescription = 'Please describe your project or requirements.';
    } else if (formData.projectDescription.trim().length < 15) {
      errs.projectDescription = 'Please provide at least 15 characters describing your requirements.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `ALS-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      const timestamp = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      setSubmissionSuccess({
        referenceId: generatedId,
        timestamp,
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyReference = () => {
    if (submissionSuccess) {
      navigator.clipboard.writeText(submissionSuccess.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(null);
    setFormData({
      fullName: '',
      businessEmail: '',
      companyName: '',
      phoneNumber: '',
      serviceRequired: SERVICES[0].title,
      projectDescription: '',
      honeypot: '',
    });
    setErrors({});
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-black text-white py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 border-t border-[#1A1A1A] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animated Line */}
        <div className="relative pb-10 mb-20 sm:mb-28">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.1}
          >
            <span className="text-xs font-sans tracking-[0.22em] uppercase text-neutral-400 font-medium block mb-4">
              05 / CONTACT &middot; START A PROJECT
            </span>
            <h2
              id="contact-heading"
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white max-w-3xl"
            >
              Let's build something useful.
            </h2>
            <p className="text-base sm:text-xl text-neutral-300 font-light mt-4 max-w-xl leading-relaxed">
              Tell us about your requirements, your challenges, and what you want to achieve.
            </p>
          </motion.div>

          <motion.div
            variants={lineExpandVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.25}
            className="absolute bottom-0 left-0 right-0 h-px bg-neutral-800"
          />
        </div>

        {/* Clean Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Direct and Quiet Contact Details */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.15}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 block mb-4 font-sans font-medium">
                Direct Inquiries
              </span>
              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-neutral-300 transition-colors block"
              >
                {COMPANY_DETAILS.email}
              </a>
              <p className="text-sm text-neutral-400 font-light mt-3 leading-relaxed">
                Reviewed directly by senior engineering leads in Chennai and Bangalore.
              </p>
            </div>

            <div className="pt-8 border-t border-neutral-800 space-y-6">
              <div>
                <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 block mb-2 font-sans font-medium">
                  Engineering Hubs
                </span>
                <div className="text-base font-sans font-medium text-white">
                  Chennai &middot; Tamil Nadu
                </div>
                <div className="text-base font-sans font-medium text-white mt-1">
                  Bangalore &middot; Karnataka
                </div>
              </div>

              <div className="pt-4">
                <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 block mb-2 font-sans font-medium">
                  Technical Review SLA
                </span>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Every technical proposal receives an initial architectural evaluation within 24 business hours.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean, Spacious Contact Form */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.25}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {submissionSuccess ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASINGS.smoothOut }}
                  className="p-8 sm:p-12 border border-neutral-800 bg-neutral-950 space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                    className="w-12 h-12 bg-white text-black flex items-center justify-center"
                  >
                    <CheckCircle2 size={24} />
                  </motion.div>

                  <h3 className="text-3xl font-serif text-white font-normal">
                    Inquiry Received.
                  </h3>

                  <p className="text-base text-neutral-300 font-light leading-relaxed">
                    Thank you for reaching out to ALS Infonet. Your project requirements have been
                    logged and forwarded to our engineering team.
                  </p>

                  <div className="p-4 bg-black border border-neutral-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Ref: {submissionSuccess.referenceId}</span>
                    <button
                      type="button"
                      onClick={handleCopyReference}
                      className="text-white hover:text-neutral-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy size={13} />
                      <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="px-6 py-3 border border-neutral-700 hover:border-white text-xs uppercase tracking-[0.2em] font-serif text-white transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs uppercase tracking-[0.2em] text-neutral-400 font-serif mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder="Johnathan Davis"
                        className={`w-full px-4 py-3.5 bg-neutral-950 text-white border text-sm font-serif focus:outline-none focus:border-white transition-colors ${
                          errors.fullName ? 'border-red-500' : 'border-neutral-800'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-400 mt-1.5 font-serif">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="businessEmail"
                        className="block text-xs uppercase tracking-[0.2em] text-neutral-400 font-serif mb-2"
                      >
                        Business Email *
                      </label>
                      <input
                        id="businessEmail"
                        type="email"
                        value={formData.businessEmail}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, businessEmail: e.target.value }));
                          if (errors.businessEmail) setErrors((prev) => ({ ...prev, businessEmail: undefined }));
                        }}
                        placeholder="name@company.com"
                        className={`w-full px-4 py-3.5 bg-neutral-950 text-white border text-sm font-serif focus:outline-none focus:border-white transition-colors ${
                          errors.businessEmail ? 'border-red-500' : 'border-neutral-800'
                        }`}
                      />
                      {errors.businessEmail && (
                        <p className="text-xs text-red-400 mt-1.5 font-serif">{errors.businessEmail}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-xs uppercase tracking-[0.2em] text-neutral-400 font-serif mb-2"
                      >
                        Company Name *
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, companyName: e.target.value }));
                          if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: undefined }));
                        }}
                        placeholder="Organization or Enterprise"
                        className={`w-full px-4 py-3.5 bg-neutral-950 text-white border text-sm font-serif focus:outline-none focus:border-white transition-colors ${
                          errors.companyName ? 'border-red-500' : 'border-neutral-800'
                        }`}
                      />
                      {errors.companyName && (
                        <p className="text-xs text-red-400 mt-1.5 font-serif">{errors.companyName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-xs uppercase tracking-[0.2em] text-neutral-400 font-serif mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                        }
                        placeholder="+91 98400 00000"
                        className="w-full px-4 py-3.5 bg-neutral-950 text-white border border-neutral-800 text-sm font-serif focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="serviceRequired"
                      className="block text-xs uppercase tracking-[0.2em] text-neutral-400 font-serif mb-2"
                    >
                      Service Category *
                    </label>
                    <select
                      id="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, serviceRequired: e.target.value }))
                      }
                      className="w-full px-4 py-3.5 bg-neutral-950 text-white border border-neutral-800 text-sm font-serif focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className="bg-neutral-900 text-white">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="projectDescription"
                      className="block text-xs uppercase tracking-[0.2em] text-neutral-400 font-serif mb-2"
                    >
                      Project Requirements &amp; Scope *
                    </label>
                    <textarea
                      id="projectDescription"
                      rows={5}
                      value={formData.projectDescription}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, projectDescription: e.target.value }));
                        if (errors.projectDescription)
                          setErrors((prev) => ({ ...prev, projectDescription: undefined }));
                      }}
                      placeholder="Describe your operational workflows, timelines, and technical challenges..."
                      className={`w-full px-4 py-3.5 bg-neutral-950 text-white border text-sm font-serif focus:outline-none focus:border-white transition-colors resize-none ${
                        errors.projectDescription ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.projectDescription && (
                      <p className="text-xs text-red-400 mt-1.5 font-serif">{errors.projectDescription}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.16em] font-sans font-medium hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin text-black" />
                          <span>Transmitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
