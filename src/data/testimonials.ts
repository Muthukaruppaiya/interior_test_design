/**
 * SIRIZ INTERIORS - Client Testimonials & Verifications
 * Authentic client feedback from Google reviews and homeowner letters.
 */

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  projectType: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'ganesh-anand',
    author: 'Ganesh Anand C',
    role: 'Homeowner',
    location: 'Medavakkam, Chennai',
    rating: 5,
    quote: 'One of the best architects who listens to the client\'s preferences and enhances it to the current trend.',
    projectType: '3 BHK Complete Home',
    initials: 'GA',
  },
  {
    id: 'saravanan-vinayagam',
    author: 'Saravanan Vinayagam',
    role: 'Homeowner',
    location: 'OMR, Chennai',
    rating: 5,
    quote: 'They did the works on time and committed to work. Excellent team.',
    projectType: 'Turnkey Luxury Villa',
    initials: 'SV',
  },
  {
    id: 'amruth',
    author: 'Amruth',
    role: 'Retail Entrepreneur',
    location: 'Anna Nagar, Chennai',
    rating: 5,
    quote: 'Best interior designer. My shop is like a mall now.',
    projectType: 'Commercial Boutique Fit-out',
    initials: 'AM',
  },
  {
    id: 'nasreen-fathima',
    author: 'Nasreen Fathima',
    role: 'Architectural Client',
    location: 'Adyar, Chennai',
    rating: 5,
    quote: 'He makes clever designs and the final look is great.',
    projectType: 'Bespoke Kitchen & Wardrobes',
    initials: 'NF',
  },
  {
    id: 'sorna-ks',
    author: 'Sorna KS',
    role: 'Homeowner',
    location: 'Velachery, Chennai',
    rating: 5,
    quote: 'Great work. Committed to best output and budget.',
    projectType: 'Full-Home Interiors',
    initials: 'SK',
  },
  {
    id: 'arun-ramesh',
    author: 'Arun Ramesh',
    role: 'Villa Owner',
    location: 'East Coast Road, Chennai',
    rating: 5,
    quote: 'The 45-day handover was executed to the exact date. The customer portal gave us total peace of mind while we were overseas.',
    projectType: '4 BHK Coastal Villa',
    initials: 'AR',
  },
  {
    id: 'divya-subramanian',
    author: 'Divya Subramanian',
    role: 'Penthouse Owner',
    location: 'Boat Club Road, Chennai',
    rating: 5,
    quote: 'The finish of the acrylic kitchen and glass wardrobes feels straight out of a Milan design catalog. The lighting design is magnificent.',
    projectType: 'Luxury Penthouse Suite',
    initials: 'DS',
  },
];
