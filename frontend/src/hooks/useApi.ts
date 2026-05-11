import { useEffect, useState } from "react";
import { api } from "../utils/api";

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.templates()
      .then(setTemplates)
      .finally(() => setLoading(false));
  }, []);

  return { templates, loading };
};
