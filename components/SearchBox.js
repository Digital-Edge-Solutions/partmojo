"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { FILTERS, MODELS, CATEGORY } from "../lib/data";

export default function SearchBox({ country = "us" }) {
  const [q, setQ] = useState("");
  const index = useMemo(() => {
    const parts = FILTERS.map((f) => ({
      type: "Filter",
      label: f.code,
      hay: (f.code + " " + f.aka.join(" ") + " " + f.brand).toLowerCase(),
      url: `/${country}/${CATEGORY.slug}/${f.slug}`,
      tag: f.brand,
    }));
    const models = MODELS.map((m) => ({
      type: "Model",
      label: m.model,
      hay: m.model.toLowerCase(),
      url: `/${country}/fits/${m.slug}`,
      tag: "fridge model",
    }));
    return [...parts, ...models];
  }, [country]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return index.filter((r) => r.hay.includes(s)).slice(0, 8);
  }, [q, index]);

  return (
    <div className="searchwrap">
      <div className="search">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter filter part number or fridge model — e.g. EDR1RXD1, UKF8001, RF28HMEDBSR"
          aria-label="Search by part number or model"
        />
        <button type="button">Find my filter</button>
      </div>
      {results.length > 0 && (
        <div className="results">
          {results.map((r, i) => (
            <Link key={i} href={r.url}>
              <span>
                <strong>{r.label}</strong> <span className="tag">· {r.type}</span>
              </span>
              <span className="tag">{r.tag} →</span>
            </Link>
          ))}
        </div>
      )}
      <div className="hint">
        Try a part number (<b>EDR1RXD1</b>, <b>DA29-00020B</b>, <b>MWF</b>) or your fridge’s model number.
      </div>
    </div>
  );
}
