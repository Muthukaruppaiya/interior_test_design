import { useEffect } from 'react';
import { X, Calendar, MapPin, Maximize2, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { scrollToTarget } from '../hooks/useLenis';

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  duration: string;
  coverImage: string;
  summary: string;
  gallery: string[];
  palette: string[];
  scope: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const handleEnquire = () => {
    onClose();
    setTimeout(() => {
      scrollToTarget('#consultation');
    }, 300);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Details`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99995,
        backgroundColor: 'rgba(28, 26, 23, 0.65)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          backgroundColor: '#F7F3EC',
          borderRadius: '24px',
          overflowY: 'auto',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="project-modal-container"
      >
        {/* Sticky Header with Close Button */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 36px',
            backgroundColor: 'rgba(247, 243, 236, 0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(176, 141, 87, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B08D57',
              }}
            >
              PROJECT PORTFOLIO
            </span>
            <span style={{ color: 'rgba(28, 26, 23, 0.3)' }}>/</span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#1C1A17',
                fontWeight: 500,
              }}
            >
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project detail"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(176, 141, 87, 0.3)',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#1C1A17',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(176, 141, 87, 0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            <span>Close</span>
            <X size={14} color="#B08D57" />
          </button>
        </div>

        {/* Hero Image Section */}
        <div style={{ width: '100%', height: '420px', position: 'relative' }}>
          <img
            src={project.coverImage}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(28, 26, 23, 0.7) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '36px',
              right: '36px',
              color: '#FFFFFF',
            }}
          >
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 400,
                margin: '0 0 6px 0',
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                margin: 0,
                maxWidth: '650px',
              }}
            >
              {project.summary}
            </p>
          </div>
        </div>

        {/* Project Facts Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px',
            padding: '28px 36px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid rgba(176, 141, 87, 0.2)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B08D57', marginBottom: '4px' }}>
              <MapPin size={14} />
              <span style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Location
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, sans-serif', color: '#1C1A17' }}>
              {project.location}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B08D57', marginBottom: '4px' }}>
              <Maximize2 size={14} />
              <span style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Carpet Area
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, sans-serif', color: '#1C1A17' }}>
              {project.area}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B08D57', marginBottom: '4px' }}>
              <Clock size={14} />
              <span style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Handover Time
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, sans-serif', color: '#1C1A17' }}>
              {project.duration}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B08D57', marginBottom: '4px' }}>
              <Calendar size={14} />
              <span style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Completion Year
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, sans-serif', color: '#1C1A17' }}>
              {project.year}
            </div>
          </div>
        </div>

        {/* Narrative & Scope Split */}
        <div
          style={{
            padding: '36px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
            gap: '40px',
          }}
          className="project-narrative-split"
        >
          <div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B08D57',
                marginBottom: '12px',
              }}
            >
              Architectural Concept & Execution
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'rgba(28, 26, 23, 0.75)',
                margin: '0 0 24px 0',
              }}
            >
              Designed and precision-manufactured completely in-house. All casework was crafted in our Medavakkam
              facility with calibrated marine plywood, certified zero-VOC laminates, and German concealed runners.
              Delivered within our strict 45-day milestone with zero on-site structural alteration.
            </p>

            {/* Scope Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.scope.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(176, 141, 87, 0.3)',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                    color: '#1C1A17',
                  }}
                >
                  <CheckCircle2 size={13} color="#B08D57" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Palette Swatches Card */}
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(176, 141, 87, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#B08D57',
                  marginBottom: '12px',
                }}
              >
                Material & Light Palette
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {project.palette.map((color) => (
                  <div
                    key={color}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: '1px solid rgba(0, 0, 0, 0.15)',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleEnquire}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px 20px',
                borderRadius: '999px',
                backgroundColor: '#B08D57',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: '0 6px 20px rgba(176, 141, 87, 0.3)',
              }}
            >
              <span>Enquire About Similar Project</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Gallery Masonry */}
        <div style={{ padding: '0 36px 48px' }}>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B08D57',
              marginBottom: '16px',
            }}
          >
            Project Spatial Gallery
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {project.gallery.map((imgUrl, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  boxShadow: '0 10px 24px rgba(60, 45, 20, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                }}
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} space ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
