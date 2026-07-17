#!/usr/bin/env python3
"""
PartMojo — free demand-ranking for part codes (no Ahrefs/Semrush).

Ranks a list of part numbers by real search demand using three FREE signals:

  1. Google Trends (pytrends)      -> relative interest, normalised across batches
  2. Google Autocomplete depth     -> how many/how specific the suggestions are
  3. (optional) Amazon Best Sellers Rank via PA-API -> buying-demand proxy

Composite score -> demand-ranked CSV you feed straight into the build queue.

WHY THESE WORK
--------------
- Trends gives *relative* volume between terms — exactly what we need to sort a list.
- Autocomplete presence/depth is Google telling you people actually type this string.
- Amazon BSR is the strongest *buying* signal (fewer clicks, more carts) if you have PA-API.

SETUP
-----
  pip install pytrends requests pandas
  python demand_rank.py codes.txt            # one code per line
  -> writes demand_ranked.csv

Trends rate-limits; the script batches (5 terms max) with a shared ANCHOR term so
every batch is on the same 0-100 scale, and sleeps between calls. Run it patiently,
not in a tight loop, to stay friendly with the endpoints.
"""

import sys, time, json, urllib.parse, urllib.request

# ---- config -------------------------------------------------------------
ANCHOR = "edr1rxd1"          # a known-popular code; normalises Trends batches
GEO = ""                      # "" = worldwide, "US", "GB" ...
SLEEP = 2.0                   # seconds between calls (be polite)
WEIGHTS = {"trends": 0.45, "autocomplete": 0.25, "bsr": 0.30}

# ---- signal 1: Google Trends -------------------------------------------
def trends_scores(codes, geo=GEO):
    """Return {code: 0..100} normalised across all batches via ANCHOR."""
    from pytrends.request import TrendReq
    py = TrendReq(hl="en-US", tz=0)
    scores, anchor_ref = {}, None
    # batches of 4 codes + the anchor (Trends allows 5 terms)
    batch = [c for c in codes if c.lower() != ANCHOR]
    for i in range(0, len(batch), 4):
        terms = batch[i:i+4] + [ANCHOR]
        try:
            py.build_payload(terms, timeframe="today 12-m", geo=geo)
            df = py.interest_over_time()
            if df.empty:
                for t in terms: scores.setdefault(t, 0)
                continue
            means = df[terms].mean()
            a = means[ANCHOR] or 1
            if anchor_ref is None: anchor_ref = a
            factor = (anchor_ref / a) if a else 1
            for t in terms:
                if t == ANCHOR: continue
                scores[t] = round(float(means[t]) * factor, 2)
        except Exception as e:
            print(f"  trends batch failed ({e}); retry later", file=sys.stderr)
            for t in terms: scores.setdefault(t, 0)
        time.sleep(SLEEP)
    scores[ANCHOR] = anchor_ref or 100
    # scale to 0..100
    hi = max(scores.values()) or 1
    return {k: round(v / hi * 100, 1) for k, v in scores.items()}

# ---- signal 2: Google Autocomplete depth -------------------------------
def autocomplete_score(code):
    """0..100 from suggestion count + whether buying-intent modifiers appear."""
    url = "https://suggestqueries.google.com/complete/search?client=chrome&q=" + \
          urllib.parse.quote(code)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode("utf-8", "ignore"))
        sugg = data[1] if len(data) > 1 else []
        n = len(sugg)
        intent = sum(any(w in s.lower() for w in
                     ("replacement", "filter", "compatible", "for", "vs", "cheap", "buy"))
                     for s in sugg)
        return min(100, n * 8 + intent * 6)
    except Exception:
        return 0

# ---- signal 3: Amazon BSR (optional, needs PA-API creds) ----------------
def amazon_bsr_score(code):
    """
    Return 0..100 (higher = more demand). Requires Amazon Product Advertising API.
    Left as a stub: plug in your PA-API SearchItems call, read BrowseNodeInfo /
    SalesRank of the top result, and map lower rank -> higher score, e.g.:
        score = max(0, 100 - log10(bsr) * 15)
    Do NOT scrape Amazon HTML — use PA-API (terms-compliant) or skip this signal.
    """
    return None  # disabled until PA-API creds are added

# ---- composite ----------------------------------------------------------
def rank(codes):
    print(f"Google Trends on {len(codes)} codes (batched, be patient)...", file=sys.stderr)
    tr = trends_scores(codes)
    rows = []
    for c in codes:
        ac = autocomplete_score(c); time.sleep(0.5)
        bsr = amazon_bsr_score(c)
        parts = {"trends": tr.get(c, 0), "autocomplete": ac}
        if bsr is not None: parts["bsr"] = bsr
        w = {k: WEIGHTS[k] for k in parts}
        wsum = sum(w.values()) or 1
        score = round(sum(parts[k] * w[k] for k in parts) / wsum, 1)
        rows.append({"code": c, "score": score, **parts})
    rows.sort(key=lambda r: r["score"], reverse=True)
    # tier: top 25% = P1 (build first & rich), next 45% = P2, rest = P3 (batch)
    n = len(rows)
    for i, r in enumerate(rows):
        r["tier"] = "P1" if i < n*0.25 else ("P2" if i < n*0.70 else "P3")
        r["build_priority"] = i + 1
    return rows

def main():
    if len(sys.argv) < 2:
        print("usage: python demand_rank.py codes.txt"); return
    codes = [l.strip() for l in open(sys.argv[1]) if l.strip() and not l.startswith("#")]
    rows = rank(codes)
    import csv
    cols = ["build_priority", "tier", "code", "score", "trends", "autocomplete", "bsr"]
    with open("demand_ranked.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore"); w.writeheader()
        for r in rows: w.writerow(r)
    print(f"\nWrote demand_ranked.csv — {len(rows)} codes ranked.")
    for r in rows[:15]:
        print(f"  {r['build_priority']:>3} {r['tier']}  {r['code']:<16} score={r['score']}")

if __name__ == "__main__":
    main()
