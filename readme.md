# PolishBot - A Professional Text Transformation Discord Bot

PolishBot is a Discord bot designed to help users transform casual messages into polished, professional communication. It uses OpenAI's GPT-3.5 API to analyze and rewrite text, offering both a plain professional style and markdown-formatted responses.

<details>
<summary>

## :notebook_with_decorative_cover: Table of Contents

</summary>

- [Motivation](#motivation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [License](#license)

</details>

## Features

- **/style**: Transforms casual text into a professional version.
- **/mdstyle**: Formats professional text in markdown with bullet points for structured writing.
- **/regen**: Regenerates the last transformed text, providing alternative versions.
- **/summarize**: Summarizes a long text into a concise version.
- Easy integration with Discord using Slash Commands.

## Motivation

when ever I want to write a professional message or post, I always struggle to find the right words and structure. I thought it would be great to have a tool that can help me transform my casual text into a professional one. That's why I created PolishBot, a Discord bot that can help users transform their messages into polished, professional communication.

## :camera: Screenshots

![Realtime Preview](/.github/images/img1.png "Realtime Preview")

![Adding More Question](/.github/images/img2.png "Adding More Question")

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/idityage "Buy me a Coffee")

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/idityage?style=social&label=Follow&maxAge=2592000)](https://github.com/idityage "Follow Me")

## :gear: Technologies Used

- **Node.js** (v16.6.0 or higher)
- A **Discord bot** (created via the [Discord Developer Portal](https://discord.com/developers/applications)).
- An **Gemini API key** (create an account at [OpenAI](https://ai.google.dev/gemini-api/docs/quickstart?lang=node)).

## :toolbox: Setup Instructions

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

## :page_with_curl: Usage

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

## Acknowledgments

- **Discord.js** for making Discord bot development seamless.
- **Google-Gemini** for providing the API to handle text transformation.

## :star2: Star History

<a href="https://star-history.com/#idityage/Assignment-Code-to-PDF&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=idityage/Assignment-Code-to-PDF&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=idityage/Assignment-Code-to-PDF&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=idityage/Assignment-Code-to-PDF&type=Timeline" />
</picture>
</a>

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

<br />