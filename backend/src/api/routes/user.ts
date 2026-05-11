import { Router } from "express";
import { UserModel } from "../../models/User.js";

const router = Router();

router.get("/:telegramId", (req, res) => {
  const telegramId = Number(req.params.telegramId);
  const user = UserModel.findOrCreate(telegramId, null);
  res.json({ user });
});

export default router;
