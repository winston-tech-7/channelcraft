import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GenerationForm } from "../components/GenerationForm";
import { PreviewCard } from "../components/PreviewCard";
import { TemplateGrid } from "../components/TemplateGrid";
import { useTemplates } from "../hooks/useApi";
import { useTelegram } from "../hooks/useTelegram";
import { api } from "../utils/api";

export const Create = () => {
  const [params] = useSearchParams();
  const defaultTemplate = params.get("template") || "business";
  const { templates } = useTemplates();
  const { webApp, userId } = useTelegram();
  const [template, setTemplate] = useState(defaultTemplate);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);
  const effectiveUserId = userId || 1;
  const canGenerate = useMemo(() => prompt.trim().length > 1 && !!template, [prompt, template]);

  const runGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    try {
      const data = await api.generate({ telegramId: effectiveUserId, template, prompt, style });
      setVariants(data.variants);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!webApp) return;
    webApp.MainButton.setText("Generate 3 Variants");
    if (canGenerate && !loading) webApp.MainButton.show();
    else webApp.MainButton.hide();
    webApp.MainButton.onClick(runGenerate);
    return () => webApp.MainButton.offClick(runGenerate);
  }, [webApp, canGenerate, loading]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f8fafc" }}>Create Cover</h2>
      {!userId && (
        <div
          style={{
            borderRadius: 12,
            padding: "10px 12px",
            fontSize: 13,
            color: "#fef9c3",
            background: "rgba(234, 179, 8, 0.15)",
            border: "1px solid rgba(250, 204, 21, 0.35)"
          }}
        >
          Opened outside Telegram: running in test mode.
        </div>
      )}
      <TemplateGrid templates={templates} selected={template} onSelect={setTemplate} />
      <GenerationForm value={prompt} style={style} onValueChange={setPrompt} onStyleChange={setStyle} />
      <button
        type="button"
        onClick={runGenerate}
        disabled={!canGenerate || loading}
        style={{
          border: "none",
          borderRadius: 14,
          padding: "14px 16px",
          fontSize: 16,
          fontWeight: 700,
          color: "#fff",
          cursor: !canGenerate || loading ? "not-allowed" : "pointer",
          opacity: !canGenerate || loading ? 0.45 : 1,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: !canGenerate || loading ? "none" : "0 8px 28px rgba(99, 102, 241, 0.45)"
        }}
      >
        {loading ? "Generating..." : "Generate 3 Variants"}
      </button>
      <div style={{ display: "grid", gap: 12 }}>
        {variants.map((url) => (
          <PreviewCard key={url} url={url} />
        ))}
      </div>
    </div>
  );
};
