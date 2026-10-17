import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCw, Pause, Play } from 'lucide-react';

export const REEL_WORDS = [
  'ALS INFONET',
  'SOFTWARE',
  'INNOVATION',
  'ENGINEERING',
  'SOLUTIONS',
  'DIGITAL',
  'TECHNOLOGY',
  'SYSTEMS',
  'DEVELOPMENT',
] as const;

export const TOTAL_SLOTS = 11;

/**
 * Normalizes a word into an array of exactly TOTAL_SLOTS characters, centered with spaces.
 */
export function getPaddedWord(word: string, totalSlots = TOTAL_SLOTS): string[] {
  const clean = word.toUpperCase().trim();
  const padTotal = Math.max(0, totalSlots - clean.length);
  const padLeft = Math.floor(padTotal / 2);
  const padRight = padTotal - padLeft;
  const str = ' '.repeat(padLeft) + clean + ' '.repeat(padRight);
  return str.slice(0, totalSlots).split('');
}

interface SplitFlapCardProps {
  currentChar: string;
  targetChar: string;
  isFlipping: boolean;
  phase: 'idle' | 'top-falling' | 'bottom-falling';
}

/**
 * Authentic Mechanical Split-Flap Character Tile
 * Implements physical split-flap kinematics with CSS 3D transforms:
 * - Upper flap: stationary top half of next char (revealed when front flap drops)
 * - Lower flap: stationary bottom half of current char (covered when new flap lands)
 * - Front top flap: folds downward around bottom hinge (-90deg)
 * - Front bottom flap: unfolds downward around top hinge (90deg -> 0deg with mechanical stop)
 * Clean professional monochrome tokens without arbitrary AI gradients.
 */
