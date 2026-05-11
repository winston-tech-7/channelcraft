export const miniAppUrl = (path = "/create", startapp?: string): string => {
  const base = process.env.FRONTEND_URL || "http://localhost:5173";
  const url = new URL(path, base);
  if (startapp) url.searchParams.set("startapp", startapp);
  return url.toString();
};
