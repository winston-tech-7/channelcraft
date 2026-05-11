export const PAYMENT_PRICES = {
    hdSingle: 100,
    proMonthly: 500
};
export const createHdPayload = (designId) => `hd:${designId}`;
export const createProPayload = () => "pro:monthly";
export const parsePaymentPayload = (payload) => {
    if (payload.startsWith("hd:")) {
        const id = Number(payload.split(":")[1]);
        return Number.isFinite(id) ? { type: "hd", designId: id } : null;
    }
    if (payload === "pro:monthly")
        return { type: "pro" };
    return null;
};
