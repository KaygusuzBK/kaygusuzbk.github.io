"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface IconCloudProps {
  images?: string[];
  iconSlugs?: string[];
  className?: string;
}

// Basit, dependency'siz bir IconCloud implementasyonu.
// Icon'lar dairesel bir düzende yerleştirilir ve tüm grup yavaşça döner.
export function IconCloud({ images, iconSlugs, className }: IconCloudProps) {
  const sources = useMemo(() => {
    if (images && images.length > 0) return images;
    if (iconSlugs && iconSlugs.length > 0) {
      return iconSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
    }
    return [];
  }, [images, iconSlugs]);

  const positions = useMemo(() => {
    const count = sources.length;
    if (count === 0) return [];
    // Daha geniş daire için radius'u artırdık
    const radius = Math.max(80, Math.min(120, count * 4));
    return sources.map((_, index) => {
      const angle = (index / count) * Math.PI * 2;
      return { angle, radius };
    });
  }, [sources]);

  if (sources.length === 0) return null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className ?? "aspect-square max-w-xs mx-auto",
      )}
    >
      <style jsx>{`
        @keyframes icon-cloud-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div
        className="relative h-full w-full"
        style={{
          animation: "icon-cloud-spin 40s linear infinite",
        }}
      >
        {positions.map(({ angle, radius }, index) => {
          // Polar -> Cartesian, merkeze göre
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={sources[index]}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg dark:bg-zinc-900/95 border border-black/5 dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sources[index]}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IconCloud;


