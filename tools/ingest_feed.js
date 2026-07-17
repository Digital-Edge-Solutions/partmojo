#!/usr/bin/env node
/**
 * PartMojo — affiliate product feed ingester & partner analyser.
 *
 * Point it at a product feed export (Awin, CJ, Impact, FlexOffers, Amazon PA-API CSV/JSON).
 * It does two jobs:
 *
 *   1) PARTNER ANALYSIS — which merchants in the feed sell products relevant to our vertical,
 *      how many, and at what average price. Use this to decide who to partner with / prioritise.
 *   2) INGEST — maps relevant rows to our data schema (code, brand, price, image, commission link)
 *      and writes candidates.json ready to fold into lib/data.
 *
 * Usage:
 *   node tools/ingest_feed.js path/to/feed.csv           # CSV (auto-detects , ; | or tab)
 *   node tools/ingest_feed.js path/to/feed.json          # JSON array of products
 *
 * Output (next to the feed):
 *   partner-report.csv   — merchant, relevant_products, avg_price  (sorted, best partners first)
 *   candidates.json      — mapped product entries incl. the commission deep-link
 *
 * No external deps. Review candidates before publishing — never ship unverified compatibility.
 */
const fs = require("fs");
const path = require("path");

// What counts as "our vertical". Extend as we add categories.
const KEYWORDS = /(water\s*filter|fridge\s*filter|refrigerator\s*filter|descal|limescale|replacement\s*filter)/i;
// Ignore obvious non-matches even if they contain a keyword.
const EXCLUDE = /(shower|whole\s*house|under\s*sink|jug|pitcher|tap\b|faucet|air\s*filter|vacuum)/i;

// Fuzzy header → field mapping (first match wins). Covers Awin/CJ/Impact/Amazon column names.
const FIELD = {
  name: ["product_name", "name", "title", "product_title", "productname"],
  brand: ["brand_name", "brand", "manufacturer", "brandname"],
  price: ["search_price", "price", "display_price", "saleprice", "current_price"],
  link: ["aw_deep_link", "deep_link", "clickurl", "click_url", "link", "url", "affiliate_url"],
  image: ["merchant_image_url", "image_url", "aw_image_url", "imageurl", "large_image"],
  merchant: ["merchant_name", "advertiser_name", "programme_name", "merchant", "advertiser"],
  model: ["model_number", "mpn", "part_number", "sku", "ean"],
  currency: ["currency", "curr"],
};

function pick(headers, names) {
  const low = headers.map((h) => h.toLowerCase().trim());
  for (const n of names) {
    const i = low.indexOf(n);
    if (i !== -1) return i;
  }
  return -1;
}

function parseCSV(text) {
  const firstLine = text.slice(0, text.indexOf("\n"));
  const delim = [",", "\t", ";", "|"].sort(
    (a, b) => firstLine.split(b).length - firstLine.split(a).length
  )[0];
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === delim) { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c === "\r") { /* skip */ }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// Pull a plausible part code out of a product title (alphanumeric code shapes).
function extractCode(name, model) {
  if (model && /[A-Z0-9]/i.test(model) && model.replace(/[^A-Za-z0-9]/g, "").length >= 4) return model.trim();
  const m = name.match(/\b([A-Z]{2,}[- ]?\d[\dA-Z-]{2,}|\d{6,}|[A-Z]{2,}\d{2,}[A-Z\d]*)\b/);
  return m ? m[1].replace(/\s+/g, "") : null;
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node ingest_feed.js <feed.csv|feed.json>"); process.exit(1); }
  const raw = fs.readFileSync(file, "utf8");
  let records = [];

  if (file.endsWith(".json")) {
    const data = JSON.parse(raw);
    const arr = Array.isArray(data) ? data : data.products || data.Items || [];
    records = arr.map((o) => ({
      name: o.product_name || o.name || o.title || "",
      brand: o.brand_name || o.brand || "",
      price: parseFloat(o.search_price || o.price || 0) || 0,
      link: o.aw_deep_link || o.deep_link || o.link || o.url || "",
      image: o.merchant_image_url || o.image_url || "",
      merchant: o.merchant_name || o.advertiser_name || o.merchant || "Unknown",
      model: o.model_number || o.mpn || o.sku || "",
      currency: o.currency || "",
    }));
  } else {
    const rows = parseCSV(raw);
    const headers = rows.shift();
    const idx = {};
    for (const k in FIELD) idx[k] = pick(headers, FIELD[k]);
    records = rows.filter((r) => r.length > 1).map((r) => ({
      name: idx.name > -1 ? r[idx.name] || "" : "",
      brand: idx.brand > -1 ? r[idx.brand] || "" : "",
      price: parseFloat(idx.price > -1 ? r[idx.price] : 0) || 0,
      link: idx.link > -1 ? r[idx.link] || "" : "",
      image: idx.image > -1 ? r[idx.image] || "" : "",
      merchant: idx.merchant > -1 ? r[idx.merchant] || "Unknown" : "Unknown",
      model: idx.model > -1 ? r[idx.model] || "" : "",
      currency: idx.currency > -1 ? r[idx.currency] || "" : "",
    }));
  }

  const relevant = records.filter((r) => KEYWORDS.test(r.name) && !EXCLUDE.test(r.name));

  // 1) Partner analysis
  const byMerchant = {};
  for (const r of relevant) {
    const m = (byMerchant[r.merchant] ||= { merchant: r.merchant, n: 0, sum: 0 });
    m.n++; m.sum += r.price;
  }
  const partners = Object.values(byMerchant)
    .map((m) => ({ merchant: m.merchant, relevant_products: m.n, avg_price: (m.sum / m.n).toFixed(2) }))
    .sort((a, b) => b.relevant_products - a.relevant_products);

  const dir = path.dirname(path.resolve(file));
  const report = "merchant,relevant_products,avg_price\n" +
    partners.map((p) => `"${p.merchant}",${p.relevant_products},${p.avg_price}`).join("\n");
  fs.writeFileSync(path.join(dir, "partner-report.csv"), report);

  // 2) Ingest candidates
  const candidates = relevant.map((r) => ({
    code: extractCode(r.name, r.model),
    name: r.name,
    brand: r.brand,
    merchant: r.merchant,
    price: r.price,
    currency: r.currency,
    image: r.image,
    commissionLink: r.link, // the tracked affiliate deep-link straight from the feed
  })).filter((c) => c.code);
  fs.writeFileSync(path.join(dir, "candidates.json"), JSON.stringify(candidates, null, 2));

  console.log(`Scanned ${records.length} products → ${relevant.length} relevant to our vertical.`);
  console.log(`\nTop partners by relevant product count:`);
  partners.slice(0, 15).forEach((p, i) =>
    console.log(`  ${String(i + 1).padStart(2)}. ${p.merchant.padEnd(28)} ${String(p.relevant_products).padStart(5)} products  avg ${p.avg_price}`)
  );
  console.log(`\nWrote partner-report.csv (${partners.length} merchants) and candidates.json (${candidates.length} products).`);
}

main();
