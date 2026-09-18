// Contact form delivery. Forwards server-side to FormSubmit (the same service the
// other Digital Edge sites use) so the inbox address is never exposed in client JS.
// FormSubmit needs a ONE-TIME activation per inbox: the first submission emails an
// activation link to info@digitaledge.uk (already done if the audit app / PlutoHome
// forms are live) — messages flow after it's clicked.

const ENDPOINT = "https://formsubmit.co/ajax/info@digitaledge.uk";

export async function POST(req) {
  try {
    const { name, email, message, botcheck } = (await req.json()) || {};
    if (botcheck) return Response.json({ ok: true }); // honeypot: real users never tick it
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email) || !message) {
      return Response.json({ ok: false, error: "Please add a valid email and a message." }, { status: 400 });
    }
    const res = await fetch(ENDPOINT, {
      method: "POST",
      // FormSubmit ties activation to the sending site; a server call has no Referer, so name ours.
      headers: { "Content-Type": "application/json", Accept: "application/json", Origin: "https://www.partmojo.com", Referer: "https://www.partmojo.com/uk/contact" },
      body: JSON.stringify({
        _subject: "New PartMojo contact message",
        _template: "table",
        name: String(name || "").slice(0, 200),
        email,
        message: String(message).slice(0, 5000),
        source: "partmojo.com contact form",
      }),
    });
    if (!res.ok) {
      return Response.json({ ok: false, error: "Could not send just now — please email hello@digitaledge.uk." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Could not send just now — please email hello@digitaledge.uk." }, { status: 500 });
  }
}
