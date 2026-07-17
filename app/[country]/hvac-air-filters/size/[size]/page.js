import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../../components/ui";
import { COUNTRIES } from "../../../../../lib/data";
import {
  HVAC_SIZES, hvacSizeBySlug, HVAC_CATEGORY, MERV, DEPTHS, mervBy, actualSize, changeEvery,
} from "../../../../../lib/hvac";
import { jsonLd, breadcrumbLd } from "../../../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false;

export function generateStaticParams() {
  return HVAC_SIZES.map((s) => ({ country: "us", size: s.slug }));
}

export function generateMetadata({ params }) {
  const s = hvacSizeBySlug[params.size];
  if (!s) return {};
  return {
    title: `${s.dims} Air Filter — MERV 8, 11 & 13 (1", 2", 4")`,
    description: `${s.dims} furnace & AC air filters in every MERV rating and depth. Actual size ${actualSize(s.w, s.h, 1)} for 1". Compare prices and change schedule, then buy the right one.`,
    alternates: {
      canonical: `/us/hvac-air-filters/size/${s.slug}`,
      languages: {
        "en-US": `/us/hvac-air-filters/size/${s.slug}`,
        "x-default": `/us/hvac-air-filters/size/${s.slug}`,
      },
    },
  };
}

export default function HvacSizeHub({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const s = hvacSizeBySlug[params.size];
  if (!c || !s) notFound();

  const byDepth = DEPTHS.map((d) => ({
    depth: d,
    options: s.options.filter((o) => o.depth === d).sort((a, b) => a.merv - b.merv),
  }));

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: "Air Filters", url: `/${country}/hvac-air-filters` },
    { name: `${s.dims}`, url: `/${country}/hvac-air-filters/size/${s.slug}` },
  ]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${s.dims} air filters`,
    itemListElement: s.options.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: o.code,
      url: `/${country}/hvac-air-filters/${o.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: "Air Filters", url: `/${country}/hvac-air-filters` },
          { name: s.dims },
        ]}
      />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">{s.dims} · Furnace &amp; AC Filter</span>
          <h1><span className="g">{s.dims}</span> air filter — every MERV &amp; depth</h1>
          <p className="sub">
            The {s.dims} is one of the most common US furnace and return-grille sizes. A 1&quot;
            filter measures about <b>{actualSize(s.w, s.h, 1)}</b> actual. Pick your depth and MERV
            rating below — higher MERV filters finer particles, so match it to your household.
          </p>
        </section>

        {byDepth.map(({ depth, options }) => (
          <section className="section" key={depth} style={{ paddingTop: 8 }}>
            <h2>{s.dims}x{depth} — {depth}&quot; depth</h2>
            <p className="lead">Change {changeEvery(depth)}. {depth === 4 ? "Deep media filters last far longer between changes." : "Set a reminder so airflow never drops."}</p>
            <div className="tablelinks">
              {options.map((o) => (
                <Link key={o.slug} href={`/${country}/hvac-air-filters/${o.slug}`} className="linkrow">
                  <span><b>{o.dims}</b> · MERV {o.merv} <span className="t">— {mervBy[o.merv].tone}</span></span>
                  <span className="t">from {c.symbol}{o.priceUS.toFixed(2)} →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="section">
          <h2>Not sure which MERV?</h2>
          <div className="grid g3">
            {MERV.map((m) => (
              <div key={m.merv} className="card">
                <span className="badge">MERV {m.merv}</span>
                <h3 style={{ marginTop: 10 }}>{m.tone}</h3>
                <p className="meta">Best for {m.best}.</p>
              </div>
            ))}
          </div>
          <div className="chips" style={{ marginTop: 14 }}>
            {[[8, 11], [11, 13], [8, 13]].map(([a, b]) => (
              <Link key={`${a}-${b}`} href={`/${country}/hvac-air-filters/compare/${s.slug}x1-merv-${a}-vs-${b}`} className="chip">
                MERV {a} vs {b} →
              </Link>
            ))}
          </div>
          <p className="hint" style={{ marginTop: 12 }}>
            <Link href={`/${country}/hvac-air-filters`}>← All air filter sizes</Link>
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
