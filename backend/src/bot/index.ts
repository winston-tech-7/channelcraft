import type { RequestHandler } from "express";
import { Bot, InlineKeyboard, webhookCallback } from "grammy";
import { handleCreate } from "./handlers/create.js";
import { handleGallery } from "./handlers/gallery.js";
import { handleSuccessfulPayment } from "./handlers/payments.js";
import { handleStart } from "./handlers/start.js";
import { ensureUser } from "./middleware/validation.js";
import { PAYMENT_PRICES, createHdPayload, createProPayload } from "../services/payments.js";

const botToken = process.env.TELEGRAM_BOT_TOKEN;

const buildWebhookHandler = (): RequestHandler => {
  if (!botToken) {
    return (_req, res) => {
      res.status(503).json({ error: "TELEGRAM_BOT_TOKEN is not configured" });
    };
  }

  const bot = new Bot(botToken);

  bot.use(ensureUser);
  bot.command("start", handleStart);
  bot.command("create", handleCreate);
  bot.command("gallery", handleGallery);
  bot.command("help", async (ctx) => ctx.reply("Use /create to generate covers, /gallery to view history."));

  bot.callbackQuery("regen", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Open Mini App to generate more covers:", {
      reply_markup: new InlineKeyboard().webApp("🎨 New Cover", `${process.env.FRONTEND_URL}/create`)
    });
  });

  bot.callbackQuery(/buy_hd:(\d+)/, async (ctx) => {
    const id = Number(ctx.match?.[1]);
    await ctx.answerCallbackQuery();
    if (!ctx.chat) return;
    await ctx.api.sendInvoice(
      ctx.chat.id,
      "HD Cover Export",
      "Unwatermarked 1280x640 HD cover",
      createHdPayload(id),
      "XTR",
      [{ label: "HD version", amount: PAYMENT_PRICES.hdSingle }]
    );
  });

  bot.command("pro", async (ctx) => {
    if (!ctx.chat) return;
    await ctx.api.sendInvoice(
      ctx.chat.id,
      "ChannelCraft Pro",
      "Unlimited generations and exclusive templates",
      createProPayload(),
      "XTR",
      [{ label: "Pro monthly", amount: PAYMENT_PRICES.proMonthly }]
    );
  });

  bot.on("pre_checkout_query", async (ctx) => ctx.answerPreCheckoutQuery(true));
  bot.on("message:successful_payment", handleSuccessfulPayment);

  return webhookCallback(bot, "express");
};

export const telegramWebhookHandler = buildWebhookHandler();
