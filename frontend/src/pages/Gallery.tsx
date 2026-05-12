import { useEffect, useState } from "react";
import { PreviewCard } from "../components/PreviewCard";
import { useTelegram } from "../hooks/useTelegram";
import { api } from "../utils/api";

export const Gallery = () => {
  const { userId } = useTelegram();
  const effectiveUserId = userId || 1;
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
        items.map((url) => <PreviewCard key={url} url={url} />)
      )}
    </div>
  );
};
