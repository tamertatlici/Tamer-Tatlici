
import { GoogleGenAI } from "@google/genai";
import type { Dealer, GeminiInfo } from '../types';

let ai: GoogleGenAI | null = null;

const getAi = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export async function getDealerInfo(dealer: Dealer): Promise<GeminiInfo> {
  const gemini = getAi();
  
  const prompt = `Find the latest information, such as business hours, recent customer reviews, and exact location for the furniture store '${dealer.fullName}' located at or near '${dealer.address}'. Please provide a summary.`;

  try {
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    const summary = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources = groundingChunks
      .map((chunk: any) => chunk.maps ? { uri: chunk.maps.uri, title: chunk.maps.title } : null)
      .filter((source: any): source is { uri: string; title: string } => source !== null && source.uri && source.title);

    return { summary, sources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
}
