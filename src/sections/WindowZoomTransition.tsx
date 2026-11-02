import { media } from '../data/media';

interface WindowZoomProps {
  isActive?: boolean;
}

export default function WindowZoomTransition({ isActive = false }: WindowZoomProps) {
  return (
    <section
      id="doorway"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#F8F5EF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Atmospheric Architectural Backdrop (Preserves Glassy Depth) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.16,
          filter: 'blur(16px)',
          transform: 'scale(1.06)',
          pointerEvents: 'none',
        }}
      >
        <img
          src={media.doorway.image}
          alt="Architectural space backdrop"
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

      {/* ── Background Subtle Architectural Grid Datum ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'radial-gradient(#1B1916 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating Center Narrative Label ── */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(36px, 7vh, 72px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          textAlign: 'center',
          pointerEvents: 'none',
          width: 'calc(100% - 48px)',
        }}
      >
        <span
          style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#A98852',
            display: 'inline-block',
            marginBottom: '8px',
          }}
        >
          Spatial Threshold
        </span>
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 300,
            color: '#1B1916',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Step Through the <span style={{ fontStyle: 'italic', color: '#A98852' }}>Portal</span>
        </h2>
      </div>

      {/* ── Iconic Architectural Arch Portal Window (Zooms Deep Inside) ── */}
      <div
        style={{
          width: 'clamp(280px, 32vw, 500px)',
          height: 'clamp(380px, 46vw, 680px)',
          borderRadius: '260px 260px 24px 24px',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(60, 45, 20, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          border: '3px solid rgba(255, 255, 255, 0.95)',
          position: 'relative',
          willChange: 'transform',
          transform: isActive ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="portal-arch-window"
      >
        <img
          src={media.doorway.image}
          alt={media.doorway.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 50%',
            transform: isActive ? 'scale(1.15)' : 'scale(1.02)',
            transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          loading="lazy"
        />

        {/* Ambient interior light overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(169, 136, 82, 0.1) 0%, rgba(27, 25, 22, 0.4) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Inner Arch Brass Profile Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '250px 250px 16px 16px',
            border: '1px solid rgba(169, 136, 82, 0.65)',
            pointerEvents: 'none',
          }}
        />

        {/* Centered Invitation on the Portal Glass */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 4vh, 44px)',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#FFFFFF',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(24px, 2.8vw, 38px)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              margin: 0,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            {media.doorway.caption}
          </p>
          <div
            style={{
              width: '28px',
              height: '1px',
              backgroundColor: '#A98852',
              margin: '10px auto 0 auto',
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    </section>
  );
}
