// PartMojo — UK descaler category (coffee machines & kettles).
// Limescale is a major UK hard-water problem, so this category is UK-first.
// Data is descaler-product guidance by machine brand (accurate general recommendations),
// not fabricated part-fitment. Products link out via the affiliate layer.

export const DESCALER_CATEGORY = {
  slug: "descaler",
  name: "Coffee Machine & Kettle Descaler",
  blurb:
    "Find the right descaler for your coffee machine or kettle. Limescale ruins taste, slows heating and shortens machine life — descale on schedule with the correct product.",
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const RAW = [
  {
    name: "De'Longhi",
    machines: ["Magnifica", "Dinamica", "Eletta", "La Specialista", "Dedica"],
    oem: "De'Longhi EcoDecalk (DLSC500 / DLSC200)",
    universal: ["Durgol Swiss Espresso", "Oust All Purpose Descaler"],
    frequency: "every 2–3 months",
    hardWater: "monthly in hard-water areas",
    tip: "De'Longhi bean-to-cup machines prompt a descale warning — use EcoDecalk or a coffee-machine-safe descaler; never use a household kettle descaler in a pump espresso machine.",
  },
  {
    name: "Sage",
    machines: ["Barista Express", "Barista Pro", "Bambino", "Oracle", "the Dual Boiler"],
    oem: "Sage/Breville Descaler (BES007)",
    universal: ["Durgol Swiss Espresso", "Cafetto Descaler"],
    frequency: "every 2–3 months",
    hardWater: "every 4–6 weeks in hard-water areas",
    tip: "Sage machines run a guided descale cycle; use the Sage descaler sachets or a food-safe espresso descaler and rinse thoroughly afterwards.",
  },
  {
    name: "Nespresso",
    machines: ["Vertuo", "Vertuo Next", "Original Pixie", "Citiz", "Lattissima"],
    oem: "Nespresso Descaling Kit",
    universal: ["Durgol Swiss Espresso", "Oust All Purpose Descaler"],
    frequency: "every 3 months or 300 capsules",
    hardWater: "every 6–8 weeks in hard-water areas",
    tip: "Nespresso sells a two-sachet descaling kit; a universal espresso descaler works too. Run the machine's descale mode, then two clean-water cycles.",
  },
  {
    name: "Tassimo",
    machines: ["Vivy 2", "Happy", "Style", "My Way", "Suny"],
    oem: "Bosch Tassimo Descaling Tablets (TCZ6004)",
    universal: ["Oust All Purpose Descaler", "Kilrock-K Descaler"],
    frequency: "every ~300 drinks (machine prompts)",
    hardWater: "sooner in hard-water areas",
    tip: "Tassimo machines use descaling tablets dissolved in water; the orange service T-Disc triggers the cycle. Don't skip the rinse.",
  },
  {
    name: "Dolce Gusto",
    machines: ["Genio S", "Piccolo XS", "Infinissima", "Lumio"],
    oem: "Universal coffee-machine descaler",
    universal: ["Durgol Universal", "Oust All Purpose Descaler", "Kilrock-K"],
    frequency: "every 3–4 months",
    hardWater: "every 6–8 weeks in hard-water areas",
    tip: "Dolce Gusto has no branded descaler — use a universal coffee-machine descaler at the recommended dilution and run several clean-water cycles after.",
  },
  {
    name: "Jura",
    machines: ["ENA 8", "E8", "S8", "Z-line", "WE8"],
    oem: "Jura Descaling Tablets",
    universal: ["Durgol Swiss Espresso"],
    frequency: "when the machine requests it",
    hardWater: "more often on hard water",
    tip: "Jura machines only descale correctly with the tablet-based cycle — use Jura descaling tablets and pair with a Claris water filter to reduce future scale.",
  },
  {
    name: "Krups",
    machines: ["Evidence", "Intuition", "Nespresso by Krups"],
    oem: "Krups / universal descaler (F054)",
    universal: ["Durgol Swiss Espresso", "Oust All Purpose Descaler"],
    frequency: "every 2–3 months",
    hardWater: "monthly in hard-water areas",
    tip: "Use the Krups liquid descaler or a food-safe espresso descaler; follow the machine's automatic descaling programme.",
  },
  {
    name: "Philips / Saeco",
    machines: ["Philips 3200 LatteGo", "Saeco Xelsis", "Philips 5400"],
    oem: "Philips/Saeco Descaler (CA6700)",
    universal: ["Durgol Swiss Espresso", "Oust All Purpose Descaler"],
    frequency: "every 1–2 months (machine prompts)",
    hardWater: "monthly in hard-water areas",
    tip: "Philips and Saeco share the CA6700 descaler; using the correct product keeps the AquaClean filter warranty valid.",
  },
  {
    name: "Kettles",
    machines: ["Any electric or stovetop kettle"],
    oem: "Kilrock-K Kettle Descaler",
    universal: ["Oust All Purpose Descaler", "White vinegar (budget option)", "Citric acid"],
    frequency: "monthly",
    hardWater: "every 2 weeks in hard-water areas",
    tip: "Kettles scale fastest of all. A dedicated kettle descaler, citric acid or diluted white vinegar all work — boil, leave to fizz, then rinse well before the next brew.",
  },
];

export const DESCALER_BRANDS = RAW.map((b) => ({ ...b, slug: slugify(b.name) }));
export const descalerBySlug = Object.fromEntries(DESCALER_BRANDS.map((b) => [b.slug, b]));
