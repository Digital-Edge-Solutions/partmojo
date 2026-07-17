// PartMojo — HVAC air filters (US-first). Category #2.
//
// This category is DIMENSIONAL, not cross-referenced: a furnace/AC filter is
// defined by its nominal size (W x H), depth, and MERV rating, and fits any
// system that takes that size — universal by dimension. So the whole catalogue
// is generated programmatically from real, standard sizes × depths × MERV,
// with no fabricated compatibility. Every page targets a genuine long-tail
// query like "16x25x1 MERV 11 furnace filter".

export const HVAC_CATEGORY = {
  slug: "hvac-air-filters",
  name: "HVAC & Furnace Air Filters",
  blurb:
    "Find the exact furnace or AC air filter for your system by size. Standard nominal sizes in every MERV rating — with the actual dimensions, how often to change them, and the best-value packs.",
};

const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ---- Standard US nominal sizes (W x H, inches). These are the genuinely
// common furnace/return-grille sizes that account for the vast majority of
// residential systems. ----
export const SIZES = [
  { w: 14, h: 20 }, { w: 14, h: 24 }, { w: 14, h: 25 },
  { w: 16, h: 20 }, { w: 16, h: 24 }, { w: 16, h: 25 },
  { w: 18, h: 18 }, { w: 18, h: 24 }, { w: 18, h: 30 },
  { w: 20, h: 20 }, { w: 20, h: 24 }, { w: 20, h: 25 }, { w: 20, h: 30 },
  { w: 24, h: 24 }, { w: 24, h: 30 },
  { w: 12, h: 24 }, { w: 15, h: 20 }, { w: 16, h: 16 },
  { w: 10, h: 20 }, { w: 25, h: 25 },
];

// ---- Depths (nominal thickness, inches). 1" is the everyday grille filter;
// 4"/5" media filters live in a cabinet and last far longer. ----
export const DEPTHS = [1, 2, 4];

// ---- MERV ratings with the real-world equivalents shoppers see on the box. ----
export const MERV = [
  {
    merv: 8, mpr: "600", fpr: "5",
    captures: "pollen, dust, lint, dust-mite debris and mold spores",
    best: "everyday home use — the standard choice to protect your HVAC system",
    tone: "Standard protection",
  },
  {
    merv: 11, mpr: "1000–1200", fpr: "7",
    captures: "everything MERV 8 does plus pet dander, fine dust and smog particles",
    best: "homes with pets or mild allergies",
    tone: "Allergy & pet",
  },
  {
    merv: 13, mpr: "1500–1900", fpr: "10",
    captures: "everything MERV 11 does plus smoke, bacteria and virus-carrying particles",
    best: "allergy and asthma sufferers, and homes dealing with wildfire smoke",
    tone: "Maximum filtration",
  },
];

export const mervBy = Object.fromEntries(MERV.map((m) => [m.merv, m]));

// Nominal sizes are cut ~0.5" under so the filter slides in. Standard convention.
export const actualSize = (w, h, d) =>
  `${(w - 0.5).toFixed(1)} × ${(h - 0.5).toFixed(1)} × ${(d - 0.25).toFixed(2)} in`;

// Representative single-filter US price (live price is on the retailer via the
// affiliate link; this is the "from" anchor). Scales with area, depth and MERV.
function priceUSD(w, h, d, merv) {
  const area = (w * h) / 400; // 20x20 ≈ 1.0
  const depthBase = { 1: 6.5, 2: 9.5, 4: 15.5 }[d];
  const mervAdd = { 8: 0, 11: 2.5, 13: 5 }[merv];
  const p = (depthBase + mervAdd) * (0.82 + 0.36 * area);
  return Math.round(p * 100) / 100;
}

// How often to change, by depth. 1" clogs fastest; media filters last months.
export const changeEvery = (d) =>
  d === 1 ? "every 60–90 days" : d === 2 ? "every 3 months" : "every 6–12 months";

export const packHint = (d) =>
  d === 1 ? "usually sold in packs of 4–6" : d === 2 ? "sold singly or in packs of 3–4" : "sold singly or in packs of 2";

// ---- Build the full catalogue: size × depth × MERV ----
const RAW = [];
for (const s of SIZES) {
  for (const d of DEPTHS) {
    for (const m of MERV) {
      const dims = `${s.w}x${s.h}x${d}`;
      RAW.push({
        w: s.w, h: s.h, depth: d, merv: m.merv,
        dims,
        code: `${dims} MERV ${m.merv}`,
        slug: `${dims}-merv-${m.merv}`,
        sizeSlug: `${s.w}x${s.h}`,
        priceUS: priceUSD(s.w, s.h, d, m.merv),
        // demand heuristic: 1" filters and common sizes are searched most.
        demand:
          (d === 1 && ["16x25", "20x25", "20x20", "16x20", "14x25"].includes(`${s.w}x${s.h}`))
            ? "high"
            : d === 4
            ? "low"
            : "medium",
      });
    }
  }
}

export const HVAC_FILTERS = RAW;
export const hvacBySlug = Object.fromEntries(RAW.map((f) => [f.slug, f]));

// ---- Size hubs: one page per nominal size, listing all depth × MERV options ----
const sizeMap = {};
for (const f of RAW) {
  const key = f.sizeSlug;
  if (!sizeMap[key]) sizeMap[key] = { w: f.w, h: f.h, slug: key, dims: `${f.w}x${f.h}`, options: [] };
  sizeMap[key].options.push(f);
}
export const HVAC_SIZES = Object.values(sizeMap).sort(
  (a, b) => a.w - b.w || a.h - b.h
);
export const hvacSizeBySlug = Object.fromEntries(HVAC_SIZES.map((s) => [s.slug, s]));

// Aftermarket brands buyers actually search for these (all on Amazon Associates).
export const HVAC_BRANDS = ["Filtrete", "Honeywell", "Nordic Pure", "Aerostar", "Filterbuy", "FilterKing"];

export const hvacSlug = slugify;
