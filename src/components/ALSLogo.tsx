import React from 'react';
import { motion } from 'motion/react';

interface ALSSymbolProps {
  className?: string;
  size?: number;
  inverted?: boolean; // true = white on dark (#FFFFFF), false = black on light (#000000)
  showGrid?: boolean;
  animated?: boolean;
}

/**
 * BESPOKE GEOMETRIC ABSTRACT ARCHITECTURAL MARK
 * 
 * A rare, distinct, and sophisticated monochrome symbol designed for ALS Infonet.
 * Synthesizes four precision-engineered planar facets on a 100x100 grid:
 * 
 * 1. The Soaring Apex Chevron ('A'): Architectural 45-degree angled chevron pointing upwards.
 * 2. The Optical Keystone Diamond: Centered floating nucleus creating an interior focal aperture.
 * 3. The Foundational Bracket ('L'): Grounded 12px orthogonal cantilever plinth.
 * 4. The Sinuous Return Step ('S'): Stepped geometric continuum embodying digital software flow.
 * 
 * Aligned to a disciplined 76x78 unit bounding box with 6px laser-cut negative space channels.
 */
export const ALSSymbol: React.FC<ALSSymbolProps> = ({
  className = '',
  size = 32,
  inverted = false,
  showGrid = false,
  animated = false,
}) => {
  const fillColor = inverted ? '#FFFFFF' : '#000000';
  const gridStroke = inverted ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const accentStroke = inverted ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)';

  const transitionConfig = {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none shrink-0 ${className}`}
      aria-label="ALS Infonet Geometric Abstract Mark"
    >
      {/* Precision Drafting Grid Guidelines (Rendered on brand board / design rationale) */}
      {showGrid && (
        <g stroke={gridStroke} strokeWidth="1" strokeDasharray="2 2">
          <rect x="12" y="10" width="76" height="78" fill="none" stroke={accentStroke} />
          <line x1="50" y1="10" x2="12" y2="88" stroke={accentStroke} strokeDasharray="none" />
          <line x1="50" y1="10" x2="88" y2="88" stroke={accentStroke} strokeDasharray="none" />
          <line x1="12" y1="51" x2="88" y2="51" stroke={accentStroke} />
          <line x1="50" y1="6" x2="50" y2="94" stroke={accentStroke} strokeDasharray="none" />
          <circle cx="50" cy="51" r="34" fill="none" stroke={gridStroke} />
        </g>
      )}

      <g>
        {/* ======================================================== */}
        {/* 1. THE SOARING APEX CHEVRON ('A' / ELEVATION) */}
        {/* ======================================================== */}
        {animated ? (
          <motion.path
            d="M 50 10
               L 88 48
               H 72
               L 50 26
               L 28 48
               H 12
               Z"
            fill={fillColor}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.05 }}
          />
        ) : (
          <path
            d="M 50 10
               L 88 48
               H 72
               L 50 26
               L 28 48
               H 12
               Z"
            fill={fillColor}
          />
        )}

        {/* ======================================================== */}
        {/* 2. THE OPTICAL KEYSTONE DIAMOND (NUCLEUS APERTURE) */}
        {/* ======================================================== */}
        {animated ? (
          <motion.path
            d="M 50 42
               L 59 51
               L 50 60
               L 41 51
               Z"
            fill={fillColor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transitionConfig, delay: 0.15 }}
          />
        ) : (
          <path
            d="M 50 42
               L 59 51
               L 50 60
               L 41 51
               Z"
            fill={fillColor}
          />
        )}

        {/* ======================================================== */}
        {/* 3. THE FOUNDATIONAL BRACKET ('L' / LOGIC) */}
        {/* ======================================================== */}
        {animated ? (
          <motion.path
            d="M 12 54
               H 24
               V 76
               H 44
               V 88
               H 12
               Z"
            fill={fillColor}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...transitionConfig, delay: 0.2 }}
          />
        ) : (
          <path
            d="M 12 54
               H 24
               V 76
               H 44
               V 88
               H 12
               Z"
            fill={fillColor}
          />
        )}

        {/* ======================================================== */}
        {/* 4. THE SINUOUS RETURN STEP ('S' / SYSTEMS) */}
        {/* ======================================================== */}
        {animated ? (
          <motion.path
            d="M 88 54
               H 60
               V 64
               H 76
               V 76
               H 56
               V 88
               H 88
               Z"
            fill={fillColor}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...transitionConfig, delay: 0.25 }}
          />
        ) : (
          <path
            d="M 88 54
               H 60
               V 64
               H 76
               V 76
               H 56
               V 88
               H 88
               Z"
            fill={fillColor}
          />
        )}
      </g>
    </svg>
  );
};

export interface ALSLogoProps {
  variant?: 'emblem' | 'horizontal' | 'stacked' | 'compact' | 'favicon' | 'presentation';
  size?: number;
  className?: string;
  onClick?: () => void;
  showSubtitle?: boolean;
  animated?: boolean;
  inverted?: boolean;
}

/**
 * Master Brand Lockup for ALS Infonet
 * Pairs the geometric abstract mark with an architectural editorial wordmark.
 */
export const ALSLogo: React.FC<ALSLogoProps> = ({
  variant = 'horizontal',
  size,
  className = '',
  onClick,
  showSubtitle = true,
  animated = false,
  inverted = false,
}) => {
  const textColor = inverted ? 'text-white' : 'text-black';
  const subtextColor = inverted ? 'text-neutral-400' : 'text-neutral-500';
  const dividerColor = inverted ? 'bg-neutral-700' : 'bg-neutral-300';

  const defaultSize =
    variant === 'favicon'
      ? 20
      : variant === 'compact'
      ? 24
      : variant === 'emblem'
      ? 44
      : variant === 'stacked' || variant === 'presentation'
      ? 56
      : 30;

  const symbolSize = size || defaultSize;

  // 1. Standalone Favicon (Micro-scale)
  if (variant === 'favicon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <ALSSymbol size={symbolSize} inverted={inverted} />
      </div>
    );
  }

  // 2. Standalone Emblem
  if (variant === 'emblem') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        aria-label="ALS Infonet Geometric Mark"
      >
        <ALSSymbol size={symbolSize} inverted={inverted} animated={animated} />
      </div>
    );
  }

  // 3. Stacked Logo (Centered emblem above refined wordmark)
  if (variant === 'stacked' || variant === 'presentation') {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center text-center gap-3.5 ${className} ${
          onClick ? 'cursor-pointer' : ''
        }`}
      >
        <ALSSymbol size={symbolSize} inverted={inverted} animated={animated} />
        <div>
          <div className="flex items-center justify-center gap-2.5">
            <span
              className={`text-xl sm:text-2xl font-sans font-bold tracking-[0.24em] uppercase ${textColor}`}
            >
              ALS
            </span>
            <span className={`w-px h-4 ${dividerColor}`} aria-hidden="true" />
            <span
              className={`text-xl sm:text-2xl font-sans font-light tracking-[0.28em] uppercase ${textColor}`}
            >
              INFONET
            </span>
          </div>
          {showSubtitle && (
            <span
              className={`block text-[9px] sm:text-[9.5px] font-sans font-medium tracking-[0.28em] uppercase mt-1.5 ${subtextColor}`}
            >
              Software Solutions &middot; IT Services
            </span>
          )}
        </div>
      </div>
    );
  }

  // 4. Horizontal Logo (Standard for Navbar and Headers)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 group select-none ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
        <ALSSymbol size={symbolSize} inverted={inverted} animated={animated} />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 leading-none">
          <span
            className={`font-sans text-[15px] sm:text-[16px] font-bold tracking-[0.22em] uppercase transition-colors duration-200 ${textColor}`}
          >
            ALS
          </span>
          <span className={`w-px h-3.5 ${dividerColor}`} aria-hidden="true" />
          <span
            className={`font-sans text-[15px] sm:text-[16px] font-light tracking-[0.26em] uppercase transition-colors duration-200 ${textColor}`}
          >
            INFONET
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-sans text-[8px] sm:text-[8.5px] tracking-[0.24em] uppercase leading-tight mt-1 transition-colors duration-200 ${subtextColor} font-medium`}
          >
            Software Solutions &middot; IT Services
          </span>
        )}
      </div>
    </div>
  );
};
