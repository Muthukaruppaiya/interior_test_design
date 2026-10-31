import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export interface ParallaxOptions {
  speed?: number; // 0.2 = slow, 1.0 = normal, negative = counter
  direction?: 'y' | 'x';
  scale?: number;
  rotate?: number;
  opacity?: [number, number];
  start?: string;
  end?: string;
}

/**
 * Hook to apply scrubbed parallax animation to a DOM element.
 */
export function useParallax(
  targetRef: React.RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const speed = options.speed ?? 0.5;
    const direction = options.direction ?? 'y';
    const start = options.start ?? 'top bottom';
    const end = options.end ?? 'bottom top';

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const distance = 150 * speed;
      const vars: gsap.TweenVars = {
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.8,
        },
      };

      if (direction === 'y') {
        vars.y = distance;
      } else {
        vars.x = distance;
      }

      if (options.scale !== undefined) {
        vars.scale = options.scale;
      }

      if (options.rotate !== undefined) {
        vars.rotate = options.rotate;
      }

      if (options.opacity) {
        vars.opacity = options.opacity[1];
      }

      gsap.to(el, vars);
    });

    return () => mm.revert();
  }, [targetRef, options]);
}

/**
 * Reusable ParallaxLayer Component
 */
export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = 'y',
  scale,
  rotate,
  opacity,
  style,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: 'y' | 'x';
  scale?: number;
  rotate?: number;
  opacity?: [number, number];
  style?: React.CSSProperties;
  className?: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  useParallax(layerRef, { speed, direction, scale, rotate, opacity });

  return (
    <div
      ref={layerRef}
      className={`parallax-layer ${className}`}
      style={{
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Reusable ParallaxImage Component
 * Image inside an overflow-hidden frame that moves at 0.85x speed and scales from 1.2 to 1.
 */
export function ParallaxImage({
  src,
  alt,
  aspectRatio = '16/10',
  className = '',
  style,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        img,
        {
          yPercent: -15,
          scale: 1.2,
        },
        {
          yPercent: 15,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`parallax-image-frame ${className}`}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        aspectRatio,
        ...style,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '130%',
          objectFit: 'cover',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
