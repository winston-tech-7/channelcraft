import { useEffect, useState } from "react";
import { PreviewCard } from "../components/PreviewCard";
import { useTelegram } from "../hooks/useTelegram";
import { api, type GalleryDesign } from "../utils/api";

export const Gallery = () => {
  const { userId } = useTelegram();
  const effectiveUserId = userId || 1;
  const [items, setItems] = useState<GalleryDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [botUsername, setBotUsername] = useState<string | undefined>(() =>
    (import.meta.env.VITE_BOT_USERNAME as string | undefined)?.replace("@", "").trim() || undefined
  );

  useEffect(() => {
    if (!botUsername) {
      api.meta().then((m) => {
        const u = m.botUsername?.replace("@", "").trim();
        if (u) setBotUsername(u);
      });
    }
  }, [botUsername]);

  useEffect(() => {
    api
      .gallery(effectiveUserId)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [effectiveUserId]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f8fafc" }}>My Gallery</h2>
      {loading ? (
        <p style={{ color: "rgba(248, 250, 252, 0.65)" }}>Loading gallery...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "rgba(248, 250, 252, 0.65)" }}>Your generated covers will appear here.</p>
      ) : (
        items.map((item) => (
          <PreviewCard
            key={item.id}
            url={item.image_url}
            hdPurchaseUrl={botUsername ? `https://t.me/${botUsername}?start=buyhd_${item.id}` : undefined}
          />
        ))
      )}
      {!loading && items.length > 0 && !botUsername && (
        <p style={{ marginTop: 4, fontSize: 13, color: "rgba(248, 250, 252, 0.55)", lineHeight: 1.45 }}>
          HD links need a bot username. Set <code style={{ color: "#c4b5fd" }}>TELEGRAM_BOT_USERNAME</code> on the server or{" "}
          <code style={{ color: "#c4b5fd" }}>VITE_BOT_USERNAME</code> on Vercel, or ensure <code style={{ color: "#c4b5fd" }}>TELEGRAM_BOT_TOKEN</code> is valid (we try getMe automatically).
        </p>
      )}
    </div>
  );
};
