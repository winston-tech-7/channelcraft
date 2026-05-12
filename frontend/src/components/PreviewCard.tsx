type Props = {
  url: string;
  hdPurchaseUrl?: string;
};

export const PreviewCard = ({ url, hdPurchaseUrl }: Props) => (
  <div
    style={{
      borderRadius: 14,
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      background: "rgba(15, 23, 42, 0.5)",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)"
    }}
  >
    <img src={url} alt="Generated cover" style={{ width: "100%", display: "block" }} />
    <div
      style={{
        padding: "12px 14px",
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        background: "rgba(2, 6, 23, 0.35)"
      }}
    >
      <a href={url} target="_blank" rel="noreferrer" style={{ color: "#a5b4fc", fontWeight: 600, fontSize: 14 }}>
        Download
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#7dd3fc", fontWeight: 600, fontSize: 14 }}
      >
        Share
      </a>
      {hdPurchaseUrl ? (
        <a href={hdPurchaseUrl} target="_blank" rel="noreferrer" style={{ color: "#fde68a", fontWeight: 700, fontSize: 14 }}>
          Get HD (100 Stars)
        </a>
      ) : null}
    </div>
  </div>
);
