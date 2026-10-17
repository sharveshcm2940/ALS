import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { EASINGS } from './animations/motionVariants';

interface NavbarProps {
  onStartProject: () => void;
}

/**
 * Minimal Monochromatic Geometric Abstract Brand Lockup for Navbar (.navbar-logo)
 * Constructed from precise architectural lines and negative-space intervals rather than generic shapes.
 */
export const NavbarBrand: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = '',
}) => (
  <div className={`navbar-logo inline-flex items-center gap-3.5 group select-none ${className}`}>
    {/* Geometric Abstract Line Mark (Pure Lines & Negative Space) */}
    <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block text-black"
        aria-hidden="true"
      >
        {/* Line 1: Apex Ascender Line (Mitered at apex with negative space aperture) */}
        <path
          d="M 6 26 L 16 5 L 21.5 15.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Line 2: Descending Continuum Line (Folds along right flank & base) */}
        <path
          d="M 23.5 19.5 L 26.5 26 H 16.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Line 3: Foundation Plinth Line (Grounding bracket on lower-left) */}
        <path
          d="M 13.5 26 H 5.5 L 9.5 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Line 4: Interior Meridian Tie (Horizontal architectural datum) */}
        <path
          d="M 11.5 17 H 20.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Optical Keystone Nucleus Dot */}
        <circle cx="16" cy="21.5" r="1.1" fill="currentColor" />
      </svg>
    </div>

    {/* Refined Editorial Wordmark */}
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 leading-none">
        <span className="font-sans text-[15px] sm:text-[16px] font-bold tracking-[0.22em] uppercase text-black transition-colors duration-200">
          ALS
        </span>
        <span className="w-px h-3.5 bg-neutral-300" aria-hidden="true" />
        <span className="font-sans text-[15px] sm:text-[16px] font-light tracking-[0.26em] uppercase text-neutral-800 transition-colors duration-200">
          INFONET
        </span>
      </div>
      <span className="font-sans text-[8px] sm:text-[8.5px] tracking-[0.24em] uppercase leading-tight mt-1 text-neutral-400 font-medium">
        Software Solutions &middot; IT Services
      </span>
    </div>
  </div>
);

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'approach', label: 'Approach' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASINGS.smoothOut }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] py-4 shadow-[0_1px_12px_rgba(0,0,0,0.03)]'
            : 'bg-white/90 backdrop-blur-sm border-b border-black/5 py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo with hover scale */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="navbar-logo text-left focus:outline-none cursor-pointer group"
              aria-label="ALS Infonet Homepage"
            >
              <NavbarBrand size={28} />
            </button>
          </div>

          {/* Desktop Navigation Links with Animated Layout Indicator */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-8 lg:space-x-10"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-xs uppercase tracking-[0.22em] transition-colors duration-200 cursor-pointer relative py-1.5 ${
                    isActive ? 'text-black font-medium' : 'text-[#777777] hover:text-black'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-black"
                      transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              type="button"
              onClick={onStartProject}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 text-xs uppercase tracking-[0.16em] font-sans font-medium text-white bg-black hover:bg-neutral-800 transition-colors cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>Start a Project</span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:opacity-70 transition-opacity cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay Navigation with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: EASINGS.smoothOut }}
            className="fixed inset-0 z-50 bg-white text-black flex flex-col justify-between p-8 sm:p-12"
          >
            <div className="flex items-center justify-between pb-6 border-b border-[#EAEAEA]">
              <NavbarBrand size={26} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-black hover:opacity-70 cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="py-10 flex flex-col space-y-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left font-serif text-3xl text-black hover:text-[#777777] transition-colors py-1 cursor-pointer flex items-baseline justify-between"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#999999]">0{idx + 1}</span>
                </motion.button>
              ))}
            </nav>

            <div className="pt-8 border-t border-[#EAEAEA] flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartProject();
                }}
                className="w-full py-4 text-center text-xs uppercase tracking-[0.22em] text-white bg-black cursor-pointer"
              >
                Start a Project
              </button>
              <div className="text-center text-xs text-[#777777] font-sans pt-2">
                Chennai &middot; Bangalore
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
