import { media } from '../data/media';

export default function AtelierStrip() {
  // Duplicate array to achieve seamless infinite loop
  const items = [...media.atelier, ...media.atelier];

  return (
    <section
      id="materials"
      style={{
        position: 'relative',
        backgroundColor: '#F8F5EF',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          padding: '0 clamp(24px, 5vw, 64px)',
          marginBottom: 'clamp(20px, 3vh, 36px)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <div className="small-label" style={{ color: '#A98852' }}>
          Noble Materials & Finishes
        </div>
        <div className="small-label" style={{ color: '#8C8272' }}>
          Tactile Moodboard
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marqueeLoop 42s linear infinite',
        }}
        className="atelier-marquee-track"
      >
        {items.map((mat, idx) => (
          <div
            key={`${mat.id}-${idx}`}
            data-cursor="drag"
            style={{
              flexShrink: 0,
              width: 'clamp(200px, 22vw, 320px)',
              height: 'clamp(240px, 32vh, 380px)',
              marginRight: 'clamp(16px, 2vw, 28px)',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#EEE8DD',
              boxShadow: '0 16px 40px rgba(60, 45, 20, 0.06)',
              position: 'relative',
              cursor: 'grab',
            }}
            className="luxury-image-wrapper"
          >
            <img
              src={mat.image}
              alt={mat.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeLoop {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .atelier-marquee-track:hover {
          animation-play-state: paused;
        }
        .atelier-marquee-track div:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
