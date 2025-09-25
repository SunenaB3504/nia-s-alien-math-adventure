Deploying to GitHub Pages

This project is configured with a GitHub Action (`.github/workflows/deploy-pages.yml`) that builds the client and publishes the `dist` directory to GitHub Pages when you push to `main`.

Steps:
1. Ensure your repository's default branch is `main`. Rename if needed or update the workflow.
2. Set `homepage` in `package.json` if publishing to a project page (e.g., `https://<username>.github.io/<repo>`). For user/org pages, `homepage` is not required.
3. Commit and push to `main`.
4. After the workflow completes, visit the Pages URL shown in the Actions output or in the repository's Pages settings.

Server-side API note:
- GitHub Pages is static hosting only. If you need the server proxy (`server/`) for Gemini calls, deploy it separately (Vercel, Heroku, Railway, AWS Lambda) and update `vite.config.ts` proxy target and `utils/gemini.ts` accordingly.
