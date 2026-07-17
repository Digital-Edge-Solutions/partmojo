import { FILTERS, MODELS, BRANDS, CATEGORY, COMPARE_PAIRS, CONTAMINANTS, slug } from "../../lib/data";
import { HVAC_FILTERS, HVAC_SIZES, HVAC_BRAND_DATA, HVAC_MERV_COMPARES } from "../../lib/hvac";
import { HOUSING_FILTERS, HOUSING_SIZES } from "../../lib/housing";
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
  const c = "us";
  const paths = [];
  // Global / legal pages live in the US sitemap (single home to avoid cross-sitemap dupes)
  paths.push("/", "/about", "/contact", "/affiliate-disclosure", "/privacy");
  // Core fridge-filter category
  paths.push(`/${c}`, `/${c}/${CATEGORY.slug}`, `/${c}/brands`, `/${c}/tools/find-my-filter`);
  for (const f of FILTERS) paths.push(`/${c}/${CATEGORY.slug}/${f.slug}`);
  for (const b of BRANDS) paths.push(`/${c}/brands/${slug(b)}`);
  for (const m of MODELS) paths.push(`/${c}/fits/${m.slug}`);
  for (const p of COMPARE_PAIRS) paths.push(`/${c}/compare/${p.slug}`);
  for (const ct of CONTAMINANTS) paths.push(`/${c}/water-filters-that-remove/${ct.slug}`);
  // HVAC air filters (US-only category)
  paths.push(`/${c}/hvac-air-filters`);
  for (const s of HVAC_SIZES) paths.push(`/${c}/hvac-air-filters/size/${s.slug}`);
  for (const f of HVAC_FILTERS) paths.push(`/${c}/hvac-air-filters/${f.slug}`);
  for (const b of HVAC_BRAND_DATA) paths.push(`/${c}/hvac-air-filters/brand/${slug(b.name)}`);
  for (const cmp of HVAC_MERV_COMPARES) paths.push(`/${c}/hvac-air-filters/compare/${cmp.slug}`);
  // Whole-house / under-sink water filters (US-only category)
  paths.push(`/${c}/whole-house-water-filters`);
  for (const s of HOUSING_SIZES) paths.push(`/${c}/whole-house-water-filters/size/${s.slug}`);
  for (const f of HOUSING_FILTERS) paths.push(`/${c}/whole-house-water-filters/${f.slug}`);
  return new Response(urlset(paths), { headers: { "Content-Type": "application/xml" } });
}
