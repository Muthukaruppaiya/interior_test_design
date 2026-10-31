import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function FloatingDecor() {
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = decorRef.current;
    if (!el || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const items = el.querySelectorAll('.floating-decor-item');
      items.forEach((item, i) => {
        const speed = 0.2 + (i % 4) * 0.25;
        gsap.to(item, {
          yPercent: speed * 80,
          rotation: (i % 2 === 0 ? 1 : -1) * 15,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={decorRef}
      className="floating-decor-container"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Soft Sand Arch Silhouette */}
      <div
        className="floating-decor-item"
        style={{
          position: 'absolute',
          top: '12%',
          left: '3%',
          width: '260px',
          height: '380px',
          borderRadius: '130px 130px 0 0',
          border: '1px solid rgba(176, 141, 87, 0.18)',
          backgroundColor: 'rgba(233, 225, 211, 0.12)',
          filter: 'blur(2px)',
        }}
      />

      {/* Floating Concentric Brass Rings */}
      <div
        className="floating-decor-item"
        style={{
          position: 'absolute',
          top: '38%',
          right: '5%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          border: '1px dashed rgba(176, 141, 87, 0.22)',
          filter: 'blur(1px)',
        }}
      />

      {/* Thin Architectural Geometric Rod */}
      <div
        className="floating-decor-item"
        style={{
          position: 'absolute',
          top: '65%',
          left: '8%',
          width: '1px',
          height: '400px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(176, 141, 87, 0.3) 50%, transparent 100%)',
        }}
      />

      {/* Soft Sage Organic Blob */}
      <div
        className="floating-decor-item"
        style={{
          position: 'absolute',
          top: '82%',
          right: '8%',
          width: '380px',
          height: '240px',
          borderRadius: '50%',
          backgroundColor: 'rgba(185, 194, 174, 0.12)',
          filter: 'blur(35px)',
        }}
      />
    </div>
  );
}
