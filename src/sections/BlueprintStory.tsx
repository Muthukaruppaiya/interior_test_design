import { useState, useEffect } from 'react';
import { media } from '../data/media';

export default function BlueprintStory() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle through the 4 words every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % media.process.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="process"
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
          src={media.process[1]?.image || media.selectedWork[1].image}
          alt="Architectural workspace"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248, 245, 239, 0.78) 0%, rgba(248, 245, 239, 0.48) 50%, rgba(248, 245, 239, 0.88) 100%)',
          }}
        />
      </div>

      <div
        className="liquid-glass"
        style={{
          maxWidth: '1240px',
          width: '100%',
          padding: 'clamp(28px, 4.5vh, 52px) clamp(24px, 4vw, 54px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 24px 60px rgba(27, 25, 22, 0.07), inset 0 1px 1px rgba(255, 255, 255, 1)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="small-label" style={{ marginBottom: 'clamp(16px, 2.5vh, 28px)', color: '#A98852' }}>
          Methodology
        </div>

        {/* ── Two Column Editorial Grid (Stacked Words + Pinned Image) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: 4 Huge Words with Single-Line Taglines */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(24px, 4vh, 48px)',
            }}
          >
            {media.process.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.word}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  style={{
                    cursor: 'pointer',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    opacity: isActive ? 1 : 0.22,
                    transform: isActive ? 'translateX(10px)' : 'translateX(0)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: 'clamp(38px, 5vw, 76px)',
                      fontWeight: 300,
                      lineHeight: 0.95,
                      color: '#1B1916',
                      margin: '0 0 8px 0',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.word}.
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Manrope", sans-serif',
                      fontSize: '13.5px',
                      color: isActive ? '#8C8272' : 'transparent',
                      letterSpacing: '0.04em',
                      margin: 0,
                      transition: 'color 0.4s ease',
                      maxWidth: '340px',
                    }}
                  >
                    {item.tagline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Swapping Architectural Visual Frame */}
          <div
            style={{
              width: '100%',
              aspectRatio: '4 / 3.8',
              maxHeight: '60vh',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#EEE8DD',
              boxShadow: '0 24px 60px rgba(60, 45, 20, 0.08)',
              position: 'relative',
            }}
            className="luxury-image-wrapper"
          >
            {media.process.map((item, idx) => (
              <div
                key={item.word}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: activeIdx === idx ? 1 : 0,
                  transform: activeIdx === idx ? 'scale(1)' : 'scale(1.06)',
                  transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'opacity, transform',
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
