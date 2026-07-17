import { FILTERS, MODELS, BRANDS, COUNTRIES, CATEGORY, COMPARE_PAIRS, CONTAMINANTS, slug } from "../lib/data";
import { DESCALER_BRANDS } from "../lib/descaler";
import { BASE } from "../lib/site";

export default function sitemap() {
  const urls = [];
  const add = (path) => urls.push({ url: BASE + path, changeFrequency: "weekly", priority: 0.7 });
  add("/");
  add("/about");
  add("/contact");
  add("/affiliate-disclosure");
  add("/privacy");
  for (const country of Object.keys(COUNTRIES)) {
    add(`/${country}`);
    add(`/${country}/${CATEGORY.slug}`);
    add(`/${country}/tools/find-my-filter`);
    for (const f of FILTERS) add(`/${country}/${CATEGORY.slug}/${f.slug}`);
    for (const b of BRANDS) add(`/${country}/brands/${slug(b)}`);
    for (const m of MODELS) add(`/${country}/fits/${m.slug}`);
    for (const p of COMPARE_PAIRS) add(`/${country}/compare/${p.slug}`);
    for (const ct of CONTAMINANTS) add(`/${country}/water-filters-that-remove/${ct.slug}`);
  }
  // UK-only descaler category
  add("/uk/descaler");
  for (const b of DESCALER_BRANDS) add(`/uk/descaler/${b.slug}`);
  return urls;
}
