STYLE GUIDE — Nia's Alien Math Adventure

Purpose
- Define visual language and micro-interaction rules so future UI changes preserve the same look-and-feel.

Design tokens (source of truth in docs/design-tokens.json)
- Colors: primary = #06b6d4 (cyan-400), accent = #7c3aed (purple-600), success = #10b981 (green-500), danger = #ef4444 (red-500), bg-dark = #0f172a, bg-soft = #e6fffa
- Typography: base font-family: Inter, fallback: system-ui; base font-size: 16px; headings scale: 1.5x / 1.25x / 1.15x
- Spacing: small = 4px, base = 8px, medium = 16px, large = 32px
- Radii: pill = 9999px, default = 12px, small = 6px
- Motion: short = 120ms, standard = 300ms, long = 600ms

Components & patterns
- Buttons: primary (solid), secondary (outline), icon buttons (circular). All buttons must have a visible focus ring (2px) and accessible aria-label where icon-only.
- Overlays: background black at 30-50% opacity, centered content, subtle scale-in animation (scale from 0.95→1, 200-300ms).
- Dialog copy & voice: Alien (curious — short 1–2 sentences). Nia responses are simple. Keep microcopy simple and age-appropriate.
- Emoji usage: allowed for character faces and rewards; avoid using emoji as the only informative label — always pair with text or aria-label.

Accessibility rules (summary — see ACCESSIBILITY.md for full checklist)
- All interactive elements keyboard-focusable; use aria-labels, visible labels, and aria-live regions for dynamic feedback.
- Contrast ratio minimum 4.5:1 for body text, 3:1 for large text.

Developer notes
- Prefer Tailwind utility classes mapped to tokens; avoid inline styles unless data-driven and unavoidable.
- Update docs/design-tokens.json when adding/changing colors or spacing. Also update tailwind.config.js.
