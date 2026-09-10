# Recursive Self-improvement in Agent Harness

An academic 16:9 browser presentation with 10 slides for a 4–6 minute talk (about 5 minutes at the suggested pace). English slides and Chinese speaker notes. Built with React, Vinext, and CSS/SVG animations.

Live site: <https://sergiudm.github.io/presentations/gpp3/> (deployed from `main` by GitHub Actions).

## Presenting

- Left / Right, Page Up / Down, Space: navigate
- Theme button: switch between light and dark mode; the choice persists on this device
- F: fullscreen (requires browser support)
- P: start / pause autoplay
- O: slide overview
- N: Chinese speaker notes
- Home / End: first / final slide
- Touch: swipe horizontally
- Slide 6 starts with the same DGM diagram as slide 4. Click the slide or Reveal Hyperagents (or press Right / Space) to animate the editable boundary and meta self-modification loop. Press Right again for results; Left or Back to DGM resets the diagram. Re-entering slide 6 also resets it.
- Autoplay waits for the reveal on slide 6, then resumes its slide timer.

Autoplay pauses while notes or overview are open. Every slide supports a direct URL hash (#1 through #10). Reduced-motion preferences disable decorative transitions.

## Development

Requires Node 22.13+.

```sh
npm ci
npm run dev
npm run build
```

## Sources and scope

1. Zhang et al. (2025; revised 2026), [Darwin Gödel Machine](https://arxiv.org/abs/2505.22954).
2. Zhang et al. (2026), [Hyperagents](https://arxiv.org/abs/2603.19461).
3. Jimenez et al. (2024). [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770). ICLR 2024.
4. OpenAI (2024). [Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/). Verified 子集的官方发布；DGM 图中使用其中的 200 道任务设置。
5. Paul Gauthier (2024). [Aider Polyglot benchmark — official release](https://aider.chat/2024/12/21/polyglot.html). 官方文章标题：o1 tops aider’s new polyglot leaderboard；225 道编程题。DGM 的 pass@1 设置仍以 [1] 为准。
6. Zhao et al. (2026). [APRES: An Agentic Paper Revision and Evaluation System](https://arxiv.org/abs/2603.03142). Hyperagents 论文 Appendix C.2 指定的评审数据来源。
7. Genesis Authors (2024). [Genesis: A Generative and Universal Physics Engine for Robotics and Beyond](https://github.com/Genesis-Embodied-AI/genesis-world). 仿真环境；Go2 训练／测试任务由 [2] Appendix C.3 定义，并非独立的 Genesis benchmark。
8. Luong et al. (2025). [Towards Robust Mathematical Reasoning](https://aclanthology.org/2025.emnlp-main.1794/). EMNLP 2025；IMO-GradingBench 来源。



The talk covers the harness, DGM's pipeline and results, then Hyperagents and selected results. DGM's SWE-bench numbers refer to its 200-task Verified subset; its Polyglot numbers refer to the full benchmark with pass@1. The DGM result slide is retained.

Hyperagents results use bar charts from §5.1–5.2 / Figs. 2–3: held-out paper review and robotics reward design compare original DGM, manually adapted DGM-custom, and DGM-H. Cross-domain math grading compares transfer agents sourced from DGM-custom and DGM-H, each with its meta agent fixed for 50 target-domain iterations (improvement@50). Values are five-run medians with 95% bootstrap confidence intervals. DGM-H significantly outperforms original DGM on review and robotics; its higher medians versus DGM-custom are not statistically significant. Coding performance is comparable, so the slide scopes the advantage to non-coding tasks and transferable improvement. See the speaker notes for all plotted values and confidence intervals.

The diagrams summarize the papers' mechanisms. This repository contains the presentation, not an implementation of the research systems. See `speaker-notes-zh.md` for slide timings and detailed source scope.
