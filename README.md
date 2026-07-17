# PartMojo

Programmatic long-tail engine for replacement parts. Next.js (App Router), US + UK
via hreflang subfolders, entity/schema optimised, dense internal linking.

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Deploy (recommended: Git-based)
1. Push this folder to a new GitHub repo.
2. In Vercel: New Project -> Import that repo -> deploy.
3. Add domain partmojo.com in Project Settings -> Domains.
   Every `git push` now auto-deploys. No more manual uploads.

## Structure
- lib/data.js      -> the dataset (codes, aka, compatible models, specs, demand). THE database.
- app/[country]/   -> programmatic page templates (part / model / brand / category)
- tools/demand_rank.py -> free demand-ranking (Google Trends + autocomplete + Amazon BSR)

## Scale a new category
Add a dataset + a page template folder that reads it. Same engine.
