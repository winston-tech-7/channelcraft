import { Router } from "express";
import { DesignModel } from "../../models/Design.js";
import { UserModel } from "../../models/User.js";

const router = Router();

router.get("/:telegramId", (req, res) => {
  const telegramId = Number(req.params.telegramId);
  const user = UserModel.findOrCreate(telegramId, null);
  res.json({ user });
});

router.get("/:telegramId/designs", (req, res) => {
  const telegramId = Number(req.params.telegramId);
  const user = UserModel.findOrCreate(telegramId, null);
  const designs = DesignModel.byUser(user.telegram_id);
  res.json({ designs });
});

export default router;
