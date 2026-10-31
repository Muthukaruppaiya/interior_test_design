import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { scrollToTarget } from '../hooks/useLenis';

interface InvestmentTier {
  id: string;
  title: string;
  tagline: string;
  fromPrice: string;
  isPopular?: boolean;
  features: string[];
  materials: string;
  idealFor: string;
}

const tiers: InvestmentTier[] = [
  {
    id: 'kitchen',
    title: 'Bespoke Culinary Suite',
    tagline: 'Precision Modular Kitchens',
    fromPrice: '₹69,000',
    features: [
      'L-Shape, Parallel, Island or Straight Layouts',
      'Anti-fingerprint acrylic or high-pressure laminates',
      'German soft-close hinges & tandem box drawers',
      'Boiling Water Proof (BWP) 710 marine plywood carcasses',
      'Under-cabinet LED profile lighting channels',
    ],
    materials: 'IS:710 Marine Ply · Blum / Hettich Hardware · Quartz Ready',
    idealFor: 'Apartments & custom villa kitchen refurbishments',
  },
  {
    id: 'complete-home',
    title: 'Complete Turnkey Residence',
    tagline: 'End-to-End Architectural Interior',
    fromPrice: '₹3,25,000',
    isPopular: true,
    features: [
      'Complete Modular Kitchen with cutlery & bottle pullouts',
      'Master & Guest Bedroom Floor-to-Ceiling Wardrobes',
      'Living Room TV Console, Acoustic Slats & Panelling',
      'Designer False Ceiling with layered warm architectural lighting',
      'Custom Pooja Mandir with CNC jaali & warm brass bells',
      'Full 45-Day Handover & Dedicated Portal Supervision',
    ],
    materials: 'Complete In-House Joinery · Italian Marble / Quartz Coordination · 10-Yr Warranty',
    idealFor: '2 BHK, 3 BHK & 4 BHK new homeowner handovers',
  },
  {
    id: 'wardrobe',
    title: 'Lumina Wardrobe Pavilion',
    tagline: 'Full-Height Storage & Walk-in Suites',
    fromPrice: '₹1,00,000',
    features: [
      'Sliding, Hinged or Amber Profile-Glass Door Systems',
      'Integrated sensor LED hanging rails & jewelry organizers',
      'Zero-VOC anti-bacterial interior fabric laminates',
      'Floor-to-ceiling loft integration with push-to-open touch',
      'Internal dressing vanity mirrors & concealed drawers',
    ],
    materials: 'Fluted Glass · Leather Trays · BWP Marine Core · Concealed Dampers',
    idealFor: 'Master dressing rooms & executive apartments',
  },
];

export default function InvestmentGuide() {
  return (
    <section
      id="investment"
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
              (09) Investment Guide
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
              Transparent <span style={{ fontStyle: 'italic', color: '#B08D57' }}>Investment</span>
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
            Direct-from-factory pricing with zero hidden contractor markups. Honest, itemised architectural investments.
          </div>
        </div>

        {/* 3 Investment Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch',
            marginBottom: '40px',
          }}
          className="investment-cards-grid"
        >
          {tiers.map((tier) => (
            <div
              key={tier.id}
              style={{
                position: 'relative',
                background: tier.isPopular ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(24px) saturate(140%)',
                border: tier.isPopular ? '2px solid #B08D57' : '1px solid rgba(255, 255, 255, 0.9)',
                borderRadius: '24px',
                padding: '48px 36px',
                boxShadow: tier.isPopular
                  ? '0 25px 60px rgba(176, 141, 87, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1)'
                  : '0 20px 45px rgba(60, 45, 20, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#B08D57',
                    color: '#FFFFFF',
                    padding: '6px 20px',
                    borderRadius: '999px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 6px 18px rgba(176, 141, 87, 0.4)',
                  }}
                >
                  <Sparkles size={12} />
                  <span>Most Chosen Studio Commission</span>
                </div>
              )}

              <div>
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
                  {tier.tagline}
                </div>

                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '32px',
                    fontWeight: 500,
                    color: '#1C1A17',
                    margin: '0 0 20px 0',
                    lineHeight: 1.15,
                  }}
                >
                  {tier.title}
                </h3>

                {/* Starting From Price */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px',
                    padding: '16px 0',
                    borderTop: '1px solid rgba(176, 141, 87, 0.2)',
                    borderBottom: '1px solid rgba(176, 141, 87, 0.2)',
                    marginBottom: '28px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(28, 26, 23, 0.55)',
                    }}
                  >
                    Starting from
                  </span>
                  <span
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '44px',
                      fontWeight: 600,
                      color: '#1C1A17',
                      lineHeight: 1,
                    }}
                  >
                    {tier.fromPrice}
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(28, 26, 23, 0.4)', fontFamily: 'Inter, sans-serif' }}>
                    *base model
                  </span>
                </div>

                {/* Scope Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {tier.features.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={15} color="#B08D57" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '13px',
                          color: '#1C1A17',
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div>
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(247, 243, 236, 0.65)',
                    border: '1px solid rgba(176, 141, 87, 0.15)',
                    fontSize: '11px',
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(28, 26, 23, 0.7)',
                    marginBottom: '20px',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#B08D57' }}>Materials: </span>
                  {tier.materials}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToTarget('#consultation')}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    borderRadius: '999px',
                    background: tier.isPopular
                      ? 'linear-gradient(135deg, #B08D57 0%, #94713E 100%)'
                      : 'rgba(255, 255, 255, 0.9)',
                    color: tier.isPopular ? '#FFFFFF' : '#1C1A17',
                    border: tier.isPopular ? 'none' : '1px solid rgba(176, 141, 87, 0.35)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: tier.isPopular ? '0 8px 24px rgba(176, 141, 87, 0.35)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!tier.isPopular) {
                      e.currentTarget.style.backgroundColor = '#B08D57';
                      e.currentTarget.style.color = '#FFFFFF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!tier.isPopular) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.color = '#1C1A17';
                    }
                  }}
                >
                  <span>Request a Tailored Quote</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div
          style={{
            textAlign: 'center',
            padding: '24px 32px',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(176, 141, 87, 0.2)',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'rgba(28, 26, 23, 0.65)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            <strong>Architectural Investment Note:</strong> Every residence is unique. Final investment is calculated strictly based on carpet area, finish specifications (acrylic, PU lacquer, Italian veneer, quartz counters), and internal mechanism selection. All proposals include 3D renders, in-house production, on-site installation, and our 10-year wooden work warranty.
          </p>
        </div>
      </div>
    </section>
  );
}
