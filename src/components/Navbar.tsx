import { useState, useEffect } from 'react';
import { scrollToTarget } from '../hooks/useLenis';

interface NavbarProps {
  onOpenMenu: () => void;
  activeSlide?: number;
}

export default function Navbar({ onOpenMenu, activeSlide = 0 }: NavbarProps) {
  const [activeTab, setActiveTab] = useState<'work' | 'process' | 'studio' | 'contact'>('work');

  // Sync activeTab with activeSlide
  useEffect(() => {
    if (activeSlide === 2) setActiveTab('work');
    else if (activeSlide === 4) setActiveTab('process');
    else if (activeSlide === 5) setActiveTab('studio');
    else if (activeSlide === 8) setActiveTab('contact');
  }, [activeSlide]);

  const navLinks = [
    { id: 'work', label: 'Work', target: '#work' },
    { id: 'process', label: 'Process', target: '#process' },
    { id: 'studio', label: 'Studio', target: '#studio' },
    { id: 'contact', label: 'Contact', target: '#contact' },
  ] as const;

  return (
    <header
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '999px',
        zIndex: 9000,
        boxSizing: 'border-box',
        // Ultra-luxurious liquid frosted glass capsule
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.42) 100%)',
        backdropFilter: 'blur(32px) saturate(190%) contrast(105%)',
        WebkitBackdropFilter: 'blur(32px) saturate(190%) contrast(105%)',
        border: '1px solid rgba(255, 255, 255, 0.95)',
        boxShadow:
          '0 16px 42px rgba(27, 25, 22, 0.08), inset 0 1px 1.5px rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(169, 136, 82, 0.12)',
      }}
      className="site-navbar-stable"
    >
      <nav
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
        className="navbar-inner-nav"
      >
        {/* Left: Official Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget('#hero');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            userSelect: 'none',
            height: '100%',
          }}
        >
          <img
            src="/logo.png"
            alt="Siriz Interiors"
            style={{
              height: 'clamp(26px, 3.8vh, 34px)',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 2px 6px rgba(169, 136, 82, 0.12))',
            }}
          />
        </a>

        {/* Center: Desktop Navigation Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'clamp(16px, 2.5vw, 36px)',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className="navbar-desktop-links"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.target}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(link.id);
                scrollToTarget(link.target);
              }}
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '11px',
                fontWeight: activeTab === link.id ? 600 : 400,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: activeTab === link.id ? '#1B1916' : '#8C8272',
                position: 'relative',
                padding: '6px 2px',
                transition: 'color 0.25s ease',
              }}
            >
              {link.label}
              {activeTab === link.id && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: '#A98852',
                    borderRadius: '1px',
                  }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right: Enquire Pill (Desktop Only) & Clean Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Enquire Glass Pill (Hidden on Mobile to keep header uncluttered) */}
          <button
            type="button"
            onClick={() => scrollToTarget('#contact')}
            style={{
              alignItems: 'center',
              gap: '8px',
              height: '38px',
              padding: '0 18px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(169, 136, 82, 0.35)',
              boxShadow: '0 4px 14px rgba(60, 45, 20, 0.04)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            className="navbar-enquire-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#A98852';
              const text = e.currentTarget.querySelector('.enquire-text') as HTMLElement | null;
              if (text) text.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
              const text = e.currentTarget.querySelector('.enquire-text') as HTMLElement | null;
              if (text) text.style.color = '#1B1916';
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#A98852',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(169, 136, 82, 0.6)',
              }}
            />
            <span
              className="enquire-text"
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#1B1916',
                transition: 'color 0.2s ease',
              }}
            >
              Enquire
            </span>
          </button>

          {/* Minimal Menu Trigger (Refined rounded capsule pill matching reference) */}
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            style={{
              padding: '0 clamp(16px, 2vw, 22px)',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 2px 10px rgba(27, 25, 22, 0.06)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
            }}
            className="navbar-menu-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAF8F5';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#1B1916',
              }}
            >
              Menu
            </span>
          </button>
        </div>
      </nav>

      {/* Responsive Styles */}
      <style>{`
        /* Desktop Defaults */
        .site-navbar-stable {
          top: 20px;
          width: min(1140px, calc(100% - 32px));
          height: 58px;
        }
        .navbar-inner-nav {
          padding: 0 clamp(16px, 3vw, 28px);
        }
        .navbar-logo-text {
          font-size: 24px;
        }
        .navbar-enquire-btn {
          display: inline-flex;
        }
        .navbar-menu-btn {
          height: 38px;
        }

        /* Mobile Adjustments (Sleek, Uncrowded, Luxury) */
        @media (max-width: 767px) {
          .site-navbar-stable {
            top: 14px !important;
            width: calc(100% - 24px) !important;
            height: 48px !important;
          }
          .navbar-inner-nav {
            padding: 0 16px !important;
          }
          .navbar-logo-text {
            font-size: 20px !important;
          }
          .navbar-enquire-btn {
            display: none !important; /* Hide bulky duplicate enquire button on mobile */
          }
          .navbar-menu-btn {
            height: 34px !important;
            padding: 0 14px !important;
          }
        }

        @media (min-width: 768px) {
          .navbar-desktop-links {
            display: flex !important;
          }
          .navbar-city-tag {
            display: inline-block !important;
          }
        }
      `}</style>
    </header>
  );
}
