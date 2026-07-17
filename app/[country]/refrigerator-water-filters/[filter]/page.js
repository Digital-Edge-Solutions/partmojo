import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import {
  FILTERS, bySlug, byCode, COUNTRIES, CATEGORY, AFTERMARKET, slug, priceFor,
} from "../../../../lib/data";
import { BASE, jsonLd, breadcrumbLd, affiliateUrl, PRODUCT_IMAGE } from "../../../../lib/site";

export const revalidate = 43200; // ISR: refresh prices/stock every 12h without a rebuild

export function generateStaticParams() {
  const out = [];
  for (const country of Object.keys(COUNTRIES))
    for (const f of FILTERS) out.push({ country, filter: f.slug });
  return out;
}

export function generateMetadata({ params }) {
  const c = COUNTRIES[params.country];
  const f = bySlug[params.filter];
  if (!c || !f) return {};
  const spell = c.spelling;
  return {
    title: `${f.code} Water Filter Replacement — Fits ${f.fits[0]} & More`,
    description: `${f.code} (${f.aka.slice(0, 3).join(", ")}) ${f.brand} fridge water filter. Reduces chlorine ${spell}, lead & more. Fits ${f.fits.length}+ models. Compare OEM vs cheaper compatible filters in ${c.currency}.`,
    alternates: {
      canonical: `/${params.country}/${CATEGORY.slug}/${f.slug}`,
      languages: {
        "en-US": `/us/${CATEGORY.slug}/${f.slug}`,
        "en-GB": `/uk/${CATEGORY.slug}/${f.slug}`,
        "x-default": `/us/${CATEGORY.slug}/${f.slug}`,
      },
    },
  };
}

