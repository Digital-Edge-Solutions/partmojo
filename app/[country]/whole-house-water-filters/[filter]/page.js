import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import { COUNTRIES } from "../../../../lib/data";
import { HOUSING_FILTERS, housingBySlug, HOUSING_CATEGORY, HOUSING_BRANDS } from "../../../../lib/housing";
import { jsonLd, breadcrumbLd, amazonSearchUrl, PRODUCT_IMAGE } from "../../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false;

export function generateStaticParams() {
  return HOUSING_FILTERS.map((f) => ({ country: "us", filter: f.slug }));
}

export function generateMetadata({ params }) {
  const f = housingBySlug[params.filter];
  if (!f) return {};
  return {
    title: `${f.dims} ${f.typeName.split(" (")[0]} ${f.micron} Micron Water Filter`,
    description: `${f.dims} ${f.typeName} cartridge, ${f.micron} micron. Removes ${f.removes}. Fits any standard ${f.dims} housing. Change ${f.change}. Compare prices from top brands.`,
    alternates: {
      canonical: `/us/whole-house-water-filters/${f.slug}`,
      languages: { "en-US": `/us/whole-house-water-filters/${f.slug}`, "x-default": `/us/whole-house-water-filters/${f.slug}` },
    },
  };
}

export default function HousingFilterPage({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const f = housingBySlug[params.filter];
  if (!c || !f) notFound();

  const typeShort = f.typeName.split(" (")[0];
  const buy = (brand) => amazonSearchUrl(`${brand ? brand + " " : ""}${f.dims} ${typeShort} ${f.micron} micron water filter`, country);

  // Other microns of the same type+size
  const sameType = HOUSING_FILTERS.filter((o) => o.sizeSlug === f.sizeSlug && o.type === f.type && o.slug !== f.slug).sort((a, b) => a.micron - b.micron);
  // Other types at same size
  const otherTypes = HOUSING_FILTERS.filter((o) => o.sizeSlug === f.sizeSlug && o.type !== f.type)
    .filter((o, i, arr) => arr.findIndex((x) => x.type === o.type) === i);

  const productLd = {
    "@context": "https://schema.org", "@type": "Product",
    name: `${f.dims} ${typeShort} Water Filter Cartridge — ${f.micron} Micron`,
    sku: f.slug.toUpperCase(), category: HOUSING_CATEGORY.name, image: PRODUCT_IMAGE,
    description: `${f.dims} ${f.typeName} replacement cartridge, ${f.micron} micron. Removes ${f.removes}. Fits any standard ${f.dims} housing.`,
    offers: {
      "@type": "AggregateOffer", priceCurrency: c.currency, lowPrice: f.priceUS,
      highPrice: Math.round(f.priceUS * 1.8 * 100) / 100, offerCount: HOUSING_BRANDS.length,
      availability: "https://schema.org/InStock",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Housing size", value: `${f.dims} in (${f.sizeName})` },
      { "@type": "PropertyValue", name: "Type", value: f.typeName },
      { "@type": "PropertyValue", name: "Micron rating", value: `${f.micron} micron` },
      { "@type": "PropertyValue", name: "Change interval", value: f.change },
    ],
  };
  const faqs = [
    { q: `What does a ${f.micron} micron ${typeShort.toLowerCase()} filter remove?`, a: `This ${f.micron}-micron ${f.typeName.toLowerCase()} removes ${f.removes}. ${f.purpose}` },
    { q: `Will a ${f.dims} cartridge fit my housing?`, a: `Yes if your housing is the standard ${f.dims} size (${f.sizeName}). Cartridges are universal by size — any ${f.dims} cartridge fits any ${f.dims} housing regardless of brand. Match the length, diameter and micron.` },
    { q: `How often should I change it?`, a: `Change ${f.change}. Hard or dirty water shortens that; a pressure drop or returning taste/odour is your cue to swap sooner.` },
    { q: `Which micron rating should I choose?`, a: `Lower micron = finer filtration but faster clogging. For ${typeShort.toLowerCase()}, ${f.type === "sediment" ? "5 micron is the common all-rounder; 1 micron for fine silt, 20–50 for heavy grit as a first stage" : f.type === "carbon-block" ? "5 micron balances taste and flow; 0.5 micron for the finest chemical/particle reduction" : "the listed micron is the standard for this type"}.` },
  ];
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) };
  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: "Whole-House Filters", url: `/${country}/whole-house-water-filters` },
    { name: f.dims, url: `/${country}/whole-house-water-filters/size/${f.sizeSlug}` },
    { name: `${typeShort} ${f.micron}µm`, url: `/${country}/whole-house-water-filters/${f.slug}` },
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
          { name: "Whole-House Filters", url: `/${country}/whole-house-water-filters` },
          { name: f.dims, url: `/${country}/whole-house-water-filters/size/${f.sizeSlug}` },
          { name: `${typeShort} ${f.micron}µm` },
        ]}
      />
      <main className="container">
        <div className="pt">
          <div>
            <span className="badge">{f.dims} · {f.sizeName}</span>
            <h1 style={{ marginTop: 10 }}>{f.dims} {typeShort} Water Filter — {f.micron} Micron</h1>
            <p className="sub">
              A {f.micron}-micron {f.typeName.toLowerCase()} cartridge for any standard <b>{f.dims}</b>{" "}
              housing. Removes {f.removes}. {f.purpose}
            </p>

            <div className="spec">
              <div><div className="k">Housing size</div><div className="v">{f.dims} in</div></div>
              <div><div className="k">Type</div><div className="v">{typeShort}</div></div>
              <div><div className="k">Micron</div><div className="v">{f.micron} micron</div></div>
              <div><div className="k">Change</div><div className="v">{f.change}</div></div>
            </div>

            {sameType.length > 0 && (
              <div className="section" style={{ paddingTop: 8 }}>
                <h2>Other micron ratings ({typeShort})</h2>
                <p className="lead">Same size and type, different fineness — all fit your {f.dims} housing.</p>
                <div className="tablelinks">
                  {sameType.map((o) => (
                    <Link key={o.slug} href={`/${country}/whole-house-water-filters/${o.slug}`} className="linkrow">
                      <span><b>{o.micron} micron</b></span><span className="t">from {c.symbol}{o.priceUS.toFixed(2)} →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {otherTypes.length > 0 && (
              <div className="section" style={{ paddingTop: 8 }}>
                <h2>Other filter types this size</h2>
                <div className="chips">
                  {otherTypes.map((o) => (
                    <Link key={o.slug} href={`/${country}/whole-house-water-filters/${o.slug}`} className="chip">
                      {o.typeName.split(" (")[0]} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>FAQ</h2>
              <div className="faq">
                {faqs.map((x, i) => (
                  <details key={i} open={i === 0}><summary>{x.q}</summary><p>{x.a}</p></details>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="buybox">
              <img src={PRODUCT_IMAGE} alt={`${f.code}`} width="400" height="300" style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 12, border: "1px solid var(--line)" }} />
              <div className="small" style={{ marginBottom: 4 }}>Typical price · often sold in multi-packs</div>
              <div className="price">{c.symbol}{f.priceUS.toFixed(2)} <small>/ cartridge</small></div>
              <a className="cta" href={buy("")} rel="sponsored nofollow" target="_blank">
                Check price — {f.dims} {f.micron}µm ↗
              </a>
              <div className="disc">Buying a multi-pack drops the per-cartridge cost — you&apos;ll change it {f.change}.</div>
              <div className="small">
                Compare brands:
                <div className="chips" style={{ marginTop: 8 }}>
                  {HOUSING_BRANDS.map((b) => (
                    <a key={b} className="chip" href={buy(b)} rel="sponsored nofollow" target="_blank">{b} ↗</a>
                  ))}
                </div>
              </div>
              <p className="small" style={{ marginTop: 12 }}>
                <Link href={`/${country}/whole-house-water-filters/size/${f.sizeSlug}`}>← All {f.dims} cartridges</Link>
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer country={country} />
    </>
  );
}
