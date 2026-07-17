import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import { COUNTRIES } from "../../../../lib/data";
import {
  HVAC_FILTERS, hvacBySlug, HVAC_CATEGORY, HVAC_BRANDS, mervBy, actualSize, changeEvery, packHint,
} from "../../../../lib/hvac";
import { jsonLd, breadcrumbLd, amazonSearchUrl, PRODUCT_IMAGE, ogImage } from "../../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false;

export function generateStaticParams() {
  return HVAC_FILTERS.map((f) => ({ country: "us", filter: f.slug }));
}

export function generateMetadata({ params }) {
  const f = hvacBySlug[params.filter];
  if (!f) return {};
  const m = mervBy[f.merv];
  const og = ogImage({ code: f.code, kind: "Furnace & AC air filter", specs: [`${f.dims} in`, `MERV ${f.merv}`, changeEvery(f.depth)] });
  return {
    title: `${f.code} Air Filter — ${f.dims} Furnace Filter (Actual ${actualSize(f.w, f.h, f.depth).split(" ×").slice(0, 2).join(" ×")})`,
    description: `${f.code} furnace & AC air filter. Actual size ${actualSize(f.w, f.h, f.depth)}. Captures ${m.captures}. Change ${changeEvery(f.depth)}. Compare prices from top brands.`,
    alternates: {
      canonical: `/us/hvac-air-filters/${f.slug}`,
      languages: {
        "en-US": `/us/hvac-air-filters/${f.slug}`,
        "x-default": `/us/hvac-air-filters/${f.slug}`,
      },
    },
    openGraph: { images: [{ url: og, width: 1200, height: 630 }] },
  };
}

