import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { generateResponse } from '../services/openai';
import { ValidationError } from '../utils/errors';

export class StyleCommand implements Command {
  name = 'style';
  description = 'Transforms casual text into a professional version';

  async execute(message: Message, args: string[]): Promise<string> {
    if (!args.length) {
      throw new ValidationError('Please provide a message to style.');
    }

    const input = args.join(' ');
    const prompt = `Transform the following casual message into a professional version:\n\n${input}`;

    try {
      const professionalVersion = await generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 300
      });

      await message.reply(professionalVersion);
      return professionalVersion;
    } catch (error: any) {
      throw new Error(`Failed to style message: ${error.message}`);
    }
  }
}