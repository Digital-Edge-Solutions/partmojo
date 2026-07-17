import { COUNTRIES } from "./data";

export const BASE = "https://partmojo.com";
export const BRAND = "PartMojo";
export const OPERATOR = "Digital Edge Solutions";
export const CONTACT_EMAIL = "hello@partmojo.com";
export const TAGLINE = "Never buy the wrong part again.";
export const PRODUCT_IMAGE = `${BASE}/filter.svg`;

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

// Publisher entity for E-E-A-T — tells Google who stands behind the data.
export function orgLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: BASE,
    logo: PRODUCT_IMAGE,
    description:
      "Independent finder for exact replacement appliance parts. We cross-reference part numbers and appliance models so you buy the right part the first time.",
    parentOrganization: { "@type": "Organization", name: OPERATOR },
    areaServed: ["GB", "US"],
  };
}

// ---------------------------------------------------------------------------
// Affiliate / commission link layer.
// Every CTA must be a commissionable link — never a dead outbound.
// Default is Amazon (always earns via the Associates tag). As direct/Awin
// programs get approved, fill in the IDs below and those merchants switch to
// tracked deep links automatically. (Sovrn's site-wide script, when its key is
// set in layout.js, also auto-affiliates any remaining outbound clicks.)
// ---------------------------------------------------------------------------
const AMAZON_TAG = { us: "partmojo-20", uk: "partmojo-21" };
const WATERDROP_REF = "buxkpqyi"; // Waterdrop US GoAffPro affiliate ref (live)
const AWIN_PUBLISHER_ID = ""; // <-- your Awin publisher ID once approved (covers Waterdrop UK)
const AWIN_MID = {            // <-- Awin advertiser (merchant) IDs once approved
  // Waterdrop: "117649",
};

const enc = (s) => encodeURIComponent(s);

function amazon(query, country) {
  const dom = country === "uk" ? "amazon.co.uk" : "amazon.com";
  const tag = country === "uk" ? AMAZON_TAG.uk : AMAZON_TAG.us;
  return `https://www.${dom}/s?k=${enc(query)}&tag=${tag}`;
}

// Generic commissionable Amazon search for any vertical (HVAC filters, etc.).
// Sovrn's site-wide script also auto-affiliates these clicks once its key is set.
export function amazonSearchUrl(query, country) {
  return amazon(query, country);
}

function awinDeepLink(destUrl, mid) {
  return `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${enc(destUrl)}`;
}

export function affiliateUrl({ merchant, code, country }) {
  // Waterdrop US — live GoAffPro ref link (commissionable now).
  if (merchant === "Waterdrop" && country !== "uk" && WATERDROP_REF) {
    return `https://www.waterdropfilter.com/search?q=${enc(code)}&ref=${WATERDROP_REF}`;
  }
  // Tracked Awin deep link when that merchant's IDs are configured (e.g. Waterdrop UK).
  if (AWIN_PUBLISHER_ID && merchant && AWIN_MID[merchant]) {
    const dest =
      merchant === "Waterdrop"
        ? country === "uk"
          ? `https://www.waterdropfilter.co.uk/search?q=${enc(code)}`
          : `https://www.waterdropfilter.com/search?q=${enc(code)}`
        : `https://www.google.com/search?q=${enc(code)}`;
    return awinDeepLink(dest, AWIN_MID[merchant]);
  }
  // Commissionable fallback: Amazon search scoped to the brand + code (never dead).
  const suffix = country === "uk" ? "fridge water filter" : "refrigerator water filter";
  const brand = merchant && merchant !== "Amazon" ? merchant : "";
  return amazon(`${brand} ${code} ${suffix}`.trim(), country);
}
