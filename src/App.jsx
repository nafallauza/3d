import React, { useEffect, useRef } from 'react';
import { TARA_DOM_HTML } from './taraDomTemplate.js';
import { bootSondavenEngine } from './utils/sondavenEngine.js';
import { initHero3DModel } from './utils/hero3DEngine.js';

export default function App() {
  const rootRef = useRef(null);

  useEffect(() => {
    // Initialize the interactive 3D /model.glb WebGL stage inside Hero
    const cleanup3D = initHero3DModel();

    // Boot the full Son Daven GSAP / ScrollTrigger / Lenis / Halftone Shader engine
    bootSondavenEngine();

    return () => {
      if (cleanup3D) cleanup3D();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: TARA_DOM_HTML }}
    />
  );
}
