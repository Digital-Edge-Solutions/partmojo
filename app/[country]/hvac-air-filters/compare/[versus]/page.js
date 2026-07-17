import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../../components/ui";
import { COUNTRIES } from "../../../../../lib/data";
import { HVAC_MERV_COMPARES, hvacCompareBySlug, mervBy, hvacBySlug, actualSize } from "../../../../../lib/hvac";
import { jsonLd, breadcrumbLd, amazonSearchUrl } from "../../../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false;

export function generateStaticParams() {
  return HVAC_MERV_COMPARES.map((c) => ({ country: "us", versus: c.slug }));
}

export function generateMetadata({ params }) {
  const cmp = hvacCompareBySlug[params.versus];
  if (!cmp) return {};
  return {
    title: `${cmp.dims} MERV ${cmp.a} vs MERV ${cmp.b} — Which Air Filter?`,
    description: `${cmp.dims} furnace filter: MERV ${cmp.a} vs MERV ${cmp.b} compared — what each captures, airflow impact, and which to choose for your home.`,
    alternates: {
      canonical: `/us/hvac-air-filters/compare/${cmp.slug}`,
      languages: { "en-US": `/us/hvac-air-filters/compare/${cmp.slug}`, "x-default": `/us/hvac-air-filters/compare/${cmp.slug}` },
    },
  };
}

export default function HvacComparePage({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const cmp = hvacCompareBySlug[params.versus];
  if (!c || !cmp) notFound();
  const A = mervBy[cmp.a];
  const B = mervBy[cmp.b];
  const fA = hvacBySlug[`${cmp.sizeSlug}x1-merv-${cmp.a}`];
  const fB = hvacBySlug[`${cmp.sizeSlug}x1-merv-${cmp.b}`];
  const verdict =
    cmp.b >= 13
      ? `Go MERV ${cmp.b} if anyone in the home has allergies, asthma, or you're dealing with wildfire smoke — but only if your system's blower can handle it. Otherwise MERV ${cmp.a} keeps airflow easier and costs less.`
      : `MERV ${cmp.b} is the better all-round choice for most homes — noticeably finer filtration than MERV ${cmp.a} with negligible airflow cost on a modern system. Choose MERV ${cmp.a} only if your unit is old or you prioritise maximum airflow.`;

  const faqs = [
    { q: `Is MERV ${cmp.b} better than MERV ${cmp.a} for a ${cmp.dims} filter?`, a: `MERV ${cmp.b} captures finer particles — ${B.captures}. MERV ${cmp.a} captures ${A.captures}. Higher MERV filters more but restricts airflow slightly more, so match it to your system and needs.` },
    { q: `Will MERV ${cmp.b} hurt my airflow or furnace?`, a: `On most modern residential systems the difference between MERV ${cmp.a} and ${cmp.b} in a 1" filter is small. On older or low-static-pressure systems, a higher MERV can strain the blower — if in doubt, stick with MERV ${cmp.a} or check your unit's spec.` },
    { q: `Do they cost much more?`, a: `MERV ${cmp.b} usually costs a little more per filter than MERV ${cmp.a}. Buying multi-packs closes most of the gap since you'll change it every 60–90 days either way.` },
  ];
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) };
  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: "Air Filters", url: `/${country}/hvac-air-filters` },
    { name: cmp.dims, url: `/${country}/hvac-air-filters/size/${cmp.sizeSlug}` },
    { name: `MERV ${cmp.a} vs ${cmp.b}`, url: `/${country}/hvac-air-filters/compare/${cmp.slug}` },
  ]);

  const row = (label, va, vb) => (
    <tr><td className="rk">{label}</td><td>{va}</td><td>{vb}</td></tr>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: "Air Filters", url: `/${country}/hvac-air-filters` },
          { name: cmp.dims, url: `/${country}/hvac-air-filters/size/${cmp.sizeSlug}` },
          { name: `MERV ${cmp.a} vs ${cmp.b}` },
        ]}
      />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">{cmp.dims} · MERV comparison</span>
          <h1>{cmp.dims}: <span className="g">MERV {cmp.a} vs MERV {cmp.b}</span></h1>
          <p className="sub">Same {cmp.dims} filter, two filtration levels. Actual size {actualSize(cmp.w, cmp.h, 1)}. Here&apos;s exactly what changes when you step up.</p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <table className="cmp">
            <thead><tr><th></th><th>MERV {cmp.a}</th><th>MERV {cmp.b}</th></tr></thead>
            <tbody>
              {row("Level", A.tone, B.tone)}
              {row("Captures", A.captures, B.captures)}
              {row("Best for", A.best, B.best)}
              {row("MPR ≈", A.mpr, B.mpr)}
              {row("FPR", A.fpr, B.fpr)}
              {row("Airflow impact", "Lower restriction", "Slightly higher restriction")}
              {row("Typical price", fA ? `${c.symbol}${fA.priceUS.toFixed(2)}` : "—", fB ? `${c.symbol}${fB.priceUS.toFixed(2)}` : "—")}
            </tbody>
          </table>

          <div className="disc" style={{ marginTop: 16 }}>{verdict}</div>

          <div className="tablelinks" style={{ marginTop: 16 }}>
            {fA && (
              <Link href={`/${country}/hvac-air-filters/${fA.slug}`} className="linkrow">
                <span>Get the <b>{cmp.dims} MERV {cmp.a}</b></span><span className="t">from {c.symbol}{fA.priceUS.toFixed(2)} →</span>
              </Link>
            )}
            {fB && (
              <Link href={`/${country}/hvac-air-filters/${fB.slug}`} className="linkrow">
                <span>Get the <b>{cmp.dims} MERV {cmp.b}</b></span><span className="t">from {c.symbol}{fB.priceUS.toFixed(2)} →</span>
              </Link>
            )}
          </div>
        </section>

        <section className="section">
          <h2>FAQ</h2>
          <div className="faq">
            {faqs.map((x, i) => (
              <details key={i} open={i === 0}><summary>{x.q}</summary><p>{x.a}</p></details>
            ))}
          </div>
          <p className="hint" style={{ marginTop: 12 }}>
            <Link href={`/${country}/hvac-air-filters/size/${cmp.sizeSlug}`}>← All {cmp.dims} options</Link>
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
