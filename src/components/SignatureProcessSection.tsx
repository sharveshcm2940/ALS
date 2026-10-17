import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STAGES } from '../data/companyData';
import { EASINGS, fadeInUpVariants, lineExpandVariants } from './animations/motionVariants';

export const SignatureProcessSection: React.FC = () => {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="bg-white text-black py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 border-b border-[#EAEAEA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animated Line */}
        <div className="relative pb-10 mb-16 sm:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.1}
            >
              <span className="text-xs font-sans tracking-[0.22em] uppercase text-[#777777] font-medium block mb-4">
                03 / HOW WE WORK &middot; METHODOLOGY
              </span>
              <h2
                id="approach-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-black max-w-2xl"
              >
                From an idea to a working solution.
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.2}
              className="mt-6 md:mt-0 max-w-md"
            >
              <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed">
                A disciplined four-stage engineering sequence designed to eliminate ambiguity, enforce
                architectural rigor, and ensure reliable delivery.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={lineExpandVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.25}
            className="absolute bottom-0 left-0 right-0 h-px bg-[#EAEAEA]"
          />
        </div>

        {/* Desktop Progressive Animated Beam across stages */}
        <div className="relative">
          {/* Background Track */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-[#EAEAEA] z-0" />
          {/* Active progressive beam that expands on scroll */}
          <motion.div
            variants={lineExpandVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.2}
            className="hidden lg:block absolute top-0 left-0 right-0 h-[2px] bg-black origin-left z-0"
          />

          {/* Spacious 4-Stage Progressive Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 relative z-10 pt-6">
            {PROCESS_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.step}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.15 + idx * 0.15}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: EASINGS.smoothOut } }}
                className="flex flex-col justify-between p-6 -m-6 rounded-none transition-colors hover:bg-[#FAFAFA] group"
              >
                <div>
                  {/* Subtle Node & Stage Label */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs sm:text-sm text-[#888888] tracking-widest uppercase group-hover:text-black transition-colors font-semibold">
                      STAGE {stage.step}
                    </span>
                    <span className="w-2 h-2 rounded-full border border-black/40 group-hover:bg-black transition-colors" />
                  </div>

                  {/* Stage Title */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-black mb-3">
                    {stage.title}
                  </h3>

                  {/* Concise Summary */}
                  <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed mb-6">
                    {stage.summary}
                  </p>
                </div>

                {/* Engineering Discipline Line */}
                <div className="pt-6 border-t border-[#EAEAEA] mt-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#888888] block font-mono mb-1">
                    Guiding Principle
                  </span>
                  <p className="text-xs font-serif italic text-[#222222]">
                    "{stage.focus}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
