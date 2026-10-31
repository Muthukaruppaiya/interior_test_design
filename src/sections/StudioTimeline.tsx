import { useState } from 'react';
import { studioMilestones, type TimelineMilestone } from '../data/timeline';

export default function StudioTimeline() {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const activeMilestone: TimelineMilestone = studioMilestones[activeYearIndex];

  return (
    <section
      id="timeline"
      style={{
        position: 'relative',
        padding: '120px 48px',
        backgroundColor: '#FFFFFF',
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
            marginBottom: '64px',
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
              (06) Chronology of Craft
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
              Studio <span style={{ fontStyle: 'italic', color: '#B08D57' }}>Evolution</span>
            </h2>
          </div>

          {/* Editable Placeholder Note */}
          <div
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(247, 243, 236, 0.9)',
              border: '1px dashed rgba(176, 141, 87, 0.5)',
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(28, 26, 23, 0.65)',
            }}
          >
            ★ Editable Studio Milestones in <code style={{ color: '#B08D57', fontWeight: 600 }}>/src/data/timeline.ts</code>
          </div>
        </div>

        {/* Horizontal Year Ticker Axis */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${studioMilestones.length}, 1fr)`,
            gap: '16px',
            marginBottom: '48px',
            borderBottom: '1px solid rgba(176, 141, 87, 0.2)',
            paddingBottom: '24px',
          }}
          className="timeline-years-bar"
        >
          {studioMilestones.map((m, idx) => {
            const isActive = idx === activeYearIndex;
            return (
              <button
                key={m.year}
                type="button"
                onClick={() => setActiveYearIndex(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '8px 0',
                  position: 'relative',
                  transition: 'opacity 0.2s',
                  opacity: isActive ? 1 : 0.45,
                }}
              >
                <div
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(32px, 3.8vw, 54px)',
                    fontWeight: 400,
                    color: isActive ? '#B08D57' : '#1C1A17',
                    lineHeight: 1,
                    marginBottom: '4px',
                    transition: 'color 0.25s',
                  }}
                >
                  {m.year}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#1C1A17',
                  }}
                >
                  {m.label}
                </div>

                {/* Active Indicator Pip */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-25px',
                      left: 0,
                      width: '32px',
                      height: '3px',
                      backgroundColor: '#B08D57',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Card */}
        <div
          key={activeMilestone.year}
          style={{
            background: 'rgba(247, 243, 236, 0.65)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '24px',
            padding: '56px 48px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.6fr)',
            gap: '48px',
            boxShadow: '0 20px 50px rgba(60, 45, 20, 0.06)',
            animation: 'fadeIn 0.4s ease',
          }}
          className="timeline-card-split"
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(176, 141, 87, 0.3)',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#B08D57',
                marginBottom: '20px',
              }}
            >
              YEAR {activeMilestone.year} · {activeMilestone.label.toUpperCase()}
            </div>

            <h3
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(32px, 3.8vw, 48px)',
                fontWeight: 400,
                color: '#1C1A17',
                lineHeight: 1.15,
                margin: '0 0 18px 0',
              }}
            >
              {activeMilestone.headline}
            </h3>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'rgba(28, 26, 23, 0.75)',
                margin: 0,
                maxWidth: '700px',
              }}
            >
              {activeMilestone.description}
            </p>
          </div>

          {/* Metric Highlight Tile */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '36px',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(176, 141, 87, 0.25)',
              boxShadow: '0 12px 30px rgba(60, 45, 20, 0.05)',
            }}
          >
            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(44px, 5vw, 68px)',
                fontWeight: 400,
                color: '#B08D57',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              {activeMilestone.metric}
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#1C1A17',
                lineHeight: 1.4,
              }}
            >
              {activeMilestone.metricLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
