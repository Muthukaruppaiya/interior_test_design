import { useState, useRef, useCallback } from 'react';
import { media } from '../data/media';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { beforeImage, afterImage, title, caption } = media.beforeAfter;

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      style={{
        marginTop: '80px',
        background: 'rgba(247, 243, 236, 0.55)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(176, 141, 87, 0.25)',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 20px 50px rgba(60, 45, 20, 0.06)',
      }}
      className="before-after-wrapper"
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B08D57',
              marginBottom: '8px',
            }}
          >
            Turnkey Transformation Study
          </div>
          <h3
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 400,
              color: '#1C1A17',
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: 'rgba(28, 26, 23, 0.65)',
            maxWidth: '460px',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {caption}
        </p>
      </div>

      {/* Interactive Slider Container */}
      <div
        ref={containerRef}
        data-cursor="drag"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          maxHeight: '580px',
          borderRadius: '16px',
          overflow: 'hidden',
          userSelect: 'none',
          cursor: 'ew-resize',
          boxShadow: '0 25px 60px rgba(60, 45, 20, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
        }}
      >
        {/* After Image (Full background) */}
        <img
          src={afterImage}
          alt="After Siriz Turnkey Fit-out"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Before Image (Clipped) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${sliderPosition}%`,
            overflow: 'hidden',
          }}
        >
          <img
            src={beforeImage}
            alt="Before Construction Shell"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(20%) contrast(105%)',
            }}
          />
        </div>

        {/* Divider Line & Circular Brass Handle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '2px',
            backgroundColor: '#B08D57',
            boxShadow: '0 0 12px rgba(176, 141, 87, 0.6)',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #B08D57',
              boxShadow: '0 8px 24px rgba(60, 45, 20, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#B08D57',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            ⇄
          </div>
        </div>

        {/* Badge Labels */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(28, 26, 23, 0.75)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Before: Bare Shell
        </div>

        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(176, 141, 87, 0.9)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          After: Siriz 41-Day Handover
        </div>
      </div>
    </div>
  );
}
