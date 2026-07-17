#!/usr/bin/env node
/**
 * PartMojo — OEM cross-reference importer (EEAT-safe).
 *
 * Grows the fridge-filter database from PUBLIC manufacturer cross-reference data
 * (Whirlpool/EveryDrop, GE, Samsung, LG, Frigidaire "replaces X, Y, Z / fits …"
 * tables) — NOT from retailer catalogues (those ToS-block scraping and thin
 * alt-code pages are a Google penalty risk).
 *
 * The golden rule this tool enforces:
 *   • An alternate part number for a filter we already have is NOT a new page —
 *     it's an `aka` cross-reference added to the existing filter's ONE page.
 *   • Only a GENUINELY DISTINCT filter (its own fits set) becomes a new page.
 * This is what keeps us on the right side of "duplicate/doorway content".
 *
 * Input: a JSON array (or CSV) of rows you assembled from OEM reference pages:
 *   [{ "code":"EDR6D1", "brand":"Whirlpool", "aka":["W10311524"],
 *      "fits":["WRV996FDEM","WRX986SIHZ"], "micron":0.5, "capacityMonths":6,
 *      "capacityGallons":200, "certifications":["NSF/ANSI 42","NSF/ANSI 53"],
 *      "reduces":["Chlorine taste & odour","Lead","Cysts"], "demand":"medium" }, … ]
 *
 * Usage:
 *   node tools/oem_import.js path/to/oem-rows.json
 *
 * Output (next to the input):
 *   merge-suggestions.json — aka codes to fold into existing filters (no new page)
 *   new-filters.json       — review-ready RAW entries for genuinely new filters
 *
 * ALWAYS review new-filters.json by hand before pasting into lib/data.js.
 * Never publish a compatibility claim you haven't verified against the OEM.
 */
const fs = require("fs");
const path = require("path");

const norm = (s) => String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

// --- Read the codes + aka we already cover, straight from lib/data.js source ---
function loadKnown() {
  const dataPath = path.join(__dirname, "..", "lib", "data.js");
  const src = fs.readFileSync(dataPath, "utf8");
  const known = new Map(); // normalised code -> canonical filter code
  // match each RAW object's `code:` and `aka: [...]`
  const codeRe = /code:\s*"([^"]+)"/g;
  const akaRe = /aka:\s*\[([^\]]*)\]/g;
  const codes = [...src.matchAll(codeRe)].map((m) => m[1]);
  const akas = [...src.matchAll(akaRe)].map((m) =>
    m[1].split(",").map((x) => x.replace(/["']/g, "").trim()).filter(Boolean)
  );
  const isPartCode = (s) => norm(s).length >= 3; // skips country codes like "us"/"uk"
  codes.forEach((code, i) => {
    if (isPartCode(code)) known.set(norm(code), code);
    (akas[i] || []).forEach((a) => isPartCode(a) && known.set(norm(a), code));
  });
  return known;
}

// Quote-aware CSV row splitter — handles Excel/Google Sheets exports where a
// cell containing a comma is wrapped in "double quotes".
function splitCSVLine(line, delim) {
  const out = [];
  let field = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"' && line[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === delim) { out.push(field); field = ""; }
    else field += c;
  }
  out.push(field);
  return out;
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  const delim = lines[0].includes("\t") ? "\t" : ",";
  const headers = splitCSVLine(lines[0], delim).map((h) => h.trim().toLowerCase());
  const multi = (v) => (v || "").split(/[;|]/).map((s) => s.trim()).filter(Boolean);
  return lines.slice(1).map((line) => {
    const cells = splitCSVLine(line, delim);
    const o = {};
    headers.forEach((h, i) => (o[h] = (cells[i] || "").trim()));
    return {
      code: o.code || o.part || o.part_number || "",
      brand: o.brand || o.manufacturer || "",
      family: o.family || o.series || "",
      aka: multi(o.aka || o.replaces || o.alternate_codes),
      fits: multi(o.fits || o.models || o.fits_models),
      reduces: multi(o.reduces),
      certifications: multi(o.certifications || o.certs),
      demand: o.demand || "medium",
    };
  });
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: node tools/oem_import.js <oem-rows.json|csv>");
    process.exit(1);
  }
  const raw = fs.readFileSync(file, "utf8");
  const rows = file.endsWith(".json") ? JSON.parse(raw) : parseCSV(raw);
  const known = loadKnown();

  const merges = []; // { existing, addAka: [] }
  const news = [];   // review-ready RAW entries
  const seenNew = new Set();

  for (const r of rows) {
    const code = (r.code || "").trim();
    if (!code) continue;
    const allCodes = [code, ...(r.aka || [])].map(norm);
    const hit = allCodes.map((n) => known.get(n)).find(Boolean);

    if (hit) {
      // Already covered → suggest folding any genuinely-new alt numbers as aka.
      const addAka = [code, ...(r.aka || [])].filter((x) => !known.has(norm(x)));
      if (addAka.length) merges.push({ existing: hit, addAka });
      continue;
    }
    if (seenNew.has(norm(code))) continue;
    seenNew.add(norm(code));
    // Genuinely new distinct filter → build a review-ready entry.
    news.push({
      code,
      brand: r.brand || "",
      family: r.family || r.brand || "",
      aka: r.aka || [],
      micron: r.micron ?? 0.5,
      capacityMonths: r.capacityMonths ?? 6,
      capacityGallons: r.capacityGallons ?? 200,
      certifications: r.certifications || ["NSF/ANSI 42", "NSF/ANSI 53"],
      reduces: r.reduces || ["Chlorine taste & odour", "Lead", "Cysts"],
      fits: r.fits || [],
      related: r.related || [],
      demand: r.demand || "medium",
      priceUS: r.priceUS || { oem: 49.99, aftermarket: 16.95 },
      priceUK: r.priceUK || { oem: 43.99, aftermarket: 15.95 },
      _needsReview: (r.fits || []).length === 0 ? "NO FITS — verify before publishing" : "verify fits",
    });
  }

  const dir = path.dirname(path.resolve(file));
  fs.writeFileSync(path.join(dir, "merge-suggestions.json"), JSON.stringify(merges, null, 2));
  fs.writeFileSync(path.join(dir, "new-filters.json"), JSON.stringify(news, null, 2));

  console.log(`Read ${rows.length} OEM rows against ${new Set(known.values()).size} known filters.`);
  console.log(`  → ${merges.length} are alternate numbers of filters we already have (aka merges, NO new page).`);
  console.log(`  → ${news.length} look like genuinely new distinct filters (new pages, after review).`);
  const noFits = news.filter((n) => !n.fits.length).length;
  if (noFits) console.log(`  ⚠ ${noFits} new candidates have NO fits data — do not publish until verified.`);
  console.log(`\nWrote merge-suggestions.json and new-filters.json. Review new-filters.json by hand before adding to lib/data.js.`);
}

main();
