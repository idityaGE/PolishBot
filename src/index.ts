import { Client, GatewayIntentBits, Message, Events } from 'discord.js';
import dotenv from 'dotenv';
import { CommandHandler } from './handlers/CommandHandler';
import { initializeOpenAI } from './services/openai';
import { errorHandler } from './utils/errorHandler';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commandHandler = new CommandHandler();

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  try {
    initializeOpenAI();
  } catch (error) {
    console.error('Failed to initialize OpenAI:', error);
    process.exit(1);
  }
});

client.on(Events.MessageCreate, async (message: Message) => {
  try {
    if (message.author.bot) return;
    await commandHandler.handleMessage(message);
  } catch (error: any) {
    await errorHandler(error, message);
  }
});

client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('Failed to login:', error);
  process.exit(1);
});