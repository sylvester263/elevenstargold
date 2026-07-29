"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

// @react-three/fiber's Canvas creates its THREE.WebGLRenderer inside an
// async `configure()` step that nothing in the library awaits or catches
// (see @react-three/fiber/dist — render() calls this.configure() without a
// .catch()). Since three.js r163 only ever requests a `webgl2` context (no
// WebGL1 fallback), any device/browser without WebGL2 — older mobile
// browsers, hardware acceleration disabled, GPU driver blocklists, some
// in-app webviews — makes that constructor throw, which becomes an
// unhandled promise rejection: no thrown render error, nothing an error
// boundary can see, and onCreated (our onReady) simply never fires. That's
// why this rendered in dev (modern desktop browser, WebGL2 available) but
// silently failed elsewhere: the wrapper div below just stayed at
// opacity 0 forever with no console signal at all. The WebGL2 pre-check
// stops us from even attempting the import on devices where it can't work;
// the boundary + watchdog below make any remaining failure visible in the
// console instead of invisible.
class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error("[HeroBackground] 3D scene threw during render:", error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Reduced-motion, small-viewport, and no-WebGL2 visitors never trigger the
// dynamic import at all — zero Three.js bytes fetched, not just a hidden
// canvas. Everyone else gets the same static diagonal-hairline pattern as
// the base layer (so there's no layout shift / flash), with the WebGL
// lattice fading in on top once its GL context is actually ready.
export function HeroBackground() {
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    loadedRef.current = loaded;
  }, [loaded]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isSmallViewport = window.innerWidth < 768;
    if (reduceMotion || isSmallViewport) return;

    if (!hasWebGL2()) {
      console.error(
        "[HeroBackground] WebGL2 unavailable in this browser — skipping the 3D lattice, static hairline pattern only.",
      );
      return;
    }

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(() => {
      if (!loadedRef.current) {
        console.error(
          "[HeroBackground] 3D lattice did not report ready within 8s of mounting — WebGL context creation likely failed silently (see @react-three/fiber's unawaited configure()).",
        );
      }
    }, 8000);
    return () => clearTimeout(id);
  }, [enabled]);

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
          <SceneErrorBoundary>
            <HeroScene onReady={() => setLoaded(true)} />
          </SceneErrorBoundary>
        </div>
      ) : null}
    </div>
  );
}
