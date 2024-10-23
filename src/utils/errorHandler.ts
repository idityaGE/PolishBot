import { Message } from 'discord.js';
import { OpenAIConfigError, ValidationError } from './errors';

export async function errorHandler(error: Error, message: Message): Promise<void> {
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
    await message.reply(responseMessage);
  } catch (replyError) {
    console.error('Failed to send error message:', replyError);
  }
}