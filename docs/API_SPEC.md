API Spec — server endpoints

POST /api/generate
- Description: Proxy to the Generative Language API for assembling short alien replies.
- Request body: { prompt: string, personality?: 'curious' | 'teacher' }
- Request headers: optional `x-server-client-key` (required if SERVER_CLIENT_KEY is configured)
- Response: 200 { text: string } or 4xx/5xx error object

Error codes
- 401: Unauthorized when server expects a client key
- 500: AI client not configured

Notes
- The server should validate incoming prompt payload size and sanitize input before sending to the AI.
- For production, enforce stricter rate limits and per-client quotas.