export default function HvacFilterPage({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const f = hvacBySlug[params.filter];
  if (!c || !f) notFound();
  const m = mervBy[f.merv];
  const actual = actualSize(f.w, f.h, f.depth);

  // Other MERV ratings at the same size+depth (upsell / downsell within the slot).
  const sameSlot = HVAC_FILTERS.filter(
    (o) => o.sizeSlug === f.sizeSlug && o.depth === f.depth && o.merv !== f.merv
  ).sort((a, b) => a.merv - b.merv);
  // Other depths at the same size (in case they measured the slot).
  const otherDepths = HVAC_FILTERS.filter(
    (o) => o.sizeSlug === f.sizeSlug && o.depth !== f.depth && o.merv === f.merv
  ).sort((a, b) => a.depth - b.depth);

  const buy = (brand) =>
    amazonSearchUrl(`${brand ? brand + " " : ""}${f.dims} MERV ${f.merv} air filter`, country);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${f.code} Furnace & AC Air Filter`,
    sku: f.slug.toUpperCase(),
    mpn: f.dims,
    category: HVAC_CATEGORY.name,
    image: PRODUCT_IMAGE,
    description: `${f.dims} MERV ${f.merv} pleated HVAC air filter. Actual size ${actual}. Captures ${m.captures}. Replace ${changeEvery(f.depth)}.`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: c.currency,
      lowPrice: f.priceUS,
      highPrice: Math.round(f.priceUS * 1.9 * 100) / 100,
      offerCount: HVAC_BRANDS.length,
      availability: "https://schema.org/InStock",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Nominal size", value: `${f.dims} in` },
      { "@type": "PropertyValue", name: "Actual size", value: actual },
      { "@type": "PropertyValue", name: "MERV rating", value: `MERV ${f.merv}` },
      { "@type": "PropertyValue", name: "MPR equivalent", value: m.mpr },
      { "@type": "PropertyValue", name: "FPR equivalent", value: m.fpr },
      { "@type": "PropertyValue", name: "Change interval", value: changeEvery(f.depth) },
    ],
  };
  const faqs = [
    {
      q: `What is the actual size of a ${f.dims} air filter?`,
      a: `A ${f.dims} is the nominal size printed on the frame. The true measured size is about ${actual}, cut slightly under so the filter slides into the ${f.dims.split("x")[0]}x${f.dims.split("x")[1]} slot. This is standard across all brands.`,
    },
    {
      q: `What does MERV ${f.merv} filter out?`,
      a: `MERV ${f.merv} captures ${m.captures}. It's best for ${m.best}. On the box you may see it labelled MPR ~${m.mpr} (3M/Filtrete) or FPR ${m.fpr} (Home Depot).`,
    },
    {
      q: `How often should I change a ${f.dims}x${f.depth} filter?`,
      a: `Change it ${changeEvery(f.depth)}. A ${f.depth}" filter ${f.depth === 1 ? "clogs quickest, so check it monthly" : "holds more dust and lasts longer, but still check it periodically"}. A clogged filter strains your blower and raises energy bills.`,
    },
    {
      q: `Will a ${f.dims}x${f.depth} filter fit my furnace?`,
      a: `Air filters are universal by size — any furnace, AC or return grille that takes a ${f.dims}x${f.depth} filter will fit this one, regardless of the HVAC brand. Just match the three numbers on your old filter's frame exactly, depth included.`,
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
    { name: "Air Filters", url: `/${country}/hvac-air-filters` },
    { name: f.dims, url: `/${country}/hvac-air-filters/size/${f.sizeSlug}` },
    { name: `MERV ${f.merv}`, url: `/${country}/hvac-air-filters/${f.slug}` },
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
          { name: "Air Filters", url: `/${country}/hvac-air-filters` },
          { name: f.dims, url: `/${country}/hvac-air-filters/size/${f.sizeSlug}` },
          { name: `MERV ${f.merv}` },
        ]}
      />
      <main className="container">
        <div className="pt">
          <div>
            <span className="badge">MERV {f.merv} · {m.tone}</span>
            <h1 style={{ marginTop: 10 }}>
              {f.code} Furnace &amp; AC Air Filter
            </h1>
            <p className="sub">
              The <b>{f.dims}</b> (actual size <b>{actual}</b>) in MERV {f.merv} — captures{" "}
              {m.captures}. Best for {m.best}. Below: the true dimensions, when to change it, and how
              this MERV compares to the others that fit the same slot.
            </p>

            <div className="spec">
              <div><div className="k">Nominal size</div><div className="v">{f.dims} in</div></div>
              <div><div className="k">Actual size</div><div className="v">{actual}</div></div>
              <div><div className="k">MERV</div><div className="v">MERV {f.merv} · MPR {m.mpr} · FPR {m.fpr}</div></div>
              <div><div className="k">Change</div><div className="v">{changeEvery(f.depth)}</div></div>
            </div>

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>Same size, other MERV ratings</h2>
              <p className="lead">All fit your {f.dims}x{f.depth} slot — step up for finer filtration, down for easier airflow.</p>
              <div className="tablelinks">
                {sameSlot.map((o) => (
                  <Link key={o.slug} href={`/${country}/hvac-air-filters/${o.slug}`} className="linkrow">
                    <span>MERV <b>{o.merv}</b> <span className="t">— {mervBy[o.merv].tone}</span></span>
                    <span className="t">from {c.symbol}{o.priceUS.toFixed(2)} →</span>
                  </Link>
                ))}
              </div>
            </div>

            {otherDepths.length > 0 && (
              <div className="section" style={{ paddingTop: 8 }}>
                <h2>Measured your slot? Other depths</h2>
                <p className="lead">Depth must match your filter slot exactly. Same {f.dims} face, different thickness.</p>
                <div className="chips">
                  {otherDepths.map((o) => (
                    <Link key={o.slug} href={`/${country}/hvac-air-filters/${o.slug}`} className="chip">
                      {o.dims} MERV {o.merv} →
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
              <img src={ogImage({ code: f.code, kind: "Furnace & AC air filter", specs: [`${f.dims} in`, `MERV ${f.merv}`, actual, changeEvery(f.depth)] })} alt={`${f.code} ${f.dims} MERV ${f.merv} air filter`} width="1200" height="630" style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 12, border: "1px solid var(--line)" }} />
              <div className="small" style={{ marginBottom: 4 }}>Typical price · {packHint(f.depth)}</div>
              <div className="price">
                {c.symbol}{f.priceUS.toFixed(2)} <small>/ filter</small>
              </div>
              <a className="cta" href={buy("")} rel="sponsored nofollow" target="_blank">
                Check price — {f.dims} MERV {f.merv} ↗
              </a>
              <div className="disc">
                Buying a multi-pack cuts the per-filter cost — you&apos;ll change it {changeEvery(f.depth)}.
              </div>
              <div className="small">
                Compare top brands:
                <div className="chips" style={{ marginTop: 8 }}>
                  {HVAC_BRANDS.map((b) => (
                    <a key={b} className="chip" href={buy(b)} rel="sponsored nofollow" target="_blank">{b} ↗</a>
                  ))}
                </div>
              </div>
              <p className="small" style={{ marginTop: 12 }}>
                <Link href={`/${country}/hvac-air-filters/size/${f.sizeSlug}`}>← All {f.dims} options</Link>
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer country={country} />
    </>
  );
}
