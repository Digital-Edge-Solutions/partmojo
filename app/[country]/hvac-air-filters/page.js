import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../components/ui";
import { COUNTRIES } from "../../../lib/data";
import { HVAC_CATEGORY, HVAC_SIZES, MERV, DEPTHS, HVAC_BRAND_DATA } from "../../../lib/hvac";
import { jsonLd, breadcrumbLd } from "../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false; // US-first category

export function generateStaticParams() {
  return [{ country: "us" }];
}

export function generateMetadata() {
  return {
    title: "HVAC & Furnace Air Filters — Find Your Exact Size (US)",
    description:
      "Find the exact furnace or AC air filter by size — 16x25x1, 20x25x1, 20x20x1 and more, in MERV 8, 11 and 13. Actual dimensions, change schedule and best-value packs.",
    alternates: {
      canonical: "/us/hvac-air-filters",
      languages: { "en-US": "/us/hvac-air-filters", "x-default": "/us/hvac-air-filters" },
    },
  };
}

export default function HvacHub({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  if (!c) notFound();

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: HVAC_CATEGORY.name, url: `/${country}/hvac-air-filters` },
  ]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: HVAC_CATEGORY.name,
    itemListElement: HVAC_SIZES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${s.dims} air filter`,
      url: `/${country}/hvac-air-filters/size/${s.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <Header country={country} />
      <Breadcrumb items={[{ name: "Home", url: `/${country}` }, { name: "Air Filters" }]} />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">HVAC &amp; Furnace Filters · United States</span>
          <h1>Your furnace filter, <span className="g">matched by size</span></h1>
          <p className="sub">
            Air filters are universal by size — read the numbers printed on the side of your old
            filter (width × height × depth) and pick that exact size below. We show the true
            dimensions, which MERV rating you actually need, and how often to change it.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <h2>Choose your size</h2>
          <p className="lead">Read the three numbers on the edge of your old filter, then tap that size for every MERV rating and depth with live prices.</p>
          <div className="chips">
            {HVAC_SIZES.map((s) => (
              <Link key={s.slug} href={`/${country}/hvac-air-filters/size/${s.slug}`} className="chip">
                {s.dims}
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Which MERV rating do you need?</h2>
          <p className="lead">Higher MERV traps finer particles — but pick the highest your system can handle without straining airflow.</p>
          <div className="grid g3">
            {MERV.map((m) => (
              <div key={m.merv} className="card">
                <span className="badge">MERV {m.merv}</span>
                <h3 style={{ marginTop: 10 }}>{m.tone}</h3>
                <p className="meta">Captures {m.captures}.</p>
                <p className="meta" style={{ marginTop: 6 }}>Best for {m.best}. (MPR ~{m.mpr}, FPR {m.fpr}.)</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Shop by brand</h2>
          <p className="lead">Prefer a specific brand? Jump to its sizes and MERV options.</p>
          <div className="chips">
            {HVAC_BRAND_DATA.map((b) => (
              <Link key={b.name} href={`/${country}/hvac-air-filters/brand/${b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="chip">
                {b.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>How to read your filter size</h2>
          <p className="lead">
            The size is printed on the cardboard edge of your current filter, e.g. <b>16x25x1</b> =
            16&quot; wide × 25&quot; tall × 1&quot; thick (nominal). The real filter measures about
            half an inch smaller so it slides in — that&apos;s normal. If your old filter has no
            printing, measure it and round to the nearest standard size above. Depth matters most:
            a 1&quot; slot won&apos;t take a 4&quot; media filter and vice-versa.
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
