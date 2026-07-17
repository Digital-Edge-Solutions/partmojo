import { BASE } from "../../lib/site";

export const dynamic = "force-static";
export const revalidate = 43200;

// Sitemap index — points Google/Bing at the per-market sitemaps.
export function GET() {
  const maps = ["/sitemap-us.xml", "/sitemap-uk.xml"];
  const body = maps
    .map((m) => `  <sitemap><loc>${BASE}${m}</loc></sitemap>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
