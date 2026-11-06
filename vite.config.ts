import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Must match the GitHub repo name for https://<user>.github.io/<repo>/ */
const GITHUB_PAGES_BASE = "/CBSE-Montessori-Syllabus/";

export default defineConfig(({ mode }) => ({
  /** Production build is deployed to a subpath; dev server keeps base "/". */
  base: mode === "production" ? GITHUB_PAGES_BASE : "/",
  plugins: [react(), tailwindcss()],
}));
