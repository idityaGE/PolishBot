import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAIConfigError } from '../utils/errors';

let genAI: GoogleGenerativeAI;
let model: any;

export function initializeAI() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new OpenAIConfigError('Gemini API key is not configured');
  }

  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-pro" });
}

export interface GenerateResponseOptions {
  maxTokens?: number;
  temperature?: number;
  model?: string; // kept for compatibility, but Gemini uses fixed models
}

export async function generateResponse(
  prompt: string,
  options: GenerateResponseOptions = {}
): Promise<string> {
  if (!genAI || !model) {
    throw new OpenAIConfigError('Gemini client not initialized');
  }

  const {
    maxTokens = 150,
    temperature = 0.7,
  } = options;

  try {
    // Configure the generation parameters
    const generationConfig = {
      temperature: temperature,
      maxOutputTokens: maxTokens,
      topP: 0.8,
      topK: 40,
    };

    // Generate the response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;
    const generatedText = response.text();

    if (!generatedText) {
      throw new Error('No response generated');
    }

    return generatedText.trim();
  } catch (error: any) {
    console.error('Gemini API Error:', {
      message: error.message,
      details: error.details,
    });
    throw error;
  }
}