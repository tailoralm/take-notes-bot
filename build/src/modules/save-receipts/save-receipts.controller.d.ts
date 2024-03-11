import { Context, Telegraf } from "telegraf";
export default class SaveReceiptsController {
    constructor(bot: Telegraf);
    save(ctx: Context): Promise<void>;
}
