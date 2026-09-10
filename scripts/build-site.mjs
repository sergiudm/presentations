#!/usr/bin/env node
// Builds every presentation in this repository into _site/ and generates the
// landing page. Deployment is automatic: any directory at the repository root
// is published when it matches one of the supported shapes.
//
//   1. presentation.json with "staticDir"  -> that subfolder is copied as-is
//      (use this for decks kept as plain HTML/CSS/JS).
//   2. index.html at the directory root     -> the folder is copied as-is
//      (use this when dropping in a self-contained static deck).
//   3. package.json with a "build" script   -> dependencies are installed and
//      the app is built; the first of dist/client, dist, out, or build that
//      contains an index.html is published.
//
// Vite apps ("build": "vite build") are rebuilt with a relative base so they
// work at any subpath. Next/vinext static-export apps are built with
// PAGES_ASSET_PREFIX=<SITE_PREFIX>/<name> and the prefixed _next directory is
// flattened back onto the build root afterwards.
//
// presentation.json (all fields optional):
//   title, description  -> landing-page card text
//   staticDir           -> folder to publish instead of building
//   draft: true         -> skip this directory entirely

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const siteOutput = process.env.SITE_OUTPUT ?? '_site';
const sitePrefix = (process.env.SITE_PREFIX ?? '/presentations').replace(/\/+$/, '');
const outputDir = path.join(repoRoot, siteOutput);

const SKIP_DIRS = new Set(['.git', '.github', 'node_modules', 'scripts', siteOutput]);

