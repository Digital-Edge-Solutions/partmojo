import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../components/ui";
import SearchBox from "../../components/SearchBox";
import { MODELS, BRANDS, COUNTRIES, CATEGORY, slug } from "../../lib/data";
import { BASE, jsonLd, breadcrumbLd, TAGLINE } from "../../lib/site";

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
      languages: { "en-US": "/us", "en-GB": "/uk", "x-default": "/uk" },
    },
  };
}

export default function CountryHome({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  if (!c) notFound();
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
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
            <b style={{ color: "var(--ink)" }}>{TAGLINE}</b> Enter your filter part number or fridge
            model — PartMojo cross-references every compatible filter so you get the right one at the
            lowest price.
          </p>
          <SearchBox country={country} />
        </section>

        <section className="section">
          <h2>Browse by brand</h2>
          <p className="lead">Pick your fridge brand to see every filter it uses and the models each one fits.</p>
          <div className="chips">
            {BRANDS.map((b) => (
              <Link key={b} href={`/${country}/brands/${slug(b)}`} className="chip">
                {b}
              </Link>
            ))}
            <Link href={`/${country}/brands`} className="chip" style={{ borderColor: "var(--brand)" }}>
              All brands →
            </Link>
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

        <section className="section">
          <h2>More parts categories</h2>
          <p className="lead">Same idea, more of your home — find the exact part by number or size.</p>
          <div className="grid g3">
            <Link href={`/${country}/${CATEGORY.slug}`} className="card">
              <h3>Fridge water filters</h3>
              <p className="meta">Match by part number or fridge model — OEM vs cheaper certified.</p>
            </Link>
            {country === "us" ? (
              <>
                <Link href={`/${country}/hvac-air-filters`} className="card">
                  <h3>HVAC &amp; furnace air filters</h3>
                  <p className="meta">Every standard size in MERV 8, 11 &amp; 13 — with the real dimensions.</p>
                </Link>
                <Link href={`/${country}/whole-house-water-filters`} className="card">
                  <h3>Whole-house &amp; under-sink filters</h3>
                  <p className="meta">Sediment, carbon &amp; GAC cartridges by housing size and micron.</p>
                </Link>
              </>
            ) : (
              <Link href="/uk/descaler" className="card">
                <h3>Coffee &amp; kettle descaler</h3>
                <p className="meta">The right descaler for your machine — beat UK limescale.</p>
              </Link>
            )}
            <Link href={`/${country}/tools/find-my-filter`} className="card">
              <h3>Find-my-filter tool</h3>
              <p className="meta">Not sure what you need? Enter your model and we&apos;ll match it.</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
