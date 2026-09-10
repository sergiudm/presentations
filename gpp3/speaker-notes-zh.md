# Recursive Self-improvement in Agent Harness

英文幻灯片，中文讲稿。

## 01 · Title
今天讨论的是 Agent Harness 中的递归自我改进。核心问题是：当模型参数保持不变时，Agent 能否改进自己的运行方式，并让这些改进帮助它产生下一轮改进？

## 02 · Contents
报告分为三个问题：第一，Harness 包含什么；第二，改进如何形成递归闭环，已有证据是什么；第三，我们应该怎样评估它，以及接下来值得研究什么。

## 03 · Introduction

请从左向右看这张图：任务先进入 Harness，系统准备上下文和记忆，再调用参数固定的模型，模型选择工具执行动作，最后验证是否完成。下方虚线表示观察结果和重试反馈会回到上下文，这是一轮任务中的执行循环。我们要优化的是围绕模型的 Harness。任务留下的轨迹，还可以成为后面修改 Harness 的依据。

## 04 · Levels of improvement

这里用三条 pipeline 对比改进的层次。第一行中，尝试的反馈变成反思记忆，帮助下一次尝试。第二行中，固定的元 Agent 设计 Agent 程序，再评估结果，图中省略了返回固定优化器的反馈。第三行的关键是底部虚线：改进后的系统参与产生下一轮修改。DGM 利用编程能力与自修改能力的联系，Hyperagents 则进一步让改进程序本身可编辑。这是概念分类，不是性能排名。

## 05 · Main part: the recursive loop
一个闭环从已有版本开始：在任务上运行，记录轨迹和失败原因；提出对工具或工作流的修改；在隔离环境里验证候选版本；再把有效版本与证据保存下来，供后续迭代使用。递归发生在新版本参与下一轮修改时。档案允许保留暂时不占优、但可能成为后续突破基础的分支。这里的动画是概念示意，不代表实际实验轨迹，也不是只接受分数上涨版本的贪心算法。

## 06 · Evidence: Darwin Gödel Machine
DGM 给出了一个具体例子。作者报告，在其 200 道 SWE-bench Verified 任务设置中，成绩由 20% 提升到 50%；完整 Polyglot 的 pass@1 从 14.2% 提升到 30.7%。我们只比较同一实验设置内的起点和终点，不把两组分数看作同一个排名。基础模型保持冻结，改进发生在 Agent 软件层。结果支持系统层优化的可行性，但不足以证明无限增长或普遍的智能加速。

## 07 · Evaluation

沿着上面的 pipeline 看，左侧是开发任务和改进循环，可以持续利用反馈和历史版本。选定候选版本后先冻结，再送到右侧的独立测试区，最终分数不回流到搜索。对静态 Harness、固定改进器和递归改进器，都采用相同模型和总计算预算。下方列出我们需要报告的证据：成功率、成本、回归，以及多次运行的波动。还要单独检验，后代是否更善于在相同预算内生成有效改进。这是建议的评估方案。

## 08 · Future

这张图把 Hyperagents 的关键关系展开了。左侧虚线框是同一个可编辑程序，上半部是任务 Agent，下半部是元 Agent。任务执行产生右侧的证据，再反馈给元 Agent。请注意左侧两条修改路径：元 Agent 既可以修改任务程序 H，也可以修改自身程序 U。修改后的 H 和 U 共同进入下一代。论文报告了元层改进的迁移，但泛化、搜索成本，以及谁来验证修改，仍然是需要进一步研究的问题。

## 09 · References
本报告的主要文献是 Reflexion、Automated Design of Agentic Systems、Darwin Gödel Machine 和 Hyperagents。每项引用都可以在演示中直接打开原论文。

## 10 · Q&A
欢迎提问。也可以围绕这个问题讨论：什么证据能让我们相信，一个 Agent 确实变得更善于改进自己？

## 11 · Thank you
谢谢大家。

## Sources

1. Shinn et al. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. https://arxiv.org/abs/2303.11366
2. Hu, Lu & Clune (2024). Automated Design of Agentic Systems. https://arxiv.org/abs/2408.08435
3. Zhang et al. (2025; revised 2026). Darwin Gödel Machine: Open-Ended Evolution of Self-Improving Agents. https://arxiv.org/abs/2505.22954 . Experimental scope: sections 4.2, 4.4 and E.4 of https://arxiv.org/html/2505.22954v3
4. Zhang et al. (2026). Hyperagents. https://arxiv.org/abs/2603.19461

Presentation repository: https://github.com/sergiudm/gpp3 (presentation implementation, not a research result).
