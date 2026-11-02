import { useEffect, useRef, useState, useCallback } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLifting, setIsLifting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  // Trigger smooth curtain lift & callback to parent
  const triggerExit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);

    // Freeze video cleanly on the settled logo
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {
        // safe ignore
      }
    }

    setTimeout(() => {
      setIsLifting(true);
      setTimeout(() => {
        setIsDone(true);
        onComplete();
      }, 850);
    }, 320);
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    // Video starts from Second 1.5
    const START_SEC = 1.5;

    const enforceStartTime = () => {
      if (!video) return;
      if (video.currentTime < START_SEC) {
        try {
          video.currentTime = START_SEC;
        } catch {
          // safe ignore
        }
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback handled smoothly by RAF timer loop
        });
      }
    };

    if (video) {
      if (video.readyState >= 2) {
        enforceStartTime();
      } else {
        video.addEventListener('loadedmetadata', enforceStartTime, { once: true });
        video.addEventListener('canplay', enforceStartTime, { once: true });
        video.addEventListener('loadeddata', enforceStartTime, { once: true });
      }

      // Safeguard: if browser starts playback at 0s, immediately jump to 1.0s
      const onTimeUpdateCheck = () => {
        if (video.currentTime < START_SEC) {
          video.currentTime = START_SEC;
        }
      };
      video.addEventListener('timeupdate', onTimeUpdateCheck);

      return () => {
        video.removeEventListener('loadedmetadata', enforceStartTime);
        video.removeEventListener('canplay', enforceStartTime);
        video.removeEventListener('loadeddata', enforceStartTime);
        video.removeEventListener('timeupdate', onTimeUpdateCheck);
      };
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const START_SEC = 1.5;
    const END_SEC = 5.5; // Logo fully resolves with 3D reflection
    const DURATION = END_SEC - START_SEC;

    let animId: number;
    const wallStartTime = performance.now();

    const loop = () => {
      if (completedRef.current) return;

      let pct = 0;
      if (video && !video.paused && video.currentTime >= START_SEC) {
        const cur = video.currentTime;
        const ratio = Math.min(1, Math.max(0, (cur - START_SEC) / DURATION));
        pct = Math.floor(ratio * 100);

        if (cur >= END_SEC || video.ended) {
          triggerExit();
          return;
        }
      } else {
        // Fallback timer keeps the animation fluid on mobile networks
        const elapsed = (performance.now() - wallStartTime) / 1000;
        const ratio = Math.min(1, elapsed / (DURATION + 0.4));
        pct = Math.floor(ratio * 100);

        if (ratio >= 1) {
          triggerExit();
          return;
        }
      }

      setProgress((prev) => Math.max(prev, pct));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Discreet skip button becomes visible after 2.8s
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2800);

    // Safety timeout prevents any hanging
    const safetyTimer = setTimeout(() => {
      triggerExit();
    }, 6200);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(skipTimer);
      clearTimeout(safetyTimer);
    };
  }, [triggerExit]);

  if (isDone) return null;

  return (
    <div
      aria-hidden="true"
      className="siriz-loader-curtain"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(ellipse at 50% 48%, #F7F7F7 0%, #EDEDEC 50%, #E3E3E2 100%)',
        transform: isLifting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isLifting ? 'none' : 'auto',
        willChange: 'transform',
        overflow: 'hidden',
        padding: 'max(20px, env(safe-area-inset-top)) 20px max(20px, env(safe-area-inset-bottom)) 20px',
      }}
    >
      {/* Ambient Pulsing Warm Gold Halo */}
      <div
        style={{
          position: 'absolute',
          width: 'clamp(280px, 48vw, 560px)',
          height: 'clamp(280px, 48vw, 560px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(169, 136, 82, 0.20) 0%, rgba(185, 155, 100, 0.06) 50%, transparent 72%)',
          animation: 'loaderHaloGlow 2.8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main Responsive Video Container (Adopted for Mobile & Desktop) ── */}
      <div
        className="loader-video-container"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          className="loader-video-wrapper"
          style={{
            position: 'relative',
            width: 'clamp(320px, 88vw, 680px)',
            maxWidth: '100%',
            aspectRatio: '16 / 9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            WebkitMaskImage: 'radial-gradient(ellipse 72% 68% at 50% 50%, black 52%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 72% 68% at 50% 50%, black 52%, transparent 100%)',
          }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            preload="auto"
            className="loader-video-element"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 6px 20px rgba(169, 136, 82, 0.12))',
            }}
          >
            {/* Native media fragment #t=1.5 loads decoder directly at 1.5 seconds */}
            <source src="/loader-video.mp4#t=1.5" type="video/mp4" />
          </video>
        </div>

        {/* Micro Tagline */}
        <div
          className="loader-tagline"
          style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: '10.5px',
            fontWeight: 600,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(27, 25, 22, 0.74)',
            marginTop: '18px',
            textAlign: 'center',
            transition: 'color 0.3s ease',
          }}
        >
          {progress < 30
            ? 'Discovering Spaces'
            : progress < 75
              ? 'Composing Architectural Harmony'
              : 'Welcome to Siriz'}
        </div>
      </div>

      {/* ── Precision Brass Progress Hairline ── */}
      <div
        className="loader-progress-bar"
        style={{
          width: 'clamp(200px, 48vw, 300px)',
          height: '3px',
          backgroundColor: 'rgba(169, 136, 82, 0.22)',
          borderRadius: '999px',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '22px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #A98852 0%, #C49A45 50%, #D4AF37 100%)',
            boxShadow: '0 0 12px rgba(169, 136, 82, 0.65)',
            borderRadius: '999px',
            transition: 'width 0.08s linear',
          }}
        />
      </div>

      {/* ── Lining Tabular Digit Counter (000 - 100) ── */}
      <div
        className="tabular-nums"
        style={{
          fontFamily: '"Manrope", sans-serif',
          fontSize: '12.5px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: '#8C6D3B',
          fontVariantNumeric: 'lining-nums tabular-nums',
        }}
      >
        {String(progress).padStart(3, '0')} %
      </div>

      {/* Subtle Luxury Skip Option */}
      {showSkip && (
        <button
          type="button"
          onClick={triggerExit}
          style={{
            marginTop: '18px',
            background: 'none',
            border: 'none',
            fontFamily: '"Manrope", sans-serif',
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(27, 25, 22, 0.42)',
            cursor: 'pointer',
            padding: '6px 12px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#A98852')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(27, 25, 22, 0.42)')}
        >
          Enter Atelier &rarr;
        </button>
      )}

      {/* Responsive Mobile-First CSS Optimizations */}
      <style>{`
        @keyframes loaderHaloGlow {
          0%, 100% { transform: scale(0.96); opacity: 0.55; }
          50% { transform: scale(1.08); opacity: 0.95; }
        }

        /* Desktop & Tablet scale */
        .loader-video-wrapper {
          transform: scale(1.15);
          transform-origin: center center;
        }

        /* Mobile Viewport Adaptations (Phone portrait 320px - 640px) */
        @media (max-width: 640px) {
          .loader-video-wrapper {
            width: 100vw !important;
            max-width: 500px !important;
            transform: scale(1.32) !important; /* Enlarges 3D logo details on portrait mobile */
            transform-origin: center center;
          }
          .loader-tagline {
            font-size: 8.5px !important;
            letter-spacing: 0.28em !important;
            margin-top: 18px !important;
          }
          .loader-progress-bar {
            width: min(210px, 58vw) !important;
            margin-top: 18px !important;
            margin-bottom: 12px !important;
          }
        }

        /* Very Small Phone Viewports (e.g., iPhone SE 375px) */
        @media (max-width: 380px) {
          .loader-video-wrapper {
            width: 100vw !important;
            transform: scale(1.38) !important;
          }
        }
      `}</style>
    </div>
  );
}
