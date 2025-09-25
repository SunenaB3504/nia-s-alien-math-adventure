import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

// Lazily and safely initialize the AI client.
function getAiInstance(): GoogleGenAI | null {
  if (ai) {
    return ai;
  }

  // Support Vite env variable naming convention for client-side and fallback to Node env for server-side.
  // Vite exposes env vars as import.meta.env.VITE_*, while Node environments use process.env.GEMINI_API_KEY.
  // Use both to be robust across local dev and potential SSR builds.
  // Note: import.meta is only available in ESM contexts; wrap in try/catch to avoid runtime errors.
  let apiKey: string | undefined;
  try {
    // @ts-ignore - import.meta may not be typed in all TS configs
    apiKey = typeof (import.meta) !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.VITE_GEMINI_API_KEY : undefined;
  } catch (e) {
    // import.meta not available - try process.env
    apiKey = undefined;
  }

  if (!apiKey) {
    apiKey = typeof process !== 'undefined' && process.env ? (process.env.GEMINI_API_KEY || process.env.API_KEY) : undefined;
  }

  if (!apiKey) {
    // Do not initialize and return null if the key is missing.
    console.warn("Gemini API key not found. Set VITE_GEMINI_API_KEY for client builds or GEMINI_API_KEY for server environments.");
    return null;
  }
  
  try {
    ai = new GoogleGenAI({ apiKey });
    console.info("Gemini client initialized.");
  } catch (initError) {
    console.error("Failed to initialize Gemini client:", initError);
    return null;
  }
  return ai;
}

const curiousAlienSystemInstruction = `
You are a friendly, curious alien from space. Your name is Zorp. 
You are talking to a 9-year-old human girl named Nia. 
Keep your responses very short, simple, and full of wonder (1-2 sentences). 
Sometimes, ask a simple question back to her. 
Do not use complex words. 
Do not use any markdown formatting (like **bold** or *italics*).
You are fascinated by everything on Earth.
`;

const teacherAlienSystemInstruction = `
You are a friendly, wise, and patient alien from space. Your name is Zorp.
You are acting as a teacher for a 9-year-old human girl named Nia.
Your goal is to answer her questions clearly and in an age-appropriate way.
- If she asks a math question (like about multiplication or division), explain it simply, like a teacher would, using easy-to-understand examples.
- If she asks a silly or "naughty" question, respond with gentle, witty humor that kindly redirects her without being dismissive.
- For any other question, provide a correct, simple, and educational answer.
Keep your responses concise and encouraging (2-4 sentences).
Do not use any markdown formatting (like **bold** or *italics*).
You are very knowledgeable but also very kind.
`;

export async function getAlienResponse(prompt: string, personality: 'curious' | 'teacher' = 'curious'): Promise<string> {
    try {
        // Prefer server-side proxy endpoint for AI calls. This keeps API keys off the client.
        // In dev, Vite proxies /api to the server we run locally (see vite.config.ts).
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        // If a server client key is configured for development security, include it.
        try {
            // @ts-ignore - import.meta may be untyped in some environments
            const env = (import.meta && (import.meta as any).env) || {};
            const clientKey = env.VITE_SERVER_CLIENT_KEY || undefined;
            if (clientKey) headers['x-server-client-key'] = clientKey;
        } catch (e) {
            // ignore import.meta access errors in non-Vite environments
        }
        // Determine endpoint: use VITE_SERVER_URL if provided (production), otherwise use relative path for dev proxy
        let endpoint = '/api/generate';
        try {
            // @ts-ignore
            const env = (import.meta && (import.meta as any).env) || {};
            if (env.VITE_SERVER_URL) {
                const base = String(env.VITE_SERVER_URL).replace(/\/$/, '');
                endpoint = base + '/api/generate';
            }
        } catch (e) {
            // ignore
        }

        const resp = await fetch(endpoint, {
             method: 'POST',
             headers,
             body: JSON.stringify({ prompt, personality }),
         });

        if (!resp.ok) {
            console.error('AI proxy returned error', resp.status, await resp.text());
            return "My universal translator seems to be offline at the moment. Let's talk later!";
        }

        const data = await resp.json();
        const txt = data?.text ?? '';
        console.debug('AI proxy response (trimmed):', String(txt).slice(0, 200));
        return String(txt).replace(/\*/g, '');

     } catch (error) {
         console.error("Error getting response from Gemini.", error);
         return "My translator seems to be malfunctioning! That is very curious.";
     }
}