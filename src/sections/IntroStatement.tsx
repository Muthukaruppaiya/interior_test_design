import { useEffect, useRef } from 'react';
import { media } from '../data/media';
import { scrollToTarget } from '../hooks/useLenis';
import { gsap } from '../lib/gsap';

export default function IntroStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const sentenceRef = useRef<HTMLHeadingElement>(null);
  const floatImg1Ref = useRef<HTMLDivElement>(null);
  const floatImg2Ref = useRef<HTMLDivElement>(null);

  const words = ['We', 'design', 'homes', 'that', 'feel', 'inevitable.'];

  useEffect(() => {
    const section = sectionRef.current;
    const sentence = sentenceRef.current;
    if (!section || !sentence) return;

    const ctx = gsap.context(() => {
      // 1. Scrub word-by-word opacity from 0.15 to 1.0
      const wordSpans = sentence.querySelectorAll('.statement-word');
      gsap.fromTo(
        wordSpans,
        { opacity: 0.15, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'center 40%',
            scrub: true,
          },
        }
      );

      // 2. Floating Image 1 parallax drift (left, speed 0.2)
      if (floatImg1Ref.current) {
        gsap.to(floatImg1Ref.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 3. Floating Image 2 parallax drift (right, speed 0.45)
      if (floatImg2Ref.current) {
        gsap.to(floatImg2Ref.current, {
          y: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statement"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '100vh',
        backgroundColor: '#F8F5EF',
        padding: '0 clamp(24px, 5vw, 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Floating Accent Image 1 (Left) */}
      <div
        ref={floatImg1Ref}
        style={{
          position: 'absolute',
          left: 'clamp(16px, 4vw, 60px)',
          top: '25%',
          width: 'clamp(120px, 16vw, 220px)',
          aspectRatio: '4 / 5',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(60, 45, 20, 0.08)',
          display: 'none',
          zIndex: 1,
        }}
        className="statement-floating-left luxury-image-wrapper"
      >
        <img
          src={media.statement.floating1}
          alt="Architectural travertine and marble detail"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>

      {/* Floating Accent Image 2 (Right) */}
      <div
        ref={floatImg2Ref}
        style={{
          position: 'absolute',
          right: 'clamp(16px, 4vw, 60px)',
          bottom: '20%',
          width: 'clamp(140px, 18vw, 240px)',
          aspectRatio: '4 / 5',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(60, 45, 20, 0.08)',
          display: 'none',
          zIndex: 1,
        }}
        className="statement-floating-right luxury-image-wrapper"
      >
        <img
          src={media.statement.floating2}
          alt="Natural fluted wood joinery in morning light"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>

      {/* Central Editorial Container */}
      <div
        style={{
          maxWidth: '1080px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="small-label" style={{ marginBottom: '28px', color: '#A98852' }}>
          Philosophy
        </div>

        <h2
          ref={sentenceRef}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(40px, 6.2vw, 96px)',
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#1B1916',
            margin: '0 0 40px 0',
            textWrap: 'balance',
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="statement-word"
              style={{
                display: 'inline-block',
                marginRight: '0.24em',
                transition: 'opacity 0.2s ease',
              }}
            >
              {w}
            </span>
          ))}
        </h2>

        {/* Tiny "About the studio" link */}
        <a
          href="#process"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget('#process');
          }}
          className="luxury-link"
          style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#8C8272',
          }}
        >
          About the studio →
        </a>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .statement-floating-left,
          .statement-floating-right {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
