import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

export function getSiteHostname(): string {
  const mode = process.env.MODE || process.env.NODE_ENV || "production";
  const env = loadEnv(mode, projectRoot, "");
  const raw = env.SITE_HOSTNAME?.trim() || "https://demo-vitepress.netlify.app";
  return raw.replace(/\/+$/, "");
}

export function robotsTxt(hostname: string): string {
  return ["User-agent: *", "Allow: /", "", `Sitemap: ${hostname}/sitemap.xml`, ""].join(
    "\n",
  );
}
