/**
 * SIRIZ INTERIORS - Pricing & Indicative Estimate Constants
 * All calculations here are strictly INDICATIVE for the Design Concierge calculator.
 * Final quotes are tailored after architectural site audits and material selections.
 */

export interface PricingPackage {
  id: string;
  name: string;
  nameTa: string;
  startingPrice: number;
  startingPriceFormatted: string;
  unit: string;
  description: string;
  features: string[];
}

export const BASE_PACKAGES: Record<string, PricingPackage> = {
  kitchen: {
    id: 'kitchen',
    name: 'Bespoke Modular Kitchen',
    nameTa: 'மாடுலர் சமையலறை',
    startingPrice: 69000,
    startingPriceFormatted: '₹69,000',
    unit: 'base unit',
    description: 'Precision German joinery with BWP Marine Ply and soft-close mechanisms.',
    features: ['BWP 710 Marine Ply', 'Soft-Close Hardware', 'Anti-Fingerprint Acrylic', 'Custom Layouts'],
  },
  wardrobe: {
    id: 'wardrobe',
    name: 'Lumina Wardrobe Pavilion',
    nameTa: 'அலமாரி வடிவமைப்பு',
    startingPrice: 100000,
    startingPriceFormatted: '₹1,00,000',
    unit: 'per unit',
    description: 'Floor-to-ceiling sliding, hinged, or profile-glass wardrobes with internal sensor illumination.',
    features: ['Profile Amber Glass or Acrylic', 'Integrated LED Channels', 'BWP Marine Carcasses', 'Push-to-Open Lofts'],
  },
  fullHome: {
    id: 'fullHome',
    name: 'Complete Turnkey Residence',
    nameTa: 'முழுமையான இல்ல வடிவமைப்பு',
    startingPrice: 325000,
    startingPriceFormatted: '₹3,25,000',
    unit: 'base 2 BHK',
    description: 'End-to-end turnkey fit-out: kitchen, wardrobes, false ceiling, lighting & living decor.',
    features: ['Modular Kitchen Included', 'Master & Guest Wardrobes', 'Living TV Console & Slats', 'Designer False Ceiling', '45-Day Guaranteed Handover'],
  },
};

export interface RoomCostRate {
  room: string;
  nameTa: string;
  icon: string;
  baseMin: number;
  baseMax: number;
}

export const ROOM_RATES: Record<string, RoomCostRate> = {
  kitchen: { room: 'Modular Kitchen', nameTa: 'சமையலறை', icon: '🍳', baseMin: 69000, baseMax: 180000 },
  living: { room: 'Living & Dining', nameTa: 'வரவேற்பறை & உணவறை', icon: '🛋️', baseMin: 75000, baseMax: 220000 },
  masterBed: { room: 'Master Bedroom & Wardrobe', nameTa: 'முதன்மை படுக்கையறை', icon: '🛏️', baseMin: 95000, baseMax: 240000 },
  guestBed: { room: 'Guest Bedroom & Wardrobe', nameTa: 'விருந்தினர் படுக்கையறை', icon: '🚪', baseMin: 70000, baseMax: 160000 },
  pooja: { room: 'Sacred Pooja Unit', nameTa: 'பூஜை அறை', icon: '🙏', baseMin: 35000, baseMax: 90000 },
  office: { room: 'Home Office Atelier', nameTa: 'பணி அறை', icon: '💻', baseMin: 40000, baseMax: 110000 },
  kids: { room: 'Kids Bedroom Suite', nameTa: 'குழந்தைகள் அறை', icon: '🧸', baseMin: 65000, baseMax: 150000 },
};

/**
 * Calculates an indicative turnkey investment range based on selected rooms and square footage.
 * NOTE: Multipliers reflect standard Chennai luxury material tiers (BWP Ply, Acrylic/PU, Quartz).
 */
export function calculateIndicativeEstimate(
  selectedRooms: string[],
  carpetAreaSqFt: number = 1200
): { min: number; max: number; minFormatted: string; maxFormatted: string; disclaimer: string } {
  let totalMin = 0;
  let totalMax = 0;

  if (selectedRooms.length === 0) {
    // Default 3 BHK estimate
    totalMin = BASE_PACKAGES.fullHome.startingPrice;
    totalMax = totalMin * 1.8;
  } else {
    selectedRooms.forEach((r) => {
      const rate = ROOM_RATES[r];
      if (rate) {
        totalMin += rate.baseMin;
        totalMax += rate.baseMax;
      } else {
        totalMin += 45000;
        totalMax += 110000;
      }
    });
  }

  // Scale with carpet area baseline (1000 sq ft baseline)
  const areaMultiplier = Math.max(0.75, Math.min(2.5, carpetAreaSqFt / 1000));
  const finalMin = Math.round((totalMin * areaMultiplier) / 5000) * 5000;
  const finalMax = Math.round((totalMax * areaMultiplier) / 5000) * 5000;

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return {
    min: finalMin,
    max: finalMax,
    minFormatted: formatINR(finalMin),
    maxFormatted: formatINR(finalMax),
    disclaimer:
      'Indicative range only. Every home is unique. A senior Siriz architect will confirm the final quote after an on-site spatial survey and material specification.',
  };
}
