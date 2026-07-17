import { Header, Footer } from "../../components/ui";
import { BRAND } from "../../lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND} handles data and cookies.`,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <>
      <Header country="us" />
      <main className="container">
        <section className="hero">
          <span className="kicker">Legal</span>
          <h1>Privacy policy</h1>
          <p className="sub">How we handle data when you use {BRAND}.</p>
        </section>
        <section className="section" style={{ paddingTop: 8, maxWidth: 720 }}>
          <h2>What we collect</h2>
          <p className="lead">
            {BRAND} is an information and comparison site. We do not require you to create an account
            and we do not ask for personal information to browse. We collect only standard,
            anonymised analytics (such as pages visited and general location) to understand what’s
            useful and improve the site.
          </p>
          <h2 style={{ marginTop: 20 }}>Cookies &amp; affiliate tracking</h2>
          <p className="lead">
            When you click an outbound link to a retailer, that retailer or an affiliate network
            (such as Sovrn, Amazon Associates, or Awin) may set a cookie to attribute any resulting
            purchase to us. These cookies do not identify you to us personally. You can control
            cookies through your browser settings.
          </p>
          <h2 style={{ marginTop: 20 }}>Third parties</h2>
          <p className="lead">
            We link to third-party retailers and use affiliate networks; their own privacy policies
            govern what happens once you leave our site. We do not sell personal data.
          </p>
          <h2 style={{ marginTop: 20 }}>Your rights &amp; contact</h2>
          <p className="lead">
            If you have any questions about privacy or wish to make a data request, please{" "}
            <a href="/contact">contact us</a> via our form. This policy may be updated from time to
            time; the current version always lives at this page.
          </p>
        </section>
      </main>
      <Footer country="us" />
    </>
  );
}
