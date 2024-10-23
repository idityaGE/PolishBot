import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: any;
  execute(
    interaction: ChatInputCommandInteraction,
    lastTransformedMessage?: string | null
  ): Promise<string | void>;
}