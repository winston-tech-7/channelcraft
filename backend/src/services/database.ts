import fs from "fs";
import path from "path";

type UserRecord = {
  telegram_id: number;
  username: string | null;
  subscription_status: "free" | "pro";
  generations_today: number;
  created_at: string;
};

type DesignRecord = {
  id: number;
  user_id: number;
  template: string;
  prompt: string;
  image_url: string;
  hd_image_url: string | null;
  is_hd: 0 | 1;
  created_at: string;
};

type Storage = {
  users: UserRecord[];
  designs: DesignRecord[];
  counters: { designId: number };
};

const dbPath = path.resolve(process.cwd(), "database.json");
const initial: Storage = { users: [], designs: [], counters: { designId: 1 } };

const load = (): Storage => {
  if (!fs.existsSync(dbPath)) return initial;
  const content = fs.readFileSync(dbPath, "utf8");
  return content ? (JSON.parse(content) as Storage) : initial;
};

const save = (storage: Storage): void => {
  fs.writeFileSync(dbPath, JSON.stringify(storage, null, 2), "utf8");
};

export const db = {
  get(): Storage {
    return load();
  },
  set(storage: Storage): void {
    save(storage);
  }
};
