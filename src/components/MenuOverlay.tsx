import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { scrollToTarget } from '../hooks/useLenis';
import { media } from '../data/media';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  number: string;
  label: string;
  target: string;
  previewImage: string;
  tagline: string;
}

const menuItems: MenuItem[] = [
  {
    number: '01',
    label: 'Home',
    target: '#hero',
    previewImage: media.hero[0].image,
    tagline: 'Spaces, composed in Chennai.',
  },
  {
    number: '02',
    label: 'Selected Work',
    target: '#work',
    previewImage: media.selectedWork[0].image,
    tagline: 'Bespoke residences and private villas.',
  },
  {
    number: '03',
    label: 'The Process',
    target: '#process',
    previewImage: media.process[1].image,
    tagline: 'Imagine. Design. Craft. Deliver.',
  },
  {
    number: '04',
    label: 'The Studio',
    target: '#studio',
    previewImage: media.doorway.image,
    tagline: '11+ years, 600+ homes, 45-day handover.',
  },
  {
    number: '05',
    label: 'Materials',
    target: '#materials',
    previewImage: media.atelier[1].image,
    tagline: 'Tactile architectural moodboard.',
  },
  {
    number: '06',
    label: 'Contact',
    target: '#contact',
    previewImage: media.selectedWork[2].image,
    tagline: 'Begin your design journey.',
  },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        backgroundColor: 'rgba(248, 245, 239, 0.96)',
        backdropFilter: 'blur(32px) saturate(160%)',
        WebkitBackdropFilter: 'blur(32px) saturate(160%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 4vh, 48px) clamp(24px, 5vw, 80px)',
        overflowY: 'auto',
      }}
    >
      {/* Top Bar with Brand & Close Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <span
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '24px',
            fontWeight: 300,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#1B1916',
          }}
        >
          SIRIZ
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(169, 136, 82, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A98852')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)')}
        >
          <X size={20} color="#1B1916" />
        </button>
      </div>

      {/* Main Split Grid (Links on Left, Image Preview on Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
          margin: 'clamp(32px, 5vh, 64px) 0',
        }}
      >
        {/* Navigation Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vh, 24px)' }}>
          {menuItems.map((item) => (
            <a
              key={item.number}
              href={item.target}
              onClick={(e) => {
                e.preventDefault();
                onClose();
                scrollToTarget(item.target);
              }}
              onMouseEnter={() => setActiveItem(item)}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
                color: activeItem.number === item.number ? '#1B1916' : '#8C8272',
                transition: 'color 0.25s ease, transform 0.25s ease',
              }}
              onFocus={() => setActiveItem(item)}
            >
              <span
                className="tabular-nums"
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '12px',
                  fontWeight: 300,
                  letterSpacing: '0.2em',
                  color: '#A98852',
                }}
              >
                {item.number}
              </span>

              <span
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 'clamp(36px, 5vw, 76px)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Right Hover Image Preview */}
        <div
          style={{
            display: 'none',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="menu-image-preview-col"
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              aspectRatio: '4 / 3',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(60, 45, 20, 0.1)',
              marginBottom: '16px',
              backgroundColor: '#EEE8DD',
            }}
            className="luxury-image-wrapper"
          >
            <img
              src={activeItem.previewImage}
              alt={activeItem.label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>
          <div
            className="small-label"
            style={{
              color: '#8C8272',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'none',
            }}
          >
            {activeItem.tagline}
          </div>
        </div>
      </div>

      {/* Bottom Coordinates */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid rgba(169, 136, 82, 0.15)',
          fontSize: '11px',
          fontFamily: '"Manrope", sans-serif',
          color: '#8C8272',
          letterSpacing: '0.15em',
        }}
      >
        <span>CHENNAI · MEDAVAKKAM</span>
        <span>+91 93845 77177</span>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .menu-image-preview-col {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
