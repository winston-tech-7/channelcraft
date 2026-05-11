import { Context, NextFunction } from "grammy";
import { UserModel } from "../../models/User.js";

export const ensureUser = async (ctx: Context, next: NextFunction): Promise<void> => {
  const from = ctx.from;
  if (from) UserModel.findOrCreate(from.id, from.username ?? null);
  await next();
};
