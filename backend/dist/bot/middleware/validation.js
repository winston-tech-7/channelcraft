import { UserModel } from "../../models/User.js";
export const ensureUser = async (ctx, next) => {
    const from = ctx.from;
    if (from)
        UserModel.findOrCreate(from.id, from.username ?? null);
    await next();
};
