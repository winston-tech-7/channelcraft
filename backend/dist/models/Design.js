import { db } from "../services/database.js";
export const DesignModel = {
    create(input) {
        const storage = db.get();
        const id = storage.counters.designId++;
        storage.designs.push({
            id,
            user_id: input.userId,
            template: input.template,
            prompt: input.prompt,
            image_url: input.imageUrl,
            hd_image_url: input.hdImageUrl ?? null,
            is_hd: input.isHd ? 1 : 0,
            created_at: new Date().toISOString()
        });
        db.set(storage);
        return id;
    },
    byUser(userId) {
        return db
            .get()
            .designs.filter((d) => d.user_id === userId)
            .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
            .slice(0, 50);
    },
    markHd(id, hdImageUrl) {
        const storage = db.get();
        const design = storage.designs.find((d) => d.id === id);
        if (!design)
            return;
        design.is_hd = 1;
        design.hd_image_url = hdImageUrl;
        db.set(storage);
    }
};
