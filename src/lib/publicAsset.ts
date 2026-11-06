/** Resolves a path under `public/` for both dev (base "/") and GitHub Pages (base "/repo/"). */
export function publicAsset(path: string): string {
  const trimmed = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${trimmed}`;
}
