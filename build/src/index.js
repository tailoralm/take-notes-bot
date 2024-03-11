"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const telegraf_1 = require("telegraf");
const save_receipts_controller_1 = __importDefault(require("./modules/save-receipts/save-receipts.controller"));
const bot = new telegraf_1.Telegraf(process.env.TELEGRAM_TOKEN);
bot.use(checkAuthorization);
new save_receipts_controller_1.default(bot);
bot.command('start', (ctx) => {
    var _a;
    const first_name = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name;
    ctx.reply(`Hello, ${first_name}! Welcome to the bot.`);
});
bot.launch();
function checkAuthorization(ctx, next) {
    var _a;
    if (((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) !== Number(process.env.MY_TELEGRAM_ID)) {
        return ctx.reply('Not Authorized');
    }
    return next();
}
//# sourceMappingURL=index.js.map