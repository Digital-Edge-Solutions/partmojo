import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../components/ui";
import { COUNTRIES } from "../../../lib/data";
import { DESCALER_BRANDS, DESCALER_CATEGORY } from "../../../lib/descaler";
import { jsonLd, breadcrumbLd, affiliateUrl } from "../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false; // UK-only category

export function generateStaticParams() {
  return [{ country: "uk" }];
}

export function generateMetadata() {
  return {
    title: "Coffee Machine & Kettle Descaler — Find the Right One (UK)",
    description:
      "The right descaler for your coffee machine or kettle — De'Longhi, Sage, Nespresso, Tassimo, Jura and more. Beat UK limescale, protect your machine and keep the taste.",
    alternates: {
      canonical: "/uk/descaler",
      languages: { "en-GB": "/uk/descaler", "x-default": "/uk/descaler" },
    },
  };
}

export default function DescalerHub({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  if (!c) notFound();

  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: DESCALER_CATEGORY.name, url: `/${country}/descaler` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb items={[{ name: "Home", url: `/${country}` }, { name: "Descaler" }]} />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">Descaler · United Kingdom</span>
          <h1>Find the right <span className="g">descaler</span> for your machine</h1>
          <p className="sub">
            Over 60% of UK homes are in hard-water areas, so limescale builds up fast — ruining the
            taste of your coffee, slowing heating and shortening your machine's life. Pick your
            machine below for the correct descaler and how often to use it.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <h2>Choose your machine</h2>
          <div className="grid g3">
            {DESCALER_BRANDS.map((b) => (
              <Link key={b.slug} href={`/${country}/descaler/${b.slug}`} className="card">
                <h3>{b.name}</h3>
                <p className="meta">{b.machines.slice(0, 3).join(", ")}</p>
                <p className="meta" style={{ marginTop: 6 }}>Descale {b.frequency}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Why descaling matters</h2>
          <div className="grid g3">
            <div className="card"><h3>Better taste</h3><p className="meta">Scale gives coffee a bitter, chalky edge and clogs the flavour. Descaling restores it.</p></div>
            <div className="card"><h3>Longer machine life</h3><p className="meta">Limescale forces the heater and pump to work harder — the top cause of premature failures.</p></div>
            <div className="card"><h3>Faster, hotter</h3><p className="meta">A scaled element heats slowly and unevenly. Clear it and your machine performs like new.</p></div>
          </div>
        </section>

        <section className="section">
          <h2>Universal descalers that work on most machines</h2>
          <p className="lead">No branded descaler for your model? These food-safe descalers suit most coffee machines and kettles.</p>
          <div className="chips">
            {["Durgol Swiss Espresso", "Oust All Purpose Descaler", "Kilrock-K Descaler", "Cafetto Descaler"].map((d) => (
              <a key={d} className="chip" href={affiliateUrl({ merchant: "Amazon", code: d, country })} rel="sponsored nofollow" target="_blank">{d} ↗</a>
            ))}
          </div>
          <p className="hint" style={{ marginTop: 12 }}>
            Always check your manufacturer's guidance — pump espresso machines need a coffee-safe descaler, not a household kettle product.
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
