import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextHighlight({ text, className = '' }) {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  const words = text.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordSpans = wordsRef.current.filter(Boolean);

    const tween = gsap.fromTo(
      wordSpans,
      { opacity: 0.22, color: '#a89f91' },
      {
        opacity: 1,
        color: '#ffffff',
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 0.8,
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`leading-snug select-none ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(span) => (wordsRef.current[i] = span)}
          className="highlight-word inline-block mr-[0.28em] will-change-transform"
        >
          {word}
        </span>
      ))}
    </div>
  );
}
