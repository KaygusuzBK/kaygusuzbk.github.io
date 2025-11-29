"use client";

import React, { forwardRef, useId, useLayoutEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { cn } from "../../lib/utils";

interface AnimatedBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

interface BeamState {
  path: string;
  width: number;
  height: number;
}

const AnimatedBeam: React.FC<AnimatedBeamProps> = (props) => {
  const {
    className,
    containerRef,
    fromRef,
    toRef,
    curvature = 30,
    reverse = false,
    duration = 5,
    delay = 0,
    pathColor = "rgba(148,163,184,0.35)", // slate-400/40
    pathWidth = 2,
    pathOpacity = 0.5,
    gradientStartColor = "#ffaa40",
    gradientStopColor = "#9c40ff",
    startXOffset = 0,
    startYOffset = 0,
    endXOffset = 0,
    endYOffset = 0,
  } = props;

  const [state, setState] = useState<BeamState | null>(null);
  const gradientId = useId();

  useLayoutEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!container || !fromEl || !toEl) return;

      const containerRect = container.getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const startX = fromRect.left + fromRect.width / 2 - containerRect.left + startXOffset;
      const startY = fromRect.top + fromRect.height / 2 - containerRect.top + startYOffset;
      const endX = toRect.left + toRect.width / 2 - containerRect.left + endXOffset;
      const endY = toRect.top + toRect.height / 2 - containerRect.top + endYOffset;

      // Midpoint between start and end
      const mx = (startX + endX) / 2;
      const my = (startY + endY) / 2;

      // Perpendicular normal for curvature
      const dx = endX - startX;
      const dy = endY - startY;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      const curveAmount = curvature ?? 0;
      const cpx = mx + nx * curveAmount;
      const cpy = my + ny * curveAmount;

      const path = reverse
        ? `M ${endX},${endY} Q ${cpx},${cpy} ${startX},${startY}`
        : `M ${startX},${startY} Q ${cpx},${cpy} ${endX},${endY}`;

      setState({
        path,
        width: containerRect.width,
        height: containerRect.height,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    reverse,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  if (!state) return null;

  return (
    <>
      <style jsx>{`
        @keyframes beam-dash {
          0% {
            stroke-dashoffset: 80;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <svg
        className={cn("pointer-events-none absolute inset-0", className)}
        width={state.width}
        height={state.height}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientStartColor} />
            <stop offset="100%" stopColor={gradientStopColor} />
          </linearGradient>
        </defs>

        {/* Base subtle path */}
        <path
          d={state.path}
          fill="none"
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeLinecap="round"
          style={{ opacity: pathOpacity }}
        />

        {/* Glowing animated gradient path */}
        <path
          d={state.path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={pathWidth + 0.5}
          strokeLinecap="round"
          style={{
            strokeDasharray: 16,
            strokeDashoffset: reverse ? -80 : 80,
            animation: `beam-dash ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      </svg>
    </>
  );
};

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex items-center justify-center gap-1.5 rounded-full border bg-white/95 px-3 py-1.5 text-xs font-medium text-black shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:bg-zinc-900/95 dark:text-white dark:border-zinc-700",
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
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l3 = useRef<HTMLDivElement>(null);
  const l4 = useRef<HTMLDivElement>(null);
  const l5 = useRef<HTMLDivElement>(null);
  const l6 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);
  const r5 = useRef<HTMLDivElement>(null);
  const r6 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-72 w-full items-center justify-center overflow-hidden px-4 sm:px-6",
        className,
      )}
    >
      <div className="flex size-full max-w-3xl items-center justify-between gap-8">
        {/* Left skills */}
        <div className="hidden sm:flex flex-col items-end justify-center gap-2">
          <Circle ref={l1}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] font-semibold text-white">
              R
            </span>
            <span>React.js</span>
          </Circle>
          <Circle ref={l2}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-semibold text-white">
              V
            </span>
            <span>Vue.js</span>
          </Circle>
          <Circle ref={l3}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[9px] font-semibold text-white">
              N
            </span>
            <span>Next.js</span>
          </Circle>
          <Circle ref={l4}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-semibold text-white">
              TS
            </span>
            <span>TypeScript</span>
          </Circle>
          <Circle ref={l5}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[9px] font-semibold text-white">
              JS
            </span>
            <span>JavaScript</span>
          </Circle>
          <Circle ref={l6}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-semibold text-white">
              RN
            </span>
            <span>React Native</span>
          </Circle>
        </div>

        {/* User node in center */}
        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="size-16 bg-black text-white dark:bg-white dark:text-black">
            <User className="h-6 w-6" />
          </Circle>
        </div>

        {/* Right skills */}
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={r1}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] font-semibold text-white">
              RX
            </span>
            <span>Redux</span>
          </Circle>
          <Circle ref={r2}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-semibold text-white">
              H
            </span>
            <span>HTML5</span>
          </Circle>
          <Circle ref={r3}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-semibold text-white">
              C
            </span>
            <span>CSS3</span>
          </Circle>
          <Circle ref={r4}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-semibold text-white">
              TW
            </span>
            <span>Tailwind CSS</span>
          </Circle>
          <Circle ref={r5}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-semibold text-white">
              S
            </span>
            <span>Sass</span>
          </Circle>
          <Circle ref={r6}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[9px] font-semibold text-white">
              B
            </span>
            <span>Bootstrap</span>
          </Circle>
        </div>
      </div>

      {/* Beams left side */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l3} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l4} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l5} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l6} />

      {/* Beams right side */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r3} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r4} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r5} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r6} />
    </div>
  );
}

