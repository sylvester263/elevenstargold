"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

// Reduced-motion and small-viewport visitors never trigger the dynamic
// import at all — zero Three.js bytes fetched, not just a hidden canvas.
// Everyone else gets the same static diagonal-hairline pattern as the base
// layer (so there's no layout shift / flash), with the WebGL lattice
// fading in on top once its GL context is actually ready.
export function HeroBackground() {
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isSmallViewport = window.innerWidth < 768;
    if (!reduceMotion && !isSmallViewport) {
      setEnabled(true);
    }
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--orange) 0, var(--orange) 1px, transparent 1px, transparent 28px)",
        }}
      />
      {enabled ? (
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:hidden"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <HeroScene onReady={() => setLoaded(true)} />
        </div>
      ) : null}
    </div>
  );
}
