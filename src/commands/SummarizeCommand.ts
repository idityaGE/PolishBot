import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { generateResponse } from '../services/openai';
import { ValidationError } from '../utils/errors';

export class SummarizeCommand implements Command {
  name = 'summarize';
  description = 'Summarizes a piece of text into a concise but comprehensive version';
  
  async execute(message: Message, args: string[]): Promise<string> {
    if (!args.length) {
      throw new ValidationError('Please provide text to summarize.');
    }

    const input = args.join(' ');
    const prompt = `Provide a concise but comprehensive summary of the following text:\n\n${input}`;

    try {
      const summary = await generateResponse(prompt, {
        temperature: 0.5, // Lower temperature for more focused summary
        maxTokens: 250
      });

      await message.reply(summary);
      return summary;
    } catch (error: any) {
      throw new Error(`Failed to summarize text: ${error.message}`);
    }
  }
}