import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import {
  modelBySlug, MODELS, byCode, COUNTRIES, CATEGORY, AFTERMARKET, slug, priceFor,
} from "../../../../lib/data";
import { jsonLd, breadcrumbLd, affiliateUrl, PRODUCT_IMAGE } from "../../../../lib/site";

export const revalidate = 43200; // ISR: refresh prices/stock every 12h

export function generateStaticParams() {
  const out = [];
  for (const country of Object.keys(COUNTRIES))
    for (const m of MODELS) out.push({ country, model: m.slug });
  return out;
}

export function generateMetadata({ params }) {
  const c = COUNTRIES[params.country];
  const m = modelBySlug[params.model];
  if (!c || !m) return {};
  const f = byCode[m.filters[0]];
  return {
    title: `Water Filter for ${m.model} — Exact Replacement (${c.label})`,
    description: `The ${m.model} uses the ${f.code} water filter (${f.aka.slice(0, 2).join(", ")}). Compare OEM vs cheaper compatible filters and get the exact match in ${c.currency}.`,
    alternates: {
      canonical: `/${params.country}/fits/${m.slug}`,
      languages: {
        "en-US": `/us/fits/${m.slug}`,
        "en-GB": `/uk/fits/${m.slug}`,
        "x-default": `/us/fits/${m.slug}`,
      },
    },
  };
}

export default function ModelPage({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const m = modelBySlug[params.model];
  if (!c || !m) notFound();
  const cat = country === "uk" ? CATEGORY.nameUK : CATEGORY.name;
  const fits = m.filters.map((code) => byCode[code]).filter(Boolean);
  const primary = fits[0];
  const brand = primary.brand;
  const siblings = MODELS.filter(
    (x) => x.slug !== m.slug && byCode[x.filters[0]]?.brand === brand
  ).slice(0, 8);

  const faqs = [
    {
      q: `Which water filter does the ${m.model} use?`,
      a: `The ${brand} ${m.model} uses the ${primary.code} filter, also sold as ${primary.aka.slice(0, 3).join(", ")}. Certified compatible versions fit identically and cost less.`,
    },
    {
      q: `How often should I change the filter in my ${m.model}?`,
      a: `Every ${primary.capacityMonths} months or ~${primary.capacityGallons} gallons. Most owners set a reminder twice a year.`,
    },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: cat, url: `/${country}/${CATEGORY.slug}` },
    { name: `Filter for ${m.model}`, url: `/${country}/fits/${m.slug}` },
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
          { name: `Filter for ${m.model}` },
        ]}
      />
      <main className="container">
        <div className="pt">
          <div>
            <span className="badge">{brand} · {m.model}</span>
            <h1 style={{ marginTop: 10 }}>Water filter for the {brand} {m.model}</h1>
            <p className="sub">
              The {m.model} takes the <b>{primary.code}</b> water filter
              {fits.length > 1 ? " (or the alternatives below)" : ""}. Here’s the exact match, its
              cross-reference codes, and the cheapest certified compatible options.
            </p>

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>Compatible filters for the {m.model}</h2>
              <div className="grid g3">
                {fits.map((f) => (
                  <Link key={f.slug} href={`/${country}/${CATEGORY.slug}/${f.slug}`} className="card">
                    <h3>{f.code}</h3>
                    <p className="meta">{f.aka.slice(0, 2).join(" · ")}</p>
                    <p className="meta" style={{ marginTop: 6 }}>
                      from <b>{c.symbol}{priceFor(f, country).aftermarket.toFixed(2)}</b>
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>FAQ</h2>
              <div className="faq">
                {faqs.map((x, i) => (
                  <details key={i} open={i === 0}>
                    <summary>{x.q}</summary>
                    <p>{x.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {siblings.length > 0 && (
              <div className="section" style={{ paddingTop: 8 }}>
                <h2>Other {brand} models</h2>
                <div className="tablelinks">
                  {siblings.map((s) => (
                    <Link key={s.slug} href={`/${country}/fits/${s.slug}`} className="linkrow">
                      <span>{brand} <b>{s.model}</b></span>
                      <span className="t">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="buybox">
              <img src={PRODUCT_IMAGE} alt={`Water filter for ${m.model}`} width="400" height="300" style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 12, border: "1px solid var(--line)" }} />
              <div className="small" style={{ marginBottom: 4 }}>Exact filter · best price</div>
              <div className="price">
                {c.symbol}{priceFor(primary, country).aftermarket.toFixed(2)} <small>/ filter</small>
              </div>
              <a
                className="cta"
                href={affiliateUrl({ merchant: "Waterdrop", code: primary.code, country })}
                rel="sponsored nofollow"
                target="_blank"
              >
                Check price — compatible ↗
              </a>
              <a
                className="cta alt"
                href={affiliateUrl({ merchant: "Amazon", code: primary.code, country })}
                rel="sponsored nofollow"
                target="_blank"
              >
                Genuine OEM {c.symbol}{priceFor(primary, country).oem.toFixed(2)} ↗
              </a>
              <div className="small" style={{ marginTop: 10 }}>
                Uses filter:{" "}
                <Link href={`/${country}/${CATEGORY.slug}/${primary.slug}`}>
                  <b>{primary.code}</b>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer country={country} />
    </>
  );
}
