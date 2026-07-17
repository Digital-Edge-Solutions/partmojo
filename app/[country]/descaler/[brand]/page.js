import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb } from "../../../../components/ui";
import { COUNTRIES } from "../../../../lib/data";
import { DESCALER_BRANDS, descalerBySlug, DESCALER_CATEGORY } from "../../../../lib/descaler";
import { jsonLd, breadcrumbLd, affiliateUrl } from "../../../../lib/site";

export const revalidate = 43200;
export const dynamicParams = false; // UK-only category

export function generateStaticParams() {
  return DESCALER_BRANDS.map((b) => ({ country: "uk", brand: b.slug }));
}

export function generateMetadata({ params }) {
  const b = descalerBySlug[params.brand];
  if (!b) return {};
  return {
    title: `Best Descaler for ${b.name} Coffee Machines (UK)`,
    description: `The right descaler for ${b.name} machines (${b.machines.slice(0, 3).join(", ")}). Recommended product, cheaper universal alternatives, how often to descale, and a step-by-step.`,
    alternates: {
      canonical: `/uk/descaler/${b.slug}`,
      languages: { "en-GB": `/uk/descaler/${b.slug}`, "x-default": `/uk/descaler/${b.slug}` },
    },
  };
}

export default function DescalerBrand({ params }) {
  const { country } = params;
  const c = COUNTRIES[country];
  const b = descalerBySlug[params.brand];
  if (!c || !b) notFound();

  const steps = [
    { name: "Empty and prepare", text: "Empty the drip tray and water tank, and remove any water filter." },
    { name: "Mix the descaler", text: `Add ${b.oem.includes("tablet") || b.oem.includes("Tablet") ? "the descaling tablet(s)" : "the descaler"} to fresh water in the tank at the stated dilution.` },
    { name: "Run the descale cycle", text: `Start your ${b.name} machine's descaling programme and let it run fully.` },
    { name: "Rinse thoroughly", text: "Run two or three tanks of clean water through to flush all descaler residue before your next drink." },
  ];
  const howto = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to descale a ${b.name} machine`,
    step: steps.map((s) => ({ "@type": "HowToStep", name: s.name, text: s.text })),
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What descaler should I use for a ${b.name} machine?`,
        acceptedAnswer: { "@type": "Answer", text: `${b.oem} is the recommended product. Food-safe alternatives like ${b.universal.join(" or ")} also work well. ${b.tip}` },
      },
      {
        "@type": "Question",
        name: `How often should I descale my ${b.name} machine?`,
        acceptedAnswer: { "@type": "Answer", text: `Descale ${b.frequency} — and ${b.hardWater} if you live in a UK hard-water area.` },
      },
    ],
  };
  const bc = breadcrumbLd([
    { name: "Home", url: `/${country}` },
    { name: DESCALER_CATEGORY.name, url: `/${country}/descaler` },
    { name: b.name, url: `/${country}/descaler/${b.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(howto)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bc)} />
      <Header country={country} />
      <Breadcrumb
        items={[
          { name: "Home", url: `/${country}` },
          { name: "Descaler", url: `/${country}/descaler` },
          { name: b.name },
        ]}
      />
      <main className="container">
        <div className="pt">
          <div>
            <span className="badge">{b.name}</span>
            <h1 style={{ marginTop: 10 }}>Best descaler for {b.name} machines</h1>
            <p className="sub">
              For {b.name} machines ({b.machines.slice(0, 4).join(", ")}), the recommended descaler
              is <b>{b.oem}</b>. Below are cheaper universal options that work too, how often to
              descale, and a quick step-by-step. {b.tip}
            </p>

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>How to descale a {b.name} machine</h2>
              <div className="faq">
                {steps.map((s, i) => (
                  <details key={i} open={i === 0}>
                    <summary>{i + 1}. {s.name}</summary>
                    <p>{s.text}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>Cheaper universal alternatives</h2>
              <p className="lead">Food-safe descalers that also suit {b.name} machines:</p>
              <div className="chips">
                {b.universal.map((d) => (
                  <a key={d} className="chip" href={affiliateUrl({ merchant: "Amazon", code: d, country })} rel="sponsored nofollow" target="_blank">{d} ↗</a>
                ))}
              </div>
            </div>

            <div className="section" style={{ paddingTop: 8 }}>
              <h2>Other machines</h2>
              <div className="chips">
                {DESCALER_BRANDS.filter((x) => x.slug !== b.slug).map((x) => (
                  <Link key={x.slug} href={`/${country}/descaler/${x.slug}`} className="chip">{x.name}</Link>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="buybox">
              <div className="small" style={{ marginBottom: 4 }}>Recommended descaler</div>
              <div className="price" style={{ fontSize: 20 }}>{b.oem}</div>
              <a
                className="cta"
                href={affiliateUrl({ merchant: "Amazon", code: b.oem, country })}
                rel="sponsored nofollow"
                target="_blank"
              >
                Check price ↗
              </a>
              <div className="disc">Descale {b.frequency} — {b.hardWater} in hard-water areas.</div>
              <div className="small">
                Cheaper option:{" "}
                <a href={affiliateUrl({ merchant: "Amazon", code: b.universal[0], country })} rel="sponsored nofollow" target="_blank">
                  <b>{b.universal[0]} ↗</b>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer country={country} />
    </>
  );
}
