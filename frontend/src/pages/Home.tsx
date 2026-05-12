import { Link } from "react-router-dom";
import { TemplateGrid } from "../components/TemplateGrid";
import { useTemplates } from "../hooks/useApi";
import { useState } from "react";

export const Home = () => {
  const { templates, loading } = useTemplates();
  const [selected, setSelected] = useState("business");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <header
        style={{
          padding: "18px 16px",
          borderRadius: 18,
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
        }}
      >
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            background: "linear-gradient(120deg, #c4b5fd, #a5b4fc, #7dd3fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          ChannelCraft
        </h1>
        <p style={{ margin: 0, color: "rgba(248, 250, 252, 0.75)", lineHeight: 1.5, fontSize: 15 }}>
          Create Telegram-ready covers in 30 seconds.
        </p>
      </header>

      <div
        style={{
          borderRadius: 14,
          padding: "12px 14px",
          background: "linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(245, 158, 11, 0.08))",
          border: "1px solid rgba(251, 191, 36, 0.35)",
          color: "#fef3c7",
          fontSize: 14,
          lineHeight: 1.45
        }}
      >
        <strong style={{ color: "#fde68a" }}>Pro</strong> — unlimited generations + exclusive templates.
      </div>

      {loading ? (
        <p style={{ color: "rgba(248, 250, 252, 0.65)" }}>Loading templates...</p>
      ) : (
        <TemplateGrid templates={templates} selected={selected} onSelect={setSelected} />
      )}

      <Link
        to={`/create?template=${selected}`}
        style={{
          display: "block",
          textAlign: "center",
          padding: "14px 16px",
          borderRadius: 14,
          fontWeight: 700,
          fontSize: 15,
          color: "#fff",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 6px 24px rgba(99, 102, 241, 0.45)"
        }}
      >
        Create from selected template →
      </Link>
    </div>
  );
};
