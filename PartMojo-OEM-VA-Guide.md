# PartMojo — Fridge Water Filter Data Entry Guide

Thanks for helping build out our replacement-filter database. This is a careful
transcription job, not a creative one. **Accuracy matters far more than speed** —
one wrong "fits this model" entry is worse than ten missing ones.

You'll fill in the spreadsheet **`oem-va-template.csv`** (open it in Google Sheets
or Excel). Each row = one refrigerator water filter.

---

## The job in one sentence

Find **refrigerator water filters** on the manufacturers' own websites, and for
each one, record its part number, every other number it's sold under, and the
exact fridge models the manufacturer says it fits.

---

## The columns (fill these in)

| Column | What goes in it | Example |
|---|---|---|
| **code** | The main/official part number of the filter | `EDR6D1` |
| **brand** | The manufacturer | `Whirlpool` |
| **family** | The product line/series (leave blank if none) | `EveryDrop` |
| **aka** | Every OTHER number the SAME filter is sold under, separated by semicolons `;` | `Filter 6; W10311524; W10238154` |
| **fits** | The fridge model numbers it fits, separated by semicolons `;` — only ones the manufacturer lists | `WRV996FDEM; WRX986SIHZ` |
| **reduces** | What it filters out (if listed), separated by `;` | `Chlorine taste & odour; Lead; Cysts` |
| **certifications** | NSF/ANSI certifications if listed, separated by `;` | `NSF/ANSI 42; NSF/ANSI 53` |
| **demand** | Your rough guess: `high`, `medium`, or `low` (optional — put `medium` if unsure) | `medium` |
| **source_url** | The exact web page where you found the info | `https://www.everydropwater.com/...` |
| **notes** | Anything you're unsure about | `couldn't confirm last 2 models` |

The first two rows of the template are **filled-in examples** — copy their style.
The third row is a **"do not do this" example** — delete it.

---

## The 6 golden rules

1. **One row per physically different filter.** If two part numbers are just the
   same filter with a different label, they do NOT get two rows — the second
   number goes in the **aka** column of the first row.
2. **Only record what the manufacturer states.** If you can't find which models a
   filter fits on an official source, leave **fits** blank and note it. **Never
   guess or assume** a filter fits a model.
3. **Use semicolons `;`** to separate multiple values in one cell — never commas.
4. **Always fill in `source_url`.** If it's not from an official/manufacturer
   page, flag it in notes. We verify before publishing.
5. **Skip filters we already have** (see the list below). If you're not sure,
   include it and note "possible duplicate" — we'll dedupe automatically.
6. **Refrigerator water filters only.** Not air filters, not whole-house filters,
   not RO membranes, not water-pitcher filters.

---

## Where to find the data (use official sources)

Work from the manufacturers' own sites — these publish "replaces / compatible
models" tables that are exactly what we need:

- **Whirlpool / EveryDrop / Maytag / KitchenAid / Amana:** everydropwater.com (use the "Which filter?" / compatibility tool)
- **GE Appliances:** geappliances.com (search the filter part number → "Models this fits")
- **Samsung:** samsung.com support → water filters
- **LG:** lg.com → parts & accessories → water filters
- **Frigidaire / Electrolux:** frigidaire.com → PureSource filters
- **Bosch:** bosch-home.com → accessories → UltraClarity

How to work a filter: search its part number, open the official page, then copy
(a) every alternate number it lists ("also replaces…") into **aka**, and (b) every
model number under "fits these models" into **fits**. Paste the page URL into
**source_url**.

Retailer sites (RepairClinic, PartSelect, Amazon) can help you *find* a filter,
but **confirm the fit on the manufacturer's page** before recording it.

---

## Filters we ALREADY have — do NOT re-enter these

If a filter's main code OR any of its alternate numbers matches one of these,
skip it (our system will also auto-remove duplicates, so when unsure, include and
note it):

EDR1RXD1, EDR2RXD1, EDR3RXD1, EDR4RXD1, EDR6D1, DA29-00020B, DA29-00003G,
DA29-00019A, DA29-10105J, HAF-QIN, LT700P, LT1000P, LT800P, LT600P, LT500P,
MWF, MSWF, XWF, RPWFE, GSWF, WF3CB, WF2CB, WFCB, ULTRAWF, EPTWFU01, 4396508,
4396701, REPLFLTR10, REPLFLTR20, UKF7003, 9081, 9083, 9690.

(New, less common, and non-US filters are all welcome — that's the whole point.)

---

## Good vs bad rows

**GOOD** — one distinct filter, alternates in aka, real models, source cited:

```
code: EDR6D1 | brand: Whirlpool | aka: Filter 6; W10311524 | fits: WRV996FDEM; WRX986SIHZ | source_url: everydropwater.com/...
```

**BAD** — made a separate row for an alternate number (W10311524 is just EDR6D1):

```
Row 1: code: EDR6D1 ...
Row 2: code: W10311524 ...   ← WRONG: this belongs in Row 1's "aka" column
```

**BAD** — guessed the models with no source:

```
code: XYZ123 | fits: (a big list of models with no source_url)   ← WRONG: never guess fits
```

---

## How to deliver

- Aim for batches of **25–50 filters** at a time.
- When done, **File → Download → Comma-separated values (.csv)** and send the file back.
- Keep your source pages open/bookmarked in case we have questions.

That's it — thank you! Precise, well-sourced rows are exactly what we need.
