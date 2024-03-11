"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SaveReceiptsController {
    constructor(bot) {
        bot.command('receipt', this.save);
    }
    save(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the photo with the highest resolution
            const message = ctx.message;
            const photo = message.photo.reduce((prev, current) => (prev.file_size > current.file_size) ? prev : current);
            // Get file details
            const fileID = photo.file_id;
            const file = yield ctx.telegram.getFile(fileID);
            const filePath = file.file_path;
            const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
            // Download the image
            // const response = await fetch(fileUrl);
            // const buffer = await response.buffer();
            //
            // // Save the image to your computer
            // const fileName = `image_${Date.now()}.jpg`; // You can change the filename as per your requirement
            // fs.writeFileSync(fileName, buffer);
            // Reply to the user
            ctx.reply('Image saved successfully!');
        });
    }
}
exports.default = SaveReceiptsController;
//# sourceMappingURL=save-receipts.controller.js.map