"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

function gridPercent(value: number, total: number) {
  return `${((value / total) * 100).toFixed(4)}%`;
}

/** Deterministic stagger — same on server and client (avoids hydration mismatch). */
function pieceDelay(index: number, maxDelay: number) {
  const t = ((index * 9301 + 49297) % 233280) / 233280;
  return Number((t * maxDelay).toFixed(3));
}

function buildClipPath(row: number, col: number, rows: number, cols: number) {
  const x0 = gridPercent(col, cols);
  const x1 = gridPercent(col + 1, cols);
  const y0 = gridPercent(row, rows);
  const y1 = gridPercent(row + 1, rows);
  return `polygon(${x0} ${y0}, ${x1} ${y0}, ${x1} ${y1}, ${x0} ${y1})`;
}

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number;
  maxAnimationDelay?: number;
  colorRevealDelay?: number;
  className?: string;
  /** Full-bleed cover mode — no rounded corners */
  fill?: boolean;
  /** Repeat the pixel reveal animation */
  loop?: boolean;
  /** Pause on full image before restarting (loop mode only) */
  loopHoldDuration?: number;
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
  fill = false,
  loop = false,
  loopHoldDuration = 2800,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false;
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  useEffect(() => {
    if (!loop) {
      setIsVisible(true);
      const colorTimeout = setTimeout(() => {
        setShowColor(true);
      }, colorRevealDelay);
      return () => clearTimeout(colorTimeout);
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const loopGap = 100;

    const runCycle = () => {
      setIsVisible(false);
      setShowColor(false);

      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setIsVisible(true);

          timers.push(
            setTimeout(() => {
              if (cancelled) return;
              setShowColor(true);
            }, colorRevealDelay)
          );
        }, loopGap)
      );
    };

    runCycle();

    const cycleMs =
      loopGap + maxAnimationDelay + pixelFadeInDuration + loopHoldDuration;
    const interval = setInterval(runCycle, cycleMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [
    loop,
    colorRevealDelay,
    maxAnimationDelay,
    pixelFadeInDuration,
    loopHoldDuration,
  ]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      return {
        clipPath: buildClipPath(row, col, rows, cols),
        delay: pieceDelay(index, maxAnimationDelay),
      };
    });
  }, [rows, cols, maxAnimationDelay]);

  return (
    <div
      className={cn(
        fill
          ? "relative h-full w-full select-none"
          : "relative h-72 w-72 select-none md:h-96 md:w-96",
        className
      )}
    >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 ease-out",
            isVisible ? "opacity-100" : "opacity-0",
            isVisible ? "transition-all" : "transition-opacity"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: isVisible ? `${piece.delay}ms` : "0ms",
            transitionDuration: isVisible
              ? `${pixelFadeInDuration}ms`
              : "500ms",
          }}
        >
          <img
            src={src}
            alt=""
            className={cn(
              "z-1 h-full w-full object-cover",
              fill ? "rounded-none" : "rounded-[2.5rem]",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};
