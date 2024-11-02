import { Message } from 'discord.js';

export async function help(message: Message): Promise<void> {
  const helpMessage = `
Here are the available commands:

- **/style**: Transform a casual message into a professional version.
- **/md-style**: Rewrite a message in a professional tone using Markdown format.
- **/regen**: Regenerate the last transformed message with potential tweaks.
- **/summarize**: Generate a summarized, concise, and professional version of a longer input.
- **/help**: Display this help message.

To use a command, type the command followed by your message. For example:
/style Hello, how are you doing today?
`;
  await message.reply(helpMessage);
}
