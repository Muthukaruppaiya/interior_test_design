import { useState, useEffect, type FormEvent } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ArrowRight, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const propertyTypes = ['1 BHK', '2 BHK', '3 BHK', '4 BHK / Duplex', 'Penthouse / Villa', 'Commercial'];
const styles = ['Modern Luxury', 'Warm Minimalist', 'Contemporary Architectural', 'Traditional Fusion'];

export default function ConsultationSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('3 BHK');
  const [selectedStyle, setSelectedStyle] = useState('Modern Luxury');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live Chennai Local Time (Asia/Kolkata timezone)
  const [chennaiTime, setChennaiTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setChennaiTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#B08D57', '#94713E', '#F7F3EC'],
        });
      } catch (err) {
        // Fallback gracefully
      }

      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setPhone('');
        setEmail('');
      }, 7000);
    }, 1200);
  };

  return (
    <section
      id="consultation"
      style={{
        position: 'relative',
        padding: '140px 48px',
        backgroundColor: '#F7F3EC',
        borderTop: '1px solid rgba(176, 141, 87, 0.2)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '64px',
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
              (11) Private Consultation
            </div>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(40px, 6.5vw, 84px)',
                fontWeight: 400,
                color: '#1C1A17',
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Let’s design <span style={{ fontStyle: 'italic', color: '#B08D57' }}>your home.</span>
            </h2>
          </div>

          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'rgba(28, 26, 23, 0.65)',
              maxWidth: '380px',
              lineHeight: 1.6,
            }}
          >
            Meet our senior architects at our Medavakkam studio or reserve an on-site spatial feasibility session.
          </div>
        </div>

        {/* Consultation Layout Split: Form on Left, Studio Office Card on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
            gap: '48px',
            alignItems: 'start',
          }}
          className="consultation-split-grid"
        >
          {/* Form Glass Panel */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(24px) saturate(140%)',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 25px 60px rgba(60, 45, 20, 0.08)',
              position: 'relative',
            }}
          >
            {isSuccess ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 24px',
                  animation: 'fadeIn 0.5s ease',
                }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(176, 141, 87, 0.15)',
                    border: '2px solid #B08D57',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <Check size={32} color="#B08D57" />
                </div>

                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '36px',
                    fontWeight: 500,
                    color: '#1C1A17',
                    margin: '0 0 12px 0',
                  }}
                >
                  Interest Registered
                </h3>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    color: 'rgba(28, 26, 23, 0.75)',
                    maxWidth: '480px',
                    margin: '0 auto 24px',
                    lineHeight: 1.6,
                  }}
                >
                  Thank you, <strong>{name}</strong>. Our senior design associate has received your request and will reach out via WhatsApp and phone within 2 hours with spatial planning options.
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                    color: '#B08D57',
                    fontWeight: 600,
                  }}
                >
                  <Sparkles size={14} />
                  <span>Siriz Atelier Reference: #{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* Property Type Pills */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#B08D57',
                      marginBottom: '12px',
                    }}
                  >
                    1. Select Property Configuration
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {propertyTypes.map((type) => {
                      const isSel = selectedProperty === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedProperty(type)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '999px',
                            border: isSel ? '1px solid #B08D57' : '1px solid rgba(176, 141, 87, 0.25)',
                            backgroundColor: isSel ? '#B08D57' : 'rgba(255, 255, 255, 0.7)',
                            color: isSel ? '#FFFFFF' : '#1C1A17',
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Style */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#B08D57',
                      marginBottom: '12px',
                    }}
                  >
                    2. Preferred Aesthetic Direction
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {styles.map((st) => {
                      const isSel = selectedStyle === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setSelectedStyle(st)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '999px',
                            border: isSel ? '1px solid #B08D57' : '1px solid rgba(176, 141, 87, 0.25)',
                            backgroundColor: isSel ? '#B08D57' : 'rgba(255, 255, 255, 0.7)',
                            color: isSel ? '#FFFFFF' : '#1C1A17',
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Floating-Style Input Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div>
                    <label
                      htmlFor="client-name"
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(28, 26, 23, 0.7)',
                        marginBottom: '6px',
                      }}
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      placeholder="e.g. Anand Sundaram"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: '1px solid rgba(176, 141, 87, 0.3)',
                        backgroundColor: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#1C1A17',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-phone"
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(28, 26, 23, 0.7)',
                        marginBottom: '6px',
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      placeholder="+91 98400 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: '1px solid rgba(176, 141, 87, 0.3)',
                        backgroundColor: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#1C1A17',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="client-email"
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(28, 26, 23, 0.7)',
                      marginBottom: '6px',
                    }}
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1px solid rgba(176, 141, 87, 0.3)',
                      backgroundColor: '#FFFFFF',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#1C1A17',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* WhatsApp Updates Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={whatsappUpdates}
                    onChange={(e) => setWhatsappUpdates(e.target.checked)}
                    style={{ accentColor: '#B08D57', width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', color: 'rgba(28, 26, 23, 0.75)' }}>
                    Receive 3D floor plan options & estimates directly on WhatsApp
                  </span>
                </label>

                {/* Magnetic Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '16px 36px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #B08D57 0%, #94713E 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 10px 30px rgba(176, 141, 87, 0.35)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 14px 36px rgba(176, 141, 87, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(176, 141, 87, 0.35)';
                  }}
                >
                  <span>{isSubmitting ? 'Registering With Studio...' : 'Register Your Interest'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Studio Office Card with LIVE Chennai Local Time (Yodezeen-Style) */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '44px 36px',
              border: '1px solid rgba(176, 141, 87, 0.3)',
              boxShadow: '0 20px 45px rgba(60, 45, 20, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            className="studio-contact-card"
          >
            <div>
              {/* Live Chennai Time Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(247, 243, 236, 0.8)',
                  border: '1px solid rgba(176, 141, 87, 0.25)',
                  marginBottom: '28px',
                }}
              >
                <Clock size={13} color="#B08D57" />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#1C1A17',
                  }}
                >
                  Chennai Local Time:
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#B08D57',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {chennaiTime || '14:30 PM IST'}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B08D57',
                  marginBottom: '6px',
                }}
              >
                Siriz Interiors Pvt Ltd
              </div>

              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '32px',
                  fontWeight: 500,
                  color: '#1C1A17',
                  margin: '0 0 20px 0',
                }}
              >
                Chennai Studio & Atelier
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} color="#B08D57" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: 'rgba(28, 26, 23, 0.8)', lineHeight: 1.5 }}>
                    5th Main Road, Sivagami Street,<br />
                    Pearl Flora Building, Medavakkam,<br />
                    Chennai 600100, Tamil Nadu
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={18} color="#B08D57" style={{ flexShrink: 0 }} />
                  <a
                    href="tel:+918438423938"
                    style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: '#1C1A17',
                      textDecoration: 'none',
                    }}
                  >
                    +91 84384 23938
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MessageSquare size={18} color="#B08D57" style={{ flexShrink: 0 }} />
                  <a
                    href="https://wa.me/919384577177"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: '#1C1A17',
                      textDecoration: 'none',
                    }}
                  >
                    WhatsApp: +91 93845 77177
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{
                paddingTop: '20px',
                borderTop: '1px solid rgba(176, 141, 87, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif', color: 'rgba(28, 26, 23, 0.5)' }}>
                Atelier Hours: Mon – Sat, 9:30 AM – 7:30 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
