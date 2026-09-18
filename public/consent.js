/*!
 * Digital Edge cookie consent (UK PECR / UK GDPR) + Google Consent Mode v2.
 *
 * Load this SYNCHRONOUSLY in <head>, BEFORE the gtag.js / GTM script:
 *   <script src="/consent.js" data-policy="/privacy#cookies"></script>
 *
 * 1. Immediately sets Consent Mode v2 defaults to DENIED (ad_storage,
 *    analytics_storage, ad_user_data, ad_personalization), so Google tags set
 *    no analytics/ad cookies until the visitor accepts.
 * 2. If the visitor chose before (first-party cookie `de_consent`, 180 days),
 *    re-applies that choice straight away.
 * 3. Otherwise shows a banner with equal-weight Accept / Reject buttons and a
 *    link to the cookie policy (data-policy).
 * 4. Any element with [data-cookie-settings] (e.g. a footer "Cookie settings"
 *    link) re-opens the banner so the choice can be changed at any time.
 *    Rejecting also deletes any analytics cookies already set.
 *
 * Styled with the shared design-system tokens (--de-*) and .de-btn classes,
 * with fallbacks so it still renders on a page without them.
 */
(function () {
  var KEY = "de_consent";
  var MAX_AGE = 60 * 60 * 24 * 180; // ~6 months, then we ask again
  var script = document.currentScript;
  var policy = (script && script.getAttribute("data-policy")) || "/privacy#cookies";
  var what = (script && script.getAttribute("data-what")) || "analytics cookies (Google Analytics) to see which pages are useful and improve the site";

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () { window.dataLayer.push(arguments); };
  }

  function state(granted) {
    var v = granted ? "granted" : "denied";
    return {
      ad_storage: v,
      analytics_storage: v,
      ad_user_data: v,
      ad_personalization: v,
      personalization_storage: v,
      functionality_storage: "granted",
      security_storage: "granted"
    };
  }

  function read() {
    var m = document.cookie.match(new RegExp("(?:^|; )" + KEY + "=(granted|denied)"));
    return m ? m[1] : null;
  }

  function write(v) {
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = KEY + "=" + v + "; Max-Age=" + MAX_AGE + "; Path=/; SameSite=Lax" + secure;
  }

  // Remove analytics/advertising cookies already set (on this host and every parent domain).
  function purge() {
    var names = document.cookie.split("; ").map(function (c) { return c.split("=")[0]; })
      .filter(function (n) { return /^(_ga|_gid|_gat|_gcl|_fbp|_fbc|_clck|_clsk|_hj|_uet)/.test(n); });
    var parts = location.hostname.split(".");
    var domains = [""];
    for (var i = 0; i < parts.length - 1; i++) domains.push("; Domain=." + parts.slice(i).join("."));
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + "=; Max-Age=0; Path=/" + d;
      });
    });
  }

  // --- 1 + 2: defaults before any Google tag loads -------------------------
  window.gtag("consent", "default", Object.assign(state(false), { wait_for_update: 500 }));
  window.gtag("set", "ads_data_redaction", true);
  var stored = read();
  if (stored === "granted") window.gtag("consent", "update", state(true));

  // --- 3 + 4: banner ---------------------------------------------------------
  var CSS =
    ".de-consent{position:fixed;left:0;right:0;bottom:0;z-index:var(--de-z-toast,1000);padding:12px;" +
    "font-family:var(--de-font-text,system-ui,sans-serif)}" +
    ".de-consent__panel{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;" +
    "padding:16px 20px;background:var(--de-surface-raised,#fff);color:var(--de-ink,#111);" +
    "border:1px solid var(--de-line-strong,#bbb);border-radius:var(--de-radius-lg,12px);" +
    "box-shadow:var(--de-shadow-md,0 8px 24px rgba(0,0,0,.18))}" +
    ".de-consent__copy{flex:1 1 380px;margin:0;font-size:15px;line-height:1.5}" +
    ".de-consent__copy strong{display:block;margin-bottom:2px;font-size:16px}" +
    ".de-consent__copy a{color:var(--de-accent-ink,#0b5);text-decoration:underline}" +
    ".de-consent__actions{display:flex;gap:10px;flex:0 0 auto}" +
    ".de-consent__actions .de-btn{min-width:112px;min-height:var(--de-size-touch,44px)}" +
    "@media (max-width:560px){.de-consent__actions{flex:1 1 100%}.de-consent__actions .de-btn{flex:1 1 0}}" +
    // Fallback button look if components.css isn't on the page.
    ".de-consent .de-btn{display:inline-flex;align-items:center;justify-content:center;padding:0 20px;" +
    "font:600 15px/1 var(--de-font-text,system-ui,sans-serif);border-radius:var(--de-radius-md,8px);cursor:pointer;" +
    "background:var(--de-accent,#0e7c66);color:var(--de-on-accent,#fff);border:1px solid var(--de-accent,#0e7c66)}" +
    ".de-consent .de-btn:hover{background:var(--de-accent-hover,#0a5c4c)}" +
    ".de-consent .de-btn:focus-visible{outline:2px solid var(--de-focus,#0e7c66);outline-offset:2px}";

  var banner = null;

  function close() {
    if (banner) { banner.remove(); banner = null; }
  }

  function choose(granted) {
    write(granted ? "granted" : "denied");
    window.gtag("consent", "update", state(granted));
    if (!granted) purge();
    try { window.dispatchEvent(new CustomEvent("de-consent", { detail: { granted: granted } })); } catch (e) {}
    close();
  }

  function open() {
    if (banner) return;
    if (!document.getElementById("de-consent-css")) {
      var st = document.createElement("style");
      st.id = "de-consent-css";
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    banner = document.createElement("div");
    banner.className = "de-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie choices");
    banner.innerHTML =
      '<div class="de-consent__panel">' +
        '<p class="de-consent__copy"><strong>Cookies</strong>' +
        "We'd like to use " + what + ". " +
        "They're only set if you accept. You can change your mind any time via \"Cookie settings\" at the bottom of the page. " +
        '<a href="' + policy + '">Cookie policy</a></p>' +
        '<div class="de-consent__actions">' +
          '<button type="button" class="de-btn de-btn--primary" data-de-consent="reject">Reject</button>' +
          '<button type="button" class="de-btn de-btn--primary" data-de-consent="accept">Accept</button>' +
        "</div>" +
      "</div>";
    banner.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-de-consent]") : null;
      if (b) choose(b.getAttribute("data-de-consent") === "accept");
    });
    document.body.appendChild(banner);
  }

  window.deConsent = { open: open, accept: function () { choose(true); }, reject: function () { choose(false); }, get: read };

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-cookie-settings]") : null;
    if (t) { e.preventDefault(); open(); }
  });

  // Pages embedded in another site (<html class="embed">) don't show the banner; consent stays denied.
  function init() { if (!read() && !document.documentElement.classList.contains("embed")) open(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