export default function FilterPage({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const f = bySlug[params.filter];
  if (!c || !f) notFound();
  const price = priceFor(f, country);
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  const related = (f.related || []).map((code) => byCode[code]).filter(Boolean);

  // ---- Entity-rich JSON-LD: Product + spare-part/consumable relationships ----
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${f.code} Refrigerator Water Filter`,
    sku: f.code,
    mpn: f.code,
    brand: { "@type": "Brand", name: f.brand },
    category: cat,
    image: PRODUCT_IMAGE,
    description: `${f.brand} ${f.code} refrigerator water filter. Also sold as ${f.aka.join(", ")}. NSF-certified; reduces ${f.reduces.join(", ").toLowerCase()}.`,
    isConsumableFor: f.fits.map((m) => ({ "@type": "Product", name: `${f.brand} ${m}` })),
    isAccessoryOrSparePartFor: f.fits.map((m) => ({ "@type": "Product", name: `${f.brand} ${m}` })),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: c.currency,
      lowPrice: price.aftermarket,
      highPrice: price.oem,
      offerCount: 2 + AFTERMARKET.length,
      availability: "https://schema.org/InStock",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Filter life", value: `${f.capacityMonths} months / ${f.capacityGallons} gallons` },
      { "@type": "PropertyValue", name: "Micron rating", value: `${f.micron} micron` },
      { "@type": "PropertyValue", name: "Certifications", value: f.certifications.join(", ") },
    ],
  };
  const faqs = [
    {
      q: `What filters are compatible with the ${f.code}?`,
      a: `The ${f.code} is also sold under the codes ${f.aka.join(", ")}. Certified compatible replacements from brands like ${AFTERMARKET.map((a) => a.brand).join(", ")} fit the same fridges and typically cost less than the OEM part.`,
    },
    {
      q: `Which refrigerators does the ${f.code} fit?`,
      a: `It fits ${f.brand} models including ${f.fits.slice(0, 5).join(", ")} and ${f.fits.length - 5 > 0 ? `${f.fits.length - 5} more` : "others"}. Enter your model number to confirm the exact match.`,
    },
    {
      q: `How often should I replace the ${f.code}?`,
      a: `Replace every ${f.capacityMonths} months or about ${f.capacityGallons} gallons, whichever comes first, to keep contaminant reduction and flow rate at spec.`,
    },
    {
      q: `Is the ${f.code} NSF certified?`,
      a: `Yes — it is certified to ${f.certifications.join(", ")}, reducing ${f.reduces.slice(0, 3).join(", ").toLowerCase()} and more.`,
    },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: cat, url: `/${country}/${CATEGORY.slug}` },
    { name: f.code, url: `/${country}/${CATEGORY.slug}/${f.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: cat, url: `/${country}/${CATEGORY.slug}` },
          { name: f.code },
        ]}
      />
      <main className="container">
        <div className="pt">
          <div>
            <span className={`tier ${f.demand}`}>{f.demand} demand</span>{" "}
            <span className="badge">{f.brand}</span>
            <h1 style={{ marginTop: 10 }}>
              {f.code} Refrigerator Water Filter Replacement
            </h1>
            <p className="sub">
              The {f.brand} {f.code} — also sold as{" "}
              <b>{f.aka.slice(0, 3).join(", ")}</b> — is a {f.micron}-micron carbon-block filter
              certified to {f.certifications.join(", ")}. It reduces{" "}
              {f.reduces.join(", ").toLowerCase()} for up to {f.capacityMonths} months. Below are
              every fridge it fits, its cross-reference codes, and the cheapest verified compatible
              options.
            </p>

            <div className="spec">
              <div><div className="k">Filter life</div><div className="v">{f.capacityMonths} months · {f.capacityGallons} gal</div></div>
              <div><div className="k">Micron rating</div><div className="v">{f.micron} micron</div></div>
              <div><div className="k">Certifications</div><div className="v">{f.certifications.join(", ")}</div></div>
              <div><div className="k">Reduces</div><div className="v">{f.reduces.slice(0, 3).join(", ")}…</div></div>
            </div>

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>Also known as (cross-reference)</h2>
              <p className="lead">Same filter, different part numbers — all interchangeable.</p>
              <div className="chips">
                <span className="chip" style={{ borderColor: "var(--brand)" }}>{f.code}</span>
                {f.aka.map((a) => (
                  <span key={a} className="chip">{a}</span>
                ))}
              </div>
            </div>

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>Fits these {f.brand} fridge models</h2>
              <p className="lead">Tap your model to confirm the exact match and see all options.</p>
              <div className="tablelinks">
                {f.fits.map((m) => (
                  <Link key={m} href={`/${country}/fits/${slug(m)}`} className="linkrow">
                    <span>{f.brand} <b>{m}</b></span>
                    <span className="t">confirm fit →</span>
                  </Link>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="section" style={{ paddingTop: 8 }}>
                <h2>Related &amp; commonly confused filters</h2>
                <p className="lead">Different fridges — make sure you pick the right one.</p>
                <div className="grid g3">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/${country}/${CATEGORY.slug}/${r.slug}`} className="card">
                      <h3>{r.code}</h3>
                      <p className="meta">{r.brand} · {r.fits.length}+ models</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>Frequently asked questions</h2>
              <div className="faq">
                {faqs.map((x, i) => (
                  <details key={i} open={i === 0}>
                    <summary>{x.q}</summary>
                    <p>{x.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="buybox">
              <img src={PRODUCT_IMAGE} alt={`${f.code} refrigerator water filter`} width="400" height="300" style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 12, border: "1px solid var(--line)" }} />
              <div className="small" style={{ marginBottom: 4 }}>Best compatible price</div>
              <div className="price">
                {c.symbol}{price.aftermarket.toFixed(2)} <small>/ filter</small>
              </div>
              <a
                className="cta"
                href={affiliateUrl({ merchant: "Waterdrop", code: f.code, country })}
                rel="sponsored nofollow"
                target="_blank"
              >
                Check price — compatible ↗
              </a>
              <div className="small" style={{ margin: "10px 0 4px" }}>Genuine OEM {f.brand}</div>
              <div className="price" style={{ fontSize: 22 }}>
                {c.symbol}{price.oem.toFixed(2)} <small>/ filter</small>
              </div>
              <a
                className="cta alt"
                href={affiliateUrl({ merchant: "Amazon", code: f.code, country })}
                rel="sponsored nofollow"
                target="_blank"
              >
                Check price — OEM ↗
              </a>
              <div className="disc">
                You save ~{c.symbol}{(price.oem - price.aftermarket).toFixed(2)} choosing a certified
                compatible filter.
              </div>
              <div className="small">
                Compatible alternative brands:
                <div className="chips" style={{ marginTop: 8 }}>
                  {AFTERMARKET.map((a) => (
                    <a
                      key={a.brand}
                      className="chip"
                      href={affiliateUrl({ merchant: a.brand, code: f.code, country })}
                      rel="sponsored nofollow"
                      target="_blank"
                    >
                      {a.brand} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer country={country} />
    </>
  );
}
