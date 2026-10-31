import { useState, useRef, useEffect, type FormEvent } from 'react';
import { ArrowUp, CheckCircle2 } from 'lucide-react';
import { scrollToTarget } from '../hooks/useLenis';
import { gsap } from '../lib/gsap';
import { sendLead } from '../lib/leads';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: 'Villa',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Parallax upward motion on the giant outlined wordmark
  useEffect(() => {
    const footer = footerRef.current;
    const wordmark = wordmarkRef.current;
    if (!footer || !wordmark) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmark,
        { y: 80, opacity: 0.4 },
        {
          y: -40,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setPhoneError('');

    sendLead({
      name: formData.name || 'Anonymous Client',
      phone: cleanPhone,
      source: 'consultation_form',
      propertyType: formData.propertyType,
    });

    setIsSubmitted(true);
  };

  const propertyTypes = ['Villa', 'Apartment', 'Penthouse', 'Commercial'];

  return (
    <footer
      id="contact"
      ref={footerRef}
      style={{
        position: 'relative',
        backgroundColor: '#F8F5EF',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 4vh, 48px) clamp(20px, 4vw, 48px) 16px',
        overflowY: 'auto',
        borderTop: '1px solid rgba(169, 136, 82, 0.2)',
        boxSizing: 'border-box',
        scrollbarWidth: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* ── 1. Contact CTA Section ── */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(20px, 3vh, 36px)',
          }}
        >
          <div className="small-label" style={{ marginBottom: '24px', color: '#A98852' }}>
            Inquiries
          </div>

          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(48px, 7.5vw, 116px)',
              fontWeight: 300,
              lineHeight: 0.95,
              color: '#1B1916',
              letterSpacing: '-0.025em',
              margin: '0 0 40px 0',
              textWrap: 'balance',
            }}
          >
            Let's design<br />your home.
          </h2>

          {/* Consultation Button or Expanding Glass Form */}
          {!isFormOpen ? (
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(169, 136, 82, 0.45)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 12px 36px rgba(60, 45, 20, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#A98852';
                const span = e.currentTarget.querySelector('.btn-text') as HTMLElement | null;
                if (span) span.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
                const span = e.currentTarget.querySelector('.btn-text') as HTMLElement | null;
                if (span) span.style.color = '#1B1916';
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#A98852',
                  display: 'inline-block',
                }}
              />
              <span
                className="btn-text"
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#1B1916',
                  transition: 'color 0.25s ease',
                }}
              >
                Book a free consultation
              </span>
            </button>
          ) : isSubmitted ? (
            <div
              className="glass-card"
              style={{
                maxWidth: '540px',
                margin: '0 auto',
                padding: '40px',
                borderRadius: '24px',
                textAlign: 'center',
              }}
            >
              <CheckCircle2 size={40} color="#A98852" style={{ margin: '0 auto 16px auto' }} />
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '28px',
                  fontWeight: 300,
                  color: '#1B1916',
                  marginBottom: '8px',
                }}
              >
                Thank You
              </div>
              <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: '14px', color: '#8C8272', margin: 0 }}>
                Our principal designer will connect with you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass-card"
              style={{
                maxWidth: '560px',
                margin: '0 auto',
                padding: 'clamp(28px, 4vw, 44px)',
                borderRadius: '24px',
                textAlign: 'left',
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <label className="small-label" style={{ display: 'block', marginBottom: '8px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sundaram"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(169, 136, 82, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                    color: '#1B1916',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="small-label" style={{ display: 'block', marginBottom: '8px' }}>
                  Mobile Number (India)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(169, 136, 82, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                    color: '#1B1916',
                    boxSizing: 'border-box',
                  }}
                />
                {phoneError && (
                  <div style={{ fontSize: '11px', color: '#B94A48', marginTop: '6px' }}>{phoneError}</div>
                )}
              </div>

              {/* Property Type Pills */}
              <div style={{ marginBottom: '28px' }}>
                <label className="small-label" style={{ display: 'block', marginBottom: '10px' }}>
                  Property Type
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {propertyTypes.map((type) => {
                    const isSelected = formData.propertyType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, propertyType: type })}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '999px',
                          border: isSelected ? '1px solid #A98852' : '1px solid rgba(169, 136, 82, 0.25)',
                          backgroundColor: isSelected ? '#A98852' : 'rgba(255, 255, 255, 0.7)',
                          color: isSelected ? '#FFFFFF' : '#1B1916',
                          fontSize: '11px',
                          fontFamily: '"Manrope", sans-serif',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  borderRadius: '999px',
                  backgroundColor: '#A98852',
                  border: 'none',
                  color: '#FFFFFF',
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(169, 136, 82, 0.3)',
                  transition: 'opacity 0.25s ease',
                }}
              >
                Send Request
              </button>
            </form>
          )}
        </div>

        {/* ── 2. Studio Information Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(20px, 3vw, 40px)',
            marginBottom: 'clamp(16px, 2.5vh, 28px)',
          }}
        >
          {/* Direct Line */}
          <div>
            <div className="small-label" style={{ marginBottom: '12px', color: '#A98852' }}>
              Direct Line
            </div>
            <a
              href="tel:+918438423938"
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '15px',
                color: '#1B1916',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              +91 84384 23938
            </a>
            <a
              href="https://wa.me/919384577177"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '13px',
                color: '#8C8272',
                textDecoration: 'none',
              }}
            >
              WhatsApp: +91 93845 77177
            </a>
          </div>

          {/* Atelier Address */}
          <div>
            <div className="small-label" style={{ marginBottom: '12px', color: '#A98852' }}>
              Atelier & Studio
            </div>
            <address
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#8C8272',
                fontStyle: 'normal',
              }}
            >
              5th Main Road, Sivagami Street,<br />
              Pearl Flora Building, Medavakkam,<br />
              Chennai 600100, India
            </address>
          </div>

          {/* Social */}
          <div>
            <div className="small-label" style={{ marginBottom: '12px', color: '#A98852' }}>
              Follow
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://instagram.com/sirizinteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-link"
                style={{ fontSize: '12px' }}
              >
                Instagram ↗
              </a>
              <a
                href="https://youtube.com/@sirizinteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-link"
                style={{ fontSize: '12px' }}
              >
                YouTube ↗
              </a>
            </div>
          </div>

          {/* Scroll to Top */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
            <button
              type="button"
              onClick={() => scrollToTarget('#hero')}
              aria-label="Scroll back to top"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(169, 136, 82, 0.35)',
                backdropFilter: 'blur(16px)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#A98852';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ArrowUp size={18} color="#1B1916" />
            </button>
          </div>
        </div>

        {/* ── 3. Giant Outlined SIRIZ Wordmark (Parallax Curtain Reveal) ── */}
        <div
          ref={wordmarkRef}
          style={{
            textAlign: 'center',
            userSelect: 'none',
            overflow: 'hidden',
            paddingTop: '20px',
            willChange: 'transform',
          }}
        >
          <div
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(54px, 12vw, 150px)',
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(169, 136, 82, 0.32)',
            }}
          >
            SIRIZ
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '32px',
            borderTop: '1px solid rgba(169, 136, 82, 0.12)',
            fontSize: '11px',
            color: '#8C8272',
            fontFamily: '"Manrope", sans-serif',
            letterSpacing: '0.12em',
          }}
        >
          <span>© {new Date().getFullYear()} SIRIZ INTERIORS PVT LTD</span>
          <span>CURATED IN CHENNAI</span>
        </div>
      </div>
    </footer>
  );
}
