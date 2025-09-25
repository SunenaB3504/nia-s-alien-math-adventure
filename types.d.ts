/// <reference types="vite/client" />

// Minimal ambient declaration to satisfy vite type resolution in editors that may not have `vite` types installed.
// If you add `@types/*` packages later, you can remove or expand this file.

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY?: string;
    // more env vars...
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
