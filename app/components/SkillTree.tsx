'use client';

import React, { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { cn } from "../../lib/utils";

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
  duration?: number;
}

const AnimatedBeam: React.FC<AnimatedBeamProps> = ({ containerRef, fromRef, toRef, duration = 3 }) => {
  const [style, setStyle] = useState<React.CSSProperties | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!container || !fromEl || !toEl) return;

      const containerRect = container.getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
      const x2 = toRect.left + toRect.width / 2 - containerRect.left;
      const y2 = toRect.top + toRect.height / 2 - containerRect.top;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      setStyle({
        left: x1,
        top: y1,
        width: length,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 50%",
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [containerRef, fromRef, toRef]);

  if (!style) return null;

  return (
    <div
      className="pointer-events-none absolute h-[2px] origin-left bg-gradient-to-r from-transparent via-black/40 to-transparent dark:via-white/50 animate-pulse"
      style={style}
    />
  );
};

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-10 items-center justify-center rounded-full border bg-white text-xs font-medium shadow-[0_0_18px_-10px_rgba(0,0,0,0.9)] dark:bg-black dark:text-white",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
Circle.displayName = "Circle";

export function FrontendSkillTree({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);
  const r5 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-56 w-full items-center justify-center overflow-hidden px-4 sm:px-6",
        className,
      )}
    >
      <div className="flex size-full max-w-xl items-stretch justify-between gap-6">
        {/* User node */}
        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="size-14">
            <User className="h-6 w-6" />
          </Circle>
        </div>
        {/* Tech nodes */}
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={r1}>React</Circle>
          <Circle ref={r2}>Vue</Circle>
          <Circle ref={r3}>Next.js</Circle>
          <Circle ref={r4}>TypeScript</Circle>
          <Circle ref={r5}>JavaScript</Circle>
        </div>
      </div>

      {/* Beams */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r3} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r4} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r5} />
    </div>
  );
}

export function BackendSkillTree({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);
  const r5 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-56 w-full items-center justify-center overflow-hidden px-4 sm:px-6",
        className,
      )}
    >
      <div className="flex size-full max-w-xl items-stretch justify-between gap-6">
        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="size-14">
            <User className="h-6 w-6" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={r1}>Node.js</Circle>
          <Circle ref={r2}>Python</Circle>
          <Circle ref={r3}>MongoDB</Circle>
          <Circle ref={r4}>Firebase</Circle>
          <Circle ref={r5}>GraphQL</Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r3} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r4} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r5} />
    </div>
  );
}

export function ToolsSkillTree({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);
  const r5 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-56 w-full items-center justify-center overflow-hidden px-4 sm:px-6",
        className,
      )}
    >
      <div className="flex size-full max-w-xl items-stretch justify-between gap-6">
        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="size-14">
            <User className="h-6 w-6" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={r1}>Git</Circle>
          <Circle ref={r2}>Docker</Circle>
          <Circle ref={r3}>AWS</Circle>
          <Circle ref={r4}>Figma</Circle>
          <Circle ref={r5}>Postman</Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r3} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r4} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r5} />
    </div>
  );
}
