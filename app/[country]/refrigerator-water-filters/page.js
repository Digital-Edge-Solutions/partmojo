import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../components/ui";
import SearchBox from "../../../components/SearchBox";
import { FILTERS, MODELS, BRANDS, COUNTRIES, CATEGORY, CONTAMINANTS, COMPARE_PAIRS, slug, priceFor } from "../../../lib/data";
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
    title: `${cat}: Every Part Number & Model (${c.label})`,
    description: `The complete index of ${cat.toLowerCase()} — browse by part number, brand or fridge model. Verified cross-references and best ${c.currency} prices.`,
    alternates: {
      canonical: `/${params.country}/${CATEGORY.slug}`,
      languages: {
        "en-US": `/us/${CATEGORY.slug}`,
        "en-GB": `/uk/${CATEGORY.slug}`,
        "x-default": `/us/${CATEGORY.slug}`,
      },
    },
  };
}

export default function CategoryHub({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  if (!c) notFound();
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: cat, url: `/${country}/${CATEGORY.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb items={[{ name: "Home", url: `/${country}` }, { name: cat }]} />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <h1>{cat}: the complete index</h1>
          <p className="sub">
            Every filter part number, brand and compatible fridge model — cross-referenced and
            certified. Find yours below or search directly.
          </p>
          <SearchBox country={country} />
        </section>

        {BRANDS.map((b) => {
          const list = FILTERS.filter((f) => f.brand === b);
          return (
            <section className="section" key={b} style={{ paddingTop: 12 }}>
              <h2>
                <Link href={`/${country}/brands/${slug(b)}`}>{b}</Link> filters
              </h2>
              <div className="grid g4">
                {list.map((f) => (
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
          );
        })}

        <section className="section">
          <h2>Shop by what it removes</h2>
          <p className="lead">Worried about a specific contaminant? Jump to the filters certified to reduce it.</p>
          <div className="chips">
            {CONTAMINANTS.map((ct) => (
              <Link key={ct.slug} href={`/${country}/water-filters-that-remove/${ct.slug}`} className="chip">
                Removes {ct.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Popular comparisons</h2>
          <p className="lead">Not sure which of two similar filters you need? Compare them side by side.</p>
          <div className="chips">
            {COMPARE_PAIRS.slice(0, 12).map((p) => (
              <Link key={p.slug} href={`/${country}/compare/${p.slug}`} className="chip">
                {p.a.code} vs {p.b.code}
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>All fridge models we cover</h2>
          <p className="lead">{MODELS.length} models mapped to their exact filters.</p>
          <div className="tablelinks">
            {MODELS.map((m) => (
              <Link key={m.slug} href={`/${country}/fits/${m.slug}`} className="linkrow">
                <span>Filter for <b>{m.model}</b></span>
                <span className="t">{m.filters.length} →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
