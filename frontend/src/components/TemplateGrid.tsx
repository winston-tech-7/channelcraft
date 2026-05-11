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
          onClick={() => onSelect(key)}
          style={{
            textAlign: "left",
            border: selected === key ? "2px solid #3390ec" : "1px solid #ccc",
            borderRadius: 10,
            padding: 10,
            background: "#fff"
          }}
        >
          <strong style={{ textTransform: "capitalize" }}>{key}</strong>
          <div style={{ fontSize: 12, marginTop: 4 }}>{description}</div>
        </button>
      ))}
    </div>
  );
};
