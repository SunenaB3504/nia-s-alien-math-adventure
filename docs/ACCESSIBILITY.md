Accessibility Checklist

1. Keyboard navigation
- All interactive elements reachable via Tab.
- Focus order logical and visually indicated.

2. Screen reader
- Buttons have aria-label when icon-only.
- Parent PIN input has an associated label.
- Dynamic content (AI replies, success/error overlays) announced using `aria-live="polite"` or `assertive` as appropriate.

3. Color contrast
- Body text contrast >= 4.5:1.
- Decorative elements may be lower but should not convey information.

4. Forms
- Inputs have labels or aria-labels and placeholders where helpful.

5. Animations
- Respect reduced-motion media query; provide reduced-motion alternatives.

6. Testing
- Run Axe or Lighthouse audit in CI.
