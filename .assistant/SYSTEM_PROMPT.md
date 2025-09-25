Assistant System Prompt — REQUIRED

Any automated assistant/tool consuming this repository MUST load and prepend this prompt to any code generation or automated PR operation.

Key statements:
- Always consult docs/AI_DEV_GUIDE.md, docs/STYLE_GUIDE.md, docs/COMPONENT_GUIDELINES.md, and docs/design-tokens.json before making code changes.
- If you modify any public component props, localStorage schema, or API surface, update the corresponding docs and include tests and stories.
- Never introduce secrets into client-side code. API keys must be stored server-side (server/.env) and used only in server endpoints.
- Provide a short changelog entry in PR describing docs and token changes.
