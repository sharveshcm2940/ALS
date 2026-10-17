import React from 'react';
import { X } from 'lucide-react';
import { ALSLogo } from './ALSLogo';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-black border border-neutral-700 text-white p-6 sm:p-10"
      >
        <div className="flex items-start justify-between border-b border-neutral-800 pb-6 mb-6">
          <div>
            <ALSLogo variant="horizontal" size={28} className="mb-3" />
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal">
              {type === 'privacy' ? 'Privacy Policy & Data Governance' : 'Terms of Technical Engagement'}
            </h3>
            <span className="text-[10px] tracking-widest text-neutral-500 uppercase block mt-1">
              Effective Date: October 2026 · ALS Infonet Private Limited
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors"
            aria-label="Close Legal Document"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 text-neutral-300 text-sm font-light leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                ALS Infonet respects the intellectual property and confidentiality of all prospective
                and active corporate clients. This policy governs how we collect, handle, and store
                information provided across our digital platforms and engineering engagements.
              </p>
              <div>
                <h4 className="font-serif text-white text-base font-normal mb-1">
                  1. Information We Collect
                </h4>
                <p>
                  We collect information voluntarily submitted through technical inquiry forms, project
                  specification requests, and email communications. This includes names, corporate
                  affiliations, business email addresses, telephone numbers, and technical requirement
                  descriptions.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-normal mb-1">
                  2. Purpose &amp; Processing
                </h4>
                <p>
                  Information is utilized exclusively for evaluating feasibility, preparing architecture
                  proposals, establishing project roadmaps, and providing contracted IT support services.
                  We never sell, broker, or monetize client data under any circumstances.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-normal mb-1">
                  3. Non-Disclosure &amp; Security Standards
                </h4>
                <p>
                  All project briefs and proprietary workflow descriptions are handled under strict
                  internal confidentiality guidelines. We execute mutual Non-Disclosure Agreements
                  (NDAs) prior to code review or access to proprietary systems.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-normal mb-1">
                  4. Governance &amp; Contact
                </h4>
                <p>
                  For inquiries regarding data retention or technical confidentiality, contact our
                  governance team directly at <span className="text-white">privacy@alsinfonet.com</span>.
                </p>
              </div>
            </>
            ) : (
              <>
                <p>
                  These terms govern professional software engineering, architecture consulting, and
                  technical maintenance services rendered by ALS Infonet.
                </p>
                <div>
                  <h4 className="font-serif text-white text-base font-normal mb-1">
                    1. Scope of Technical Services
                  </h4>
                  <p>
                    Services are rendered pursuant to mutually signed Statements of Work (SOWs)
                    defining specific technical deliverables, milestone acceptance criteria, and SLA
                    parameters.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-white text-base font-normal mb-1">
                    2. Codebase Ownership &amp; Intellectual Property
                  </h4>
                  <p>
                    Upon fulfillment of commercial obligations, custom software codebases and schemas
                    developed specifically for the client transfer wholly to the client, free of
                    restrictive proprietary vendor lock-in.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-white text-base font-normal mb-1">
                    3. Delivery &amp; Verification
                  </h4>
                  <p>
                    All deliverables undergo formal milestone staging and regression verification before
                    production handover.
                  </p>
                </div>
              </>
            )}
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-neutral-700 text-xs uppercase tracking-[0.2em] text-white hover:border-white transition-colors"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
