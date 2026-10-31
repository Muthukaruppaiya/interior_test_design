import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { media } from '../data/media';
import ProjectModal, { type ProjectData } from '../components/ProjectModal';

export default function SignatureProjects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const scrollToIndex = (idx: number) => {
    setActiveProjectIdx(idx);
    if (trackRef.current) {
      const panels = trackRef.current.querySelectorAll('.project-panel');
      if (panels[idx]) {
        panels[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeProjectIdx - 1);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(media.selectedWork.length - 1, activeProjectIdx + 1);
    scrollToIndex(nextIdx);
  };

  return (
    <section
      id="work"
      style={{
        position: 'relative',
        backgroundColor: '#F8F5EF',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vh, 48px) 0',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Section Header & Navigation Controls ── */}
      <div
        style={{
          padding: '0 clamp(24px, 5vw, 64px)',
          marginBottom: 'clamp(16px, 2.5vh, 28px)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div className="small-label" style={{ marginBottom: '6px', color: '#A98852' }}>
            Portfolio
          </div>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(32px, 4.2vw, 64px)',
              fontWeight: 300,
              lineHeight: 1,
              color: '#1B1916',
              margin: 0,
            }}
          >
            Selected Work
          </h2>
        </div>

        {/* Prev / Next Arrows & Project Index Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '6px' }} className="project-index-pills">
            {media.selectedWork.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                style={{
                  width: activeProjectIdx === idx ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  backgroundColor: activeProjectIdx === idx ? '#A98852' : 'rgba(169, 136, 82, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
                title={p.title}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeProjectIdx === 0}
              aria-label="Previous Project"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(169, 136, 82, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeProjectIdx === 0 ? 'default' : 'pointer',
                opacity: activeProjectIdx === 0 ? 0.35 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronLeft size={18} color="#1B1916" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeProjectIdx === media.selectedWork.length - 1}
              aria-label="Next Project"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(169, 136, 82, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeProjectIdx === media.selectedWork.length - 1 ? 'default' : 'pointer',
                opacity: activeProjectIdx === media.selectedWork.length - 1 ? 0.35 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronRight size={18} color="#1B1916" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Horizontal Scrollable Project Track ── */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: 'clamp(20px, 2.5vw, 40px)',
          paddingLeft: 'clamp(24px, 5vw, 64px)',
          paddingRight: 'clamp(48px, 8vw, 120px)',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        className="projects-horizontal-track"
      >
        {media.selectedWork.map((project, idx) => (
          <div
            key={project.id}
            data-cursor="view"
            onClick={() => {
              setActiveProjectIdx(idx);
              setSelectedProject(media.projects.find((p) => p.id === project.id) || media.projects[0]);
            }}
            style={{
              flexShrink: 0,
              width: 'clamp(280px, 60vw, 880px)',
              height: 'clamp(380px, 58vh, 620px)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              backgroundColor: '#EEE8DD',
              boxShadow: '0 20px 50px rgba(60, 45, 20, 0.08)',
              scrollSnapAlign: 'center',
            }}
            className="project-panel luxury-image-wrapper"
          >
            {/* Inner Project Image with Smooth Hover Zoom */}
            <img
              src={project.image}
              alt={project.alt}
              className="panel-inner-img"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
                transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              loading="lazy"
            />

            {/* Gradient Vignette for Text Legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(27, 25, 22, 0.05) 0%, rgba(27, 25, 22, 0.0) 45%, rgba(27, 25, 22, 0.65) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Project Number */}
            <div
              className="tabular-nums"
              style={{
                position: 'absolute',
                top: '20px',
                left: '24px',
                fontFamily: '"Manrope", sans-serif',
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '0.2em',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {project.number}
            </div>

            {/* Bottom Details */}
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(18px, 3vh, 32px)',
                left: 'clamp(20px, 3.5vw, 36px)',
                right: 'clamp(20px, 3.5vw, 36px)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 'clamp(24px, 3.2vw, 44px)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  color: '#FFFFFF',
                  margin: '0 0 6px 0',
                  textShadow: '0 3px 18px rgba(0, 0, 0, 0.5)',
                }}
              >
                {project.title}
              </h3>
              <p
                className="small-label"
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  letterSpacing: '0.22em',
                  fontSize: '11px',
                  margin: 0,
                  textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)',
                }}
              >
                {project.type}
              </p>
            </div>
          </div>
        ))}

        {/* ── Final Panel: "All projects →" ── */}
        <div
          data-cursor="view"
          onClick={() => setSelectedProject(media.projects[0])}
          style={{
            flexShrink: 0,
            width: 'clamp(220px, 28vw, 380px)',
            height: 'clamp(380px, 58vh, 620px)',
            borderRadius: '24px',
            border: '1px solid rgba(169, 136, 82, 0.35)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(60, 45, 20, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            textAlign: 'center',
            cursor: 'pointer',
            scrollSnapAlign: 'center',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.borderColor = '#A98852';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            e.currentTarget.style.borderColor = 'rgba(169, 136, 82, 0.35)';
          }}
        >
          <div className="small-label" style={{ marginBottom: '14px', color: '#A98852' }}>
            Archive
          </div>
          <div
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(24px, 2.8vw, 38px)',
              fontWeight: 300,
              color: '#1B1916',
              marginBottom: '12px',
            }}
          >
            All projects →
          </div>
          <p
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: '12px',
              color: '#8C8272',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              maxWidth: '200px',
            }}
          >
            Explore our complete portfolio of over 600 bespoke homes in Chennai.
          </p>
        </div>
      </div>

      {/* ── Project Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        .projects-horizontal-track::-webkit-scrollbar {
          display: none;
        }
        .project-panel:hover .panel-inner-img {
          transform: scale(1.04) !important;
        }
      `}</style>
    </section>
  );
}
