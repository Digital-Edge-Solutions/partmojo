import { FILTERS, MODELS, BRANDS, COUNTRIES, CATEGORY, slug } from "../lib/data";
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
  }
  return urls;
}
