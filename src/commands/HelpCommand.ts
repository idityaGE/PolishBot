import { Message, EmbedBuilder } from 'discord.js';
import { Command } from '../types/Command';

export class HelpCommand implements Command {
  name = 'help';
  description = 'Shows all available commands';
  
  async execute(message: Message): Promise<void> {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Available Commands')
      .setDescription('Here are all the commands you can use:')
      .addFields(
        {
          name: '/style [text]',
          value: 'Transforms casual text into a professional version'
        },
        {
          name: '/md-style [text]',
          value: 'Transforms text into a professional version with Markdown formatting'
        },
        {
          name: '/regen',
          value: 'Regenerates the last transformed message with different wording'
        },
        {
          name: '/summarize [text]',
          value: 'Provides a concise summary of the given text'
        },
        {
          name: '/help',
          value: 'Shows this help message'
        }
      )
      .setFooter({
        text: 'Use these commands to transform and improve your messages!'
      });

    try {
      await message.reply({ embeds: [embed] });
    } catch (error: any) {
      throw new Error(`Failed to send help message: ${error.message}`);
    }
  }
}