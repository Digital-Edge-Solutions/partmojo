import "./globals.css";
import Script from "next/script";
import { BASE, BRAND, PRODUCT_IMAGE } from "../lib/site";

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: `${BRAND} — Find the Exact Replacement Part`,
    template: `%s | ${BRAND}`,
  },
  description:
    "PartMojo helps you find the exact replacement filter, spare or consumable for your appliance by part number or model — with verified cross-references and the cheapest compatible options.",
  applicationName: BRAND,
  robots: { index: true, follow: true },
  openGraph: {
    siteName: BRAND,
    type: "website",
    images: [{ url: PRODUCT_IMAGE, width: 400, height: 300 }],
  },
  twitter: { card: "summary_large_image" },
};

// Sovrn Commerce (auto-affiliate every outbound link on day one).
// Replace SOVRN_KEY with your key from sovrn.com once approved — until then links still work,
// they just aren't monetised through the network yet.
const SOVRN_KEY = "SOVRN_KEY";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {SOVRN_KEY !== "SOVRN_KEY" && (
          <Script id="sovrn" strategy="afterInteractive">
            {`window.vglnk={key:'${SOVRN_KEY}'};(function(d,t){var s=d.createElement(t);s.type='text/javascript';s.async=true;s.src='//cdn.viglink.com/api/vglnk.js';var r=d.getElementsByTagName(t)[0];r.parentNode.insertBefore(s,r);}(document,'script'));`}
          </Script>
        )}
      </body>
    </html>
  );
}
