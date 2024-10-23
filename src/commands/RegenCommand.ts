import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { generateResponse } from '../services/openai';
import { ValidationError } from '../utils/errors';

export class RegenCommand implements Command {
  name = 'regen';
  description = 'Generates a different version of the last transformed message';
  
  async execute(message: Message, args: string[], lastTransformedMessage: string | null): Promise<string> {
    if (!lastTransformedMessage) {
      throw new ValidationError('No previous message to regenerate. Please use /style or /md-style first.');
    }

    const prompt = `Generate a different version of the following message, maintaining the same professional tone but using different wording:\n\n${lastTransformedMessage}`;

    try {
      const regeneratedVersion = await generateResponse(prompt, {
        temperature: 0.8, // Slightly higher temperature for more variation
        maxTokens: 400
      });

      await message.reply(regeneratedVersion);
      return regeneratedVersion;
    } catch (error: any) {
      throw new Error(`Failed to regenerate message: ${error.message}`);
    }
  }
}