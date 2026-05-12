import { GeneratePayload, GenerateResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export type GalleryDesign = {
  id: number;
  image_url: string;
};

export const api = {
  templates: async (): Promise<Record<string, string>> => {
    const res = await fetch(`${API_URL}/api/templates`);
    const data = await res.json();
    return data.templates;
  },
  generate: async (payload: GeneratePayload): Promise<GenerateResponse> => {
    const res = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Generation failed" }));
      throw new Error(err.error || "Generation failed");
    }
    return res.json();
  },
  gallery: async (telegramId: number): Promise<GalleryDesign[]> => {
    const res = await fetch(`${API_URL}/api/user/${telegramId}/designs`);
    if (!res.ok) throw new Error("Failed to load gallery");
    const data = await res.json();
    return data.designs || [];
  }
};
