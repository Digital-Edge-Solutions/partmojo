import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../components/ui";
import SearchBox from "../../components/SearchBox";
import { FILTERS, MODELS, BRANDS, COUNTRIES, CATEGORY, slug, priceFor } from "../../lib/data";
import { BASE, jsonLd, breadcrumbLd } from "../../lib/site";

export const revalidate = 43200;

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((country) => ({ country }));
}

export function generateMetadata({ params }) {
  const c = COUNTRIES[params.country];
  if (!c) return {};
  const cat = params.country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  return {
    title: `${cat} — Find Your Exact Replacement (${c.label})`,
    description: `Find the exact ${cat.toLowerCase()} for your fridge by part number or model in the ${c.label}. Verified cross-references, certified specs, best ${c.currency} prices.`,
    alternates: {
      canonical: `/${params.country}`,
      languages: { "en-US": "/us", "en-GB": "/uk", "x-default": "/us" },
    },
  };
}

export default function CountryHome({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  if (!c) notFound();
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  const popular = FILTERS.filter((f) => f.demand === "high");
  const topModels = MODELS.slice(0, 10);

  const bc = breadcrumbLd([{ name: "Home", url: `/${country}` }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <main className="container">
        <section className="hero">
          <span className="kicker">{cat} · {c.label}</span>
          <h1>
            Your fridge filter, <span className="g">matched exactly</span> — and cheaper.
          </h1>
          <p className="sub">
            Enter your filter part number or fridge model. PartMojo cross-references every
            compatible filter so you get the right one at the lowest price.
          </p>
          <SearchBox country={country} />
        </section>

        <section className="section">
          <h2>Most-searched filters</h2>
          <p className="lead">The part numbers people look up most — verified compatibility and specs.</p>
          <div className="grid g4">
            {popular.map((f) => (
              <Link key={f.slug} href={`/${country}/${CATEGORY.slug}/${f.slug}`} className="card">
                <span className={`tier ${f.demand}`}>{f.demand} demand</span>
                <h3 style={{ marginTop: 10 }}>{f.code}</h3>
                <p className="meta">{f.brand} · fits {f.fits.length}+ models</p>
                <p className="meta" style={{ marginTop: 6 }}>
                  from <b>{c.symbol}{priceFor(f, country).aftermarket.toFixed(2)}</b>
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Browse by brand</h2>
          <p className="lead">Every filter for your fridge brand in one place.</p>
          <div className="chips">
            {BRANDS.map((b) => (
              <Link key={b} href={`/${country}/brands/${slug(b)}`} className="chip">
                {b}
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Find by fridge model</h2>
          <p className="lead">Know your model number? Jump straight to the filters that fit it.</p>
          <div className="tablelinks">
            {topModels.map((m) => (
              <Link key={m.slug} href={`/${country}/fits/${m.slug}`} className="linkrow">
                <span>Water filter for <b>{m.model}</b></span>
                <span className="t">{m.filters.length} match →</span>
              </Link>
            ))}
          </div>
          <p className="hint" style={{ marginTop: 12 }}>
            <Link href={`/${country}/${CATEGORY.slug}`}>See all filters &amp; models →</Link>
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
