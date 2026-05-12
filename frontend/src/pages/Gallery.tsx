import { useEffect, useState } from "react";
import { PreviewCard } from "../components/PreviewCard";
import { useTelegram } from "../hooks/useTelegram";
import { api, type GalleryDesign } from "../utils/api";

export const Gallery = () => {
  const { userId } = useTelegram();
  const effectiveUserId = userId || 1;
  const [items, setItems] = useState<GalleryDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const botUsername = (import.meta.env.VITE_BOT_USERNAME as string | undefined)?.replace("@", "");

  useEffect(() => {
    api
      .gallery(effectiveUserId)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [effectiveUserId]);

  return (
    <div style={{ padding: 16 }}>
      <h2>My Gallery</h2>
      {loading ? (
        <p>Loading gallery...</p>
      ) : items.length === 0 ? (
        <p>Your generated covers will appear here.</p>
      ) : (
        items.map((item) => (
          <PreviewCard
            key={item.id}
            url={item.image_url}
            hdPurchaseUrl={botUsername ? `https://t.me/${botUsername}?start=buyhd_${item.id}` : undefined}
          />
        ))
      )}
      {!botUsername && (
        <p style={{ marginTop: 12, fontSize: 13 }}>
          To enable HD purchase buttons in gallery, set <code>VITE_BOT_USERNAME</code> in frontend environment.
        </p>
      )}
    </div>
  );
};
