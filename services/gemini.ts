import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export interface AnalyzedProductData {
    name: {
        en: string;
        jp: string;
    };
    description: {
        en: string;
        jp: string;
    };
}

export const analyzeProductImage = async (imageBase64: string): Promise<AnalyzedProductData | null> => {
    if (!genAI) {
        console.error("Gemini API Key is missing");
        return null;
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Remove data URL prefix if present
        const base64Data = imageBase64.split(',')[1] || imageBase64;

        const prompt = `
      Analyze this product image and provide the following details in JSON format:
      1. Product Name in English (name.en)
      2. Product Name in Japanese (name.jp) - Translate if necessary or use common Japanese name
      3. A short, appealing product description in English (description.en) - Focus on key features, taste, or usage.
      4. A short, appealing product description in Japanese (description.jp) - Natural Japanese marketing copy.

      Return ONLY the JSON object with this structure:
      {
        "name": { "en": "...", "jp": "..." },
        "description": { "en": "...", "jp": "..." }
      }
    `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "image/jpeg", // Assuming JPEG for simplicity, but Gemini handles most common formats
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonString) as AnalyzedProductData;
    } catch (error) {
        console.error("Error analyzing image with Gemini:", error);
        throw error;
    }
};
