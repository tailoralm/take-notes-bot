# Telegram Files & Notes Bot

This project focuses on developing a Telegram bot designed to assist users in saving important files, such as receipts and documents, directly from Telegram to a server. Built using Telegraf, a modern library for Telegram bot development, this bot aims to provide a convenient way for users to archive essential documents securely. The future roadmap includes features for organizing text messages into notes, further enhancing personal data management through Telegram.

## Features

- **File Saving:** Users can send documents, images, and receipts to the bot, which then securely stores these files on a server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. The project is containerized using Docker, ensuring an easy setup and consistent environment across different machines.

### Prerequisites

- Docker
- A Telegram Bot Token (obtainable through BotFather on Telegram)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/tailoralm/take-notes-bot.git
    cd take-notes-bot
    ```

2. **Setup Environment Variables**

   Create a `.env` file in the root directory of the project and add your Telegram Bot Token:

    ```plaintext
    TELEGRAM_TOKEN='your telegram bot token'
    MY_TELEGRAM_ID='your chat id with the bot'
    ```

3. **Build and Run with Docker**

   To build the Docker container and run the project, execute:

    ```bash
    docker compose up --build
    ```

   The bot should now be up and running. Send a document or image to your Telegram bot to test the file-saving functionality.

## Usage

This bot offers a convenient way to save photos, voices, documents, notes and receipts directly from Telegram.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to create an issue or pull request.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE file for details.

