import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { StyleCommand } from '../commands/StyleCommand';
import { MdStyleCommand } from '../commands/MdStyleCommand';
import { RegenCommand } from '../commands/RegenCommand';
import { SummarizeCommand } from '../commands/SummarizeCommand';
import { HelpCommand } from '../commands/HelpCommand';

export class CommandHandler {
  private commands: Map<string, Command>;
  private prefix: string = '/';
  private lastTransformedMessage: string | null = null;

  constructor() {
    // Initialize the Map with explicit type
    this.commands = new Map<string, Command>();

    // Add commands individually
    this.commands.set('style', new StyleCommand());
    this.commands.set('md-style', new MdStyleCommand());
    this.commands.set('regen', new RegenCommand());
    this.commands.set('summarize', new SummarizeCommand());
    this.commands.set('help', new HelpCommand());
  }

  async handleMessage(message: Message): Promise<void> {
    if (!message.content.startsWith(this.prefix)) return;

    const args = message.content.slice(this.prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = this.commands.get(commandName);
    if (!command) {
      await message.reply('Unknown command. Use /help to see available commands.');
      return;
    }

    try {
      const result = await command.execute(message, args, this.lastTransformedMessage);
      if (result && commandName !== 'help') {
        this.lastTransformedMessage = result;
      }
    } catch (error) {
      throw error;
    }
  }

  // Utility method to get all commands (useful for help command)
  getCommands(): Map<string, Command> {
    return this.commands;
  }
}