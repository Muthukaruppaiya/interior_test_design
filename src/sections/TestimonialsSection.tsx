import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { testimonials, type Testimonial } from '../data/testimonials';

export default function TestimonialsSection() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featured: Testimonial = testimonials[featuredIndex];

  // Auto-cycle featured quote every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextQuote = () => {
    setFeaturedIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevQuote = () => {
    setFeaturedIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(3, 7);

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        padding: '120px 0',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(176, 141, 87, 0.2)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 48px', marginBottom: '64px' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(176, 141, 87, 0.2)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.24em',
                color: '#B08D57',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              (10) Client Chronicles
            </div>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                fontWeight: 400,
                color: '#1C1A17',
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Words of <span style={{ fontStyle: 'italic', color: '#B08D57' }}>Belonging</span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(247, 243, 236, 0.8)',
                border: '1px solid rgba(176, 141, 87, 0.3)',
                borderRadius: '999px',
                padding: '6px 16px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#1C1A17',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#B08D57' }}>★ 4.9 / 5.0</span>
              <span>• 600+ Google & Private Reviews</span>
            </span>
          </div>
        </div>
      </div>

      {/* Featured Cycling Grand Quote */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 80px', padding: '0 48px' }}>
        <div
          style={{
            position: 'relative',
            background: 'rgba(247, 243, 236, 0.65)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '56px 48px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 25px 60px rgba(60, 45, 20, 0.08)',
          }}
        >
          <Quote
            size={48}
            color="#B08D57"
            style={{ opacity: 0.35, position: 'absolute', top: '36px', right: '48px' }}
          />

          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
            {[...Array(featured.rating)].map((_, i) => (
              <Star key={i} size={18} fill="#B08D57" color="#B08D57" />
            ))}
          </div>

          {/* Quote Text */}
          <blockquote
            key={featured.id}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(26px, 3.2vw, 42px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#1C1A17',
              lineHeight: 1.25,
              margin: '0 0 32px 0',
              animation: 'fadeIn 0.5s ease',
            }}
          >
            "{featured.quote}"
          </blockquote>

          {/* Author Details & Carousel Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(176, 141, 87, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Initials Avatar */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#B08D57',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(176, 141, 87, 0.35)',
                }}
              >
                {featured.initials}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#1C1A17',
                    }}
                  >
                    {featured.author}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '10px',
                      color: '#15803d',
                      backgroundColor: 'rgba(34, 197, 94, 0.12)',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontWeight: 600,
                    }}
                  >
                    <Check size={10} /> Verified Client
                  </span>
                </div>
                <div style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', color: 'rgba(28, 26, 23, 0.6)' }}>
                  {featured.projectType} · {featured.location}
                </div>
              </div>
            </div>

            {/* Prev / Next Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={prevQuote}
                aria-label="Previous quote"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(176, 141, 87, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#1C1A17',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextQuote}
                aria-label="Next quote"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(176, 141, 87, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#1C1A17',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Row Opposite Direction Marquee */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Row 1: Left */}
        <div className="testimonial-marquee-wrap" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div
            style={{
              display: 'inline-flex',
              gap: '24px',
              animation: 'marqueeLeft 40s linear infinite',
            }}
            className="marquee-track"
          >
            {[...row1, ...row1, ...row1].map((review, i) => (
              <div
                key={i}
                style={{
                  width: '380px',
                  whiteSpace: 'normal',
                  background: 'rgba(247, 243, 236, 0.6)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(176, 141, 87, 0.25)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 12px 30px rgba(60, 45, 20, 0.04)',
                  display: 'inline-flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} size={13} fill="#B08D57" color="#B08D57" />
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: '#1C1A17',
                      margin: '0 0 16px 0',
                    }}
                  >
                    "{review.quote}"
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(176, 141, 87, 0.2)',
                      color: '#B08D57',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1C1A17' }}>{review.author}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(28, 26, 23, 0.5)' }}>{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right */}
        <div className="testimonial-marquee-wrap" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div
            style={{
              display: 'inline-flex',
              gap: '24px',
              animation: 'marqueeRight 42s linear infinite',
            }}
            className="marquee-track"
          >
            {[...row2, ...row2, ...row2].map((review, i) => (
              <div
                key={i}
                style={{
                  width: '380px',
                  whiteSpace: 'normal',
                  background: 'rgba(247, 243, 236, 0.6)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(176, 141, 87, 0.25)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 12px 30px rgba(60, 45, 20, 0.04)',
                  display: 'inline-flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} size={13} fill="#B08D57" color="#B08D57" />
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: '#1C1A17',
                      margin: '0 0 16px 0',
                    }}
                  >
                    "{review.quote}"
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(176, 141, 87, 0.2)',
                      color: '#B08D57',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1C1A17' }}>{review.author}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(28, 26, 23, 0.5)' }}>{review.projectType}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
