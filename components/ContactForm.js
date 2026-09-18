"use client";
import { useState } from "react";

// Submissions go to our own /api/contact route, which forwards them to the Digital Edge
// inbox via FormSubmit (same setup as the other sites). No keys or addresses in the page.

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.botcheck) return; // honeypot: silently drop bots (the API checks too)
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message, botcheck: data.botcheck }),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="card" style={{ maxWidth: 480 }}>
        <h3>Thanks — your message is on its way ✓</h3>
        <p className="meta">We read every message and reply as soon as we can.</p>
      </div>
    );
  }

  return (
    <form className="card" style={{ maxWidth: 480 }} onSubmit={onSubmit}>
      <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <label className="fld">
        <span>Your name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label className="fld">
        <span>Your email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="fld">
        <span>Message</span>
        <textarea name="message" rows={5} required placeholder="A part number to add, a compatibility correction, or a question…" />
      </label>
      <button className="cta" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="meta" style={{ color: "var(--warn)", marginTop: 8 }}>
          Something went wrong — please try again in a moment.
        </p>
      )}
    </form>
  );
}
