import { Request, Response, NextFunction } from "express";
import { validateWebAppInitData } from "../../bot/middleware/auth.js";

export const telegramAuth = (req: Request, res: Response, next: NextFunction): void => {
  const initData = String(req.headers["x-telegram-init-data"] || req.body.initData || "");
  if (!validateWebAppInitData(initData)) {
    res.status(401).json({ error: "Invalid Telegram initData" });
    return;
  }
  next();
};
