type Props = {
  url: string;
  hdPurchaseUrl?: string;
};

export const PreviewCard = ({ url, hdPurchaseUrl }: Props) => (
  <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
    <img src={url} alt="Generated cover" style={{ width: "100%", display: "block" }} />
    <div style={{ padding: 10, display: "flex", gap: 8 }}>
      <a href={url} target="_blank" rel="noreferrer">
        Download
      </a>
      <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
        Share
      </a>
      {hdPurchaseUrl ? (
        <a href={hdPurchaseUrl} target="_blank" rel="noreferrer">
          Get HD (100 Stars)
        </a>
      ) : null}
    </div>
  </div>
);
