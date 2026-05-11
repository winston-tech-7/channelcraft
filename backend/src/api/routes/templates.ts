import { Router } from "express";
import { templates } from "../../utils/prompts.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ templates });
});

export default router;
