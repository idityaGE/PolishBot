import { Client, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { CommandHandler } from './handlers/CommandHandler';
import { initializeAI } from './services/gemini';
import { errorHandler } from './utils/errorHandler';
import http from 'http';

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

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bot is Live');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});