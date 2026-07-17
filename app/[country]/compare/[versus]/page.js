import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import { COMPARE_PAIRS, comparePairBySlug, COUNTRIES, CATEGORY, slug, priceFor } from "../../../../lib/data";
import { jsonLd, breadcrumbLd, affiliateUrl } from "../../../../lib/site";

export const revalidate = 43200;

export function generateStaticParams() {
  const out = [];
  for (const country of Object.keys(COUNTRIES))
    for (const p of COMPARE_PAIRS) out.push({ country, versus: p.slug });
  return out;
}

export function generateMetadata({ params }) {
  const c = COUNTRIES[params.country];
  const p = comparePairBySlug[params.versus];
  if (!c || !p) return {};
  return {
    title: `${p.a.code} vs ${p.b.code} — Which Fridge Filter Do You Need? (${c.label})`,
    description: `${p.a.code} vs ${p.b.code}: side-by-side comparison of fit, certifications, filter life and price. They fit different fridges — find which one is right for your model.`,
    alternates: {
      canonical: `/${params.country}/compare/${p.slug}`,
      languages: {
        "en-US": `/us/compare/${p.slug}`,
        "en-GB": `/uk/compare/${p.slug}`,
        "x-default": `/us/compare/${p.slug}`,
      },
    },
  };
}

function Row({ label, a, b, highlight }) {
  return (
    <tr>
      <td className="rk">{label}</td>
      <td style={highlight ? { fontWeight: 700 } : undefined}>{a}</td>
      <td style={highlight ? { fontWeight: 700 } : undefined}>{b}</td>
    </tr>
  );
}

export default function ComparePage({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const p = comparePairBySlug[params.versus];
  if (!c || !p) notFound();
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  const { a, b } = p;
  const pa = priceFor(a, country), pb = priceFor(b, country);
  const sameBrand = a.brand === b.brand;

  const verdict = sameBrand
    ? `Both are ${a.brand} filters but they fit different refrigerators — they are not interchangeable. Check your model number to see whether you need the ${a.code} or the ${b.code}.`
    : `The ${a.code} (${a.brand}) and ${b.code} (${b.brand}) fit different refrigerators and are not interchangeable. Confirm your fridge's model number below to pick the correct one.`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Are the ${a.code} and ${b.code} interchangeable?`,
        acceptedAnswer: { "@type": "Answer", text: `No. ${verdict}` },
      },
      {
        "@type": "Question",
        name: `What is the difference between ${a.code} and ${b.code}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${a.code} fits ${a.fits.slice(0, 3).join(", ")} and more; the ${b.code} fits ${b.fits.slice(0, 3).join(", ")} and more. Certifications and filter life are shown in the comparison table.`,
        },
      },
    ],
  };
  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: cat, url: `/${country}/${CATEGORY.slug}` },
    { name: `${a.code} vs ${b.code}`, url: `/${country}/compare/${p.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: cat, url: `/${country}/${CATEGORY.slug}` },
          { name: `${a.code} vs ${b.code}` },
        ]}
      />
      <main className="container">
        <section className="hero" style={{ paddingTop: 20 }}>
          <span className="kicker">Comparison</span>
          <h1>
            <span className="g">{a.code}</span> vs <span className="g">{b.code}</span>
          </h1>
          <p className="sub">{verdict}</p>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <table className="cmp">
            <thead>
              <tr>
                <th></th>
                <th>{a.code}</th>
                <th>{b.code}</th>
              </tr>
            </thead>
            <tbody>
              <Row label="Brand" a={a.brand} b={b.brand} />
              <Row label="Also known as" a={a.aka.slice(0, 2).join(", ")} b={b.aka.slice(0, 2).join(", ")} />
              <Row label="Fits (examples)" a={a.fits.slice(0, 3).join(", ")} b={b.fits.slice(0, 3).join(", ")} />
              <Row label="Models covered" a={`${a.fits.length}+`} b={`${b.fits.length}+`} />
              <Row label="Certifications" a={a.certifications.join(", ")} b={b.certifications.join(", ")} />
              <Row label="Reduces" a={a.reduces.slice(0, 3).join(", ")} b={b.reduces.slice(0, 3).join(", ")} />
              <Row label="Filter life" a={`${a.capacityMonths} mo / ${a.capacityGallons} gal`} b={`${b.capacityMonths} mo / ${b.capacityGallons} gal`} />
              <Row label="From price" a={`${c.symbol}${pa.aftermarket.toFixed(2)}`} b={`${c.symbol}${pb.aftermarket.toFixed(2)}`} highlight />
            </tbody>
          </table>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <div className="grid g2">
            <div className="card">
              <h3>{a.code}</h3>
              <p className="meta">{a.brand} · fits {a.fits.length}+ models · from {c.symbol}{pa.aftermarket.toFixed(2)}</p>
              <a className="cta" href={affiliateUrl({ merchant: "Waterdrop", code: a.code, country })} rel="sponsored nofollow" target="_blank">Check {a.code} price ↗</a>
              <Link className="cta alt" href={`/${country}/${CATEGORY.slug}/${a.slug}`}>See {a.code} details</Link>
            </div>
            <div className="card">
              <h3>{b.code}</h3>
              <p className="meta">{b.brand} · fits {b.fits.length}+ models · from {c.symbol}{pb.aftermarket.toFixed(2)}</p>
              <a className="cta" href={affiliateUrl({ merchant: "Waterdrop", code: b.code, country })} rel="sponsored nofollow" target="_blank">Check {b.code} price ↗</a>
              <Link className="cta alt" href={`/${country}/${CATEGORY.slug}/${b.slug}`}>See {b.code} details</Link>
            </div>
          </div>
          <p className="hint" style={{ marginTop: 14 }}>
            Not sure which you need? <Link href={`/${country}/tools/find-my-filter`}>Find your filter by fridge model →</Link>
          </p>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
