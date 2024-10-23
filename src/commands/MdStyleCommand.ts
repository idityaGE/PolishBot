import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { generateResponse } from '../services/openai';
import { ValidationError } from '../utils/errors';

export class MdStyleCommand implements Command {
  name = 'md-style';
  description = 'Transforms a message into a well-structured version using Markdown formatting';

  async execute(message: Message, args: string[]): Promise<string> {
    if (!args.length) {
      throw new ValidationError('Please provide a message to format in Markdown.');
    }

    const input = args.join(' ');
    const prompt = `Transform the following message into a well-structured version using Markdown formatting. Use appropriate headers, bullet points, or numbered lists where relevant. Make it clear and professional:\n\n${input}`;

    try {
      const mdVersion = await generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 400
      });

      await message.reply(mdVersion);
      return mdVersion;
    } catch (error: any) {
      throw new Error(`Failed to create Markdown version: ${error.message}`);
    }
  }
}