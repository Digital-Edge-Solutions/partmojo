import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import { CONTAMINANTS, contaminantBySlug, byCode, COUNTRIES, CATEGORY, priceFor } from "../../../../lib/data";
import { jsonLd, breadcrumbLd } from "../../../../lib/site";

export const revalidate = 43200;

export function generateStaticParams() {
  const out = [];
  for (const country of Object.keys(COUNTRIES))
    for (const c of CONTAMINANTS) out.push({ country, contaminant: c.slug });
  return out;
}

export function generateMetadata({ params }) {
  const c = COUNTRIES[params.country];
  const ct = contaminantBySlug[params.contaminant];
  if (!c || !ct) return {};
  return {
    title: `Fridge Water Filters That Remove ${cap(ct.label)} (${c.label})`,
    description: `Every refrigerator water filter we cover that reduces ${ct.label} — with NSF certifications, the fridges they fit, and best ${c.currency} prices. ${ct.filters.length} verified filters.`,
    alternates: {
      canonical: `/${params.country}/water-filters-that-remove/${ct.slug}`,
      languages: {
        "en-US": `/us/water-filters-that-remove/${ct.slug}`,
        "en-GB": `/uk/water-filters-that-remove/${ct.slug}`,
        "x-default": `/uk/water-filters-that-remove/${ct.slug}`,
      },
    },
  };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function FacetPage({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const ct = contaminantBySlug[params.contaminant];
  if (!c || !ct) notFound();
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  const filters = ct.filters.map((code) => byCode[code]).filter(Boolean);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Fridge water filters that remove ${ct.label}`,
    numberOfItems: filters.length,
    itemListElement: filters.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${f.brand} ${f.code}`,
    })),
  };
  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: cat, url: `/${country}/${CATEGORY.slug}` },
    { name: `Removes ${ct.label}`, url: `/${country}/water-filters-that-remove/${ct.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: cat, url: `/${country}/${CATEGORY.slug}` },
          { name: `Removes ${ct.label}` },
        ]}
      />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">By what it removes</span>
          <h1>Fridge water filters that remove <span className="g">{ct.label}</span></h1>
          <p className="sub">
            {filters.length} verified refrigerator water filters that reduce {ct.label}, with their
            NSF certifications and the fridges they fit. Match one to your model to be sure.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <div className="grid g3">
            {filters.map((f) => (
              <Link key={f.slug} href={`/${country}/${CATEGORY.slug}/${f.slug}`} className="card">
                <span className="badge">{f.brand}</span>
                <h3 style={{ marginTop: 10 }}>{f.code}</h3>
                <p className="meta">{f.certifications.join(", ")}</p>
                <p className="meta" style={{ marginTop: 4 }}>fits {f.fits.length}+ models</p>
                <p className="meta" style={{ marginTop: 6 }}>from <b>{c.symbol}{priceFor(f, country).aftermarket.toFixed(2)}</b></p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Filter by other needs</h2>
          <div className="chips">
            {CONTAMINANTS.filter((x) => x.slug !== ct.slug).map((x) => (
              <Link key={x.slug} href={`/${country}/water-filters-that-remove/${x.slug}`} className="chip">
                Removes {x.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