function listPresentations() {
  return fs
    .readdirSync(repoRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !SKIP_DIRS.has(e.name))
    .map((e) => e.name)
    .sort();
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

const COPY_EXCLUDE = [/\/node_modules($|\/)/, /\/\.git($|\/)/, /\.DS_Store$/];

function copyTree(from, to) {
  fs.cpSync(from, to, {
    recursive: true,
    filter: (src) => !COPY_EXCLUDE.some((re) => re.test(src)),
  });
}

function installDependencies(dir) {
  const lock = path.join(dir, 'package-lock.json');
  const nm = path.join(dir, 'node_modules');
  if (fs.existsSync(nm) && fs.existsSync(lock) && fs.statSync(lock).mtimeMs < fs.statSync(nm).mtimeMs) {
    console.log(`  dependencies up to date, skipping install`);
    return;
  }
  const cmd = fs.existsSync(lock)
    ? 'npm ci --no-audit --no-fund'
    : 'npm install --no-audit --no-fund';
  execSync(cmd, { cwd: dir, stdio: 'inherit' });
}

// Next/vinext static exports mirror the assetPrefix path inside the output
// directory (e.g. dist/client/presentations/gpp3/_next). The site is served
// from _site/<name>/, so fold that tree back onto the output root.
function flattenAssetPrefix(outRoot, name) {
  const prefixed = path.join(outRoot, ...sitePrefix.split('/').filter(Boolean), name, '_next');
  if (!fs.existsSync(prefixed)) return;
  const target = path.join(outRoot, '_next');
  fs.rmSync(target, { recursive: true, force: true });
  fs.renameSync(prefixed, target);
  let dir = path.dirname(prefixed);
  while (dir.startsWith(outRoot) && dir !== outRoot) {
    try {
      fs.rmdirSync(dir);
    } catch {
      break; // not empty — keep whatever else the export produced
    }
    dir = path.dirname(dir);
  }
}

function buildApp(dir, name) {
  installDependencies(dir);
  const pkg = readJson(path.join(dir, 'package.json'));
  const isPlainVite = /^vite build\b/.test(pkg.scripts.build);
  if (isPlainVite) {
    // Relative base so the deck works at any subpath.
    execSync('npx vite build --base=./', { cwd: dir, stdio: 'inherit' });
  } else {
    execSync('npm run build', {
      cwd: dir,
      stdio: 'inherit',
      env: { ...process.env, PAGES_ASSET_PREFIX: `${sitePrefix}/${name}` },
    });
  }
  const candidate = ['dist/client', 'dist', 'out', 'build']
    .map((p) => path.join(dir, p))
    .find((p) => fs.existsSync(path.join(p, 'index.html')));
  if (!candidate) throw new Error('no index.html found in dist/client, dist, out, or build after build');
  flattenAssetPrefix(candidate, name);
  return candidate;
}

function publish(name) {
  const dir = path.join(repoRoot, name);
  const meta = readJson(path.join(dir, 'presentation.json')) ?? {};
  const pkg = readJson(path.join(dir, 'package.json'));

  let sourceDir;
  if (meta.staticDir) {
    sourceDir = path.join(dir, meta.staticDir);
    if (!fs.existsSync(path.join(sourceDir, 'index.html'))) {
      throw new Error(`staticDir "${meta.staticDir}" has no index.html`);
    }
  } else if (fs.existsSync(path.join(dir, 'index.html')) && !pkg?.scripts?.build) {
    sourceDir = dir;
  } else if (pkg?.scripts?.build) {
    sourceDir = buildApp(dir, name);
  } else {
    return null; // not a presentation (README-only folder, scratch dir, ...)
  }

  copyTree(sourceDir, path.join(outputDir, name));
  return {
    name,
    title: meta.title ?? pkg?.name ?? name,
    description: meta.description ?? pkg?.description ?? '',
    url: `${name}/`,
  };
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function landingPage(decks) {
  const cards = decks
    .map(
      (d, i) => `        <li>
          <a href="${d.url}">
            <span class="index">${String(i + 1).padStart(2, '0')}</span>
            <span class="body">
              <h2>${escapeHtml(d.title)}</h2>
              <p>${escapeHtml(d.description)}</p>
            </span>
            <span class="open" aria-hidden="true">Open &rarr;</span>
          </a>
        </li>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Presentations</title>
<meta name="description" content="Interactive web presentations hosted from the presentations repository.">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; }
  body {
    min-height: 100vh;
    background: #0a0f1e;
    color: #e8ecf5;
    font: 16px/1.6 ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  main { max-width: 980px; margin: 0 auto; padding: 72px 24px 48px; }
  .eyebrow {
    font: 600 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.22em; text-transform: uppercase; color: #f2b25c;
  }
  h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(40px, 7vw, 64px); font-weight: 500; line-height: 1.05;
    letter-spacing: -0.01em; margin: 14px 0 12px;
  }
  .lede { color: #9aa7c2; max-width: 56ch; }
  ul { list-style: none; padding: 0; margin: 48px 0 0; display: grid; gap: 16px; }
  a {
    display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 20px;
    padding: 26px 28px; text-decoration: none; color: inherit;
    background: #111830; border: 1px solid #253055; border-radius: 14px;
    transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;
  }
  a:hover, a:focus-visible {
    transform: translateY(-2px); border-color: #f2b25c; background: #141d3a;
  }
  .index {
    font: 500 13px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    color: #6b7aa3; border: 1px solid #2b3760; border-radius: 8px; padding: 7px 9px;
  }
  h2 { font-size: 19px; font-weight: 600; line-height: 1.3; margin-bottom: 4px; }
  .body p { color: #94a1be; font-size: 14.5px; }
  .open { color: #f2b25c; font-size: 14px; white-space: nowrap; }
  footer {
    margin-top: 56px; padding-top: 20px; border-top: 1px solid #1d2747;
    color: #6b7aa3; font-size: 13.5px;
  }
  footer a { display: inline; padding: 0; border: none; background: none; color: #94a1be; }
  footer a:hover { color: #f2b25c; transform: none; }
  @media (max-width: 640px) {
    main { padding-top: 48px; }
    a { grid-template-columns: 1fr; gap: 8px; }
    .index { justify-self: start; }
  }
</style>
</head>
<body>
<main>
  <header>
    <p class="eyebrow">sergiudm &middot; decks</p>
    <h1>Presentations</h1>
    <p class="lede">${decks.length} interactive web deck${decks.length === 1 ? '' : 's'} hosted from this repository. Every folder added here is built and published automatically.</p>
  </header>
  <ul>
${cards}
  </ul>
  <footer>
    Adding a folder to the repository automatically hosts it here &mdash; see the
    <a href="https://github.com/sergiudm/presentations#readme">README</a> for the supported layouts.
  </footer>
</main>
</body>
</html>
`;
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, '.nojekyll'), '');
fs.writeFileSync(
  path.join(outputDir, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#111830"/><path d="M18 20h28M18 32h20M18 44h24" stroke="#f2b25c" stroke-width="5" stroke-linecap="round"/></svg>\n`
);

const decks = [];
const failures = [];
for (const name of listPresentations()) {
  const meta = readJson(path.join(repoRoot, name, 'presentation.json'));
  if (meta?.draft) {
    console.log(`\n== ${name}: draft, skipping ==`);
    continue;
  }
  console.log(`\n== ${name} ==`);
  try {
    const deck = publish(name);
    if (deck) {
      decks.push(deck);
      console.log(`  published -> ${siteOutput}/${name}/`);
    } else {
      console.log('  no index.html and no build script, skipping');
    }
  } catch (err) {
    failures.push(name);
    console.error(`  BUILD FAILED: ${err.message}`);
  }
}

fs.writeFileSync(path.join(outputDir, 'index.html'), landingPage(decks));

console.log(`\n${decks.length} deck(s) built into ${siteOutput}/`);
for (const d of decks) console.log(`  ${sitePrefix}/${d.name}/  ${d.title}`);
if (failures.length) {
  console.error(`\nfailed: ${failures.join(', ')}`);
  process.exit(1);
}
