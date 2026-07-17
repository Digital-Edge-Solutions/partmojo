import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../../components/ui";
import { COUNTRIES } from "../../../../../lib/data";
import { HOUSING_SIZES, housingSizeBySlug, HOUSING_TYPES } from "../../../../../lib/housing";
import { jsonLd, breadcrumbLd } from "../../../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false;

export function generateStaticParams() {
  return HOUSING_SIZES.map((s) => ({ country: "us", size: s.slug }));
}

export function generateMetadata({ params }) {
  const s = housingSizeBySlug[params.size];
  if (!s) return {};
  return {
    title: `${s.len}x${s.dia} Water Filter Cartridge — ${s.name} (Sediment, Carbon, GAC)`,
    description: `${s.len}x${s.dia} (${s.name}) replacement water filter cartridges in every type and micron rating. Compare sediment, carbon block and GAC, and buy the right one.`,
    alternates: {
      canonical: `/us/whole-house-water-filters/size/${s.slug}`,
      languages: { "en-US": `/us/whole-house-water-filters/size/${s.slug}`, "x-default": `/us/whole-house-water-filters/size/${s.slug}` },
    },
  };
}

export default function HousingSizeHub({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const s = housingSizeBySlug[params.size];
  if (!c || !s) notFound();

  const byType = HOUSING_TYPES.map((t) => ({
    t, options: s.options.filter((o) => o.type === t.key).sort((a, b) => a.micron - b.micron),
  })).filter((g) => g.options.length);

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: "Whole-House Filters", url: `/${country}/whole-house-water-filters` },
    { name: `${s.len}x${s.dia}`, url: `/${country}/whole-house-water-filters/size/${s.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: "Whole-House Filters", url: `/${country}/whole-house-water-filters` },
          { name: `${s.len}x${s.dia}` },
        ]}
      />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">{s.len}&quot; × {s.dia}&quot; · {s.name}</span>
          <h1><span className="g">{s.len}x{s.dia}</span> water filter cartridges</h1>
          <p className="sub">
            The {s.name} — {s.note}. Every cartridge below drops into any standard {s.len}x{s.dia}
            housing. Pick your type and micron rating.
          </p>
        </section>

        {byType.map(({ t, options }) => (
          <section className="section" key={t.key} style={{ paddingTop: 8 }}>
            <h2>{t.name}</h2>
            <p className="lead">{t.purpose} Change {t.change}.</p>
            <div className="tablelinks">
              {options.map((o) => (
                <Link key={o.slug} href={`/${country}/whole-house-water-filters/${o.slug}`} className="linkrow">
                  <span><b>{o.micron} micron</b> {t.name.split(" (")[0]}</span>
                  <span className="t">from {c.symbol}{o.priceUS.toFixed(2)} →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="section">
          <p className="hint">
            <Link href={`/${country}/whole-house-water-filters`}>← All housing sizes</Link>
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
