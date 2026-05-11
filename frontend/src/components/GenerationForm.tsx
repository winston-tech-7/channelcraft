type Props = {
  value: string;
  style: string;
  onValueChange: (v: string) => void;
  onStyleChange: (v: string) => void;
};

export const GenerationForm = ({ value, style, onValueChange, onStyleChange }: Props) => (
  <div style={{ display: "grid", gap: 10 }}>
    <input
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder="Channel name or concept"
      style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10 }}
    />
    <input
      value={style}
      onChange={(e) => onStyleChange(e.target.value)}
      placeholder="Optional style hint"
      style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10 }}
    />
  </div>
);
