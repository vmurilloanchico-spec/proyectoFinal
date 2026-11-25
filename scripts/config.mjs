import { existsSync, mkdirSync, writeFileSync } from "node:fs";
if (existsSync(".env")) process.loadEnvFile(".env");
const { SUPABASE_URL: url = "", SUPABASE_PUBLISHABLE_KEY: key = "" } =
  process.env;
if (key.startsWith("sb_secret_"))
  throw new Error("Utilicen la clave pública del proyecto.");
if (
  key.split(".").length === 3 &&
  JSON.parse(Buffer.from(key.split(".")[1], "base64url")).role !== "anon"
) {
  throw new Error("Utilicen la clave publishable o anon.");
}
mkdirSync("public", { recursive: true });
writeFileSync(
  "public/config.js",
  "window.rondaConfig = " + JSON.stringify({ url, key }) + ";",
);
