import { Client, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { CommandHandler } from './handlers/CommandHandler';
import { initializeAI } from './services/gemini';
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

// Register slash commands with Discord
async function registerCommands() {
  try {
    const rest = new REST().setToken(process.env.DISCORD_TOKEN!);
    const commands = commandHandler.getSlashCommandsData();

    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
}

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  try {
    initializeAI();
    await registerCommands();
  } catch (error) {
    console.error('Initialization error:', error);
    process.exit(1);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await commandHandler.handleInteraction(interaction);
  } catch (error: any) {
    await errorHandler(error, interaction);
  }
});

client.login(process.env.DISCORD_TOKEN);