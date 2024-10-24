import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../types/Command';

export class HelpCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows information about available commands');

  async execute(interaction: any): Promise<void> {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('📚 Command Guide')
      .setDescription('Here are all the available commands and how to use them:')
      .addFields(
        {
          name: '✨ /style',
          value: 'Transforms casual text into a professional version.\n**Usage:** `/style [your text here]`\n*Example: /style hey guys can u help me with this*'
        },
        {
          name: '📝 /md-style',
          value: 'Transforms text into a professional version with Markdown formatting.\n**Usage:** `/md-style [your text here]`\n*Example: /md-style here are my meeting notes*'
        },
        {
          name: '🔄 /regen',
          value: 'Regenerates the last transformed message with different wording.\n**Usage:** Just type `/regen` after using style or md-style\n*Note: Requires a previous styled message*'
        },
        {
          name: '📋 /summarize',
          value: 'Provides a concise summary of the given text.\n**Usage:** `/summarize [text to summarize]`\n*Example: /summarize [long paragraph here]*'
        }
      )
      .setFooter({
        text: '💡 Tip: All commands will process your text through AI to improve clarity and professionalism'
      });

    await interaction.deferReply();
    try {
      await interaction.editReply({ embeds: [embed] });
    } catch (error: any) {
      throw new Error(`Failed to send help message: ${error.message}`);
    }
  }
}