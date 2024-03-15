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
    docker compose up --build
    ```

   The bot should now be up and running. Send a document or image to your Telegram bot to test the file-saving functionality.

## Usage

This bot offers a convenient way to save photos, voices, and receipts directly from Telegram. While document saving is currently under development, you can use the following commands to categorize and save your files:

### Saving Receipts

To save a receipt, send a photo of the receipt to your Telegram bot with the following command in the caption: -r <name_to_save>

This command saves the photo in the `receipts` folder on your server, with `<name_to_save>` as the filename.

### Saving Photos or Voices

Send te photo, voice message or document for saving. Insert a name in the caption to use as filename.

This is the default way for saving; it categorizes the file by its type (photo or voice) and saves it under the specified `<name_to_save>` or some default name (`photo`) filename.

#### Example

1. **Save a Receipt:** Take a photo of your receipt and send it to the bot with `-r grocery_march` in the caption. The bot will save this photo in the `receipts` folder named `grocery_march`.
2. **Save a Photo:** Send a photo to the bot with `my_photo` (or nothing) in the caption. The bot will save this photo in the photos folder and `my_photo` as the filename.
3. **Save a Voice Message:** Record a voice message and send it to the bot. The bot will save this voice message with voiceID as the filename.
4. **Save a Document:** Send a document to the bot. The bot will save this doc in the documents folder and the filename as the filename.
5. **Reply a message:** Reply some message with the command `-s` to save. Use the `-s <name_to_save>` to save using a specific name or use `-r <name_to_save>` to save photo or document as Receipt.


## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to create an issue or pull request.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE file for details.

