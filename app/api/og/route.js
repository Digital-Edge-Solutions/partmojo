import { ImageResponse } from "next/og";

export const runtime = "edge";

// Owned, per-page branded "spec card" image. No third-party photos, no
// licensing risk, unique per page — used as both the on-page product image
// and the social/OpenGraph preview. Swapped for real Amazon PA-API photos
// later, once the API unlocks.
export function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = (searchParams.get("code") || "PartMojo").slice(0, 42);
  const brand = (searchParams.get("brand") || "").slice(0, 40);
  const kind = (searchParams.get("kind") || "Replacement part finder").slice(0, 64);
  const specs = (searchParams.get("specs") || "")
    .split("|").map((s) => s.trim()).filter(Boolean).slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%", width: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: "64px",
          background: "linear-gradient(135deg,#08161a 0%,#0f272c 55%,#0b2a24 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 30, height: 30, borderRadius: 999, marginRight: 16, background: "linear-gradient(135deg,#12c2b0,#0aa892)" }} />
          <div style={{ display: "flex", fontSize: 36, fontWeight: 800 }}>
            <span style={{ color: "#eafcf8" }}>Part</span>
            <span style={{ color: "#5fe6d5" }}>Mojo</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#8fb0ab", marginBottom: 10 }}>
            {brand ? `${brand} · ${kind}` : kind}
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, color: "#5fe6d5", lineHeight: 1.05 }}>
            {code}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {specs.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex", fontSize: 24, color: "#eafcf8", marginRight: 14, marginTop: 10,
                background: "rgba(18,194,176,0.12)", border: "1px solid rgba(18,194,176,0.32)",
                borderRadius: 999, padding: "10px 22px",
              }}
            >
              {s}
            </div>
          ))}
          {specs.length === 0 && (
            <div style={{ display: "flex", fontSize: 24, color: "#8fb0ab" }}>Verified compatibility · certified specs · best price</div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
