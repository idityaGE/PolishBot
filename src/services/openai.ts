import OpenAI from 'openai';
import { OpenAIConfigError } from '../utils/errors';

let openai: OpenAI;

export function initializeOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new OpenAIConfigError('OpenAI API key is not configured');
  }

  openai = new OpenAI({
    apiKey,
    timeout: 30000,
    maxRetries: 3,
  });
}

export interface GenerateResponseOptions {
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

export async function generateResponse(
  prompt: string,
  options: GenerateResponseOptions = {}
): Promise<string> {
  if (!openai) {
    throw new OpenAIConfigError('OpenAI client not initialized');
  }

  const {
    maxTokens = 150,
    temperature = 0.7,
    model = 'gpt-4o-mini',
  } = options;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model,
      max_tokens: maxTokens,
      temperature,
    });

    const generatedText = completion.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error('No response generated');
    }

    return generatedText.trim();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error('OpenAI API Error:', {
        status: error.status,
        message: error.message,
        code: error.code,
        type: error.type,
      });
    }
    throw error;
  }
}