import { Command } from '../types/Command';
import { generateResponse } from '../services/openai';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export class RegenCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('regen')
    .setDescription('Generate a different version of the last styled message')
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
      const prompt = `Generate a different version of the following message, maintaining the same professional tone but using different wording:\n\n${input}`;
      const regeneratedVersion = await generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 300
      });

      await interaction.editReply(regeneratedVersion);
      return regeneratedVersion;
    } catch (error: any) {
      throw new Error(`Failed to regenerate message: ${error.message}`);
    }
  }
}