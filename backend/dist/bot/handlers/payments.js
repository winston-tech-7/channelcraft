import { DesignModel } from "../../models/Design.js";
import { UserModel } from "../../models/User.js";
import { parsePaymentPayload } from "../../services/payments.js";
export const handleSuccessfulPayment = async (ctx) => {
    const payment = ctx.message?.successful_payment;
    const userId = ctx.from?.id;
    if (!payment || !userId)
        return;
    const parsed = parsePaymentPayload(payment.invoice_payload);
    if (!parsed)
        return;
    if (parsed.type === "pro") {
        UserModel.setSubscription(userId, "pro");
        await ctx.reply("💎 Pro activated for 1 month. Unlimited generations unlocked.");
        return;
    }
    if (parsed.type === "hd" && parsed.designId) {
        const designs = DesignModel.byUser(userId);
        const design = designs.find((d) => d.id === parsed.designId);
        if (!design)
            return;
        DesignModel.markHd(design.id, design.image_url);
        await ctx.replyWithDocument(design.image_url, {
            caption: "Here is your HD unwatermarked cover."
        });
    }
};
