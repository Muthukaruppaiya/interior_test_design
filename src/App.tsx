import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import MenuOverlay from './components/MenuOverlay';
import FloatingDecor from './components/FloatingDecor';
import Hero from './sections/Hero';
import IntroStatement from './sections/IntroStatement';
import SignatureProjects from './sections/SignatureProjects';
import WindowZoomTransition from './sections/WindowZoomTransition';
import BlueprintStory from './sections/BlueprintStory';
import ByTheNumbers from './sections/ByTheNumbers';
import AtelierStrip from './sections/AtelierStrip';
import SingleTestimonial from './sections/SingleTestimonial';
import Footer from './sections/Footer';
import ChatWidget from './components/ChatWidget';
import { SECTION_TARGETS } from './hooks/useLenis';
import './index.css';

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLoaderComplete] = useState(false);

  // ── 1. Single-Scroll Full-Page Slide Navigation Controller ──────────────
  // Guarantees ONE scroll gesture moves completely to the NEXT page.
  // It is mathematically impossible for the page to rest or get stuck halfway!
  useEffect(() => {
    let isLocked = false;
    let lastWheelTime = 0;
    let touchStartY = 0;
    let touchStartX = 0;

    // Wheel Event Listener
    const handleWheel = (e: WheelEvent) => {
      // Allow local scrolling inside the chat widget or dialogs
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('.concierge-window') ||
        target?.closest('.project-modal-content') ||
        target?.closest('[role="dialog"]')
      ) {
        return;
      }

      e.preventDefault();

      const now = performance.now();
      if (isLocked || now - lastWheelTime < 850) return;

      if (Math.abs(e.deltaY) > 4) {
        lastWheelTime = now;
        isLocked = true;

        if (e.deltaY > 0) {
          setActiveSlide((prev) => Math.min(SECTION_TARGETS.length - 1, prev + 1));
        } else {
          setActiveSlide((prev) => Math.max(0, prev - 1));
        }

        setTimeout(() => {
          isLocked = false;
        }, 850);
      }
    };

    // Keyboard Navigation (Arrows & Page Keys)
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        if (isLocked) return;
        isLocked = true;
        setActiveSlide((prev) => Math.min(SECTION_TARGETS.length - 1, prev + 1));
        setTimeout(() => {
          isLocked = false;
        }, 850);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        if (isLocked) return;
        isLocked = true;
        setActiveSlide((prev) => Math.max(0, prev - 1));
        setTimeout(() => {
          isLocked = false;
        }, 850);
      }
    };

    // Touch Swipe Navigation for Mobile Devices
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.concierge-window') || target?.closest('[role="dialog"]')) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    // Intercept touchmove to eliminate mobile browser pull-to-refresh
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('.concierge-window') ||
        target?.closest('[role="dialog"]') ||
        target?.closest('input') ||
        target?.closest('textarea') ||
        target?.closest('#contact')
      ) {
        return;
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.concierge-window') || target?.closest('[role="dialog"]')) return;
      if (isLocked) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartY - touchEndY;
      const diffX = touchStartX - touchEndX;

      // Soft vertical swipe trigger (responds softly to 12px finger movement)
      if (Math.abs(diffY) > 12 && Math.abs(diffY) > Math.abs(diffX) * 0.7) {
        isLocked = true;
        if (diffY > 0) {
          setActiveSlide((prev) => Math.min(SECTION_TARGETS.length - 1, prev + 1));
        } else {
          setActiveSlide((prev) => Math.max(0, prev - 1));
        }
        setTimeout(() => {
          isLocked = false;
        }, 850);
      }
    };

    // Custom Target Navigation Event (from links, buttons, footer back-to-top)
    const handleNavigate = (e: Event) => {
      const customEvt = e as CustomEvent<{ target: string }>;
      const target = customEvt.detail?.target;
      const targetIdx = SECTION_TARGETS.indexOf(target);
      if (targetIdx !== -1) {
        setActiveSlide(targetIdx);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('siriz-navigate-slide', handleNavigate);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('siriz-navigate-slide', handleNavigate);
    };
  }, []);

  return (
    <div
      className="siriz-atelier-root"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#F8F5EF',
      }}
    >
      {/* 00. Page Loader (Under 2.5s curtain lift, once per session) */}
      <PageLoader onComplete={() => setLoaderComplete(true)} />

      {/* 00. Luxury Precision Cursor */}
      <CustomCursor />

      {/* 00. Stable Liquid-Glass Pill Navigation Header */}
      <Navbar onOpenMenu={() => setIsMenuOpen(true)} activeSlide={activeSlide} />

      {/* 00. Fullscreen Editorial Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* 00. Floating Decor Background Accents */}
      <FloatingDecor />

      {/* ── Immersive 3D Depth Stack Presentation (One-by-One "Go Inside" Transition) ── */}
      <main
        id="main-content"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          perspective: '1400px',
        }}
      >
        {[
          { id: 'hero', comp: <Hero /> },
          { id: 'statement', comp: <IntroStatement /> },
          { id: 'work', comp: <SignatureProjects /> },
          { id: 'doorway', comp: <WindowZoomTransition isActive={activeSlide === 3} /> },
          { id: 'process', comp: <BlueprintStory /> },
          { id: 'studio', comp: <ByTheNumbers isActive={activeSlide === 5} /> },
          { id: 'materials', comp: <AtelierStrip /> },
          { id: 'testimonial', comp: <SingleTestimonial /> },
          { id: 'contact', comp: <Footer /> },
        ].map(({ id, comp }, idx) => {
          const isCurrent = idx === activeSlide;
          const isPast = idx < activeSlide;
          const isFuture = idx > activeSlide;

          let transform = '';
          let opacity = 1;
          let zIndex = 1;

          if (isCurrent) {
            transform = 'translate3d(0, 0, 0) scale(1)';
            opacity = 1;
            zIndex = 10;
          } else if (isPast) {
            // Outgoing slide scales down and sinks INSIDE into depth!
            const depth = activeSlide - idx;
            transform = `translate3d(0, -${depth * 5}vh, -${depth * 90}px) scale(${Math.max(0.82, 1 - depth * 0.08)})`;
            opacity = depth === 1 ? 0.35 : 0;
            zIndex = 10 - depth;
          } else {
            // Future slides wait below and slide up smoothly over the previous
            transform = `translate3d(0, 100vh, 0) scale(1)`;
            opacity = 1;
            zIndex = 20 + idx;
          }

          return (
            <div
              key={id}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: id === 'contact' ? 'visible' : 'hidden',
                transform,
                opacity,
                zIndex,
                pointerEvents: isCurrent ? 'auto' : 'none',
                transition:
                  'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform, opacity',
                transformOrigin: 'center center',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                boxShadow: isFuture ? '0 -25px 60px rgba(27, 25, 22, 0.08)' : 'none',
              }}
            >
              {comp}
            </div>
          );
        })}
      </main>

      {/* ── Delicate Side Slide Indicator (Desktop Only) ── */}
      <aside
        aria-label="Slide Indicator"
        style={{
          position: 'fixed',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 8900,
          display: 'none',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
        className="slide-indicator-aside"
      >
        {SECTION_TARGETS.map((target, idx) => (
          <button
            key={target}
            type="button"
            onClick={() => setActiveSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              width: activeSlide === idx ? '22px' : '6px',
              height: '6px',
              borderRadius: '999px',
              backgroundColor: activeSlide === idx ? '#A98852' : 'rgba(169, 136, 82, 0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        ))}
      </aside>

      {/* Restyled & Enhanced Design Concierge Frosted Glass Chatbot */}
      <ChatWidget />

      <style>{`
        @media (min-width: 900px) {
          .slide-indicator-aside {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
