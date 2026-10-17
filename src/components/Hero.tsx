import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ALSSymbol } from './ALSLogo';
import { EASINGS, maskRevealVariants, fadeInUpVariants } from './animations/motionVariants';
import { MechanicalTextRoller } from './MechanicalTextRoller';

interface HeroProps {
  onDiscussProject: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscussProject, onExploreServices }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[92vh] bg-white text-black flex flex-col justify-between pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 px-6 sm:px-8 lg:px-12 border-b border-[#EAEAEA] overflow-hidden"
    >
      {/* Ambient Architectural Emblem Watermark in Background */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.04, rotate: 360 }}
        transition={{
          opacity: { duration: 1.5, ease: EASINGS.smoothOut },
          rotate: { duration: 240, repeat: Infinity, ease: 'linear' },
        }}
        className="absolute top-1/2 right-4 lg:right-16 -translate-y-1/2 pointer-events-none select-none hidden md:block"
        aria-hidden="true"
      >
        <ALSSymbol size={420} inverted={false} />
      </motion.div>

      {/* Main Content Area with Generous Whitespace */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10 my-auto">
        {/* Understated Eyebrow with Expanding Rule */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="flex items-center gap-4 mb-6 sm:mb-8"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASINGS.smoothOut }}
            className="w-10 h-px bg-black origin-left"
          />
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#777777] font-sans font-medium">
            ALS INFONET &middot; SOFTWARE SOLUTIONS &amp; IT SERVICES
          </span>
        </motion.div>

        {/* Expressive Editorial Headline with Instrument Serif */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.75rem] font-serif font-normal tracking-tight text-black leading-[1.03] max-w-5xl">
          <div className="overflow-hidden pb-1 sm:pb-2">
            <motion.div
              variants={maskRevealVariants}
              initial="hidden"
              animate="visible"
              custom={0.25}
              className="inline-block"
            >
              Technology.
            </motion.div>
          </div>
          <div className="overflow-hidden pb-2 sm:pb-3">
            <motion.div
              variants={maskRevealVariants}
              initial="hidden"
              animate="visible"
              custom={0.42}
              className="italic font-serif text-[#1A1A1A] inline-block font-normal"
            >
              Built around you.
            </motion.div>
          </div>
        </h1>

        {/* Cinematic Mechanical Text Roller Display (Split-Flap System) */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.55}
          className="my-8 sm:my-10 lg:my-12 w-full max-w-4xl"
        >
          <MechanicalTextRoller />
        </motion.div>

        {/* Highly Legible Body Typography in Manrope */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.68}
          className="max-w-xl"
        >
          <p className="text-base sm:text-lg text-[#555555] font-sans font-light leading-relaxed">
            Thoughtfully engineered software solutions and IT services designed to help businesses
            simplify operations, solve complex challenges, and move forward with confidence.
          </p>
        </motion.div>

        {/* Refined Manrope Button Interactions */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.78}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 font-sans"
        >
          <motion.button
            type="button"
            onClick={onDiscussProject}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="px-7 py-3.5 bg-black text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-neutral-800 transition-colors inline-flex items-center gap-3 cursor-pointer group shadow-xs"
          >
            <span>Discuss Your Project</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.button>

          <motion.button
            type="button"
            onClick={onExploreServices}
            whileHover={{ x: 3 }}
            className="text-xs font-medium tracking-[0.16em] uppercase text-black hover:text-[#777777] border-b border-black hover:border-[#777777] pb-1 transition-colors cursor-pointer"
          >
            Explore Our Services
          </motion.button>
        </motion.div>
      </div>

      {/* Hero Bottom Bar: Live Operational Telemetry */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        custom={0.88}
        className="max-w-7xl mx-auto w-full pt-8 sm:pt-10 mt-12 sm:mt-14 border-t border-[#EAEAEA] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10 text-xs font-sans"
      >
        <div className="flex items-center gap-3 text-[#777777] uppercase tracking-[0.2em] font-medium text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Chennai 13.08&deg; N &middot; Bangalore 12.97&deg; N</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-[#777777]">
          <span>System SLA: 99.98%</span>
          <span>&middot;</span>
          <span>IST: {timeStr || '10:30:00 AM IST'}</span>
          <span>&middot;</span>
          <span className="text-black font-semibold">Production Live</span>
        </div>
      </motion.div>
    </section>
  );
};
