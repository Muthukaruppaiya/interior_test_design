import { Shield, Clock, Factory, Smartphone, CheckCircle2 } from 'lucide-react';

export default function WhySiriz() {
  return (
    <section
      id="why-siriz"
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
              (08) Studio Pillars
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
              The Architecture of <span style={{ fontStyle: 'italic', color: '#B08D57' }}>Certainty</span>
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
            We dismantled the traditional contracting model to give homeowners absolute predictability in timeline, materials, and cost.
          </div>
        </div>

        {/* Asymmetric Bento Grid of Glass Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
          }}
          className="why-bento-grid"
        >
          {/* Card 1: In-House Factory (Col span 7) */}
          <div
            style={{
              gridColumn: 'span 7',
              backgroundColor: 'rgba(247, 243, 236, 0.65)',
              backdropFilter: 'blur(20px) saturate(140%)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '44px',
              boxShadow: '0 20px 45px rgba(60, 45, 20, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="bento-span-7"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 25px 55px rgba(60, 45, 20, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 45px rgba(60, 45, 20, 0.06)';
            }}
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(176, 141, 87, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px',
                  boxShadow: '0 8px 20px rgba(176, 141, 87, 0.15)',
                }}
              >
                <Factory size={24} color="#B08D57" />
              </div>

              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B08D57',
                  marginBottom: '8px',
                }}
              >
                Zero Contractor Subcontracting
              </div>

              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  fontWeight: 400,
                  color: '#1C1A17',
                  lineHeight: 1.15,
                  margin: '0 0 16px 0',
                }}
              >
                In-House Precision Factory Production
              </h3>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'rgba(28, 26, 23, 0.75)',
                  margin: '0 0 24px 0',
                }}
              >
                We do not pass your home to third-party carpentry labour. Our 12,000 sq.ft manufacturing facility in
                Medavakkam is equipped with computerized CNC machinery and German PUR hot-melt edge-banding.
                Parts arrive pre-milled for rapid dust-free on-site assembly.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(176, 141, 87, 0.2)' }}>
              <span style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#1C1A17', fontWeight: 600 }}>
                ✓ German Homag Edging
              </span>
              <span style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#1C1A17', fontWeight: 600 }}>
                ✓ 0.1mm Joinery Tolerance
              </span>
              <span style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#1C1A17', fontWeight: 600 }}>
                ✓ Zero Middleman Margin
              </span>
            </div>
          </div>

          {/* Card 2: 45-Day Handover (Col span 5) */}
          <div
            style={{
              gridColumn: 'span 5',
              backgroundColor: 'rgba(247, 243, 236, 0.65)',
              backdropFilter: 'blur(20px) saturate(140%)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '44px',
              boxShadow: '0 20px 45px rgba(60, 45, 20, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="bento-span-5"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 25px 55px rgba(60, 45, 20, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 45px rgba(60, 45, 20, 0.06)';
            }}
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(176, 141, 87, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px',
                  boxShadow: '0 8px 20px rgba(176, 141, 87, 0.15)',
                }}
              >
                <Clock size={24} color="#B08D57" />
              </div>

              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B08D57',
                  marginBottom: '8px',
                }}
              >
                Contractual Guarantee
              </div>

              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  fontWeight: 400,
                  color: '#1C1A17',
                  lineHeight: 1.15,
                  margin: '0 0 16px 0',
                }}
              >
                45-Day Handover Guarantee
              </h3>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'rgba(28, 26, 23, 0.75)',
                  margin: 0,
                }}
              >
                Your moving date is set in stone upon design sign-off. We schedule every phase on a strict critical-path
                system, backed by formal delivery clauses.
              </p>
            </div>

            <div
              style={{
                marginTop: '32px',
                padding: '16px 20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(176, 141, 87, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1C1A17' }}>
                On-Time Handover Rate
              </span>
              <span style={{ fontSize: '16px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 700, color: '#B08D57' }}>
                98.4% Verified
              </span>
            </div>
          </div>

          {/* Card 3: Dedicated Customer Portal with Animated UI Mock (Col span 6) */}
          <div
            style={{
              gridColumn: 'span 6',
              backgroundColor: 'rgba(247, 243, 236, 0.65)',
              backdropFilter: 'blur(20px) saturate(140%)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '44px',
              boxShadow: '0 20px 45px rgba(60, 45, 20, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease',
            }}
            className="bento-span-6"
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(176, 141, 87, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                }}
              >
                <Smartphone size={24} color="#B08D57" />
              </div>

              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B08D57',
                  marginBottom: '8px',
                }}
              >
                Real-Time Transparency
              </div>

              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '32px',
                  fontWeight: 400,
                  color: '#1C1A17',
                  margin: '0 0 14px 0',
                }}
              >
                Dedicated Client Portal App
              </h3>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: 'rgba(28, 26, 23, 0.75)',
                  margin: '0 0 24px 0',
                }}
              >
                Follow daily progress from anywhere in the world. Review factory photos, approve material samples,
                and track milestones with complete financial clarity.
              </p>
            </div>

            {/* Animated UI Mock Container */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(176, 141, 87, 0.3)',
                boxShadow: '0 12px 30px rgba(60, 45, 20, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <span style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1C1A17' }}>
                    Siriz Live Portal · Villa Aditya
                  </span>
                </div>
                <span style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', color: '#B08D57', fontWeight: 600 }}>
                  Day 34 of 45
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                  <span style={{ color: 'rgba(28, 26, 23, 0.6)' }}>Assembly & Hardware Handover</span>
                  <span style={{ fontWeight: 600, color: '#B08D57' }}>78% Complete</span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: 'rgba(176, 141, 87, 0.15)', overflow: 'hidden' }}>
                  <div style={{ width: '78%', height: '100%', backgroundColor: '#B08D57', borderRadius: '3px' }} />
                </div>
              </div>

              {/* Status pills */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#15803d', fontWeight: 600 }}>
                  ✓ BWP Marine Certified
                </span>
                <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'rgba(176, 141, 87, 0.12)', color: '#B08D57', fontWeight: 600 }}>
                  ✓ CNC Milling Passed
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: 10-Year Warranty (Col span 6) */}
          <div
            style={{
              gridColumn: 'span 6',
              backgroundColor: 'rgba(247, 243, 236, 0.65)',
              backdropFilter: 'blur(20px) saturate(140%)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '44px',
              boxShadow: '0 20px 45px rgba(60, 45, 20, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease',
            }}
            className="bento-span-6"
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(176, 141, 87, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                }}
              >
                <Shield size={24} color="#B08D57" />
              </div>

              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B08D57',
                  marginBottom: '8px',
                }}
              >
                Long-Term Protection
              </div>

              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '32px',
                  fontWeight: 400,
                  color: '#1C1A17',
                  margin: '0 0 14px 0',
                }}
              >
                10-Year Comprehensive Warranty
              </h3>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: 'rgba(28, 26, 23, 0.75)',
                  margin: '0 0 24px 0',
                }}
              >
                We use exclusively calibrated Boiling Water Proof (BWP) 710 Grade marine plywood and premium laminates.
                Every wooden installation is covered against delamination, termite damage, and warping.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1C1A17' }}>
                <CheckCircle2 size={16} color="#B08D57" />
                <span>IS:710 Marine Grade Wood Certification</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1C1A17' }}>
                <CheckCircle2 size={16} color="#B08D57" />
                <span>Lifetime Post-Installation Service Desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
