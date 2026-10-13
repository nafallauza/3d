import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    let animationId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });

      // Detect cursor context
      const target = e.target;
      const interactiveEl = target.closest('button, a, input, [data-cursor]');
      if (interactiveEl) {
        setIsHovered(true);
        setCursorText(interactiveEl.getAttribute('data-cursor') || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setTrailingPos({ x: currentX, y: currentY });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Center sharp dot */}
      <div
        className="fixed w-1.5 h-1.5 bg-[#2c2824] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />

      {/* Smooth trailing outer ring */}
      <div
        className={`fixed rounded-full border border-[#2c2824]/60 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 flex items-center justify-center ${
          cursorText
            ? 'w-20 h-20 bg-[#2c2824] text-[#a89474] border-transparent'
            : isHovered
            ? 'w-12 h-12 bg-[#2c2824]/10 scale-125'
            : 'w-8 h-8'
        }`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-center px-1 font-semibold leading-tight">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
