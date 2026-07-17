import { COUNTRIES } from "./data";

export const BASE = "https://partmojo.com";
export const BRAND = "PartMojo";
export const CONTACT_EMAIL = "hello@partmojo.com";

// Representative product image (served from /public). Swap per-SKU once a feed provides images.
export const PRODUCT_IMAGE = `${BASE}/filter.svg`;

export function alternates(pathAfterCountry) {
  const languages = {};
  for (const c of Object.values(COUNTRIES)) {
    languages[c.locale] = `/${c.code}${pathAfterCountry}`;
  }
  languages["x-default"] = `/us${pathAfterCountry}`;
  return { canonical: `/us${pathAfterCountry}`, languages };
}

export function jsonLd(obj) {
  return { __html: JSON.stringify(obj) };
}

export function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: BASE + it.url,
    })),
  };
}

// Real, working merchant deep links. Sovrn's site-wide script auto-affiliates these
// outbound clicks on day one; graduate winners to direct programs later.
const enc = (s) => encodeURIComponent(s);
const MERCHANTS = {
  Amazon: (code, country) =>
    country === "uk"
      ? `https://www.amazon.co.uk/s?k=${enc(code)}+fridge+water+filter&tag=partmojo-21`
      : `https://www.amazon.com/s?k=${enc(code)}+refrigerator+water+filter&tag=partmojo-20`,
  Waterdrop: (code) => `https://www.waterdropfilter.com/search?q=${enc(code)}`,
  GlacialPure: (code, country) =>
    country === "uk"
      ? `https://www.amazon.co.uk/s?k=GlacialPure+${enc(code)}&tag=partmojo-21`
      : `https://www.amazon.com/s?k=GlacialPure+${enc(code)}&tag=partmojo-20`,
  AquaCrest: (code, country) =>
    country === "uk"
      ? `https://www.amazon.co.uk/s?k=AquaCrest+${enc(code)}&tag=partmojo-21`
      : `https://www.amazon.com/s?k=AquaCrest+${enc(code)}&tag=partmojo-20`,
};

export function affiliateUrl({ merchant, code, country }) {
  const fn = MERCHANTS[merchant] || MERCHANTS.Amazon;
  return fn(code, country);
}
