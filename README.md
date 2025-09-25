<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1tJ2xmdzyTKAkdyZv2RAy1MVmLJzcVqNQ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `VITE_GEMINI_API_KEY` in `.env` (or `.env.local`) to your Gemini API key. You can add an `.env.example` with the variable name for reference.
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project can be deployed to GitHub Pages using the included GitHub Action.

1. Ensure your repo's default branch is `main`. If your main branch has a different name, update `.github/workflows/deploy-pages.yml`.
2. Commit and push your code to the `main` branch.
3. The `deploy-pages` workflow will build the app and publish the `dist` directory to GitHub Pages.
4. Ensure `homepage` in package.json is set if you use a project page (e.g., `https://<username>.github.io/<repo>`), otherwise a user/organization page is used by the action.

Tip: If your app uses server-side proxy (`/api/generate`), you'll need to host that server separately (GitHub Pages is static only). Consider deploying the server as a serverless function or on Heroku/Vercel and update `vite.config.ts` proxy settings accordingly.
