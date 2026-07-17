import { Header, Footer } from "../../components/ui";
import { BRAND } from "../../lib/site";

export const metadata = {
  title: "About",
  description: `About ${BRAND} — the fastest way to find the exact replacement filter and spare for your appliance.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <Header country="us" />
      <main className="container">
        <section className="hero">
          <span className="kicker">About us</span>
          <h1>We help you find the <span className="g">exact</span> part — the first time.</h1>
          <p className="sub">
            {BRAND} exists to end the guesswork in buying replacement parts. Enter a part number
            or your appliance model and we match it to every verified compatible option —
            genuine OEM and cheaper certified equivalents — so you never buy the wrong one again.
          </p>
        </section>
        <section className="section" style={{ paddingTop: 8, maxWidth: 720 }}>
          <h2>What we do</h2>
          <p className="lead">
            We maintain a cross-referenced database of appliance parts and the exact models each
            one fits, starting with refrigerator water filters across the US and UK. Every page
            shows the part’s alternative codes, the fridges it fits, certified specifications, and
            the best-value places to buy it.
          </p>
          <h2 style={{ marginTop: 22 }}>How we verify compatibility</h2>
          <p className="lead">
            Getting the fit right is the whole point, so we cross-check every part against multiple
            sources: manufacturer cross-reference tables and manuals, retailer fitment data, and the
            OEM's own part numbering. We publish a filter's alternative codes only where they refer
            to the same physical part, and we flag "commonly confused" filters that fit different
            appliances so you don't pick the wrong one. Specifications (micron rating, NSF/ANSI
            certifications, capacity) are taken from the manufacturer's published data. If we can't
            verify a match, we don't list it — and if we ever get one wrong, we fix it fast when you{" "}
            <a href="/contact">tell us</a>.
          </p>
          <h2 style={{ marginTop: 22 }}>How we make money</h2>
          <p className="lead">
            {BRAND} is reader-supported. When you buy through links on our site we may earn a small
            commission, at no extra cost to you. This never affects which products we show or how we
            rank them — our only goal is helping you find the correct part at the best price. See our{" "}
            <a href="/affiliate-disclosure">affiliate disclosure</a> for details.
          </p>
          <h2 style={{ marginTop: 22 }}>Get in touch</h2>
          <p className="lead">
            Spotted an incorrect compatibility match or want a part added? <a href="/contact">Contact us</a> —
            accuracy is everything to us and we fix issues fast.
          </p>
        </section>
      </main>
      <Footer country="us" />
    </>
  );
}
