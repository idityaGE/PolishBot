import { Message } from 'discord.js';

export interface Command {
  name: string;  // Add this to the interface
  description: string;  // Add this to the interface
  execute(message: Message, args: string[], lastTransformedMessage?: string | null): Promise<string | void>;
}