export function BackendSkillTree({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l3 = useRef<HTMLDivElement>(null);
  const l4 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-72 w-full items-center justify-center overflow-hidden px-4 sm:px-6",
        className,
      )}
    >
      <div className="flex size-full max-w-3xl items-center justify-between gap-8">
        {/* Left skills */}
        <div className="hidden sm:flex flex-col items-end justify-center gap-2">
          <Circle ref={l1}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-semibold text-white">
              N
            </span>
            <span>Node.js</span>
          </Circle>
          <Circle ref={l2}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] font-semibold text-white">
              Py
            </span>
            <span>Python</span>
          </Circle>
          <Circle ref={l3}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[9px] font-semibold text-white">
              M
            </span>
            <span>MongoDB</span>
          </Circle>
          <Circle ref={l4}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-semibold text-white">
              F
            </span>
            <span>Firebase</span>
          </Circle>
        </div>

        {/* User node in center */}
        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="size-16 bg-black text-white dark:bg-white dark:text-black">
            <User className="h-6 w-6" />
          </Circle>
        </div>

        {/* Right skills */}
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={r1}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-semibold text-white">
              G
            </span>
            <span>GraphQL</span>
          </Circle>
          <Circle ref={r2}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-zinc-700 text-[9px] font-semibold text-white">
              C
            </span>
            <span>C</span>
          </Circle>
          <Circle ref={r3}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-semibold text-white">
              C#
            </span>
            <span>C#</span>
          </Circle>
        </div>
      </div>

      {/* Beams left side */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l3} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l4} />

      {/* Beams right side */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r3} />
    </div>
  );
}

export function ToolsSkillTree({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l3 = useRef<HTMLDivElement>(null);
  const l4 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-64 w-full items-center justify-center overflow-hidden px-4 sm:px-6",
        className,
      )}
    >
      <div className="flex size-full max-w-3xl items-center justify-between gap-8">
        {/* Left tools */}
        <div className="hidden sm:flex flex-col items-end justify-center gap-2">
          <Circle ref={l1}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-semibold text-white">
              G
            </span>
            <span>Git</span>
          </Circle>
          <Circle ref={l2}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] font-semibold text-white">
              D
            </span>
            <span>Docker</span>
          </Circle>
          <Circle ref={l3}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-semibold text-white">
              A
            </span>
            <span>AWS</span>
          </Circle>
          <Circle ref={l4}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 text-[9px] font-semibold text-white">
              L
            </span>
            <span>Linux</span>
          </Circle>
        </div>

        {/* User node center */}
        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="size-16 bg-black text-white dark:bg-white dark:text-black">
            <User className="h-6 w-6" />
          </Circle>
        </div>

        {/* Right tools */}
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={r1}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-semibold text-white">
              F
            </span>
            <span>Figma</span>
          </Circle>
          <Circle ref={r2}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-semibold text-white">
              P
            </span>
            <span>Postman</span>
          </Circle>
          <Circle ref={r3}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[9px] font-semibold text-white">
              Cy
            </span>
            <span>Cypress</span>
          </Circle>
          <Circle ref={r4}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 text-[9px] font-semibold text-white">
              R
            </span>
            <span>RabbitMQ</span>
          </Circle>
        </div>
      </div>

      {/* Beams left side */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l3} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={l4} />

      {/* Beams right side */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r1} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r3} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={r4} />
    </div>
  );
}
