import { db } from "../services/database.js";

export type User = {
  telegram_id: number;
  username: string | null;
  subscription_status: "free" | "pro";
  generations_today: number;
  created_at: string;
};

export const UserModel = {
  findOrCreate(telegramId: number, username: string | null): User {
    const storage = db.get();
    const existing = storage.users.find((u) => u.telegram_id === telegramId);
    if (existing) return existing;

    const created: User = {
      telegram_id: telegramId,
      username,
      subscription_status: "free",
      generations_today: 0,
      created_at: new Date().toISOString()
    };
    storage.users.push(created);
    db.set(storage);
    return created;
  },
  incrementGeneration(telegramId: number): void {
    const storage = db.get();
    const user = storage.users.find((u) => u.telegram_id === telegramId);
    if (!user) return;
    user.generations_today += 1;
    db.set(storage);
  },
  setSubscription(telegramId: number, status: "free" | "pro"): void {
    const storage = db.get();
    const user = storage.users.find((u) => u.telegram_id === telegramId);
    if (!user) return;
    user.subscription_status = status;
    db.set(storage);
  }
};
