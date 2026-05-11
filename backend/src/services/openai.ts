import OpenAI from "openai";
import sharp from "sharp";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `Create a Telegram channel cover.
Dimensions target: EXACTLY 1280x640 pixels after processing.
Composition should be usable as a channel cover.
Text should be readable at small sizes.
Colors should work in Telegram dark and light themes.
No text overlay in output image.`;

const cropToTelegramCover = async (input: Buffer): Promise<Buffer> => {
  const image = sharp(input);
  const metadata = await image.metadata();
  const width = metadata.width ?? 1792;
  const height = metadata.height ?? 1024;
  const targetAspect = 1280 / 640;
  const sourceAspect = width / height;

  let cropWidth = width;
  let cropHeight = height;
  if (sourceAspect > targetAspect) {
    cropWidth = Math.round(height * targetAspect);
  } else {
    cropHeight = Math.round(width / targetAspect);
  }

  const left = Math.floor((width - cropWidth) / 2);
  const top = Math.floor((height - cropHeight) / 2);

  return image
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .resize(1280, 640)
    .jpeg({ quality: 92 })
    .toBuffer();
};

export const generateChannelCover = async (
  prompt: string,
  style: string,
  quality: "standard" | "hd" = "standard"
): Promise<Buffer> => {
  const result = await client.images.generate({
    model: "dall-e-3",
    prompt: `${systemPrompt}\nStyle: ${style}\n\nUser request: ${prompt}`,
    size: "1792x1024",
    quality
  });

  const b64 = result.data?.[0]?.b64_json;
  if (!b64) throw new Error("DALL-E returned empty image payload");

  const rawBuffer = Buffer.from(b64, "base64");
  return cropToTelegramCover(rawBuffer);
};
