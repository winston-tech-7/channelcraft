export const templates: Record<string, string> = {
  business: "Professional gradient background, clean typography, corporate colors",
  crypto: "Dark theme, neon accents, blockchain-inspired patterns, gold/blue palette",
  gaming: "Dynamic shapes, RGB lighting effects, futuristic elements",
  minimalist: "White/black, simple geometric shapes, plenty of whitespace",
  tech: "Circuit patterns, blue/purple gradients, modern tech aesthetic",
  news: "Bold typography, red/blue accents, authoritative layout"
};

export const buildPrompt = (template: string, channelText: string, extraStyle?: string): string => {
  const preset = templates[template] ?? templates.business;
  return `${preset}. Theme for channel: ${channelText}. ${extraStyle ?? ""}`.trim();
};
