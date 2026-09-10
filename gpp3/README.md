# Recursive Self-improvement in Agent Harness

An academic 16:9 browser presentation with 11 slides. English slides and Chinese speaker notes. Built with React, Vinext, and CSS/SVG animations.

Live site: <https://sergiudm.github.io/gpp3/> (deployed from `main` by GitHub Actions).

## Presenting

- Left / Right, Page Up / Down, Space: navigate
- Theme button: switch between light and dark mode; the choice persists on this device
- F: fullscreen (requires browser support)
- P: start / pause autoplay
- O: slide overview
- N: Chinese speaker notes
- Home / End: first / final slide
- Touch: swipe horizontally

Autoplay pauses while notes or overview are open. Every slide supports a direct URL hash (#1 through #11). Reduced-motion preferences disable decorative transitions.

## Development

Requires Node 22.13+.

```sh
npm ci
npm run dev
npm run build
```

## Sources and scope

1. Shinn et al. (2023), [Reflexion](https://arxiv.org/abs/2303.11366).
2. Hu, Lu & Clune (2024), [Automated Design of Agentic Systems](https://arxiv.org/abs/2408.08435).
3. Zhang et al. (2025; revised 2026), [Darwin Gödel Machine](https://arxiv.org/abs/2505.22954).
4. Zhang et al. (2026), [Hyperagents](https://arxiv.org/abs/2603.19461).

DGM's SWE-bench numbers refer to its 200-task Verified subset. Polyglot numbers refer to the full benchmark with pass@1. Charts compare initial and evolved agents within each reported setting. The loop is schematic. The evaluation protocol and future hypotheses are proposals, not reported experimental results. This repository contains the presentation, not an implementation of the research systems.
