import { db } from "../services/database.js";
export const UserModel = {
    findOrCreate(telegramId, username) {
        const storage = db.get();
        const existing = storage.users.find((u) => u.telegram_id === telegramId);
        if (existing)
            return existing;
        const created = {
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
    incrementGeneration(telegramId) {
        const storage = db.get();
        const user = storage.users.find((u) => u.telegram_id === telegramId);
        if (!user)
            return;
        user.generations_today += 1;
        db.set(storage);
    },
    setSubscription(telegramId, status) {
        const storage = db.get();
        const user = storage.users.find((u) => u.telegram_id === telegramId);
        if (!user)
            return;
        user.subscription_status = status;
        db.set(storage);
    }
};
