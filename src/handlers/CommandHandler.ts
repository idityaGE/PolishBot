import {
  ChatInputCommandInteraction,
  Collection,
} from 'discord.js';
import { StyleCommand } from '../commands/StyleCommand';
import { MdStyleCommand } from '../commands/MdStyleCommand';
import { RegenCommand } from '../commands/RegenCommand';
import { SummarizeCommand } from '../commands/SummarizeCommand';
import { HelpCommand } from '../commands/HelpCommand';
import { Command } from '../types/Command';

export class CommandHandler {
  private commands: Collection<string, Command>;
  private lastTransformedMessage: string | null = null;

  constructor() {
    this.commands = new Collection<string, Command>();

    // Initialize commands
    this.registerCommand(new StyleCommand());
    this.registerCommand(new MdStyleCommand());
    this.registerCommand(new RegenCommand());
    this.registerCommand(new SummarizeCommand());
    this.registerCommand(new HelpCommand());
  }

  private registerCommand(command: Command) {
    this.commands.set(command.data.name, command);
  }

  getSlashCommandsData() {
    return Array.from(this.commands.values()).map(command => command.data.toJSON());
  }

  async handleInteraction(interaction: ChatInputCommandInteraction) {
    const command = this.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply({
        content: 'Command not found!',
        ephemeral: true
      });
      return;
    }

    try {
      const result = await command.execute(interaction, this.lastTransformedMessage);
      if (result && interaction.commandName !== 'help') {
        this.lastTransformedMessage = result;
      }
    } catch (error) {
      throw error;
    }
  }
}