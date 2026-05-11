import fs from "fs";
import path from "path";
const dbPath = path.resolve(process.cwd(), "database.json");
const initial = { users: [], designs: [], counters: { designId: 1 } };
const load = () => {
    if (!fs.existsSync(dbPath))
        return initial;
    const content = fs.readFileSync(dbPath, "utf8");
    return content ? JSON.parse(content) : initial;
};
const save = (storage) => {
    fs.writeFileSync(dbPath, JSON.stringify(storage, null, 2), "utf8");
};
export const db = {
    get() {
        return load();
    },
    set(storage) {
        save(storage);
    }
};
