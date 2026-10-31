import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse, not touch or reduced motion)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover targets for data-cursor ("view", "drag", etc.)
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
        if (cursorEl) {
          const type = cursorEl.getAttribute('data-cursor') || '';
          setCursorText(type.toUpperCase());
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }

        const isClickable = target.closest('a, button, [role="button"], input, select, textarea');
        setIsPointer(Boolean(isClickable) && !cursorEl);
      }
    };

    let animId: number;
    const render = () => {
      // Smooth lerp for outer glass ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Precision Brass Center Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          transform: 'translate3d(-100px, -100px, 0)',
          width: isHovered ? '0px' : '5px',
          height: isHovered ? '0px' : '5px',
          marginLeft: '-2.5px',
          marginTop: '-2.5px',
          backgroundColor: '#A98852',
          borderRadius: '50%',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          opacity: isPointer ? 0.35 : 1,
          willChange: 'transform',
        }}
      />

      {/* Trailing Interactive Glass Ring / Pill */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate3d(-100px, -100px, 0)',
          width: isHovered ? '78px' : isPointer ? '44px' : '32px',
          height: isHovered ? '78px' : isPointer ? '44px' : '32px',
          marginLeft: isHovered ? '-39px' : isPointer ? '-22px' : '-16px',
          marginTop: isHovered ? '-39px' : isPointer ? '-22px' : '-16px',
          borderRadius: '999px',
          border: isHovered ? '1px solid rgba(169, 136, 82, 0.85)' : '1px solid rgba(169, 136, 82, 0.4)',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.75)' : isPointer ? 'rgba(169, 136, 82, 0.08)' : 'transparent',
          backdropFilter: isHovered ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isHovered ? 'blur(16px)' : 'none',
          boxShadow: isHovered ? '0 12px 30px rgba(60, 45, 20, 0.12)' : 'none',
          transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), margin 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.25s ease, border-color 0.25s ease',
          willChange: 'transform',
        }}
      >
        {isHovered && (
          <span
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: '#1B1916',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
