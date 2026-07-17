import { Header, Footer } from "../../components/ui";
import ContactForm from "../../components/ContactForm";
import { BRAND } from "../../lib/site";

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
        <section className="section" style={{ paddingTop: 8 }}>
          <ContactForm />
          <p className="lead" style={{ marginTop: 18, maxWidth: 480 }}>
            For affiliate, partnership or press enquiries, use the form above and add “Partnerships”
            to your message. {BRAND} is operated by Digital Edge Solutions.
          </p>
        </section>
      </main>
      <Footer country="us" />
    </>
  );
}
