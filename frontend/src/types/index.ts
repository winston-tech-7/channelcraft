export type TemplateKey = "business" | "crypto" | "gaming" | "minimalist" | "tech" | "news";

export type GeneratePayload = {
  telegramId: number;
  template: string;
  prompt: string;
  style?: string;
};

export type GenerateResponse = {
  variants: string[];
};
