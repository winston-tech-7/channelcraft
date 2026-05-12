import { InlineKeyboard } from "grammy";
import { miniAppUrl } from "../../utils/telegram.js";
import { PAYMENT_PRICES, createHdPayload } from "../../services/payments.js";

export const handleStart = async (ctx: any): Promise<void> => {
  const payload = String(ctx.match || "");
  if (payload.startsWith("buyhd_")) {
    const id = Number(payload.replace("buyhd_", ""));
    if (ctx.chat && Number.isFinite(id)) {
      await ctx.api.sendInvoice(
        ctx.chat.id,
        "HD Cover Export",
        "Unwatermarked 1280x640 HD cover",
        createHdPayload(id),
        "XTR",
        [{ label: "HD version", amount: PAYMENT_PRICES.hdSingle }],
        { provider_token: "" }
      );
      return;
    }
  }

  const keyboard = new InlineKeyboard().webApp("🎨 Create Cover", miniAppUrl("/create"));
  await ctx.reply(
    "Welcome to ChannelCraft!\n\nProfessional Telegram channel designs in 30 seconds.\nFormats: Covers 1280x640, Avatars, Stickers.",
    { reply_markup: keyboard }
  );
};
