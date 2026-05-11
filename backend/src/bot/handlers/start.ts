import { InlineKeyboard } from "grammy";
import { miniAppUrl } from "../../utils/telegram.js";

export const handleStart = async (ctx: any): Promise<void> => {
  const keyboard = new InlineKeyboard().webApp("🎨 Create Cover", miniAppUrl("/create"));
  await ctx.reply(
    "Welcome to ChannelCraft!\n\nProfessional Telegram channel designs in 30 seconds.\nFormats: Covers 1280x640, Avatars, Stickers.",
    { reply_markup: keyboard }
  );
};
