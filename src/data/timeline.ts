/**
 * SIRIZ INTERIORS - Studio Timeline Data
 * NOTE: These milestones are marked as editable placeholders.
 * The client can update dates and historical records to match verified milestones.
 */

export interface TimelineMilestone {
  year: number;
  label: string;
  headline: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export const studioMilestones: TimelineMilestone[] = [
  {
    year: 2013,
    label: 'Foundation',
    headline: 'Studio Established in Chennai',
    description: 'Siriz Interiors was founded with a quiet philosophy: architectural discipline, honest materials, and bespoke craftsmanship for South India’s finest residences.',
    metric: '1st',
    metricLabel: 'Atelier opened in Medavakkam',
  },
  {
    year: 2016,
    label: 'Manufacturing',
    headline: 'In-House Precision Factory Built',
    description: 'To end third-party contractor delays, we established our own dedicated 12,000 sq.ft computerized joinery plant equipped with German edge-banding and CNC cutting machines.',
    metric: '100%',
    metricLabel: 'In-house production quality control',
  },
  {
    year: 2019,
    label: 'Design Tech',
    headline: 'Full-Scale 3D & VR Adoption',
    description: 'Introduced photorealistic architectural walkthroughs, allowing homeowners to review every lighting beam, texture, and millimeter before factory production starts.',
    metric: 'Zero',
    metricLabel: 'On-site execution surprises',
  },
  {
    year: 2021,
    label: 'Virtual Walkthroughs',
    headline: '360° Interactive Virtual Tours',
    description: 'Launched immersive multi-room 360° digital twin walkthroughs for NRI and pan-India clients seeking turnkey homes across Tamil Nadu.',
    metric: '45 Days',
    metricLabel: 'Guaranteed delivery commitment',
  },
  {
    year: 2023,
    label: 'Client Transparency',
    headline: 'Dedicated Customer Portal Launch',
    description: 'Homeowners gained 24/7 smartphone access to daily on-site webcam feeds, material certifications, milestone approvals, and warranty tracking.',
    metric: '600+',
    metricLabel: 'Completed luxury homes',
  },
  {
    year: 2026,
    label: 'Present Day',
    headline: 'A Decade of Uncompromising Turnkey Luxury',
    description: 'Over 600 homes delivered across Chennai, Coimbatore, and Tamil Nadu. Expanding into next-generation biometric joinery and sustainable architectural acoustics.',
    metric: '10-Year',
    metricLabel: 'Direct wooden work warranty',
  },
];
