import { Router } from "express";

const router = Router();

let cachedUsername: string | null | undefined;

router.get("/", async (_req, res) => {
  const fromEnv = process.env.TELEGRAM_BOT_USERNAME?.replace(/^@/, "").trim();
  if (fromEnv) {
    res.json({ botUsername: fromEnv });
    return;
  }

  if (cachedUsername !== undefined) {
    res.json({ botUsername: cachedUsername ?? "" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    cachedUsername = null;
    res.json({ botUsername: "" });
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const data = (await response.json()) as { result?: { username?: string } };
    cachedUsername = data.result?.username ?? null;
    res.json({ botUsername: cachedUsername ?? "" });
  } catch {
    cachedUsername = null;
    res.json({ botUsername: "" });
  }
});

export default router;
