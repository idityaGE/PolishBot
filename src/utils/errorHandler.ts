import { ChatInputCommandInteraction } from 'discord.js';
import { OpenAIConfigError, ValidationError } from './errors';

export async function errorHandler(
  error: Error,
  interaction: ChatInputCommandInteraction
): Promise<void> {
  console.error('Error:', error);

  let responseMessage: string;

  if (error instanceof ValidationError) {
    responseMessage = `❌ ${error.message}`;
  } else if (error instanceof OpenAIConfigError) {
    responseMessage = '❌ There was a configuration error. Please contact the bot administrator.';
  } else {
    responseMessage = '❌ An unexpected error occurred. Please try again later.';
  }

  try {
    if (interaction.deferred) {
      await interaction.editReply(responseMessage);
    } else {
      await interaction.reply({ content: responseMessage, ephemeral: true });
    }
  } catch (replyError) {
    console.error('Failed to send error message:', replyError);
  }
}