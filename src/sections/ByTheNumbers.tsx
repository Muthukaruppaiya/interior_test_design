import { useState, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

interface ByTheNumbersProps {
  isActive?: boolean;
}

export default function ByTheNumbers({ isActive = false }: ByTheNumbersProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState({ years: 11, homes: 600, days: 45 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isActive && !hasAnimated.current) {
      hasAnimated.current = true;
      const targets = { years: 0, homes: 0, days: 0 };
      gsap.to(targets, {
        years: 11,
        homes: 600,
        days: 45,
        duration: 2.2,
        ease: 'power3.out',
        onUpdate: () => {
          setCounts({
            years: Math.round(targets.years),
            homes: Math.round(targets.homes),
            days: Math.round(targets.days),
          });
        },
      });
    }
  }, [isActive]);

  const stats = [
    { value: `${counts.years}+`, label: 'Years', sub: 'Of architectural practice' },
    { value: `${counts.homes}+`, label: 'Homes', sub: 'Commissioned across Chennai' },
    { value: `${counts.days}`, label: 'Days', sub: 'Guaranteed turnkey delivery' },
  ];

  return (
    <section
      id="studio"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#F8F5EF',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(20px, 4vw, 56px)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Atmospheric Architectural Backdrop (Preserves Glassy Depth) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.17,
          filter: 'blur(16px)',
          transform: 'scale(1.06)',
          pointerEvents: 'none',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80"
          alt="Architectural atelier backdrop"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248, 245, 239, 0.78) 0%, rgba(248, 245, 239, 0.45) 50%, rgba(248, 245, 239, 0.88) 100%)',
          }}
        />
      </div>

      <div
        className="liquid-glass"
        style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          borderRadius: '32px',
          padding: 'clamp(28px, 4.5vh, 48px) clamp(20px, 3.5vw, 44px)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 24px 60px rgba(27, 25, 22, 0.07), inset 0 1px 1px rgba(255, 255, 255, 1)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="small-label" style={{ textAlign: 'center', marginBottom: '24px', color: '#A98852' }}>
          Atelier Metrics
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'clamp(24px, 4vw, 48px) 16px',
                position: 'relative',
              }}
            >
              {/* Hairline Brass Divider Between Items (Desktop) */}
              {idx > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    height: '60%',
                    width: '1px',
                    backgroundColor: 'rgba(169, 136, 82, 0.25)',
                    display: 'none',
                  }}
                  className="stats-hairline-divider"
                />
              )}

              {/* Number Value in Manrope Light Tabular */}
              <div
                className="tabular-nums stat-number"
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 'clamp(64px, 9.5vw, 160px)',
                  fontWeight: 200,
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  color: '#1B1916',
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  margin: '0 0 16px 0',
                }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 'clamp(22px, 2.5vw, 32px)',
                  fontWeight: 300,
                  color: '#A98852',
                  marginBottom: '6px',
                }}
              >
                {stat.label}
              </div>

              <div
                className="small-label"
                style={{
                  fontSize: '11px',
                  color: '#8C8272',
                  letterSpacing: '0.18em',
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .stats-hairline-divider {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
