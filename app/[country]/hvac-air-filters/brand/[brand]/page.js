import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../../components/ui";
import { COUNTRIES } from "../../../../../lib/data";
import { HVAC_BRAND_DATA, hvacBrandBySlug, HVAC_SIZES, MERV, mervBy } from "../../../../../lib/hvac";
import { jsonLd, breadcrumbLd, amazonSearchUrl } from "../../../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false;

export function generateStaticParams() {
  return HVAC_BRAND_DATA.map((b) => ({ country: "us", brand: b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }));
}

export function generateMetadata({ params }) {
  const b = hvacBrandBySlug[params.brand];
  if (!b) return {};
  return {
    title: `${b.name} Air Filters by Size — Furnace & AC (MERV 8, 11, 13)`,
    description: `${b.name} furnace & AC air filters in every common size and MERV rating. ${b.blurb} Find your size and compare prices.`,
    alternates: {
      canonical: `/us/hvac-air-filters/brand/${b.slug}`,
      languages: { "en-US": `/us/hvac-air-filters/brand/${b.slug}`, "x-default": `/us/hvac-air-filters/brand/${b.slug}` },
    },
  };
}

export default function HvacBrandPage({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const b = hvacBrandBySlug[params.brand];
  if (!c || !b) notFound();

  const common = HVAC_SIZES.filter((s) =>
    ["16x25", "20x25", "20x20", "16x20", "14x25", "14x20", "20x30", "24x24", "16x24", "18x24"].includes(s.slug)
  );
  const buy = (size) => amazonSearchUrl(`${b.name} ${size} air filter`, country);

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: "Air Filters", url: `/${country}/hvac-air-filters` },
    { name: b.name, url: `/${country}/hvac-air-filters/brand/${b.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: "Air Filters", url: `/${country}/hvac-air-filters` },
          { name: b.name },
        ]}
      />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">{b.name} · Furnace &amp; AC Filters</span>
          <h1><span className="g">{b.name}</span> air filters by size</h1>
          <p className="sub">{b.blurb} Pick your size below — air filters are universal by dimension, so any {b.name} filter in your size fits your system.</p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <h2>Popular {b.name} sizes</h2>
          <p className="lead">Jump to your size for all MERV options, or grab {b.name} directly.</p>
          <div className="tablelinks">
            {common.map((s) => (
              <Link key={s.slug} href={`/${country}/hvac-air-filters/size/${s.slug}`} className="linkrow">
                <span><b>{b.name} {s.dims}</b></span>
                <span className="t">all MERV →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>All sizes</h2>
          <div className="chips">
            {HVAC_SIZES.map((s) => (
              <Link key={s.slug} href={`/${country}/hvac-air-filters/size/${s.slug}`} className="chip">{s.dims}</Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>{b.name} MERV ratings</h2>
          <p className="lead">{b.name} lists filtration on the {b.rating} scale. Here&apos;s what each MERV level does.</p>
          <div className="grid g3">
            {MERV.filter((m) => b.merv.includes(m.merv)).map((m) => (
              <div key={m.merv} className="card">
                <span className="badge">MERV {m.merv}</span>
                <h3 style={{ marginTop: 10 }}>{m.tone}</h3>
                <p className="meta">Captures {m.captures}. Best for {m.best}.</p>
              </div>
            ))}
          </div>
          <p className="hint" style={{ marginTop: 12 }}>
            <Link href={`/${country}/hvac-air-filters`}>← All air filter sizes &amp; brands</Link>
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
