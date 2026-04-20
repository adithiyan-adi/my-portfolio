# Design Brief: Adithiyan Portfolio

## Tone & Purpose
Refined, industrial-minimalist showcase for VLSI/Embedded Systems engineering talent. Communicates precision, technical depth, and approachable competence to recruiters. Hardware-inspired but elevated — NOT dark/trendy.

## Differentiation
Neumorphic card depth (soft shadows), glassmorphism overlays, subtle circuit-pattern background, animated hardware metaphors. Soft light theme (never harsh white) with muted teal/blue accent. Feels like a premium engineering product.

## Color Palette

| Token | OKLCH | Purpose | Light | Dark |
|-------|-------|---------|-------|------|
| Primary | 0.55 0.12 230 | CTAs, interactive states, accents | Muted teal-blue | Lighter teal-blue |
| Accent | 0.48 0.15 180 | Highlights, active states, emphasis | Cyan-teal | Bright cyan |
| Background | 0.975 0.01 0 | Page background | Soft white | Deep slate (0.12) |
| Card | 0.98 0.005 0 | Section containers | Near-white | Slate (0.16) |
| Foreground | 0.16 0.02 240 | Body text, primary content | Dark slate | Light grey |
| Muted | 0.92 0.02 0 | Disabled, secondary, subtle | Light grey | Slate (0.20) |
| Destructive | 0.58 0.21 23 | Error, delete actions | Red-orange | Brighter red |

## Typography
- **Display:** General Sans (600–700 weight, geometric, engineering-focused)
- **Body:** General Sans (400–500 weight, warm, readable)
- **Mono:** Geist Mono (code snippets, specs, tech details)
- **Scale:** 32/28/24/20/16/14/12px (heading hierarchy)

## Elevation & Depth
- **Neumorphic cards:** Subtle dual shadows (highlight + shadow) for depth without harsh elevation
- **Glassmorphism:** 12px blur, 70% opacity, subtle border for glass overlays (hero section, section headers)
- **Shadow hierarchy:** `subtle` (micro), `elevated` (containers), `glass` (overlays)
- **No neon or glow effects** — refinement through restraint

## Structural Zones

| Zone | Treatment | Rationale |
|------|-----------|-----------|
| Header/Nav | `bg-card` with `border-b` in `border` | Subtle separation, not floating |
| Hero | `bg-background` + glassmorphism overlay, animated circuit background | Premium entrance, hardware metaphor |
| Content sections | Alternating `bg-background` and `bg-muted/5` | Rhythm without harshness |
| Cards (projects/skills) | `neumorphic` class, `border` with rounded | Depth, interaction readiness |
| CTA buttons | `chip-button` class (neumorphic), primary/accent colors | Tactile, inviting, not flat |
| Footer | `bg-muted/10` with `border-t` | Grounded closure |

## Component Patterns
- **Buttons:** Chip-style (full-width rounded), neumorphic shadow, smooth hover scale
- **Cards:** Rounded corners (12px default), border + subtle shadow, hover lift (3D tilt via CSS transforms)
- **Forms:** Minimal input styling, clear focus ring in accent color
- **Links:** Underline on hover, accent color, smooth transition
- **Badge/Tags:** Chip-like with muted background, rounded full

## Motion & Micro-interactions
- **Scroll entrance:** Staggered `slide-up` animations (0.5s ease-out)
- **Hover states:** Smooth scale (1.02x), shadow elevation, text gradient on headlines
- **Card tilt:** CSS 3D transform (max 6° rotation) on mousemove (no WebGL)
- **Background:** Subtle `circuit-pulse` animation (2s) on particle/line elements
- **Floating elements:** `float` animation (3s ease-in-out) on hero graphic
- **Transitions:** All 0.3s `cubic-bezier(0.4, 0, 0.2, 1)` for smoothness

## Constraints
- Light theme as default; dark mode via class-based toggle (`.dark`)
- Max 3 fonts loaded (General Sans display + body, Geist Mono)
- No WebGL, heavy shadows, or glow effects
- Mobile-first responsive (sm/md/lg breakpoints)
- OKLCH color values only (no hex, rgb, or hsl)
- Semantic token naming (no arbitrary color classes)

## Signature Detail
**Animated circuit background:** Subtle grid of geometric lines and nodes that pulse gently, evoking hardware/PCB design without overwhelming. Appears on hero section and optionally as watermark on dark sections. Reinforces "engineering" positioning.

## Mood
Premium. Calm. Intelligent. Professional without being corporate. Elegant without being precious. Ready for Qualcomm/NVIDIA/Texas Instruments recruiter eyes.
