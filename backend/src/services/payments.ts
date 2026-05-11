export const PAYMENT_PRICES = {
  hdSingle: 100,
  proMonthly: 500
} as const;

export const createHdPayload = (designId: number): string => `hd:${designId}`;
export const createProPayload = (): string => "pro:monthly";

export const parsePaymentPayload = (payload: string): { type: "hd" | "pro"; designId?: number } | null => {
  if (payload.startsWith("hd:")) {
    const id = Number(payload.split(":")[1]);
    return Number.isFinite(id) ? { type: "hd", designId: id } : null;
  }
  if (payload === "pro:monthly") return { type: "pro" };
  return null;
};
