import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/companyData';
import { ArrowUpRight, Plus } from 'lucide-react';
import { EASINGS, fadeInUpVariants, lineExpandVariants } from './animations/motionVariants';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForInquiry }) => {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setActiveServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#FAFAFA] text-black py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 border-b border-[#EAEAEA] relative overflow-hidden"
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
              <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#777777] block mb-4">
                02 / SOFTWARE SERVICES &amp; SOLUTIONS
              </span>
              <h2
                id="services-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-black max-w-2xl"
              >
                Services designed for operational clarity.
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
                Every service is delivered by senior engineers in Chennai and Bangalore who prioritize
                maintainability, clear data structures, and predictable performance.
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

        {/* Clean Editorial Service List with Animatic Stagger */}
        <div className="divide-y divide-[#EAEAEA] border-t border-b border-[#EAEAEA]">
          {SERVICES.map((service, idx) => {
            const isExpanded = activeServiceId === service.id;
            const isHovered = hoveredId === service.id;

            return (
              <motion.article
                key={service.id}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={idx * 0.08}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="transition-colors duration-200 bg-white"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className="w-full text-left py-8 sm:py-12 px-6 sm:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none group"
                  aria-expanded={isExpanded}
                >
                  {/* Number & Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10 md:w-5/12">
                    <span className="font-mono text-sm sm:text-base text-[#999999] tracking-wider transition-colors group-hover:text-black">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-black font-normal transition-transform duration-200 group-hover:translate-x-1.5">
                        {service.title}
                      </h3>
                      <div className="text-[11px] uppercase tracking-[0.14em] text-[#777777] font-sans font-medium mt-1">
                        {service.tagline}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="md:w-5/12 text-sm sm:text-base text-[#666666] font-light leading-relaxed">
                    {service.description.slice(0, 130)}...
                  </div>

                  {/* Expand/Collapse Indicator with Smooth Rotation */}
                  <div className="flex items-center justify-end md:w-1/12">
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
                      className="w-9 h-9 rounded-full border border-[#CCCCCC] group-hover:border-black flex items-center justify-center text-black transition-colors"
                    >
                      <Plus size={15} />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Drawer with Generous Padding & Stagger */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASINGS.smoothOut }}
                      className="overflow-hidden bg-[#FAFAFA] border-t border-[#EAEAEA]"
                    >
                      <div className="p-8 sm:p-12 lg:p-16 space-y-10">
                        <div className="max-w-3xl">
                          <span className="text-[10px] tracking-[0.25em] uppercase text-[#777777] font-mono block mb-2">
                            Overview
                          </span>
                          <p className="text-base sm:text-lg text-[#222222] font-light leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {/* Deliverables & Stack in Two Clean Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-[#EAEAEA]">
                          <div>
                            <span className="text-[10px] tracking-[0.25em] uppercase text-[#777777] font-mono block mb-4">
                              Core Architecture &amp; Deliverables
                            </span>
                            <ul className="space-y-3">
                              {service.deliverables.map((item, dIdx) => (
                                <motion.li
                                  key={dIdx}
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.05 * dIdx, duration: 0.3 }}
                                  className="text-xs sm:text-sm text-[#444444] font-sans font-light flex items-start gap-3"
                                >
                                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 shrink-0" />
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <span className="text-[10px] tracking-[0.25em] uppercase text-[#777777] font-mono block mb-3">
                                Technology Foundation
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {service.techStack.map((tech, tIdx) => (
                                  <motion.span
                                    key={tIdx}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1 bg-white border border-[#EAEAEA] text-xs font-mono text-[#555555] transition-colors hover:border-black cursor-default"
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4">
                              <motion.button
                                type="button"
                                onClick={() => onSelectServiceForInquiry(service.title)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.16em] font-sans font-medium hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 cursor-pointer group"
                              >
                                <span>Discuss This Service</span>
                                <ArrowUpRight
                                  size={13}
                                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
