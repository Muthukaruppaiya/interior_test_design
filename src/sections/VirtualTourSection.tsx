import { useState, useRef } from 'react';
import { Eye, Compass, RotateCcw, ArrowRight } from 'lucide-react';
import { media } from '../data/media';

interface TourItem {
  id: string;
  name: string;
  tag: string;
  image: string;
  rooms: number;
  sqft: string;
}

export default function VirtualTourSection() {
  const tours = media.virtualTours as TourItem[];
  const [selectedTour, setSelectedTour] = useState<TourItem>(tours[0]);
  const [panX, setPanX] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [startX, setStartX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setStartX(e.clientX - panX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const currentX = e.clientX - startX;
    // Limit panning boundaries
    const boundedX = Math.max(-120, Math.min(120, currentX));
    setPanX(boundedX);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <section
      id="virtual-tour"
      style={{
        position: 'relative',
        padding: '120px 48px',
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
              (07) Spatial Immersion
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
              360° Digital <span style={{ fontStyle: 'italic', color: '#B08D57' }}>Twin Tours</span>
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
            Walk through actual commissioned residences rendered with photorealistic light physics before stepping foot on site.
          </div>
        </div>

        {/* Large Interactive 360 Pan Canvas */}
        <div
          ref={containerRef}
          data-cursor="drag"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            position: 'relative',
            width: '100%',
            height: '560px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(60, 45, 20, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            cursor: isPanning ? 'grabbing' : 'grab',
            backgroundColor: '#1C1A17',
            marginBottom: '40px',
          }}
          className="virtual-tour-viewer"
        >
          {/* Panoramic Image Layer with Horizontal Pan */}
          <img
            src={selectedTour.image}
            alt={selectedTour.name}
            style={{
              position: 'absolute',
              top: 0,
              left: '-20%',
              width: '140%',
              height: '100%',
              objectFit: 'cover',
              transform: `translateX(${panX}px) scale(1.05)`,
              transition: isPanning ? 'none' : 'transform 0.5s ease-out',
              userSelect: 'none',
              filter: 'brightness(0.95)',
            }}
          />

          {/* Glass Top Controls Bar */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              right: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10,
            }}
          >
            {/* Tour Title Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 20px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Compass size={16} color="#B08D57" className="animate-spin-slow" />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1C1A17',
                }}
              >
                {selectedTour.name} · {selectedTour.tag}
              </span>
            </div>

            {/* Rotating 360 Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '999px',
                backgroundColor: 'rgba(176, 141, 87, 0.9)',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(176, 141, 87, 0.4)',
              }}
            >
              <RotateCcw size={14} />
              <span>DRAG TO PAN 360°</span>
            </div>
          </div>

          {/* Interactive Hotspot Marker Pins */}
          <div
            style={{
              position: 'absolute',
              top: '48%',
              left: `calc(45% + ${panX * 0.4}px)`,
              transform: 'translate(-50%, -50%)',
              zIndex: 15,
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid #B08D57',
                boxShadow: '0 0 20px rgba(176, 141, 87, 0.6)',
                cursor: 'pointer',
              }}
            >
              <Eye size={16} color="#B08D57" />
              <div
                style={{
                  position: 'absolute',
                  top: '-32px',
                  whiteSpace: 'nowrap',
                  background: 'rgba(28, 26, 23, 0.85)',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Italian Travertine Island
              </div>
            </div>
          </div>

          {/* Bottom Glass Overlay Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px 32px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(28, 26, 23, 0.8) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              color: '#FFFFFF',
            }}
          >
            <div>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', fontWeight: 500 }}>
                {selectedTour.name}
              </div>
              <div style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', opacity: 0.85 }}>
                {selectedTour.rooms} Rooms · {selectedTour.sqft} sq.ft · 4K Ray-traced Digital Twin
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  opacity: 0.8,
                  fontStyle: 'italic',
                }}
              >
                Click & drag to look around
              </div>
            </div>
          </div>
        </div>

        {/* 4 Tour Switcher Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {tours.map((item) => {
            const isActive = selectedTour.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedTour(item)}
                style={{
                  background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(16px)',
                  border: isActive ? '1px solid #B08D57' : '1px solid rgba(176, 141, 87, 0.2)',
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 16px 36px rgba(176, 141, 87, 0.15)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '140px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '14px',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#B08D57',
                    }}
                  >
                    {item.tag}
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(28, 26, 23, 0.5)' }}>
                    {item.sqft} sq.ft
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#1C1A17',
                    margin: '0 0 12px 0',
                  }}
                >
                  {item.name}
                </h4>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    color: isActive ? '#B08D57' : 'rgba(28, 26, 23, 0.6)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>{isActive ? 'Active Tour' : 'Enter Tour'}</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
