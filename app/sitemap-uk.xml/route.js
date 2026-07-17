import { FILTERS, MODELS, BRANDS, CATEGORY, COMPARE_PAIRS, CONTAMINANTS, slug } from "../../lib/data";
import { DESCALER_BRANDS } from "../../lib/descaler";
import { BASE } from "../../lib/site";

export const dynamic = "force-static";
export const revalidate = 43200;

function urlset(paths) {
  const body = paths
    .map((p) => `  <url><loc>${BASE}${p}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function GET() {
  const c = "uk";
  const paths = [];
  // Core fridge-filter category
  paths.push(`/${c}`, `/${c}/${CATEGORY.slug}`, `/${c}/brands`, `/${c}/tools/find-my-filter`);
  for (const f of FILTERS) paths.push(`/${c}/${CATEGORY.slug}/${f.slug}`);
  for (const b of BRANDS) paths.push(`/${c}/brands/${slug(b)}`);
  for (const m of MODELS) paths.push(`/${c}/fits/${m.slug}`);
  for (const p of COMPARE_PAIRS) paths.push(`/${c}/compare/${p.slug}`);
  for (const ct of CONTAMINANTS) paths.push(`/${c}/water-filters-that-remove/${ct.slug}`);
  // Descaler (UK-only category)
  paths.push(`/${c}/descaler`);
  for (const b of DESCALER_BRANDS) paths.push(`/${c}/descaler/${b.slug}`);
  return new Response(urlset(paths), { headers: { "Content-Type": "application/xml" } });
}
