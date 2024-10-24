import { Command } from '../types/Command';
import { generateResponse } from '../services/gemini';
import { SlashCommandBuilder } from 'discord.js';

export class RegenCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('regen')
    .setDescription('Generate a different version of the last styled message');

  async execute(interaction: any, lastTransformedMessage: string | null): Promise<string> {
    await interaction.deferReply();

    if (!lastTransformedMessage) {
      await interaction.editReply({
        content: "There's no previous message to regenerate. Please use /style or /md-style first.",
        ephemeral: true
      });
      return '';
    }

    try {
      const prompt = `Generate a different version of the following message, maintaining the same professional tone but using different wording:\n\n${lastTransformedMessage}`;
      const regeneratedVersion = await generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 300
      });

      const formattedResponse = `\`\`\`\n${regeneratedVersion}\n\`\`\``;

      await interaction.editReply(formattedResponse);
      return regeneratedVersion;
    } catch (error: any) {
      throw new Error(`Failed to regenerate message: ${error.message}`);
    }
  }
}