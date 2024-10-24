import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/Command';
import { generateResponse } from '../services/gemini';

export class StyleCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('style')
    .setDescription('Transforms casual text into a professional version')
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
      const prompt = `Transform the following casual message into a professional version:\n\n${input}`;
      const professionalVersion = await generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 300
      });

      const formattedResponse = `\`\`\`\n${professionalVersion}\n\`\`\``;

      await interaction.editReply(formattedResponse);
      return professionalVersion;
    } catch (error: any) {
      throw new Error(`Failed to style message: ${error.message}`);
    }
  }
}