import { media } from '../data/media';

export default function SingleTestimonial() {
  return (
    <section
      id="testimonial"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(24px, 5vw, 64px)',
        overflow: 'hidden',
        backgroundColor: '#F8F5EF',
        boxSizing: 'border-box',
      }}
    >
      {/* Soft Blurred Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          filter: 'blur(20px)',
          transform: 'scale(1.08)',
          pointerEvents: 'none',
        }}
      >
        <img
          src={media.testimonialBackdrop}
          alt="Serene architectural interior"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>

      {/* ── Centered Frosted Glass Card ── */}
      <div
        className="glass-card"
        style={{
          maxWidth: '920px',
          width: '100%',
          padding: 'clamp(40px, 6vw, 72px) clamp(28px, 5vw, 64px)',
          borderRadius: '28px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Five Warm Brass Stars */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            marginBottom: '28px',
            color: '#A98852',
            fontSize: '14px',
            letterSpacing: '0.1em',
          }}
        >
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        {/* The Quote in Cormorant Garamond */}
        <blockquote
          style={{
            margin: '0 0 32px 0',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(26px, 3.4vw, 46px)',
            fontWeight: 300,
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            color: '#1B1916',
            textWrap: 'balance',
          }}
        >
          “One of the best architects who listens to the client's preferences and enhances it to the current trend.”
        </blockquote>

        {/* Client Attribution */}
        <div
          className="small-label"
          style={{
            color: '#8C8272',
            fontSize: '11px',
            letterSpacing: '0.24em',
          }}
        >
          Ganesh Anand C &nbsp;·&nbsp; Chennai Homeowner
        </div>
      </div>
    </section>
  );
}
