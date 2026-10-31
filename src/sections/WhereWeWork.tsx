import { useState } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { scrollToTarget } from '../hooks/useLenis';

interface LocationPin {
  id: string;
  name: string;
  cluster: string;
  projects: string;
  count: number;
  x: number; // percentage
  y: number; // percentage
  highlight?: boolean;
}

const locations: LocationPin[] = [
  {
    id: 'medavakkam',
    name: 'Medavakkam',
    cluster: 'Studio & Factory Headquarters',
    projects: 'Siriz Flagship Joinery Plant & Atelier',
    count: 140,
    x: 58,
    y: 54,
    highlight: true,
  },
  {
    id: 'omr',
    name: 'OMR Corridor',
    cluster: 'IT Corridor Luxury Towers',
    projects: 'Penthouse Residences & Duplexes',
    count: 185,
    x: 68,
    y: 62,
  },
  {
    id: 'velachery',
    name: 'Velachery',
    cluster: 'South Chennai Residences',
    projects: 'Contemporary Apartments & Modular Kitchens',
    count: 95,
    x: 54,
    y: 45,
  },
  {
    id: 'adyar',
    name: 'Adyar & Besant Nagar',
    cluster: 'Coastal Prime Heritage',
    projects: 'High-End Turnkey Villas & Bespoke Wardrobes',
    count: 62,
    x: 64,
    y: 38,
  },
  {
    id: 'anna-nagar',
    name: 'Anna Nagar',
    cluster: 'North-West Chennai Avenues',
    projects: 'Luxury Bungalow Fit-Outs & Sacred Spaces',
    count: 58,
    x: 44,
    y: 26,
  },
  {
    id: 'tambaram',
    name: 'Tambaram',
    cluster: 'South Gateway Residences',
    projects: 'Independent Villa Communities',
    count: 48,
    x: 42,
    y: 68,
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore & Rest of TN',
    cluster: 'Industrial & Estate Living',
    projects: 'Sprawling Farmhouses & Signature Fit-outs',
    count: 36,
    x: 22,
    y: 84,
  },
];

const marqueeLocalities = [
  'MEDAVAKKAM', 'OMR', 'VELACHERY', 'ADYAR', 'ANNA NAGAR', 'ECR', 'BOAT CLUB', 'POES GARDEN',
  'TAMBARAM', 'NUNGAMBAKKAM', 'KILPAUK', 'MYLAPORE', 'SHOLINGANALLUR', 'PERUNGUDI', 'COIMBATORE'
];

