type Props = {
  templates: Record<string, string>;
  selected: string;
  onSelect: (id: string) => void;
};

export const TemplateGrid = ({ templates, selected, onSelect }: Props) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {Object.entries(templates).map(([key, description]) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          style={{
            textAlign: "left",
            border:
              selected === key ? "2px solid rgba(129, 140, 248, 0.95)" : "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 14,
            padding: 12,
            background: selected === key ? "rgba(99, 102, 241, 0.18)" : "rgba(255, 255, 255, 0.06)",
            color: "#f8fafc",
            cursor: "pointer",
            transition: "border-color 0.15s ease, background 0.15s ease, transform 0.1s ease",
            boxShadow: selected === key ? "0 0 0 1px rgba(99, 102, 241, 0.25)" : "none"
          }}
        >
          <strong style={{ textTransform: "capitalize", fontSize: 15 }}>{key}</strong>
          <div style={{ fontSize: 12, marginTop: 6, color: "rgba(248, 250, 252, 0.65)", lineHeight: 1.35 }}>{description}</div>
        </button>
      ))}
    </div>
  );
};
