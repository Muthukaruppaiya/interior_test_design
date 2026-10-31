import { useState, useEffect, useRef } from 'react';
import { media } from '../data/media';
import { scrollToTarget } from '../hooks/useLenis';
import { gsap } from '../lib/gsap';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mouseOffset = useRef({ x: 0, y: 0 });

  // 1. Cross-fade between 3 curated architectural slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % media.hero.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // 2. Mouse depth parallax (±12px shift between layers on desktop)
  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;
      mouseOffset.current = { x: xNorm * 12, y: yNorm * 12 };

      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate3d(${-mouseOffset.current.x * 0.4}px, ${-mouseOffset.current.y * 0.4}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. GSAP ScrollTrigger: Hero lifts into rounded-corner frame (0 -> 32px, width -> 92%)
  useEffect(() => {
    const heroEl = heroRef.current;
    const frameEl = frameRef.current;
    const headEl = headlineRef.current;
    if (!heroEl || !frameEl) return;

    const ctx = gsap.context(() => {
      // Parallax text lift
      if (headEl) {
        gsap.to(headEl, {
          y: -120,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Smooth frame lift as user scrolls into the next section
      gsap.to(frameEl, {
        borderRadius: '32px',
        width: '92%',
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#F8F5EF',
      }}
    >
      {/* ── Cinematic Framing Container (Animates to rounded 32px on scroll) ── */}
      <div
        ref={frameRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: '0px',
          transition: 'border-radius 0.3s ease, width 0.3s ease',
          willChange: 'transform, border-radius, width',
        }}
        className="luxury-image-wrapper"
      >
        {/* Background Slides with Slow Zoom and Cross-Fade */}
        {media.hero.map((slide, idx) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: currentSlide === idx ? 1 : 0,
              transform: currentSlide === idx ? 'scale(1.05)' : 'scale(1.12)',
              transition: 'opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1), transform 7s linear',
              willChange: 'opacity, transform',
            }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 45%',
              }}
              // Fetch priority high on initial slide to prevent layout shift
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
            />
            {/* Subtle Editorial Tone Gradient Overlay (Warm Ivory Ambient) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(27, 25, 22, 0.18) 0%, rgba(27, 25, 22, 0.05) 40%, rgba(27, 25, 22, 0.45) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}

        {/* ── Headline & Studio Tag: "Spaces, composed." ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div style={{ maxWidth: '1200px' }}>
            {/* Editorial Atelier Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.55)',
                marginBottom: 'clamp(14px, 2vh, 22px)',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.12)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#A98852',
                  boxShadow: '0 0 8px #A98852',
                }}
              />
              <span
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                Turnkey Architecture · Chennai
              </span>
            </div>

            <h1
              ref={headlineRef}
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(52px, 8.5vw, 156px)',
                fontWeight: 300,
                lineHeight: 0.94,
                letterSpacing: '-0.025em',
                color: '#FFFFFF',
                textShadow: '0 4px 32px rgba(27, 25, 22, 0.45)',
                margin: '0 0 16px 0',
                textWrap: 'balance',
                willChange: 'transform, opacity',
              }}
            >
              Spaces,<br />composed.
            </h1>

            <p
              className="small-label"
              style={{
                color: 'rgba(255, 255, 255, 0.92)',
                letterSpacing: '0.22em',
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                textShadow: '0 2px 12px rgba(27, 25, 22, 0.5)',
                margin: '0 0 24px 0',
              }}
            >
              {media.hero[currentSlide].title} · {media.hero[currentSlide].subtitle}
            </p>

            {/* Interactive Quick Direct Action */}
            <div style={{ pointerEvents: 'auto', display: 'inline-flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => scrollToTarget('#work')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 1)',
                  color: '#1B1916',
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                }}
              >
                View Selected Work →
              </button>
            </div>
          </div>
        </div>

        {/* ── Slide Counter: "01 / 03" in Manrope Light Tabular ── */}
        <div
          style={{
            position: 'absolute',
            left: 'clamp(24px, 5vw, 64px)',
            bottom: 'clamp(28px, 5vw, 56px)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            className="tabular-nums slide-counter"
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.18em',
              color: 'rgba(255, 255, 255, 0.92)',
              textShadow: '0 1px 8px rgba(0,0,0,0.4)',
            }}
          >
            {media.hero[currentSlide].number} / 03
          </div>
          <div
            style={{
              width: '36px',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${((currentSlide + 1) / media.hero.length) * 100}%`,
                backgroundColor: '#A98852',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* ── Bottom Right: Glass "Scroll" Cue ── */}
        <button
          type="button"
          onClick={() => scrollToTarget('#statement')}
          aria-label="Scroll to next section"
          style={{
            position: 'absolute',
            right: 'clamp(24px, 5vw, 64px)',
            bottom: 'clamp(28px, 5vw, 56px)',
            zIndex: 20,
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '999px',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#A98852',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            Scroll
          </span>
        </button>
      </div>
    </section>
  );
}
