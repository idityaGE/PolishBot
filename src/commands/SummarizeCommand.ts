import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/Command';
import { generateResponse } from '../services/gemini';

export class SummarizeCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('summarize')
    .setDescription('Summarize text')
    .addStringOption(option =>
      option
        .setName('text')
        .setDescription('The text to transform')
        .setRequired(true)
    );

  async execute(interaction: any): Promise<string> {
    const input = interaction.options.getString('text', true);

    await interaction.deferReply();

    try {
      const prompt = `Provide a concise but comprehensive summary of the following text:\n\n${input}`;
      const summary = await generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 300
      });

      await interaction.editReply(summary);
      return summary;
    } catch (error: any) {
      throw new Error(`Failed to summarize message: ${error.message}`);
    }
  }
}