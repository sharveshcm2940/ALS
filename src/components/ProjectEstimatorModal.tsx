import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Phone } from 'lucide-react';
import { SERVICES, COMPANY_DETAILS } from '../data/companyData';
import { ALSSymbol } from './ALSLogo';
import { EASINGS } from './animations/motionVariants';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToContact: (service: string, summary: string) => void;
}

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({
  isOpen,
  onClose,
  onProceedToContact,
}) => {
  const [selectedService, setSelectedService] = useState(SERVICES[0].title);
  const [timeline, setTimeline] = useState('3-6 Months');
  const [preferredHub, setPreferredHub] = useState('Chennai & Bangalore (Distributed)');
  const [scopePriorities, setScopePriorities] = useState<string[]>([
    'High Architecture Reliability',
    'Custom Data Models',
  ]);

  const togglePriority = (p: string) => {
    setScopePriorities((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleApplyBrief = () => {
    const summary = `Brief Specification:\n• Service: ${selectedService}\n• Estimated Target Timeline: ${timeline}\n• Primary Delivery Hub Preference: ${preferredHub}\n• Core Architectural Priorities: ${scopePriorities.join(
      ', '
    )}\n\n[Please provide additional details regarding your business workflow here]`;
    onProceedToContact(selectedService, summary);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
            className="bg-black text-white border border-neutral-800 p-6 sm:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close estimator"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <ALSSymbol size={28} inverted={true} />
              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-neutral-400 font-semibold block">
                  Project Scope Estimator
                </span>
                <h3 className="text-2xl font-serif font-normal">Shape your requirements</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light mb-8 leading-relaxed">
              Configure your operational focus to prepare a clear architecture brief. This pre-fills
              your inquiry for review by senior engineering leads in Chennai &amp; Bangalore.
            </p>

            <div className="space-y-6 font-sans">
              {/* Service Selection */}
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                  1. Target Software Domain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.title)}
                      className={`p-3 text-left border text-xs transition-colors cursor-pointer ${
                        selectedService === s.title
                          ? 'border-white bg-white text-black font-medium'
                          : 'border-neutral-800 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priorities Multi-select */}
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                  2. Architectural Priorities
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'High Architecture Reliability',
                    'Custom Data Models',
                    'Legacy API Interoperability',
                    'Sub-100ms Query Latency',
                    'Granular RBAC Security',
                    'Air-Gapped / Sovereign Deployments',
                  ].map((p) => {
                    const isSelected = scopePriorities.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePriority(p)}
                        className={`px-3 py-1.5 border text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-white bg-neutral-900 text-white font-medium'
                            : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                        <span>{p}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Timeline & Hub Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                    3. Target Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white cursor-pointer font-sans"
                  >
                    <option value="4-8 Weeks (Accelerated MVP)">4-8 Weeks (Accelerated MVP)</option>
                    <option value="3-6 Months (Standard Commercial Suite)">3-6 Months (Standard Commercial Suite)</option>
                    <option value="6-12 Months (Multi-Facility Enterprise Platform)">6-12 Months (Multi-Facility Enterprise Platform)</option>
                    <option value="Ongoing Engineering Retainer">Ongoing Engineering Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                    4. Preferred Engineering Hub
                  </label>
                  <select
                    value={preferredHub}
                    onChange={(e) => setPreferredHub(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white cursor-pointer font-sans"
                  >
                    <option value="Chennai Hub (Tamil Nadu)">Chennai Hub (Tamil Nadu)</option>
                    <option value="Bangalore Hub (Karnataka)">Bangalore Hub (Karnataka)</option>
                    <option value="Chennai & Bangalore (Distributed)">Chennai &amp; Bangalore (Distributed)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-800 mt-8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
              <div className="flex flex-col gap-1 text-xs text-neutral-400">
                <span>Sends brief to <strong className="text-white">{COMPANY_DETAILS.email}</strong></span>
                <span className="flex items-center gap-1.5">
                  <Phone size={11} className="text-neutral-500" />
                  Direct line: <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-white font-medium hover:underline">{COMPANY_DETAILS.phone}</a>
                </span>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplyBrief}
                className="w-full sm:w-auto px-6 py-3 bg-white text-black text-xs uppercase tracking-[0.16em] font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Submit Project Brief</span>
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
