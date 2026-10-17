import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/companyData';
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
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black border border-neutral-700 text-white p-6 sm:p-10 font-sans"
          >
            <div className="flex items-start justify-between border-b border-neutral-800 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <ALSSymbol size={32} inverted={true} />
                <div>
                  <span className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase block font-medium">
                    Technical Scoping Assistant
                  </span>
                  <h3 className="text-2xl font-serif text-white font-normal">
                    Define Your Project Brief
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close scoping assistant"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Step 1: Select Service */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-[0.16em] text-neutral-300 font-medium mb-2">
                  01. Select Primary Service Discipline
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-white cursor-pointer font-sans"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.number}. {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Priorities */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-[0.16em] text-neutral-300 font-medium mb-2">
                  02. Architectural Priorities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'High Architecture Reliability',
                    'Custom Data Models',
                    'Legacy System Modernization',
                    'Batch & Workflow Automation',
                    'Enterprise Role-Based Security',
                    'Sub-second Response Times',
                  ].map((p) => {
                    const isChecked = scopePriorities.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePriority(p)}
                        className={`p-3 border text-xs text-left transition-colors flex items-center justify-between cursor-pointer font-sans ${
                          isChecked
                            ? 'border-white bg-neutral-900 text-white font-medium'
                            : 'border-neutral-900 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <span>{p}</span>
                        {isChecked && <Check size={14} className="text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Timeline & Hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-[0.16em] text-neutral-300 font-medium mb-2">
                    03. Target Delivery Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white cursor-pointer font-sans"
                  >
                    <option value="Under 2 Months (Rapid Sprint)">Under 2 Months (Rapid Sprint)</option>
                    <option value="3-6 Months (Standard Engagement)">3-6 Months (Standard Engagement)</option>
                    <option value="6-12 Months (Comprehensive Enterprise)">6-12 Months (Comprehensive Enterprise)</option>
                    <option value="Ongoing Technical Retainer">Ongoing Technical Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-[0.16em] text-neutral-300 font-medium mb-2">
                    04. Preferred Engineering Hub
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
            <div className="border-t border-neutral-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
              <span className="text-xs text-neutral-400">
                Pre-fills your inquiry with this structured architectural outline.
              </span>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplyBrief}
                className="w-full sm:w-auto px-6 py-3 bg-white text-black text-xs uppercase tracking-[0.16em] font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Contact Form</span>
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
