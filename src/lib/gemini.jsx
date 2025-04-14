import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateContent(prompt) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",  // Updated model name
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.9,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("API Error Details:", error);
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}