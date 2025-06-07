"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
    () => import("@/components/layout/ParticleBackground"),
    {
        ssr: false,
    }
);

export default function ClientOnlyParticles() {
    return <ParticleBackground />;
} 