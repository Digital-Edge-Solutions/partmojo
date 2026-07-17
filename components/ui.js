import Link from "next/link";
import SearchBox from "./SearchBox";
import { BRAND, TAGLINE } from "../lib/site";
import { COUNTRIES, CATEGORY } from "../lib/data";

export function Header({ country = "us" }) {
  const other = country === "us" ? "uk" : "us";
  const cur = country === "us" ? "🇺🇸 US · $" : "🇬🇧 UK · £";
  const otherLabel = country === "us" ? "UK" : "US";
  return (
    <header className="header">
      <div className="container row">
        <Link href={`/${country}`} className="logo">
          <span className="dot" /> Part<b>Mojo</b>
        </Link>
        <nav className="nav">
          <Link href={`/${country}/${CATEGORY.slug}`}>Fridge Filters</Link>
          {country === "us" && <Link href={`/${country}/hvac-air-filters`}>Air Filters</Link>}
          {country === "uk" && <Link href={`/${country}/descaler`}>Descaler</Link>}
          <Link href={`/${country}/brands`}>Brands</Link>
          <Link href={`/${country}/tools/find-my-filter`}>Find my filter</Link>
        </nav>
        <Link href={`/${other}`} className="flag" title={`Switch to ${otherLabel}`}>
          {cur} · switch to {otherLabel}
        </Link>
      </div>
      <div className="container hsearch">
        <SearchBox country={country} compact />
      </div>
    </header>
  );
}

export function Footer({ country = "us" }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div>
            <div className="logo" style={{ fontSize: 18 }}>
              <span className="dot" /> Part<b>Mojo</b>
            </div>
            <p style={{ fontWeight: 700, color: "var(--ink)", margin: "8px 0 4px", fontSize: 14 }}>
              {TAGLINE}
            </p>
            <p className="small" style={{ maxWidth: 320 }}>
              The independent finder for the exact replacement part your appliance needs —
              verified compatibility, certified specs, best price.
            </p>
          </div>
          <div>
            <strong>Categories</strong>
            <p className="small">
              <Link href={`/${country}/refrigerator-water-filters`}>Fridge water filters</Link>
              <br />
              <Link href="/us/hvac-air-filters">HVAC &amp; furnace filters (US)</Link>
              <br />
              <Link href="/us/whole-house-water-filters">Whole-house &amp; under-sink filters (US)</Link>
              <br />
              <Link href={`/${country}/tools/find-my-filter`}>Find my filter tool</Link>
              <br />
              <Link href="/uk/descaler">Coffee &amp; kettle descaler (UK)</Link>
              <br />
              <span style={{ opacity: 0.5 }}>Vacuum spares &amp; bags (soon)</span>
            </p>
          </div>
          <div>
            <strong>Company</strong>
            <p className="small">
              <Link href="/about">About</Link>
              <br />
              <Link href="/contact">Contact</Link>
              <br />
              <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
              <br />
              <Link href="/privacy">Privacy policy</Link>
            </p>
          </div>
          <div>
            <strong>Regions</strong>
            <p className="small">
              <Link href="/uk">🇬🇧 United Kingdom (£)</Link>
              <br />
              <Link href="/us">🇺🇸 United States ($)</Link>
            </p>
          </div>
        </div>
        <p className="small" style={{ marginTop: 18, opacity: 0.7 }}>
          {BRAND} is reader-supported. When you buy through links on our site we may earn a
          commission at no extra cost to you — see our{" "}
          <Link href="/affiliate-disclosure">affiliate disclosure</Link>. As an Amazon Associate we
          earn from qualifying purchases. © {BRAND}, operated by Digital Edge Solutions.
        </p>
      </div>
    </footer>
  );
}

export function Breadcrumb({ items }) {
  return (
    <div className="container">
      <div className="breadcrumb">
        {items.map((it, i) => (
          <span key={i}>
            {i > 0 && <span style={{ opacity: 0.4 }}>&nbsp;/&nbsp;</span>}
            {it.url ? <Link href={it.url}>{it.name}</Link> : <span>{it.name}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
