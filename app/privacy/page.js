import { Header, Footer } from "../../components/ui";
import { BRAND, OPERATOR, CONTACT_EMAIL } from "../../lib/site";

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
          <h2>Who we are</h2>
          <p className="lead">
            {BRAND} is operated by {OPERATOR}, the data controller for personal data collected through
            this site. Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <h2 style={{ marginTop: 20 }}>What we collect</h2>
          <p className="lead">
            {BRAND} is an information and comparison site. We do not require you to create an account
            and we do not ask for personal information to browse. With your consent we use Google
            Analytics (pages visited, how you arrived, approximate location, device and browser type)
            to understand what’s useful and improve the site.
          </p>
          <h2 id="cookies" style={{ marginTop: 20 }}>Cookies</h2>
          <p className="lead">
            When you first visit, a banner asks whether you accept analytics cookies.{" "}
            <strong>Nothing optional is set until you choose</strong>, Reject is as easy as Accept, and
            the site works the same either way.
          </p>
          <ul className="lead">
            <li>
              <strong>de_consent</strong> (strictly necessary, set by us): remembers your choice so we
              don’t ask on every page. Lasts 6 months, after which we ask again.
            </li>
            <li>
              <strong>_ga</strong> and <strong>_ga_X0KL3ZL769</strong> (Google Analytics,{" "}
              <strong>only if you accept</strong>): count visits and show which pages help. Last up to
              2 years.
            </li>
          </ul>
          <p className="lead">
            We use Google Consent Mode: until you accept, Google Analytics is told not to store cookies
            or identifiers, and Google may receive only basic, cookieless signals (such as that a page
            was viewed). <strong>Changing your choice:</strong> click{" "}
            <a href="/privacy#cookies" data-cookie-settings="">Cookie settings</a> (also in every page
            footer) at any time. If you switch to Reject we delete the Google Analytics cookies.
          </p>
          <h2 style={{ marginTop: 20 }}>Affiliate tracking</h2>
          <p className="lead">
            When you click an outbound link to a retailer, that retailer or an affiliate network
            (such as Sovrn, Amazon Associates, or Awin) may set a cookie to attribute any resulting
            purchase to us. Those cookies are set on the retailer’s or network’s site, not ours, and
            are covered by their privacy policies. You can control cookies through your browser settings.
          </p>
          <h2 style={{ marginTop: 20 }}>Contact form</h2>
          <p className="lead">
            If you use our contact form we collect your name, email address and message, and use them only
            to reply (lawful basis: legitimate interests). The form is delivered to our inbox by FormSubmit
            (formsubmit.co), acting as our processor. We keep messages for up to 24 months after our last
            contact, then delete them.
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
