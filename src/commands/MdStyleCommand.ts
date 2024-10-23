import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../types/Command';
import { generateResponse } from '../services/openai';

export class MdStyleCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('mdstyle')
    .setDescription('Transforms casual text into a well-structured version using Markdown formatting')
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
      const prompt = `Transform the following message into a well-structured version using Markdown formatting. Use appropriate headers, bullet points, or numbered lists where relevant. Make it clear and professional:\n\n${input}`;
      const professionalVersion = await generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 300
      });

      await interaction.editReply(professionalVersion);
      return professionalVersion;
    } catch (error: any) {
      throw new Error(`Failed to mdstyle message: ${error.message}`);
    }
  }
}