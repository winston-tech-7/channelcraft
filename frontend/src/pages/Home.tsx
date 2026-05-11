import { Link } from "react-router-dom";
import { TemplateGrid } from "../components/TemplateGrid";
import { useTemplates } from "../hooks/useApi";
import { useState } from "react";

export const Home = () => {
  const { templates, loading } = useTemplates();
  const [selected, setSelected] = useState("business");

  return (
    <div style={{ padding: 16 }}>
      <h1>ChannelCraft</h1>
      <p>Create Telegram-ready covers in 30 seconds.</p>
      <div style={{ background: "#fff7d1", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        Upgrade to Pro: unlimited generations + exclusive templates.
      </div>
      {loading ? <p>Loading templates...</p> : <TemplateGrid templates={templates} selected={selected} onSelect={setSelected} />}
      <div style={{ marginTop: 12 }}>
        <Link to={`/create?template=${selected}`}>Create from selected template</Link>
      </div>
    </div>
  );
};
