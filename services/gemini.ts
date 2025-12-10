import { GoogleGenerativeAI } from "@google/generative-ai";
// services/gemini.ts


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_OVERRIDES = import.meta.env.VITE_GEMINI_MODEL as string | undefined;

const DEFAULT_MODELS = [
  
  "models/gemini-2.5-flash",
];

const parseModelList = (value?: string) =>
  value?.split(",").map((m) => m.trim()).filter(Boolean) || [];

const MODEL_PIPELINE = (() => {
  const overridden = parseModelList(MODEL_OVERRIDES);
  return overridden.length ? overridden : DEFAULT_MODELS;
})();

let genAI: GoogleGenerativeAI | null = null;

// MUST use new SDK + v1
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
} else {
  console.error("Gemini API key missing.");
}

export interface AnalyzedProductData {
  name: { en: string; jp: string };
  description: { en: string; jp: string };
}

const createInlineImagePart = (imageBase64: string) => {
  const mimeMatch = imageBase64.match(/^data:(.*?);/);
  const mimeType = mimeMatch?.[1] || "image/jpeg";
  const base64Data = imageBase64.includes(",")
    ? imageBase64.split(",")[1]
    : imageBase64;

  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

const generateWithFallback = async (payload: any[]) => {
  let lastError: unknown = null;

  for (const modelId of MODEL_PIPELINE) {
    try {
      console.log("Trying model:", modelId);
      const model = genAI!.getGenerativeModel({ model: modelId });

      // v1 requires "contents" shape
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: payload,
          },
        ],
      });

      return result.response.text();
    } catch (err) {
      console.warn(`Model ${modelId} failed...`, err);
      lastError = err;
    }
  }

  throw lastError || new Error("All models failed.");
};

export const analyzeProductImage = async (
  imageBase64: string
): Promise<AnalyzedProductData | null> => {
  if (!genAI) {
    console.error("Gemini not initialized.");
    return null;
  }

  const instruction = {
    text: `
Analyze this product image and return ONLY JSON:

{
  "name": { "en": "", "jp": "" },
  "description": { "en": "", "jp": "" }
}

Rules:
- English: normal product name + short description
- Japanese: natural marketing style
`,
  };

  try {
    const payload = [instruction, createInlineImagePart(imageBase64)];
    const raw = await generateWithFallback(payload);

    const clean = raw.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error("Error analyzing image:", err);
    return null;
  }
};
