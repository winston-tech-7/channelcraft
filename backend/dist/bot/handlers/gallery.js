import { InputMediaBuilder, InlineKeyboard } from "grammy";
import { DesignModel } from "../../models/Design.js";
export const handleGallery = async (ctx) => {
    const userId = ctx.from?.id;
    if (!userId)
        return;
    const designs = DesignModel.byUser(userId).slice(0, 10);
    if (!designs.length) {
        await ctx.reply("No designs yet. Use /create to generate your first cover.");
        return;
    }
    const media = designs.slice(0, 3).map((d, index) => InputMediaBuilder.photo(d.image_url, {
        caption: index === 0 ? "Your latest ChannelCraft covers" : undefined
    }));
    await ctx.replyWithMediaGroup(media);
    await ctx.reply("Actions:", {
        reply_markup: new InlineKeyboard().text("🔄 Generate More", "regen").text("⭐ Get HD Version", `buy_hd:${designs[0].id}`)
    });
};
