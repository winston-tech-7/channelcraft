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
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <h2>Create Cover</h2>
      {!userId && (
        <div style={{ background: "#fff7d1", borderRadius: 8, padding: 8, fontSize: 13 }}>
          Opened outside Telegram: running in test mode.
        </div>
      )}
      <TemplateGrid templates={templates} selected={template} onSelect={setTemplate} />
      <GenerationForm value={prompt} style={style} onValueChange={setPrompt} onStyleChange={setStyle} />
      <button onClick={runGenerate} disabled={!canGenerate || loading}>
        {loading ? "Generating..." : "Generate 3 Variants"}
      </button>
      <div style={{ display: "grid", gap: 10 }}>
        {variants.map((url) => (
          <PreviewCard key={url} url={url} />
        ))}
      </div>
    </div>
  );
};
