import { useState } from "react";
import { PreviewCard } from "../components/PreviewCard";

export const Gallery = () => {
  const [mock] = useState<string[]>([]);

  return (
    <div style={{ padding: 16 }}>
      <h2>My Gallery</h2>
      {mock.length === 0 ? <p>Your generated covers will appear here.</p> : mock.map((url) => <PreviewCard key={url} url={url} />)}
    </div>
  );
};
