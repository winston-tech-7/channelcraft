import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import templatesRoute from "./api/routes/templates.js";
import userRoute from "./api/routes/user.js";
import generateRoute from "./api/routes/generate.js";
import metaRoute from "./api/routes/meta.js";
import { telegramWebhookHandler } from "./bot/index.js";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use("/generated", express.static(path.resolve(process.cwd(), "generated")));

app.get("/health", (_req, res) => res.json({ ok: true }));

const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
if (webhookSecret) {
  app.post(`/webhook/${webhookSecret}`, telegramWebhookHandler);
} else {
  app.post("/webhook/disabled", (_req, res) =>
    res.status(503).json({ error: "TELEGRAM_WEBHOOK_SECRET is not configured" })
  );
}

app.use("/api/templates", templatesRoute);
app.use("/api/meta", metaRoute);
app.use("/api/user", userRoute);
app.use("/api/generate", generateRoute);

app.listen(port, () => {
  console.log(`ChannelCraft backend running on :${port}`);
});
