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
        const aiInstance = getAiInstance();
        
        if (!aiInstance) {
            console.error("Gemini AI client could not be initialized. This is likely due to a missing API_KEY in the deployment environment.");
            return "My universal translator is offline at the moment. Let's talk later!";
        }
        
        const systemInstruction = personality === 'teacher' 
            ? teacherAlienSystemInstruction 
            : curiousAlienSystemInstruction;

        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            }
        });
        // Clean up any stray markdown just in case
        const txt = (response as any)?.text ?? (response as any)?.content ?? '';
        console.debug("Gemini response (trimmed):", String(txt).slice(0, 200));
        return String(txt).replace(/\*/g, '');

    } catch (error) {
        console.error("Error getting response from Gemini.", error);
        return "My translator seems to be malfunctioning! That is very curious.";
    }
}