export default function WhereWeWork() {
  const [activePin, setActivePin] = useState<LocationPin>(locations[0]);

  return (
    <section
      id="locations"
      style={{
        position: 'relative',
        padding: '120px 48px 60px',
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
            marginBottom: '48px',
            paddingBottom: '20px',
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
              (05) Territorial Reach
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
              Where We <span style={{ fontStyle: 'italic', color: '#B08D57' }}>Craft</span>
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
            From our Medavakkam joinery plant, our installation crews operate across all premier residential corridors of Chennai and Tamil Nadu.
          </div>
        </div>

        {/* Map Stage Canvas */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '560px',
            borderRadius: '24px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(176, 141, 87, 0.25)',
            boxShadow: '0 25px 60px rgba(60, 45, 20, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="map-canvas-container"
        >
          {/* Stylized Light Cartographic Background with Watermark SVG */}
          <svg
            viewBox="0 0 1000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.85,
              pointerEvents: 'none',
            }}
          >
            {/* Grid Coordinates */}
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(176, 141, 87, 0.08)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="1000" height="600" fill="url(#gridPattern)" />

            {/* Stylized Tamil Nadu & Chennai Coastline Contour */}
            <path
              d="M 220 500 Q 280 440 380 400 Q 520 360 560 300 Q 600 240 680 160 Q 720 110 750 40"
              stroke="#B08D57"
              strokeWidth="2"
              strokeDasharray="4 6"
              fill="none"
              opacity="0.35"
            />
            {/* Bay of Bengal subtle label */}
            <text x="780" y="280" fill="rgba(176, 141, 87, 0.25)" fontFamily="Cormorant Garamond" fontSize="24" letterSpacing="0.2em">
              BAY OF BENGAL
            </text>
            <text x="320" y="480" fill="rgba(28, 26, 23, 0.12)" fontFamily="Inter" fontSize="12" letterSpacing="0.3em">
              TAMIL NADU CORRIDOR
            </text>

            {/* Radial Concentric Circles centered around Medavakkam Flagship */}
            <circle cx="580" cy="324" r="70" stroke="rgba(176, 141, 87, 0.15)" strokeWidth="1" fill="none" />
            <circle cx="580" cy="324" r="140" stroke="rgba(176, 141, 87, 0.1)" strokeWidth="1" fill="none" strokeDasharray="2 4" />
            <circle cx="580" cy="324" r="210" stroke="rgba(176, 141, 87, 0.06)" strokeWidth="1" fill="none" />
          </svg>

          {/* Interactive Brass Pins */}
          {locations.map((loc) => {
            const isSelected = activePin.id === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => setActivePin(loc)}
                onMouseEnter={() => setActivePin(loc)}
                style={{
                  position: 'absolute',
                  top: `${loc.y}%`,
                  left: `${loc.x}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 30 : 15,
                }}
              >
                {/* Pulsing beacon ring */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isSelected ? '44px' : '28px',
                    height: isSelected ? '44px' : '28px',
                    borderRadius: '50%',
                    backgroundColor: loc.highlight ? 'rgba(176, 141, 87, 0.25)' : 'rgba(28, 26, 23, 0.08)',
                    border: `1px solid ${loc.highlight ? '#B08D57' : 'rgba(176, 141, 87, 0.4)'}`,
                    animation: isSelected ? 'pulseRing 2s infinite' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                />

                {/* Brass Core Pin */}
                <div
                  style={{
                    position: 'relative',
                    width: loc.highlight ? '18px' : '12px',
                    height: loc.highlight ? '18px' : '12px',
                    borderRadius: '50%',
                    backgroundColor: isSelected || loc.highlight ? '#B08D57' : '#1C1A17',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0 4px 12px rgba(60, 45, 20, 0.25)',
                    transition: 'transform 0.2s',
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                  }}
                />

                {/* Pin Permanent Label */}
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '6px',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: isSelected ? 700 : 500,
                    letterSpacing: '0.08em',
                    color: isSelected ? '#B08D57' : '#1C1A17',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(176, 141, 87, 0.2)',
                  }}
                >
                  {loc.name}
                </div>
              </div>
            );
          })}

          {/* Floating Glass Tooltip Card for Active Location */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '32px',
              maxWidth: '380px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px) saturate(140%)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 20px 45px rgba(60, 45, 20, 0.1)',
              zIndex: 40,
            }}
            className="map-info-card"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="#B08D57" />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#B08D57',
                  }}
                >
                  {activePin.name}
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1C1A17',
                  backgroundColor: 'rgba(176, 141, 87, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                {activePin.count}+ Homes
              </span>
            </div>

            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '22px',
                fontWeight: 500,
                color: '#1C1A17',
                marginBottom: '6px',
              }}
            >
              {activePin.cluster}
            </div>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'rgba(28, 26, 23, 0.7)',
                lineHeight: 1.5,
                margin: '0 0 16px 0',
              }}
            >
              {activePin.projects}
            </p>

            <button
              type="button"
              onClick={() => scrollToTarget('#consultation')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#B08D57',
                padding: 0,
              }}
            >
              <span>Schedule site consultation</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Locality Marquee Band Scrolling Underneath */}
        <div
          style={{
            marginTop: '40px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '16px 0',
            borderTop: '1px solid rgba(176, 141, 87, 0.15)',
            borderBottom: '1px solid rgba(176, 141, 87, 0.15)',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              animation: 'marqueeText 35s linear infinite',
            }}
          >
            {[...marqueeLocalities, ...marqueeLocalities].map((loc, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '24px',
                  marginRight: '24px',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '20px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: 'rgba(28, 26, 23, 0.55)',
                }}
              >
                <span>{loc}</span>
                <span style={{ color: '#B08D57', fontSize: '14px' }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
