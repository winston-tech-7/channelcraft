import crypto from "crypto";
export const validateWebAppInitData = (initData) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || !initData)
        return false;
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    if (!hash)
        return false;
    params.delete("hash");
    const dataCheckString = [...params.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`)
        .join("\n");
    const secret = crypto.createHmac("sha256", "WebAppData").update(token).digest();
    const expectedHash = crypto.createHmac("sha256", secret).update(dataCheckString).digest("hex");
    return expectedHash === hash;
};
