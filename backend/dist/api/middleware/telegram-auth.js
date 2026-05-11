import { validateWebAppInitData } from "../../bot/middleware/auth.js";
export const telegramAuth = (req, res, next) => {
    const initData = String(req.headers["x-telegram-init-data"] || req.body.initData || "");
    if (!validateWebAppInitData(initData)) {
        res.status(401).json({ error: "Invalid Telegram initData" });
        return;
    }
    next();
};
