AI Developer Guide — for code generation and behavior constraints

Purpose
- Provide rules and prompt templates so AI-assisted code generation preserves architecture, naming, and style.

Key rules
- Do not change design tokens in `docs/design-tokens.json` without updating `STYLE_GUIDE.md` and `tailwind.config.js`.
- New components should be accompanied by a Storybook story and tests.
- When modifying localStorage keys or JSON shapes, add migration code and update `LOCALSTORAGE_SCHEMA.md`.

Prompt template (example)
- "Create a React TypeScript component named X with props { ... } following `COMPONENT_GUIDELINES.md`. It must use design tokens in `docs/design-tokens.json`, be accessible, and include a Storybook story and unit test."

Safety checks
- Never embed secrets or API keys in client code.
- If code must call an external provider, prefer server-side proxy and update `API_SPEC.md`.

Code generation checklist
- TypeScript types defined and exported
- Accessibility attributes present
- Unit tests and story added
- Docs updated if public API changed
