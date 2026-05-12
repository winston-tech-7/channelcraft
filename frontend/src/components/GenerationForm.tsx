import type { CSSProperties } from "react";

type Props = {
  value: string;
  style: string;
  onValueChange: (v: string) => void;
  onStyleChange: (v: string) => void;
};

const field: CSSProperties = {
  border: "1px solid rgba(255, 255, 255, 0.14)",
  borderRadius: 12,
  padding: "12px 14px",
  background: "rgba(15, 23, 42, 0.45)",
  color: "#f8fafc",
  fontSize: 15,
  outline: "none"
};

export const GenerationForm = ({ value, style, onValueChange, onStyleChange }: Props) => (
  <div style={{ display: "grid", gap: 10 }}>
    <input
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder="Channel name or concept"
      style={field}
    />
    <input
      value={style}
      onChange={(e) => onStyleChange(e.target.value)}
      placeholder="Optional style hint"
      style={field}
    />
  </div>
);
