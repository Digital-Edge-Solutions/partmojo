import Link from "next/link";
import { Header, Footer } from "../components/ui";
import SearchBox from "../components/SearchBox";
import { FILTERS, CATEGORY } from "../lib/data";
import { BASE, jsonLd } from "../lib/site";

export const metadata = {
  title: "PartMojo — Find the Exact Replacement Filter for Your Fridge",
  description:
    "Enter your fridge water filter part number or model to find the exact replacement, verified cross-references, and the cheapest compatible options. US & UK.",
  alternates: { canonical: "/", languages: { "en-US": "/us", "en-GB": "/uk", "x-default": "/uk" } },
};

export default function Home() {
  const examples = FILTERS.slice(0, 8); // example quick-links under the search box
  const org = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PartMojo",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: BASE + "/us/refrigerator-water-filters?q={query}",
      "query-input": "required name=query",
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(org)} />
      <Header country="us" />
      <main className="container">
        <section className="hero">
          <span className="kicker">Refrigerator water filters · US &amp; UK</span>
          <h1>
            Find the <span className="g">exact filter</span> your fridge needs.
            <br />In seconds, at the best price.
          </h1>
          <p className="sub">
            Type your filter part number or fridge model. We match it to every verified compatible
            option — OEM and cheaper equivalents — so you never buy the wrong one again.
          </p>
          <SearchBox country="us" />
          <div className="chips" style={{ marginTop: 18 }}>
            {examples.map((f) => (
              <Link key={f.slug} href={`/us/${CATEGORY.slug}/${f.slug}`} className="chip">
                {f.code}
              </Link>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="grid g2">
            <Link href="/us" className="card">
              <span className="badge">🇺🇸 United States</span>
              <h3 style={{ marginTop: 12 }}>Shop US refrigerator water filters</h3>
              <p className="meta">Prices in USD, US retailers, NSF-certified options.</p>
            </Link>
            <Link href="/uk" className="card">
              <span className="badge">🇬🇧 United Kingdom</span>
              <h3 style={{ marginTop: 12 }}>Shop UK fridge water filters</h3>
              <p className="meta">Prices in GBP, UK retailers, fast UK delivery.</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer country="us" />
    </>
  );
}
