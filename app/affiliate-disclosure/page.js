import { Header, Footer } from "../../components/ui";
import { BRAND } from "../../lib/site";

export const metadata = {
  title: "Affiliate Disclosure",
  description: `How ${BRAND} earns from affiliate links, disclosed transparently.`,
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function Disclosure() {
  return (
    <>
      <Header country="us" />
      <main className="container">
        <section className="hero">
          <span className="kicker">Transparency</span>
          <h1>Affiliate disclosure</h1>
        </section>
        <section className="section" style={{ paddingTop: 8, maxWidth: 720 }}>
          <p className="lead">
            {BRAND} is a reader-supported, independent comparison site. To keep our content free we
            participate in affiliate programs, which means some outbound links to retailers are
            affiliate links. If you click one and make a purchase, we may earn a commission at
            <b> no additional cost to you</b>.
          </p>
          <p className="lead" style={{ marginTop: 14 }}>
            We are a participant in the Amazon Services LLC Associates Programme and Amazon EU
            Associates Programme, and we work with affiliate networks and merchants including (over
            time) Sovrn Commerce, Awin, and direct brand programs. As an Amazon Associate we earn
            from qualifying purchases.
          </p>
          <p className="lead" style={{ marginTop: 14 }}>
            Commissions never influence which parts we list, our compatibility data, or the order in
            which options appear. We show the genuine OEM part and certified compatible alternatives
            side by side so you can choose on price and preference. Prices and availability shown are
            indicative and may change; always confirm the final price on the retailer’s site.
          </p>
          <p className="lead" style={{ marginTop: 14 }}>
            Affiliate links on this site carry the <code>rel="sponsored nofollow"</code> attribute in
            line with search-engine and advertising guidelines.
          </p>
        </section>
      </main>
      <Footer country="us" />
    </>
  );
}