const SplitFlapCard: React.FC<SplitFlapCardProps> = ({
  currentChar,
  targetChar,
  isFlipping,
  phase,
}) => {
  const displayCurrent = currentChar === ' ' ? '' : currentChar;
  const displayTarget = targetChar === ' ' ? '' : targetChar;

  return (
    <div
      className="relative select-none flex-shrink-0"
      style={{ perspective: '1000px' }}
    >
      {/* Outer panel tile housing - Monochromatic Token */}
      <div className="relative w-[22px] xs:w-[26px] sm:w-[38px] md:w-[48px] lg:w-[60px] xl:w-[68px] h-[34px] xs:h-[40px] sm:h-[58px] md:h-[74px] lg:h-[92px] xl:h-[104px] bg-[#141414] rounded-[2px] p-[1px] shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
        {/* Left & Right Spindle Axle Notches */}
        <div
          className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[3px] h-[5px] bg-[#000000] z-30 rounded-r-[1px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[3px] h-[5px] bg-[#000000] z-30 rounded-l-[1px] pointer-events-none"
          aria-hidden="true"
        />

        {/* ========================================================= */}
        {/* STATIC BACKGROUND HALVES */}
        {/* Top Under: Displays Target Char Top Half */}
        <div className="absolute top-[1px] left-[1px] right-[1px] h-[calc(50%-0.5px)] overflow-hidden bg-[#EDEDEB] border-b border-[#141414] rounded-t-[1px]">
          <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
            <div className="h-[200%] w-full flex items-center justify-center">
              <span className="font-mono font-bold text-black leading-none text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-normal">
                {displayTarget}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Under: Displays Current Char Bottom Half */}
        <div className="absolute bottom-[1px] left-[1px] right-[1px] h-[calc(50%-0.5px)] overflow-hidden bg-[#E2E2DF] border-t border-[#141414] rounded-b-[1px]">
          <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
            <div className="h-[200%] w-full flex items-center justify-center -mt-[100%]">
              <span className="font-mono font-bold text-black leading-none text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-normal">
                {displayCurrent}
              </span>
            </div>
          </div>
          {/* Subtle contact shadow when upper card is dropping */}
          {isFlipping && (
            <div className="absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-200" />
          )}
        </div>

        {/* ========================================================= */}
        {/* DYNAMIC 3D FOREGROUND FLAPS */}
        {/* Top Flap: Folds Downward around bottom axis */}
        {isFlipping && phase === 'top-falling' && (
          <div
            className="absolute top-[1px] left-[1px] right-[1px] h-[calc(50%-0.5px)] overflow-hidden bg-[#EDEDEB] border-b border-[#141414] rounded-t-[1px] z-20"
            style={{
              transformOrigin: '50% 100%',
              animation: 'splitFlapFoldTop 190ms cubic-bezier(0.4, 0, 0.7, 1) forwards',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
              <div className="h-[200%] w-full flex items-center justify-center">
                <span className="font-mono font-bold text-black leading-none text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-normal">
                  {displayCurrent}
                </span>
              </div>
            </div>
            {/* Shading attenuation as flap tilts away from ambient light */}
            <div className="absolute inset-0 bg-black/35 pointer-events-none animate-[splitFlapShadowFade_190ms_ease-in_forwards]" />
          </div>
        )}

        {/* Bottom Flap: Unfolds Downward into place around top axis */}
        {isFlipping && phase === 'bottom-falling' && (
          <div
            className="absolute bottom-[1px] left-[1px] right-[1px] h-[calc(50%-0.5px)] overflow-hidden bg-[#E2E2DF] border-t border-[#141414] rounded-b-[1px] z-20 shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            style={{
              transformOrigin: '50% 0%',
              animation: 'splitFlapUnfoldBottom 190ms cubic-bezier(0.15, 0.9, 0.25, 1) forwards',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
              <div className="h-[200%] w-full flex items-center justify-center -mt-[100%]">
                <span className="font-mono font-bold text-black leading-none text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-normal">
                  {displayTarget}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Idle presentation (Cards fully in place) */}
        {!isFlipping && (
          <>
            <div className="absolute top-[1px] left-[1px] right-[1px] h-[calc(50%-0.5px)] overflow-hidden bg-[#EDEDEB] border-b border-[#141414] rounded-t-[1px] z-10">
              <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
                <div className="h-[200%] w-full flex items-center justify-center">
                  <span className="font-mono font-bold text-black leading-none text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-normal">
                    {displayCurrent}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[1px] left-[1px] right-[1px] h-[calc(50%-0.5px)] overflow-hidden bg-[#E2E2DF] border-t border-[#141414] rounded-b-[1px] z-10">
              <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                <div className="h-[200%] w-full flex items-center justify-center -mt-[100%]">
                  <span className="font-mono font-bold text-black leading-none text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-normal">
                    {displayCurrent}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Center Split Horizontal Seam */}
        <div
          className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 bg-[#000000] z-25 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

interface MechanicalTextRollerProps {
  onWordChange?: (word: string) => void;
  className?: string;
}

export const MechanicalTextRoller: React.FC<MechanicalTextRollerProps> = ({
  onWordChange,
  className = '',
}) => {
  // Start with ALS INFONET on initial load
  const [wordIndex, setWordIndex] = useState(0);
  const [currentChars, setCurrentChars] = useState<string[]>(() =>
    getPaddedWord(REEL_WORDS[0])
  );
  const [targetChars, setTargetChars] = useState<string[]>(() =>
    getPaddedWord(REEL_WORDS[0])
  );
  const [cardPhases, setCardPhases] = useState<('idle' | 'top-falling' | 'bottom-falling')[]>(
    () => new Array(TOTAL_SLOTS).fill('idle')
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dialRotation, setDialRotation] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearActiveTimeouts = () => {
    activeTimeoutsRef.current.forEach((t) => clearTimeout(t));
    activeTimeoutsRef.current = [];
  };

  /**
   * Cascade flap flip across the slots left-to-right
   */
  const flipToWord = useCallback(
    (nextIdx: number) => {
      clearActiveTimeouts();

      const nextWord = REEL_WORDS[nextIdx];
      const newTarget = getPaddedWord(nextWord);

      setWordIndex(nextIdx);
      setTargetChars(newTarget);
      setIsAnimating(true);
      if (onWordChange) {
        onWordChange(nextWord);
      }

      setDialRotation((prev) => prev + 45);

      const STAGGER_MS = 45;
      const TOP_FLIP_MS = 190;
      const BOTTOM_FLIP_MS = 190;

      for (let i = 0; i < TOTAL_SLOTS; i++) {
        const charCurrent = currentChars[i];
        const charNext = newTarget[i];

        if (charCurrent !== charNext) {
          const t1 = setTimeout(() => {
            setCardPhases((prev) => {
              const updated = [...prev];
              updated[i] = 'top-falling';
              return updated;
            });
          }, i * STAGGER_MS);

          const t2 = setTimeout(() => {
            setCardPhases((prev) => {
              const updated = [...prev];
              updated[i] = 'bottom-falling';
              return updated;
            });
          }, i * STAGGER_MS + TOP_FLIP_MS);

          const t3 = setTimeout(() => {
            setCardPhases((prev) => {
              const updated = [...prev];
              updated[i] = 'idle';
              return updated;
            });
            setCurrentChars((prev) => {
              const updated = [...prev];
              updated[i] = charNext;
              return updated;
            });
          }, i * STAGGER_MS + TOP_FLIP_MS + BOTTOM_FLIP_MS);

          activeTimeoutsRef.current.push(t1, t2, t3);
        }
      }

      const totalDuration = (TOTAL_SLOTS - 1) * STAGGER_MS + TOP_FLIP_MS + BOTTOM_FLIP_MS + 30;
      const tEnd = setTimeout(() => {
        setIsAnimating(false);
        setCurrentChars(newTarget);
        setCardPhases(new Array(TOTAL_SLOTS).fill('idle'));
      }, totalDuration);

      activeTimeoutsRef.current.push(tEnd);
    },
    [currentChars, onWordChange]
  );

  const handleDialClick = () => {
    const nextIdx = (wordIndex + 1) % REEL_WORDS.length;
    flipToWord(nextIdx);
  };

  useEffect(() => {
    if (isPaused) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!isAnimating) {
      timerRef.current = setTimeout(() => {
        const nextIdx = (wordIndex + 1) % REEL_WORDS.length;
        flipToWord(nextIdx);
      }, 2500); // 2.5s comfortable reading rhythm
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [wordIndex, isAnimating, isPaused, flipToWord]);

  useEffect(() => {
    return () => {
      clearActiveTimeouts();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const activeWord = REEL_WORDS[wordIndex];

  return (
    <div className={`w-full max-w-4xl mx-auto flex flex-col items-center overflow-hidden ${className}`}>
      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" role="status">
        Current dispatch: {activeWord}
      </div>

      {/* ============================================================== */}
      {/* ARCHITECTURAL MONOCHROME SPLIT-FLAP CASING */}
      {/* ============================================================== */}
      <div className="w-full bg-[#0D0D0D] text-white rounded-md p-3 sm:p-5 md:p-6 border border-[#222222] shadow-[0_16px_40px_rgba(0,0,0,0.5)] box-border">
        {/* Recessed Flap Display Bay */}
        <div className="w-full bg-[#050505] p-2 xs:p-2.5 sm:p-3.5 md:p-4 rounded border border-[#1A1A1A] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Horizontal Split-Flap Panels Row (Centered & Sized to never overflow) */}
          <div className="flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 max-w-full overflow-hidden py-1 sm:py-2">
            {Array.from({ length: TOTAL_SLOTS }).map((_, idx) => (
              <SplitFlapCard
                key={idx}
                currentChar={currentChars[idx] || ' '}
                targetChar={targetChars[idx] || ' '}
                isFlipping={cardPhases[idx] !== 'idle'}
                phase={cardPhases[idx]}
              />
            ))}
          </div>
        </div>

        {/* Minimalist Lower Control Deck */}
        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          {/* Rotary Dial & Label */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleDialClick}
              disabled={isAnimating}
              aria-label="Advance to Next Reel"
              className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full transition-transform active:scale-95 cursor-pointer disabled:opacity-75"
            >
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#181818] border border-[#333333] group-hover:border-neutral-400 shadow-[0_2px_6px_rgba(0,0,0,0.5)] flex items-center justify-center relative transition-colors"
                style={{
                  transform: `rotate(${dialRotation}deg)`,
                  transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                <div className="w-4 h-4 rounded-full bg-[#0F0F0F] border border-neutral-600 flex items-center justify-center relative">
                  <span className="absolute -top-1 w-0.5 h-1.5 bg-white rounded-xs" />
                  <div className="w-1 h-1 rounded-full bg-neutral-900" />
                </div>
              </div>
            </button>

            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white flex items-center gap-1.5 uppercase">
                NEXT REEL
                <RotateCw
                  size={11}
                  className={`text-neutral-400 transition-transform ${isAnimating ? 'animate-spin' : ''}`}
                />
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.16em] text-neutral-400 uppercase">
                CLICK DIAL
              </span>
            </div>
          </div>

          {/* Understated Sequence Counter & Cycle Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-400 font-medium">
              {String(wordIndex + 1).padStart(2, '0')} / {String(REEL_WORDS.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume auto cycle' : 'Pause auto cycle'}
              className="px-2.5 py-1 rounded bg-[#161616] hover:bg-[#202020] border border-[#282828] text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 text-[10px] tracking-wider uppercase cursor-pointer"
            >
              {isPaused ? <Play size={10} className="text-white" /> : <Pause size={10} className="text-neutral-300" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
