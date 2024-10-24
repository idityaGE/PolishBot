# PolishBot - A Professional Text Transformation Discord Bot

PolishBot is a Discord bot designed to help users transform casual messages into polished, professional communication. It uses OpenAI's GPT-3.5 API to analyze and rewrite text, offering both a plain professional style and markdown-formatted responses.

## Features

- **/style**: Transforms casual text into a professional version.
- **/md-style**: Formats professional text in markdown with bullet points for structured writing.
- **/regen**: Regenerates the last transformed text, providing alternative versions.
- Easy integration with Discord using Slash Commands.

## Tech Stack

- **Node.js** with **TypeScript**: Core runtime for bot development.
- **Discord.js**: Discord API library for interacting with the Discord platform.
- **OpenAI API**: For text processing using the GPT-3.5 model.

## Setup and Installation

### Prerequisites

- **Node.js** (v16.6.0 or higher)
- A **Discord bot** (created via the [Discord Developer Portal](https://discord.com/developers/applications)).
- An **Gemini API key** (create an account at [OpenAI](https://ai.google.dev/gemini-api/docs/quickstart?lang=node)).

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/polishbot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd polishbot
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Rename `.env.example` to `.env` and fill in the following values:

   ```bash
   DISCORD_TOKEN=<YOUR_DISCORD_BOT_TOKEN>
   CLIENT_ID=<YOUR_DISCORD_CLIENT_ID>
   GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
   ```

5. Start the bot:

   ```bash
   npm run start
   ```

## Folder Structure

```bash
└── 📁PolishBot
    └── 📁src
        └── 📁commands
            └── HelpCommand.ts
            └── MdStyleCommand.ts
            └── RegenCommand.ts
            └── StyleCommand.ts
            └── SummarizeCommand.ts
        └── 📁handlers
            └── CommandHandler.ts
        └── 📁services
            └── gemini.ts
        └── 📁types
            └── Command.ts
        └── 📁utils
            └── errorHandler.ts
            └── errors.ts
        └── index.ts
    └── .env.example
    └── .gitignore
    └── CODE_OF_CONDUCT.md
    └── CONTRIBUTING.md
    └── LICENSE
    └── package-lock.json
    └── package.json
    └── readme.md
    └── tsconfig.json
```

## Usage

1. Invite the bot to your server using the OAuth2 link:

   ```bash
   https://discord.com/oauth2/authorize?client_id=<YOUR_CLIENT_ID>&scope=bot&permissions=8
   ```

2. Use the available commands in any text channel:
   - `/style`: Converts casual text into a professional version.
   - `/md-style`: Outputs professional text formatted with markdown.
   - `/regen`: Regenerates the last professional text if you need an alternative version.

## Example

- **Input**: `/style "Hey, I need those reports ASAP!"`
- **Output**: "Please ensure the reports are completed and submitted as soon as possible. Thank you."

## Contributing

Contributions are welcome! If you'd like to add new features or fix bugs, please submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Discord.js** for making Discord bot development seamless.
- **Google-Gemini** for providing the API to handle text transformation.

