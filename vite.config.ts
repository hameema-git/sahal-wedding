import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute site URL, needed for the WhatsApp / social share preview image.
// Priority: SITE_URL env var > Vercel production URL > Netlify URL > empty.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  process.env.URL ||
  ""
).replace(/\/+$/, "");

const injectSiteUrl = () => ({
  name: "inject-site-url",
  transformIndexHtml: (html: string) => html.replaceAll("%SITE_URL%", siteUrl),
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), injectSiteUrl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
