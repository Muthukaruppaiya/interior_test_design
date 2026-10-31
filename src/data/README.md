# SIRIZ INTERIORS — Media Asset Guide

This directory centralizes all photography and imagery across the website in `src/data/media.ts`.

To replace mock architectural photographs with real client and studio projects, simply update the URLs in `src/data/media.ts`. No component logic or CSS adjustments are needed.

---

## Recommended Dimensions & Aspect Ratios

| Section Slot | Key in `media.ts` | Aspect Ratio | Min Recommended Resolution | Format | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Slides (3)** | `media.hero[0..2]` | `16:9` or `21:9` | **2560 × 1440 px** | AVIF / WebP / JPEG | Full-bleed, warm golden hour, wide eye-level angle, no people. |
| **Statement Floating** | `media.statement.floating1/2`| `4:5` | **900 × 1125 px** | WebP / JPEG | Architectural detail accents with rounded corners. |
| **Selected Work (5)** | `media.selectedWork[0..4]` | `16:10` or `3:2` | **2200 × 1375 px** | WebP / JPEG | Full-height horizontal panels (70vw), ultra-sharp editorial clarity. |
| **Doorway Zoom** | `media.doorway.image` | `16:9` | **2560 × 1440 px** | WebP / JPEG | Symmetrical central arch or doorway leading into another sunlit space. |
| **Process Images (4)** | `media.process[0..3]` | `4:5` or `1:1` | **1600 × 2000 px** | WebP / JPEG | Ideation sketch, 3D render, factory CNC precision, finished space. |
| **Atelier Strip (8)** | `media.atelier[0..7]` | `1:1` or `4:5` | **800 × 1000 px** | WebP / JPEG | Macro tactile close-ups (walnut grain, marble, brass, linen, etc.). |
| **Testimonial Backdrop**| `media.testimonialBackdrop` | `16:9` | **1920 × 1080 px** | WebP / JPEG | Soft, serene interior bathed in daylight with natural depth blur. |

---

## Photography Art Direction Guidelines
- **Palette**: Warm daylight, ivory (`#F8F5EF`), sand/linen (`#EEE8DD`), natural stone (`#D9D1C3`), brushed brass (`#A98852`), and deep ink accents (`#1B1916`).
- **Lighting**: Soft directional natural sunlight through large windows, subtle organic shadows.
- **Composition**: Wide 24mm eye-level architectural perspective, rectilinear lines, clean horizontal and vertical alignments.
- **Atmosphere**: Quiet, minimal, confident, and clutter-free (Yodezeen / Architectural Digest editorial tone).
