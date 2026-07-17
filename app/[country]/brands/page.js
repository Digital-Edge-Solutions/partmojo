import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../components/ui";
import { brandBySlug, BRANDS, COUNTRIES, CATEGORY, slug } from "../../../lib/data";
import { jsonLd, breadcrumbLd } from "../../../lib/site";

export const revalidate = 43200;

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((country) => ({ country }));
}

export function generateMetadata({ params }) {
  const c = COUNTRIES[params.country];
  if (!c) return {};
  const cat = params.country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  return {
    title: `${cat} by Brand — Every Fridge Filter Brand (${c.label})`,
    description: `Browse ${cat.toLowerCase()} by brand — ${BRANDS.join(", ")}. Pick your fridge brand to see every part number and the models each filter fits.`,
    alternates: {
      canonical: `/${params.country}/brands`,
      languages: { "en-US": "/us/brands", "en-GB": "/uk/brands", "x-default": "/uk/brands" },
    },
  };
}

export default function BrandsIndex({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  if (!c) notFound();
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  const brands = BRANDS.map((b) => brandBySlug[slug(b)]);

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: cat, url: `/${country}/${CATEGORY.slug}` },
    { name: "Brands", url: `/${country}/brands` },
  ]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat} brands`,
    itemListElement: brands.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.brand,
      url: `/${country}/brands/${b.slug}`,
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
          { name: cat, url: `/${country}/${CATEGORY.slug}` },
          { name: "Brands" },
        ]}
      />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">Fridge filter brands · {c.label}</span>
          <h1>Every fridge filter <span className="g">brand</span></h1>
          <p className="sub">
            Pick your refrigerator brand to see all its filter part numbers, the cross-reference
            (also-known-as) codes, and the exact models each filter fits.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <div className="grid g3">
            {brands.map((b) => (
              <Link key={b.slug} href={`/${country}/brands/${b.slug}`} className="card">
                <h3>{b.brand}</h3>
                <p className="meta">{b.filters.length} filter{b.filters.length === 1 ? "" : "s"} covered</p>
                <p className="meta" style={{ marginTop: 6 }}>
                  {b.filters.slice(0, 3).map((f) => f.code).join(" · ")}
                  {b.filters.length > 3 ? " …" : ""}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Don&apos;t know your brand?</h2>
          <p className="lead">
            Search your filter part number or fridge model instead — we&apos;ll take you straight to
            the match.
          </p>
          <div className="chips">
            <Link href={`/${country}/${CATEGORY.slug}`} className="chip">All fridge filters →</Link>
            <Link href={`/${country}/tools/find-my-filter`} className="chip">Find-my-filter tool →</Link>
            {country === "us" && (
              <Link href="/us/hvac-air-filters" className="chip">HVAC &amp; furnace filters →</Link>
            )}
          </div>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
