/**
 * SIRIZ INTERIORS — Ultra-Luxury Architectural Media Registry
 * 
 * Curated high-resolution editorial photography (Phase One / Architectural Digest standard).
 * All images follow a cohesive warm daylight, ivory-sand-brass palette, shot at wide eye-level angles.
 * 
 * To replace with real studio photography:
 * Simply replace the image URLs here without altering any component logic.
 * See /src/data/README.md for recommended image sizes and aspect ratios.
 */

export interface MediaItem {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  type?: string;
  image: string;
  alt: string;
  aspectRatio?: string;
}

export const media = {
  // ── 1. Hero Cinematic Slides (3 Images, cross-fade with slow zoom) ──
  hero: [
    {
      id: 'hero-1',
      number: '01',
      title: 'The OMR Penthouse',
      subtitle: 'Double-Height Living Architecture',
      location: 'Old Mahabalipuram Road, Chennai',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=88',
      alt: 'Luxury double-height penthouse living room in Chennai bathed in warm golden daylight with travertine walls and brass details',
    },
    {
      id: 'hero-2',
      number: '02',
      title: 'Boat Club Culinary Suite',
      subtitle: 'Minimal Fluted Oak & Island',
      location: 'Boat Club Road, Chennai',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2560&q=88',
      alt: 'Architectural minimal kitchen with fluted oak cabinetry, seamless quartz island, and warm ambient backlighting',
    },
    {
      id: 'hero-3',
      number: '03',
      title: 'Poes Garden Sanctuary',
      subtitle: 'Master Bedroom & Glass Dressing Pavilion',
      location: 'Poes Garden, Chennai',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2560&q=88',
      alt: 'Serene master bedroom suite in neutral ivory and sand tones with textured linen drapery and soft morning daylight',
    },
  ],

  // ── 2. Statement Section Floating Accents ──
  statement: {
    floating1: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85',
    floating2: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
  },

  // ── 3. Selected Work: 5 Giant Panels for Pinned Horizontal Scroll ──
  selectedWork: [
    {
      id: 'villa-aditya',
      number: '01',
      title: 'Villa Aditya',
      type: 'Residence, ECR, Chennai',
      year: '2024',
      area: '4,850 sq.ft',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=88',
      alt: 'Double-height luxury villa living room along East Coast Road Chennai with floor-to-ceiling glass and travertine fireplace',
    },
    {
      id: 'lumina-dressing',
      number: '02',
      title: 'Lumina Dressing Pavilion',
      type: 'Wardrobe Suite, Boat Club Road',
      year: '2024',
      area: '480 sq.ft',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=2200&q=88',
      alt: 'Walk-in wardrobe with amber profile glass sliding partitions, concealed warm LEDs, and stitched leather shelving',
    },
    {
      id: 'swarna-pooja',
      number: '03',
      title: 'Swarna Sacred Sanctum',
      type: 'Pooja Mandir, Mylapore',
      year: '2024',
      area: '220 sq.ft',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=88',
      alt: 'Hand-carved teakwood pooja room with backlit brass Kalash motifs and pristine Makrana white marble sanctum',
    },
    {
      id: 'culinary-island',
      number: '04',
      title: 'The Culinary Pavilion',
      type: 'Bespoke Kitchen, Poes Garden',
      year: '2023',
      area: '620 sq.ft',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88',
      alt: 'Bespoke modular kitchen with fluted marble waterfall island and brushed champagne brass hardware',
    },
    {
      id: 'atelier-office',
      number: '05',
      title: 'The Executive Study',
      type: 'Home Office, Nungambakkam',
      year: '2023',
      area: '380 sq.ft',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2200&q=88',
      alt: 'Quiet architectural library and private study with smoked walnut wood paneling and concealed acoustic dampening',
    },
  ],

  // ── 4. Doorway Zoom Transition (Walk into Next Space) ──
  doorway: {
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=2560&q=88',
    alt: 'Grand arched architectural portal looking through to a sunlit luxury interior colonnade',
    caption: 'Walk in.',
  },

  // ── 5. Process Minimal: 4 Words with Synced Imagery ──
  process: [
    {
      word: 'Imagine',
      tagline: 'Spatial discovery and lifestyle choreography.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
      alt: 'Architectural mood boards, floor plan sketches, and material discovery consultation',
    },
    {
      word: 'Design',
      tagline: 'Seen in 3D before a single cut.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      alt: 'Photorealistic architectural 3D rendering with lighting simulations',
    },
    {
      word: 'Craft',
      tagline: 'In-house precision joinery and noble stones.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85',
      alt: 'German CNC computerized cutting and laser edge-banding in Siriz in-house facility',
    },
    {
      word: 'Deliver',
      tagline: 'White-glove handover in forty-five days.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      alt: 'Completed turn-key home handover in Chennai with 10-year warranty document',
    },
  ],

  // ── 6. Atelier Strip: 8 Material Macro Close-ups (No text, pure texture) ──
  atelier: [
    {
      id: 'mat-1',
      name: 'Smoked Walnut Grain',
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=85',
      alt: 'Close-up macro of natural smoked walnut veneer wood grain',
    },
    {
      id: 'mat-2',
      name: 'Honed Calacatta Marble',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
      alt: 'Honed Italian Calacatta gold marble with soft golden veining',
    },
    {
      id: 'mat-3',
      name: 'Brushed Brass Detail',
      image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=85',
      alt: 'Warm brushed champagne brass hardware handle with knurled grip',
    },
    {
      id: 'mat-4',
      name: 'Fluted Acoustic Panel',
      image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=85',
      alt: 'Vertical fluted oak architectural acoustic paneling in natural sunlight',
    },
    {
      id: 'mat-5',
      name: 'Belgian Linen Weave',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=85',
      alt: 'Tactile natural ivory raw linen textile weave',
    },
    {
      id: 'mat-6',
      name: 'Honed Sand Limestone',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=85',
      alt: 'Honed ivory sand limestone architectural block with micro fossil textures',
    },
    {
      id: 'mat-7',
      name: 'Pendant Glass & Brass',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85',
      alt: 'Minimalist hand-blown frosted glass and brass ceiling pendant fixture',
    },
    {
      id: 'mat-8',
      name: 'Precision Mitred Joinery',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=85',
      alt: 'Seamless 45-degree mitred wood edge with hairline brass inlay',
    },
  ],

  // ── 7. Single Testimonial Soft Backdrop ──
  testimonialBackdrop: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=70',

  // ── Compatibility Aliases for Modal & Chatbot ──
  projects: [
    {
      id: 'villa-aditya',
      slug: 'villa-aditya-ecr',
      title: 'Villa Aditya',
      category: 'Villa',
      location: 'East Coast Road, Chennai',
      year: '2024',
      area: '4,850 sq.ft',
      duration: '42 Days',
      coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      summary: 'Double-height luxury oceanfront villa with seamless travertine flooring and floor-to-ceiling glass.',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      ],
      palette: ['#F8F5EF', '#EEE8DD', '#A98852', '#1B1916'],
      scope: ['Turnkey Fit-Out', 'Travertine Cladding', 'Double-Height Joinery'],
    },
    {
      id: 'boat-club',
      slug: 'lumina-dressing-suite',
      title: 'Lumina Dressing Pavilion',
      category: 'Wardrobe and Storage',
      location: 'Boat Club Road, Chennai',
      year: '2024',
      area: '480 sq.ft',
      duration: '22 Days',
      coverImage: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1600&q=85',
      summary: 'Fluted amber glass sliding partitions with internal warm-LED perimeter channels and leather lining.',
      gallery: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85',
      ],
      palette: ['#F8F5EF', '#D9D1C3', '#A98852', '#1B1916'],
      scope: ['Profile Glass Doors', 'Jewelry Trays', 'Dehumidified Storage'],
    },
    {
      id: 'swarna-pooja',
      slug: 'swarna-pooja-mandir',
      title: 'Swarna Sacred Sanctum',
      category: 'Pooja Room',
      location: 'Mylapore, Chennai',
      year: '2024',
      area: '220 sq.ft',
      duration: '18 Days',
      coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      summary: 'Teakwood CNC jaali with back-lit brass Kalash emblems and Makrana white marble sanctum base.',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      ],
      palette: ['#FFFFFF', '#EEE8DD', '#A98852', '#8C8272'],
      scope: ['Acoustic Brass Bell Chimes', 'Smoke-Vent Ceiling', 'Hidden Storage'],
    },
  ],

  // Before & After Transformation Comparison
  beforeAfter: {
    title: 'Medavakkam Villa Penthouse Transformation',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    caption: 'From a bare slab to a warm, sun-drenched architectural sanctuary.',
  },

  // 360 Virtual Tour Previews
  virtualTours: [
    {
      id: 'alpha',
      name: 'Villa Alpha Horizon',
      tag: '4 BHK Duplex · ECR',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      rooms: 6,
      sqft: '4,600',
    },
    {
      id: 'radiance',
      name: 'Radiance Tower Suite',
      tag: '3 BHK Luxury · OMR',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      rooms: 5,
      sqft: '2,900',
    },
  ],
};
