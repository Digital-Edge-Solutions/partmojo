import { Header, Footer } from "../../components/ui";
import { BRAND, CONTACT_EMAIL } from "../../lib/site";

export const metadata = {
  title: "Contact",
  description: `Contact ${BRAND} — report a compatibility issue or request a part.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <Header country="us" />
      <main className="container">
        <section className="hero">
          <span className="kicker">Contact</span>
          <h1>Get in touch</h1>
          <p className="sub">
            Questions, a compatibility correction, or a part you’d like us to add — we read every
            message and fix data issues fast.
          </p>
        </section>
        <section className="section" style={{ paddingTop: 8, maxWidth: 720 }}>
          <div className="card" style={{ maxWidth: 420 }}>
            <h3>Email us</h3>
            <p className="meta" style={{ marginBottom: 10 }}>
              The fastest way to reach the team.
            </p>
            <a className="cta" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <p className="lead" style={{ marginTop: 18 }}>
            For affiliate, partnership or press enquiries, email the same address with the subject
            line “Partnerships”. {BRAND} is operated by Digital Edge Solutions.
          </p>
        </section>
      </main>
      <Footer country="us" />
    </>
  );
}
