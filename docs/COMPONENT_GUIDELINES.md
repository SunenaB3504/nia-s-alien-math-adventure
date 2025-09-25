Component Guidelines

Purpose
- Provide rules, prop conventions, and accessibility requirements so new components match existing patterns and are easy to reuse.

General rules
- Components should be small and single-responsibility.
- Expose clear props for content and behavior; avoid implicit global state.
- Prefer functional components with explicit TypeScript props.
- Add unit tests and Storybook stories for each new component.

Naming & API
- Components that render UI should be PascalCase and file names should match (e.g., GameUI.tsx).
- Props use plain names: `label`, `onClick`, `isDisabled`, `size`, `variant`, `ariaLabel`.

Accessibility
- All interactive elements must accept `aria-label` and `tabIndex` where necessary.
- Provide `aria-live` regions for announcements (scores, rewards, AI responses).

Variants & theming
- Components should accept a `className` prop and use `clsx`/`classnames` to merge classes.
- Do not hardcode colors; derive them from design tokens or Tailwind classes mapped to tokens.

Testing
- Provide at least one unit test and one story for each component.
- Test keyboard navigation and ARIA attributes.
