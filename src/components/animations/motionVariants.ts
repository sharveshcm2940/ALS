/**
 * Shared Global Framer Motion Variants & Timing System
 * Enforces synchronized stagger timings, fade-and-rise entrances, and micro-interactions
 * across all sections of ALS Infonet.
 */

// Refined Apple-style cubic-bezier easings
export const EASINGS = {
  // Apple standard smooth easeOutQuart
  smoothOut: [0.16, 1, 0.3, 1] as const,
  // Snappy for UI micro-interactions
  snappy: [0.25, 0.1, 0.25, 1] as const,
  // Gentle for cinematic section entrances
  cinematic: [0.22, 1, 0.36, 1] as const,
  // Decelerated curve for content appearance
  decelerate: [0.05, 0.7, 0.1, 1.0] as const,
};

// Standardized Viewport Triggers
export const VIEWPORT_CONFIG = {
  default: { once: true, amount: 0.2 },
  header: { once: true, amount: 0.35 },
  eager: { once: true, amount: 0.1 },
  strict: { once: true, amount: 0.5 },
};

// 1. Standardized Fade-and-Rise Entrance Animation
// Supports both direct usage and custom stagger delays: custom={index * 0.1}
export const fadeAndRise = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: typeof custom === 'number' ? custom : 0,
      ease: EASINGS.smoothOut,
    },
  }),
};

// Backwards-compatible alias for existing sections
export const fadeInUpVariants = fadeAndRise;

// 2. Stagger Container Variants for Synchronized Child Entrances
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (delayChildren: number = 0.05) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: typeof delayChildren === 'number' ? delayChildren : 0.05,
    },
  }),
};

export const staggerContainerVariants = staggerContainer;

export const staggerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

// 3. Masked Text Reveal (For Display Headlines)
export const maskRevealVariants = {
  hidden: { y: '115%', opacity: 0.05 },
  visible: (delay: number = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.85,
      delay: typeof delay === 'number' ? delay : 0,
      ease: EASINGS.cinematic,
    },
  }),
};

// 4. Horizontal Line Expansion (Left-to-Right)
export const lineExpandVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: {
      duration: 0.85,
      delay: typeof delay === 'number' ? delay : 0,
      ease: EASINGS.smoothOut,
    },
  }),
};

// 5. Scale and Fade In
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: typeof delay === 'number' ? delay : 0,
      ease: EASINGS.smoothOut,
    },
  }),
};

// 6. Interactive Button & Card Physics
export const buttonTapSpring = {
  scale: 0.98,
  transition: { duration: 0.15, ease: EASINGS.snappy },
};

export const buttonHoverSpring = {
  scale: 1.02,
  transition: { duration: 0.2, ease: EASINGS.smoothOut },
};

// 7. Tab and View Transition Variants
export const tabContentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASINGS.smoothOut,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: EASINGS.snappy,
    },
  },
};

// 8. Modal Entrance and Exit Physics
export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalPanelVariants = {
  hidden: { scale: 0.96, opacity: 0, y: 18 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASINGS.smoothOut },
  },
  exit: {
    scale: 0.96,
    opacity: 0,
    y: 12,
    transition: { duration: 0.2, ease: EASINGS.snappy },
  },
};
