import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import { brandBySlug, BRANDS, COUNTRIES, CATEGORY, slug, priceFor } from "../../../../lib/data";
import { jsonLd, breadcrumbLd } from "../../../../lib/site";

export const revalidate = 43200;

export function generateStaticParams() {
  const out = [];
  for (const country of Object.keys(COUNTRIES))
    for (const b of BRANDS) out.push({ country, brand: slug(b) });
  return out;
}

export function generateMetadata({ params }) {
  const c = COUNTRIES[params.country];
  const b = brandBySlug[params.brand];
  if (!c || !b) return {};
  return {
    title: `${b.brand} Refrigerator Water Filters — All Part Numbers (${c.label})`,
    description: `Every ${b.brand} fridge water filter and the models each one fits. Compare OEM vs compatible ${b.brand} filters and find your exact replacement in ${c.currency}.`,
    alternates: {
      canonical: `/${params.country}/brands/${b.slug}`,
      languages: {
        "en-US": `/us/brands/${b.slug}`,
        "en-GB": `/uk/brands/${b.slug}`,
        "x-default": `/uk/brands/${b.slug}`,
      },
    },
  };
}

export default function BrandHub({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const b = brandBySlug[params.brand];
  if (!c || !b) notFound();
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  const models = [...new Set(b.filters.flatMap((f) => f.fits))].sort();

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: cat, url: `/${country}/${CATEGORY.slug}` },
    { name: b.brand, url: `/${country}/brands/${b.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: cat, url: `/${country}/${CATEGORY.slug}` },
          { name: b.brand },
        ]}
      />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="badge">{b.brand}</span>
          <h1 style={{ marginTop: 10 }}>{b.brand} refrigerator water filters</h1>
          <p className="sub">
            All {b.filters.length} {b.brand} filter part numbers we cover, the fridges each one fits,
            and the cheapest verified compatible options.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <h2>{b.brand} filter part numbers</h2>
          <div className="grid g4">
            {b.filters.map((f) => (
              <Link key={f.slug} href={`/${country}/${CATEGORY.slug}/${f.slug}`} className="card">
                <h3>{f.code}</h3>
                <p className="meta">{f.aka.slice(0, 2).join(" · ")}</p>
                <p className="meta" style={{ marginTop: 6 }}>
                  from <b>{c.symbol}{priceFor(f, country).aftermarket.toFixed(2)}</b>
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>{b.brand} fridge models</h2>
          <p className="lead">Find the exact filter for your {b.brand} refrigerator.</p>
          <div className="tablelinks">
            {models.map((m) => (
              <Link key={m} href={`/${country}/fits/${slug(m)}`} className="linkrow">
                <span>{b.brand} <b>{m}</b></span>
                <span className="t">find filter →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
