import React, { useRef, useState } from 'react';

export default function MagneticButton({ children, onClick, className = '' }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Pull effect (magnetic factor: 0.35)
    setPos({ x: distanceX * 0.35, y: distanceY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block p-4"
    >
      <button
        ref={btnRef}
        onClick={onClick}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
        className={`w-32 h-32 md:w-36 md:h-36 rounded-full border border-charcoal/40 bg-charcoal text-cream hover:bg-cream hover:text-charcoal hover:border-charcoal flex items-center justify-center p-4 text-center font-mono text-[11px] tracking-wider uppercase transition-colors duration-500 shadow-xl group cursor-pointer ${className}`}
      >
        <span className="nav-rollup">
          <span className="nav-rollup-inner">
            <span>{children}</span>
            <span>{children}</span>
          </span>
        </span>
      </button>
    </div>
  );
}
