import fs from "fs";
import path from "path";
import sharp from "sharp";
import { Router } from "express";
import { z } from "zod";
import { DesignModel } from "../../models/Design.js";
import { UserModel } from "../../models/User.js";
import { generateChannelCover } from "../../services/openai.js";
import { buildPrompt } from "../../utils/prompts.js";
const router = Router();
const outputDir = path.resolve(process.cwd(), "generated");
fs.mkdirSync(outputDir, { recursive: true });
const schema = z.object({
    telegramId: z.number(),
    template: z.string(),
    prompt: z.string().min(2),
    style: z.string().optional()
});
router.post("/", async (req, res) => {
    try {
        const parsed = schema.parse(req.body);
        const user = UserModel.findOrCreate(parsed.telegramId, null);
        if (user.subscription_status === "free" && user.generations_today >= 3) {
            res.status(402).json({ error: "Daily free limit reached. Upgrade to Pro or buy HD." });
            return;
        }
        const composedPrompt = buildPrompt(parsed.template, parsed.prompt, parsed.style);
        const images = await Promise.all([1, 2, 3].map(() => generateChannelCover(composedPrompt, parsed.template, "standard")));
        const urls = [];
        for (const [index, image] of images.entries()) {
            const watermarkSvg = Buffer.from(`<svg width="1280" height="640"><text x="24" y="620" fill="white" opacity="0.75" font-size="28">ChannelCraft Free</text></svg>`);
            const watermarked = await sharp(image).composite([{ input: watermarkSvg }]).jpeg({ quality: 90 }).toBuffer();
            const fileName = `${parsed.telegramId}_${Date.now()}_${index + 1}.jpg`;
            const absPath = path.join(outputDir, fileName);
            fs.writeFileSync(absPath, watermarked);
            const publicUrl = `${process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 3000}`}/generated/${fileName}`;
            urls.push(publicUrl);
            DesignModel.create({
                userId: parsed.telegramId,
                template: parsed.template,
                prompt: parsed.prompt,
                imageUrl: publicUrl
            });
        }
        UserModel.incrementGeneration(parsed.telegramId);
        res.json({ variants: urls });
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Generation failed" });
    }
});
export default router;
