import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_DETAILS } from '../data/companyData';
import { ALSSymbol } from './ALSLogo';
import { EASINGS, fadeInUpVariants, lineExpandVariants } from './animations/motionVariants';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white text-black py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 border-b border-[#EAEAEA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Expanding Header Divider */}
        <div className="relative pb-8 mb-16 sm:mb-24">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.1}
            className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.22em] text-[#777777] font-medium"
          >
            <span>01 / ABOUT ALS INFONET</span>
            <span className="hidden sm:inline">PHILOSOPHY &amp; APPROACH</span>
          </motion.div>

          {/* Line draws left-to-right as section enters viewport */}
          <motion.div
            variants={lineExpandVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.2}
            className="absolute bottom-0 left-0 right-0 h-px bg-[#EAEAEA]"
          />
        </div>

        {/* Spacious Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Confident Headline in Instrument Serif */}
          <div className="lg:col-span-6 space-y-10">
            <motion.h2
              id="about-heading"
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.15}
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal leading-[1.08] tracking-tight text-black"
            >
              Technology should make business better.
            </motion.h2>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.25}
              className="border-l border-black pl-8 py-2 relative"
            >
              <p className="font-serif italic text-2xl sm:text-3xl text-[#1A1A1A] leading-snug font-normal">
                "{COMPANY_DETAILS.brandStatement}"
              </p>
            </motion.div>
          </div>

          {/* Right Column: High-Legibility Editorial Copy in Manrope */}
          <div className="lg:col-span-6 space-y-8 lg:pt-3 font-sans">
            <motion.p
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.2}
              className="text-lg sm:text-xl text-black font-light leading-relaxed"
            >
              {COMPANY_DETAILS.name} provides software solutions and IT services designed around
              real business requirements. Our focus is on understanding operational challenges,
              selecting appropriate technologies, and developing practical systems that endure.
            </motion.p>

            <motion.p
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.3}
              className="text-base sm:text-lg text-[#666666] font-light leading-relaxed"
            >
              We design every solution from the problem outward. By prioritizing operational
              stability over technical fashion, our teams in Chennai and Bangalore build
              dependable systems that quietly power everyday operations.
            </motion.p>

            {/* Understated Operating Hubs line */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.4}
              className="pt-8 mt-12 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-[#777777] uppercase tracking-[0.16em] font-medium"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6, ease: EASINGS.smoothOut }}
                  className="cursor-pointer"
                >
                  <ALSSymbol size={22} inverted={false} />
                </motion.div>
                <span>Chennai &middot; Engineering &amp; Delivery Center</span>
              </div>
              <div>
                <span>Bangalore &middot; Solutions &amp; Systems Hub</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
