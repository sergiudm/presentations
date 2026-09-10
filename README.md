# presentations

All of my web presentations, built and hosted together at
**<https://sergiudm.github.io/presentations/>** — one repository, one site,
one deck per folder:

| Folder | Deck | URL |
| --- | --- | --- |
| `auto-research/` | Auto-Research Systems | <https://sergiudm.github.io/presentations/auto-research/> |
| `gpp3/` | Recursive Self-improvement in Agent Harness | <https://sergiudm.github.io/presentations/gpp3/> |
| `rl-pre/` | Reinforcement Learning for LLMs | <https://sergiudm.github.io/presentations/rl-pre/> |

## Adding a presentation

Drop a new folder into the repository root and push — the landing page and
the site are rebuilt automatically, and the deck is hosted at
`/<folder-name>/`. No workflow edits needed. A folder is published when it
matches any of these shapes:

1. **Plain static deck** — a folder containing `index.html` (self-contained
   HTML/CSS/JS). It is copied as-is.
2. **Static subfolder** — an app or project folder with a `presentation.json`
   that names a `"staticDir"` (like `auto-research/`). Only that subfolder is
   published.
3. **Buildable app** — a folder with a `package.json` containing a `build`
   script. Dependencies are installed with `npm ci` and the first of
   `dist/client`, `dist`, `out`, or `build` containing an `index.html` is
   published.

Path prefixes are handled automatically: Vite apps (`"build": "vite build"`)
are rebuilt with a relative base, and Next/vinext static-export apps are
built with `PAGES_ASSET_PREFIX=/presentations/<name>` (read it in
`next.config.ts` → `assetPrefix`, as `gpp3` does) with the prefixed `_next`
directory flattened back onto the build root.

Add a `presentation.json` next to the deck to control the landing page:

```json
{
  "title": "My New Deck",
  "description": "One line shown on the landing page card.",
  "draft": true
}
```

All fields are optional (`"draft": true` skips the folder). Without it, the
card falls back to the folder name.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) runs on every push to
`main`: `scripts/build-site.mjs` builds every presentation into `_site/`,
generates the landing page, and the result is deployed to GitHub Pages.

## Local preview

```sh
node scripts/build-site.mjs   # build all decks into _site/
node scripts/preview.mjs      # serve at http://127.0.0.1:4173/presentations/
```

The preview server mounts the site under the same `/presentations/` prefix
as production, including the trailing-slash redirects, so asset paths behave
exactly as they will once deployed.
