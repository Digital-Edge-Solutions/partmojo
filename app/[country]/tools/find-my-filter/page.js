import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import SearchBox from "../../../../components/SearchBox";
import { FILTERS, BRANDS, COUNTRIES, CATEGORY, slug } from "../../../../lib/data";
import { jsonLd, breadcrumbLd } from "../../../../lib/site";

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((country) => ({ country }));
}

export function generateMetadata({ params }) {
  const c = COUNTRIES[params.country];
  if (!c) return {};
  return {
    title: `Find My Fridge Water Filter — Free Compatibility Tool (${c.label})`,
    description: `Enter your fridge model or filter part number and instantly find the exact compatible water filter — OEM and cheaper certified options. Free tool, ${c.label}.`,
    alternates: {
      canonical: `/${params.country}/tools/find-my-filter`,
      languages: {
        "en-US": "/us/tools/find-my-filter",
        "en-GB": "/uk/tools/find-my-filter",
        "x-default": "/uk/tools/find-my-filter",
      },
    },
  };
}

export default function FindMyFilter({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  if (!c) notFound();

  const howto = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to find the right water filter for your fridge",
    step: [
      { "@type": "HowToStep", name: "Find your part or model number", text: "Check your old filter or the sticker inside your fridge for a code." },
      { "@type": "HowToStep", name: "Search it", text: "Type the code into the PartMojo finder above." },
      { "@type": "HowToStep", name: "Pick your match", text: "Choose the genuine OEM filter or a cheaper certified compatible one." },
    ],
  };
  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: "Find my filter", url: `/${country}/tools/find-my-filter` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(howto)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb items={[{ name: "Home", url: `/${country}` }, { name: "Find my filter" }]} />
      <main className="container">
        <section className="hero">
          <span className="kicker">Free tool · {c.label}</span>
          <h1>Find <span className="g">your exact</span> fridge water filter</h1>
          <p className="sub">
            Type your filter part number or fridge model number. We instantly match it to every
            verified compatible filter — genuine OEM and cheaper certified equivalents — with prices.
          </p>
          <SearchBox country={country} />
        </section>

        <section className="section">
          <h2>How it works</h2>
          <div className="grid g3">
            <div className="card"><h3>1 · Find your code</h3><p className="meta">Check your current filter or the sticker inside your fridge for a part or model number.</p></div>
            <div className="card"><h3>2 · Search it</h3><p className="meta">Type it into the finder above — part numbers like EDR1RXD1 or a model like RF28HMEDBSR.</p></div>
            <div className="card"><h3>3 · Pick your match</h3><p className="meta">Choose the genuine OEM filter or a cheaper certified compatible one, and check the best price.</p></div>
          </div>
        </section>

        <section className="section">
          <h2>Browse filters</h2>
          <div className="chips">
            {FILTERS.map((f) => (
              <Link key={f.slug} href={`/${country}/${CATEGORY.slug}/${f.slug}`} className="chip">{f.code}</Link>
            ))}
          </div>
          <h2 style={{ marginTop: 26 }}>Browse by brand</h2>
          <div className="chips">
            {BRANDS.map((b) => (
              <Link key={b} href={`/${country}/brands/${slug(b)}`} className="chip">{b}</Link>
            ))}
          </div>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
