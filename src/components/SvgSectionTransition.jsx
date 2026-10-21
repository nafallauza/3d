import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Architectural Parametric Transition System
 * Direction 'enter': Organic Cubic Bézier Horizon Wave (Dark #070E1A to Light #F4F6F9).
 * Direction 'exit': Layered Geometric Chamfer with Technical Coordinate Lines (Light #F4F6F9 to Dark #070E1A).
 * Completely synchronized with Lenis scroll and ScrollTrigger scrub.
 */
export default function SvgSectionTransition({ direction = 'enter', fill = '#F4F6F9' }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    if (prefersReducedMotion) {
      if (direction === 'enter') {
        path.setAttribute('d', 'M 0 160 C 480 20, 960 20, 1440 160 L 1440 160 L 0 160 Z');
      } else {
        path.setAttribute('d', 'M 0 0 L 1440 0 L 1440 60 L 0 140 Z');
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (direction === 'enter') {
        // Organic curve rises smoothly like an architectural horizon wave
        gsap.fromTo(
          path,
          {
            attr: { d: 'M 0 160 C 480 160, 960 160, 1440 160 L 1440 160 L 0 160 Z' },
          },
          {
            attr: { d: 'M 0 160 C 480 -60, 960 -60, 1440 160 L 1440 160 L 0 160 Z' },
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom 40%',
              scrub: 0.8,
            },
          }
        );
      } else {
        // Distinctive architectural diagonal chamfer wipe leading into geometric philosophy
        gsap.fromTo(
          path,
          {
            attr: { d: 'M 0 0 L 1440 0 L 1440 10 L 0 20 Z' },
          },
          {
            attr: { d: 'M 0 0 L 1440 0 L 1440 50 L 0 140 Z' },
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              end: 'bottom 25%',
              scrub: 0.8,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden pointer-events-none select-none z-20 ${
        direction === 'enter' ? '-mb-[2px] h-24 sm:h-36 md:h-48' : '-mt-[2px] h-24 sm:h-36 md:h-48'
      }`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill={fill}
          d={
            direction === 'enter'
              ? 'M 0 160 C 480 30, 960 30, 1440 160 L 1440 160 L 0 160 Z'
              : 'M 0 0 L 1440 0 L 1440 50 L 0 140 Z'
          }
        />
      </svg>
    </div>
  );
}
