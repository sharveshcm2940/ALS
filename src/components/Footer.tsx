import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_DETAILS } from '../data/companyData';
import { ALSLogo } from './ALSLogo';
import { ArrowUp } from 'lucide-react';
import { fadeInUpVariants } from './animations/motionVariants';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Footer"
      className="bg-black text-white pt-24 pb-16 px-6 sm:px-8 lg:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.1}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16 border-b border-neutral-900"
        >
          {/* Brand & Description */}
          <div className="lg:col-span-6 space-y-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="text-left focus:outline-none cursor-pointer"
              aria-label="ALS Infonet Homepage"
            >
              <ALSLogo variant="horizontal" size={30} animated={false} />
            </button>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-md leading-relaxed">
              ALS Infonet provides software solutions and IT services for businesses in Chennai and
              Bangalore. We build dependable digital tools with architectural discipline, technical
              precision, and practical commercial foresight.
            </p>
          </div>

          {/* Quick Index */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs tracking-[0.18em] uppercase text-neutral-400 block font-sans font-medium">
              Navigation
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-[0.16em] font-sans">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'approach', label: 'Approach' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hubs */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs tracking-[0.18em] uppercase text-neutral-400 block font-sans font-medium">
              Offices &amp; Delivery
            </span>
            <div className="space-y-4 text-xs font-sans text-neutral-400">
              <div>
                <div className="text-white text-sm font-medium">Chennai &middot; Tamil Nadu</div>
                <div className="font-light mt-0.5">Engineering &amp; Delivery Center</div>
              </div>
              <div>
                <div className="text-white text-sm font-medium">Bangalore &middot; Karnataka</div>
                <div className="font-light mt-0.5">Solutions &amp; Systems Hub</div>
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="text-white hover:underline transition-all block"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400 font-sans">
          <div className="flex flex-wrap items-center gap-6">
            <span>&copy; {new Date().getFullYear()} ALS Infonet. All rights reserved.</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Engagement
            </button>
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp
              size={13}
              className="transition-transform group-hover:-translate-y-1"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
