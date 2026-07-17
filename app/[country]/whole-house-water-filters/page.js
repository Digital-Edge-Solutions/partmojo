import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../components/ui";
import { COUNTRIES } from "../../../lib/data";
import { HOUSING_CATEGORY, HOUSING_SIZES, HOUSING_TYPES } from "../../../lib/housing";
import { jsonLd, breadcrumbLd } from "../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false; // US-first category

export function generateStaticParams() {
  return [{ country: "us" }];
}

export function generateMetadata() {
  return {
    title: "Whole-House & Under-Sink Water Filter Cartridges — By Size (US)",
    description:
      "Find the exact replacement whole-house or under-sink water filter cartridge by housing size, type and micron — 10x2.5, 20x2.5, 10x4.5 (Big Blue), 20x4.5. Sediment, carbon block, GAC.",
    alternates: {
      canonical: "/us/whole-house-water-filters",
      languages: { "en-US": "/us/whole-house-water-filters", "x-default": "/us/whole-house-water-filters" },
    },
  };
}

export default function HousingHub({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  if (!c) notFound();

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: HOUSING_CATEGORY.name, url: `/${country}/whole-house-water-filters` },
  ]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: HOUSING_CATEGORY.name,
    itemListElement: HOUSING_SIZES.map((s, i) => ({
      "@type": "ListItem", position: i + 1, name: `${s.len}x${s.dia} (${s.name})`,
      url: `/${country}/whole-house-water-filters/size/${s.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <Header country={country} />
      <Breadcrumb items={[{ name: "Home", url: `/${country}` }, { name: "Whole-House Filters" }]} />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">Whole-House &amp; Under-Sink Filters · United States</span>
          <h1>Your water filter cartridge, <span className="g">matched by size</span></h1>
          <p className="sub">
            Cartridges are universal by housing size — measure your old one (length × diameter) or
            read the housing label, then pick that size. We show which type and micron rating does
            what, so you replace with the right cartridge, not just any that fits.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <h2>Choose your housing size</h2>
          <p className="lead">The four standard sizes that fit almost every US housing.</p>
          <div className="grid g4">
            {HOUSING_SIZES.map((s) => (
              <Link key={s.slug} href={`/${country}/whole-house-water-filters/size/${s.slug}`} className="card">
                <h3>{s.len}&quot; × {s.dia}&quot;</h3>
                <p className="meta">{s.name}</p>
                <p className="meta" style={{ marginTop: 6 }}>{s.note}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Which filter type do you need?</h2>
          <p className="lead">Most whole-house setups stage a sediment filter first, then a carbon filter for taste.</p>
          <div className="grid g4">
            {HOUSING_TYPES.map((t) => (
              <div key={t.slug} className="card">
                <span className="badge">{t.name.split(" (")[0]}</span>
                <h3 style={{ marginTop: 10 }}>Removes {t.removes.split(",")[0]}</h3>
                <p className="meta">{t.purpose}</p>
                <p className="meta" style={{ marginTop: 6 }}>Change {t.change}.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>How to find your size</h2>
          <p className="lead">
            Twist the housing open and pull the old cartridge. Measure its length and diameter, or
            check the housing body for a size stamp. &quot;Big Blue&quot; housings are the fat 4.5&quot;
            whole-house type; slim 2.5&quot; cartridges are the standard under-sink and point-of-use
            size. Match both numbers and the micron rating printed on the old cartridge.
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
