import { InlineKeyboard } from "grammy";
import { miniAppUrl } from "../../utils/telegram.js";
export const handleCreate = async (ctx) => {
    await ctx.reply("Open the Mini App to create your cover:", {
        reply_markup: new InlineKeyboard().webApp("Open Mini App", miniAppUrl("/create"))
    });
};
