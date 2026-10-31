import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLifting, setIsLifting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user already saw the loader this session
    const seen = sessionStorage.getItem('siriz_loader_seen');
    if (seen) {
      setIsDone(true);
      onComplete();
      return;
    }

    const startTime = performance.now();
    const duration = 2000; // Under 2.5s total

    const updateFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateFrame);
      } else {
        sessionStorage.setItem('siriz_loader_seen', 'true');
        setTimeout(() => {
          setIsLifting(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete();
          }, 800);
        }, 150);
      }
    };

    const animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#F8F5EF',
        transform: isLifting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isLifting ? 'none' : 'auto',
        willChange: 'transform',
      }}
    >
      {/* SIRIZ Wordmark with Easing Letter-Spacing */}
      <div
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 300,
          color: '#1B1916',
          textTransform: 'uppercase',
          letterSpacing: isLifting ? '0.24em' : 'clamp(0.3em, 0.5vw, 0.45em)',
          transition: 'letter-spacing 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
          marginBottom: '32px',
        }}
      >
        SIRIZ
      </div>

      {/* Thin Brass Hairline Drawing Across */}
      <div
        style={{
          width: 'clamp(180px, 28vw, 320px)',
          height: '1px',
          backgroundColor: 'rgba(169, 136, 82, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#A98852',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Lining Tabular Digit Counter (000 - 100) */}
      <div
        className="tabular-nums"
        style={{
          fontFamily: '"Manrope", sans-serif',
          fontSize: '13px',
          fontWeight: 300,
          letterSpacing: '0.2em',
          color: '#8C8272',
          fontVariantNumeric: 'lining-nums tabular-nums',
        }}
      >
        {String(progress).padStart(3, '0')}
      </div>
    </div>
  );
}
