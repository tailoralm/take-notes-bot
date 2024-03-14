# Telegram Files & Notes Bot

This project focuses on developing a Telegram bot designed to assist users in saving important files, such as receipts and documents, directly from Telegram to a server. Built using Telegraf, a modern library for Telegram bot development, this bot aims to provide a convenient way for users to archive essential documents securely. The future roadmap includes features for organizing text messages into notes, further enhancing personal data management through Telegram.

## Features

- **File Saving:** Users can send documents, images, and receipts to the bot, which then securely stores these files on a server.
- **Future Note Taking:** Planned feature to allow users to send text messages to the bot, which will then organize and save these inputs as notes for easy reference.

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
    docker-compose up --build
    ```

   The bot should now be up and running. Send a document or image to your Telegram bot to test the file-saving functionality.

## Usage

This bot offers a convenient way to save photos, voices, and receipts directly from Telegram. While document saving is currently under development, you can use the following commands to categorize and save your files:

### Saving Receipts

To save a receipt, send a photo of the receipt to your Telegram bot with the following command in the caption: -r <name_to_save>

This command saves the photo in the `receipts` folder on your server, with `<name_to_save>` as the filename.

### Saving Photos or Voices

For saving general photos or voice messages, use the command: -s <name_to_save>

This is the default command for saving; it categorizes the file by its type (photo or voice) and saves it under the specified `<name_to_save>` filename.

#### Example

1. **Save a Receipt:** Take a photo of your receipt and send it to the bot with `-r grocery_march` in the caption. The bot will save this photo in the `receipts` folder named `grocery_march`.
2. **Save a Photo:** Send a photo to the bot with `-s my_photo` in the caption. The bot will save this photo in the appropriate category with `my_photo` as the filename.
3. **Save a Voice Message:** Record a voice message and send it to the bot with `-s voice_note_1` in the caption. The bot will save this voice message with `voice_note_1` as the filename.

Please note, the command must be included in the caption of the photo or voice message for the bot to process and save the file correctly.

This markdown format ensures that the entire "Usage" section is properly formatted and can be easily inserted into your README.md file.


## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to create an issue or pull request.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE file for details.

## Acknowledgments

- Telegraf for providing an excellent framework to build Telegram bots.
- Docker for simplifying deployment and environment management.
