// PartMojo — whole-house & under-sink water filter cartridges (US-first). Category #3.
//
// Like HVAC, this is DIMENSIONAL, not cross-referenced: a replacement cartridge
// is defined by its housing size (length × diameter), filter type, and micron
// rating, and fits ANY standard housing of that size — universal by dimension.
// So the catalogue is generated programmatically from real standard sizes ×
// types × micron ratings. No fabricated compatibility. Every page targets a
// genuine long-tail query like "10x4.5 5 micron carbon block whole house filter".

export const HOUSING_CATEGORY = {
  slug: "whole-house-water-filters",
  name: "Whole-House & Under-Sink Water Filters",
  blurb:
    "Find the exact replacement cartridge for your whole-house or under-sink water filter by housing size, type and micron rating. Standard sizes fit any matching housing — no brand lock-in.",
};

const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ---- Standard cartridge housing sizes (length × diameter, inches) ----
export const HOUSING_SIZES = [
  { len: 10, dia: 2.5, name: '10" Standard', note: "the most common under-sink / RO / point-of-use size", slug: "10x2-5" },
  { len: 20, dia: 2.5, name: '20" Slim Line', note: "taller point-of-use and light whole-house housings", slug: "20x2-5" },
  { len: 10, dia: 4.5, name: '10" Big Blue', note: "compact whole-house housings", slug: "10x4-5" },
  { len: 20, dia: 4.5, name: '20" Big Blue', note: "full-size whole-house housings — highest flow and longest life", slug: "20x4-5" },
];
export const housingSizeBySlug = Object.fromEntries(HOUSING_SIZES.map((s) => [s.slug, s]));

// ---- Filter types, each with the micron ratings it's genuinely sold in ----
export const HOUSING_TYPES = [
  {
    key: "sediment", name: "Sediment (spun polypropylene)", slug: "sediment",
    microns: [1, 5, 20, 50],
    removes: "dirt, sand, silt, rust and loose sediment",
    purpose: "First-stage protection — traps grit before it clogs appliances and downstream filters.",
    change: "every 2–3 months",
  },
  {
    key: "carbon-block", name: "Carbon block (CTO)", slug: "carbon-block",
    microns: [0.5, 5, 10],
    removes: "chlorine taste & odour, VOCs, and many organic chemicals",
    purpose: "Polishing stage — improves taste and reduces chemicals; the tight micron also catches fine sediment.",
    change: "every 3–6 months",
  },
  {
    key: "gac", name: "Granular activated carbon (GAC)", slug: "gac",
    microns: [5],
    removes: "chlorine taste & odour",
    purpose: "High-flow carbon stage for taste and odour with less pressure drop than a carbon block.",
    change: "every 3 months",
  },
  {
    key: "pleated", name: "Pleated sediment (washable)", slug: "pleated",
    microns: [5, 20, 30],
    removes: "sediment — and it's rinsable and reusable",
    purpose: "Reusable sediment stage: rinse and refit several times before replacing. Best cost-per-month on dirty supplies.",
    change: "rinse monthly, replace every 6–12 months",
  },
];
export const housingTypeBySlug = Object.fromEntries(HOUSING_TYPES.map((t) => [t.slug, t]));

// Representative single-cartridge US price (live price on the retailer via the
// affiliate link). Scales with size, and carbon costs more than sediment.
function priceUSD(size, type, micron) {
  const big = size.dia >= 4.5; // Big Blue costs more
  const long = size.len >= 20;
  let base = big ? (long ? 28 : 20) : (long ? 12 : 8);
  if (type.key === "carbon-block") base *= 1.7;
  else if (type.key === "gac") base *= 1.5;
  else if (type.key === "pleated") base *= 1.3;
  if (micron <= 1) base *= 1.15; // finer micron premium
  return Math.round(base * 100) / 100;
}

// Brands buyers search for (all on Amazon Associates).
export const HOUSING_BRANDS = ["Pentek", "iSpring", "Aquaboon", "Culligan", "GE", "AO Smith", "Express Water", "Waterdrop"];

// ---- Build the catalogue: size × type × micron ----
const RAW = [];
for (const s of HOUSING_SIZES) {
  for (const t of HOUSING_TYPES) {
    for (const micron of t.microns) {
      const dims = `${s.len}x${s.dia}`;
      RAW.push({
        len: s.len, dia: s.dia, sizeSlug: s.slug, sizeName: s.name,
        type: t.key, typeName: t.name, typeSlug: t.slug,
        micron, removes: t.removes, purpose: t.purpose, change: t.change,
        dims,
        code: `${dims} ${t.name} ${micron} micron`,
        slug: `${s.slug}-${t.slug}-${String(micron).replace(".", "-")}-micron`,
        priceUS: priceUSD(s, t, micron),
        demand: (s.dia === 4.5 || s.len === 10) && (t.key === "sediment" || t.key === "carbon-block") && [1, 5].includes(micron) ? "high" : "medium",
      });
    }
  }
}
export const HOUSING_FILTERS = RAW;
export const housingBySlug = Object.fromEntries(RAW.map((f) => [f.slug, f]));

// Group by size for the size hubs
for (const s of HOUSING_SIZES) s.options = RAW.filter((f) => f.sizeSlug === s.slug);

export const housingSlug = slugify;
