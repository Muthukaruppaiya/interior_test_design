export const SECTION_TARGETS = [
  '#hero',        // 0
  '#statement',   // 1
  '#work',        // 2
  '#doorway',     // 3
  '#process',     // 4
  '#studio',      // 5
  '#materials',   // 6
  '#testimonial', // 7
  '#contact',     // 8
];

export function useLenis() {
  // Navigation is handled deterministically via FullPage Slide transitions
}

export function scrollToTarget(target: string) {
  window.dispatchEvent(
    new CustomEvent('siriz-navigate-slide', {
      detail: { target },
    })
  );
}
