import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ALSSymbol, ALSLogo } from './ALSLogo';
import { Copy, Check, Compass, Layers, ShieldCheck, Eye } from 'lucide-react';
import { EASINGS, fadeInUpVariants } from './animations/motionVariants';

export const BrandIdentityBoard: React.FC = () => {
  const [copiedSvg, setCopiedSvg] = useState(false);

  const handleCopySvg = () => {
    const rawSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 6 26 L 16 5 L 21.5 15.5" stroke="#000000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 23.5 19.5 L 26.5 26 H 16.5" stroke="#000000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 13.5 26 H 5.5 L 9.5 18" stroke="#000000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 11.5 17 H 20.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="16" cy="21.5" r="1.1" fill="#000000"/>
</svg>`;
    navigator.clipboard.writeText(rawSvg);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2200);
  };

  return (
    <section
      id="brand-identity"
      aria-label="Brand Identity Board"
      className="bg-[#FAFAFA] text-black py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-b border-[#EAEAEA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EAEAEA] pb-8 mb-16 sm:mb-20">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.1}
          >
            <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#777777] block mb-3 font-normal">
              PROPRIETARY IDENTITY SYSTEM
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-black max-w-2xl">
              The ALS Infonet Monogram &amp; Identity Suite
            </h2>
          </motion.div>
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.25}
            className="mt-6 md:mt-0 max-w-md"
          >
            <p className="text-sm sm:text-base text-[#777777] font-light leading-relaxed">
              A bespoke architectural monogram synthesizing the letterforms <strong>A</strong>,{' '}
              <strong>L</strong>, and <strong>S</strong> into a single cohesive symbol. Designed for
              distinction, precision, and timeless authority.
            </p>
          </motion.div>
        </div>

        {/* 1. Large-Scale Primary Emblem & Architectural Blueprint */}
        <div className="border border-[#EAEAEA] bg-white p-8 sm:p-14 lg:p-16 mb-12 shadow-[0_1px_16px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Large Scale Monogram with Drafting Grid */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-[#FAFAFA] border border-[#EAEAEA]">
              <div className="relative p-4 sm:p-8">
                <ALSSymbol size={260} inverted={false} showGrid={true} animated={true} />
              </div>
              <div className="text-[10px] tracking-[0.28em] text-[#777777] uppercase font-serif mt-4 text-center">
                120 × 120 Architectural Drafting Grid · Vector Master
              </div>
            </div>

            {/* Right: Design Rationale & Structural Anatomy */}
            <div className="lg:col-span-6 space-y-6 lg:pl-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#777777] font-serif">
                <Compass size={14} className="text-black" />
                <span>Concept &amp; Design Rationale</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif text-black font-normal leading-tight">
                An architectural synthesis of letterforms.
              </h3>

              <p className="text-base text-[#1A1A1A] font-light leading-relaxed">
                Rather than placing initials side by side or relying on generic circles, the mark
                merges all three letters into a single monolithic emblem:
              </p>

              {/* Anatomy Breakdown */}
              <div className="space-y-4 pt-2 border-t border-[#EAEAEA]">
                <div className="flex items-start gap-3">
                  <span className="font-sans text-black text-sm font-bold shrink-0">A</span>
                  <div>
                    <span className="text-xs font-semibold text-black block">
                      The Apex Arch
                    </span>
                    <span className="text-xs text-[#777777] font-light leading-relaxed block mt-0.5">
                      A monumental upward chevron symbolizing engineering ambition, architectural precision,
                      and structural authority.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-sans text-black text-sm font-bold shrink-0">L</span>
                  <div>
                    <span className="text-xs font-semibold text-black block">
                      The Foundation Plinth
                    </span>
                    <span className="text-xs text-[#777777] font-light leading-relaxed block mt-0.5">
                      A solid perpendicular bracket anchoring the emblem with 14px uniform weight,
                      representing grounded logic and stability.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-sans text-black text-sm font-bold shrink-0">S</span>
                  <div>
                    <span className="text-xs font-semibold text-black block">
                      The Systems Curve
                    </span>
                    <span className="text-xs text-[#777777] font-light leading-relaxed block mt-0.5">
                      A fluid, continuous geometric path symbolizing dynamic software flow, data
                      connectivity, and technological responsiveness.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <Eye size={15} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-black block">
                      Negative-Space Balance
                    </span>
                    <span className="text-xs text-[#777777] font-light leading-relaxed block mt-0.5">
                      Disciplined 6px negative space channels separate the three facets, creating
                      a balanced optical triad that remains crisp and legible at any scale.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Light & Dark Background Applications Side-by-Side */}
        <div className="mb-12">
          <div className="text-[11px] tracking-[0.25em] text-[#777777] uppercase font-serif mb-4 font-semibold">
            Color Applications: Pure Monochrome High-Contrast
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Light Version (Solid White) */}
            <div className="border border-[#EAEAEA] bg-white p-10 sm:p-14 flex flex-col items-center justify-center text-center space-y-6">
              <span className="text-[10px] tracking-[0.25em] text-[#777777] uppercase font-serif">
                Light Application · Black on White (#FFFFFF)
              </span>
              <div className="py-6">
                <ALSLogo variant="horizontal" size={44} inverted={false} />
              </div>
              <p className="text-xs text-[#777777] font-light max-w-xs">
                Primary corporate expression for client documentation, stationery, invoices, and light web interfaces.
              </p>
            </div>

            {/* Dark Version (Solid Black) */}
            <div className="border border-neutral-900 bg-black text-white p-10 sm:p-14 flex flex-col items-center justify-center text-center space-y-6">
              <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-serif">
                Dark Application · White on Black (#000000)
              </span>
              <div className="py-6">
                <ALSLogo variant="horizontal" size={44} inverted={true} />
              </div>
              <p className="text-xs text-neutral-400 font-light max-w-xs">
                Cinematic brand expression for high-contrast presentation moments, nighttime environments, and keynotes.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Horizontal vs Stacked Arrangements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Horizontal Arrangement */}
          <div className="border border-[#EAEAEA] bg-white p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#777777] uppercase font-serif block mb-6">
                Arrangement 01 · Horizontal (Navigation &amp; Headers)
              </span>
              <div className="py-8 flex items-center justify-center border-t border-b border-[#EAEAEA]">
                <ALSLogo variant="horizontal" size={38} inverted={false} />
              </div>
            </div>
            <p className="text-xs text-[#777777] font-light mt-6 leading-relaxed">
              Symbol placed on the left, custom kerned <em>ALS INFONET</em> wordmark on the right.
              Optimized for application headers, letterhead titles, and email signatures.
            </p>
          </div>

          {/* Stacked Arrangement */}
          <div className="border border-[#EAEAEA] bg-white p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#777777] uppercase font-serif block mb-6">
                Arrangement 02 · Stacked (Keynotes &amp; Formals)
              </span>
              <div className="py-6 flex items-center justify-center border-t border-b border-[#EAEAEA]">
                <ALSLogo variant="stacked" size={54} inverted={false} />
              </div>
            </div>
            <p className="text-xs text-[#777777] font-light mt-6 leading-relaxed">
              Monogram centered prominently above the wordmark and secondary title. Used for official
              covers, signage, business cards, and keynote title slides.
            </p>
          </div>
        </div>

        {/* 4. Small Scale & Browser Favicon Proof */}
        <div className="border border-[#EAEAEA] bg-white p-8 sm:p-12 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-6 mb-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#777777] uppercase font-serif block mb-1">
                Micro-Scale Legibility Proof
              </span>
              <h4 className="text-xl font-serif text-black font-normal">
                Favicon &amp; Miniature Scale (16px to 48px)
              </h4>
            </div>
            <span className="text-xs text-[#777777] font-light">
              Verified vector stroke weights prevent blur at tiny resolutions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* 16px Scale in simulated tab */}
            <div className="border border-[#EAEAEA] p-5 bg-[#FAFAFA] flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-[#777777] font-serif uppercase tracking-widest mb-3">
                16 × 16 Pixel Scale (Browser Tab)
              </span>
              <div className="p-3 bg-white border border-[#EAEAEA] flex items-center gap-2 shadow-xs">
                <div className="p-1 bg-black">
                  <ALSSymbol size={16} inverted={true} />
                </div>
                <span className="text-[11px] font-serif text-black truncate max-w-[120px]">
                  ALS Infonet | Software
                </span>
              </div>
              <span className="text-[10px] text-[#777777] mt-3">Browser Tab Favicon</span>
            </div>

            {/* 32px Scale */}
            <div className="border border-[#EAEAEA] p-5 bg-[#FAFAFA] flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-[#777777] font-serif uppercase tracking-widest mb-3">
                32 × 32 Pixel Scale (App Shortcut)
              </span>
              <div className="p-3 bg-white border border-[#EAEAEA] flex items-center justify-center shadow-xs">
                <ALSSymbol size={32} inverted={false} />
              </div>
              <span className="text-[10px] text-[#777777] mt-3">Mobile Bookmark / Dock</span>
            </div>

            {/* 48px Scale */}
            <div className="border border-[#EAEAEA] p-5 bg-[#FAFAFA] flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-[#777777] font-serif uppercase tracking-widest mb-3">
                48 × 48 Pixel Scale (System Avatar)
              </span>
              <div className="p-3 bg-white border border-[#EAEAEA] flex items-center justify-center shadow-xs">
                <ALSSymbol size={48} inverted={false} />
              </div>
              <span className="text-[10px] text-[#777777] mt-3">Profile &amp; Security Avatar</span>
            </div>
          </div>
        </div>

        {/* 5. Production Vector Asset Action */}
        <div className="border border-[#EAEAEA] p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <h4 className="text-base font-serif text-black font-normal">
                Production-Ready Vector Source Asset
              </h4>
              <p className="text-xs text-[#777777] font-light mt-0.5">
                Exact mathematical SVG vector with zero raster dependency. Ready for print, web, and signage.
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopySvg}
            className="w-full sm:w-auto px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.22em] font-serif border border-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
          >
            {copiedSvg ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedSvg ? 'Vector Copied to Clipboard' : 'Copy Vector SVG'}</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
