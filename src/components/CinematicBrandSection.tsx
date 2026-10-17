import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALSSymbol } from './ALSLogo';
import { Check, Sparkles, Layers, Zap, Shield } from 'lucide-react';
import { EASINGS } from './animations/motionVariants';

export const CinematicBrandSection: React.FC = () => {
  // Interactive mode toggle: 'clarity' vs 'complexity'
  const [activeMode, setActiveMode] = useState<'clarity' | 'complexity'>('clarity');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const PHILOSOPHY_PILLARS = [
    {
      id: 1,
      number: '01',
      title: 'Architectural Restraint',
      subtitle: 'Zero Bloat Infrastructure',
      description:
        'Eliminating superfluous abstraction layers. We build direct, deterministic data pipelines designed exclusively around what your business actually executes.',
      icon: Layers,
    },
    {
      id: 2,
      number: '02',
      title: 'Deterministic Speed',
      subtitle: 'Sub-100ms Execution',
      description:
        'Fast software is an architectural choice. We structure queries, memory state, and interfaces to deliver instantaneous operational responsiveness.',
      icon: Zap,
    },
    {
      id: 3,
      number: '03',
      title: 'Commercial Endurance',
      subtitle: 'Built for Decades',
      description:
        'Technology fashion changes every season. We write clean, typed, maintainable code engineered to quietly power daily operations year after year.',
      icon: Shield,
    },
  ];

  return (
    <section
      id="philosophy"
      aria-label="Brand Philosophy"
      className="bg-black text-white py-28 sm:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 border-t border-b border-neutral-900 relative overflow-hidden select-none"
    >
      {/* 1. Cinematic Ambient Breathing Atmosphere in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft Radial Center Spotlight */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.28, 0.15],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-radial from-white/12 via-white/3 to-transparent blur-3xl pointer-events-none"
        />

        {/* Ambient Expanding Concentric Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[580px] h-[580px] rounded-full border border-white/20"
          />
          <motion.div
            animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[380px] h-[380px] rounded-full border border-white/20"
          />
          {/* Subtle horizontal alignment horizon line */}
          <div className="absolute w-[1200px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-10 sm:space-y-12">
        {/* Top: Upright Floating Brand Emblem with Ambient Halo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASINGS.smoothOut }}
          className="flex flex-col items-center justify-center relative"
        >
          {/* Ambient Emblem Glow */}
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.4, 0.75, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-3 rounded-full bg-white/10 blur-md pointer-events-none"
            />
            
            {/* Proud, Upright ALS Brand Symbol (No tilting) */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08 }}
              className="relative p-2.5 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm cursor-pointer shadow-2xl"
              title="ALS Infonet Brand Symbol"
            >
              <ALSSymbol size={42} inverted={true} />
            </motion.div>
          </div>

          {/* Understated Section Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-neutral-400 font-sans font-medium"
          >
            <span className="w-6 h-px bg-neutral-700" />
            <span>THE ALS INFONET PRINCIPLE</span>
            <span className="w-6 h-px bg-neutral-700" />
          </motion.div>
        </motion.div>

        {/* 2. Bold, Confident Display Headline (Fully Visible & Animatic) */}
        <div className="py-2">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.85, ease: EASINGS.smoothOut }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal text-white leading-[1.04] tracking-tight"
          >
            <span className="block text-white drop-shadow-sm">
              Less complexity.
            </span>
            <span className="block italic text-neutral-300 font-serif font-normal mt-1 sm:mt-2">
              More clarity.
            </span>
          </motion.h2>
        </div>

        {/* 3. Narrative Copy with Generous Breathing Room */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, delay: 0.25, ease: EASINGS.smoothOut }}
          className="text-lg sm:text-2xl text-neutral-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
        >
          Every business has different challenges. The right software begins with understanding those
          challenges and building around what matters.
        </motion.p>

        {/* 4. Interactive Contrast Toggle (Complexity vs. Clarity) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="pt-2 flex flex-col items-center"
        >
          {/* Toggle Pills */}
          <div className="inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-full font-sans text-xs">
            <button
              type="button"
              onClick={() => setActiveMode('clarity')}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                activeMode === 'clarity'
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              The ALS Standard (Clarity)
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('complexity')}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                activeMode === 'complexity'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Industry Default (Complexity)
            </button>
          </div>

          {/* Dynamic Comparison Panel */}
          <div className="mt-6 w-full max-w-xl">
            <AnimatePresence mode="wait">
              {activeMode === 'clarity' ? (
                <motion.div
                  key="clarity-banner"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 sm:p-5 border border-white/20 bg-neutral-950/70 backdrop-blur-sm rounded-none text-left flex items-start gap-3.5"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 animate-pulse" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white font-mono font-medium">
                      ALS Architectural Model
                    </div>
                    <div className="text-sm text-neutral-300 font-sans font-light mt-1 leading-relaxed">
                      Single-purpose relational models, deterministic data mutations, and zero bloated third-party frameworks. Fast to build, rock-solid to maintain.
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="complexity-banner"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 sm:p-5 border border-red-500/30 bg-neutral-950/70 backdrop-blur-sm rounded-none text-left flex items-start gap-3.5"
                >
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-red-300 font-mono font-medium">
                      Typical Legacy Overhead
                    </div>
                    <div className="text-sm text-neutral-400 font-sans font-light mt-1 leading-relaxed">
                      Layers of fragile microservices, bloated libraries, opaque dependencies, and escalating infrastructure bills that slow down operational velocity.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 5. Three Architectural Tenet Cards (Animatic Hover & Lift) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="pt-8 sm:pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {PHILOSOPHY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = hoveredCard === pillar.id;

            return (
              <motion.div
                key={pillar.id}
                onMouseEnter={() => setHoveredCard(pillar.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`p-6 sm:p-8 border transition-all duration-300 relative group cursor-default ${
                  isHovered
                    ? 'border-white bg-neutral-900/90 shadow-[0_4px_30px_rgba(255,255,255,0.06)]'
                    : 'border-neutral-800 bg-neutral-950/60'
                }`}
              >
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-neutral-500 tracking-widest font-semibold group-hover:text-white transition-colors">
                    {pillar.number}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-neutral-800 group-hover:border-white/50 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                    <Icon size={14} />
                  </div>
                </div>

                {/* Subtitle Eyebrow */}
                <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-400 mb-1">
                  {pillar.subtitle}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-white font-normal mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed">
                  {pillar.description}
                </p>

                {/* Bottom Active Glow Indicator */}
                <div
                  className={`mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono tracking-wider transition-colors ${
                    isHovered ? 'text-white' : 'text-neutral-500'
                  }`}
                >
                  <span>PRINCIPLE {pillar.number}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
