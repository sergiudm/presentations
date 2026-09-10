# Recursive Self-improvement in Agent Harness

英文幻灯片，中文讲稿。共 10 页，建议节奏约 5 分钟；Q&A 另按现场时间安排。

## 01 · Title（约 15 秒）

今天讨论 Agent Harness 中的递归自我改进。核心问题是：当模型参数保持不变时，Agent 能否修改自己的运行方式，并利用改进后的能力继续改进自己？

## 02 · Contents（约 15 秒）

接下来先用一页说明 Harness 是什么，然后看两篇工作：DGM 怎样让编程 Agent 修改自己，Hyperagents 又怎样把改进过程本身变成可修改的程序。两部分都紧接着看实验结果。

## 03 · The agent harness（约 35 秒）

用一个具体任务来看：计算 student_scores.xls 中的平均成绩。Context 保存文件路径、工作表和成绩列；模型决定先读取、再求平均；工具用 Python 或电子表格完成计算；Verify 检查参与计算的是数值，并跳过空白，最后输出总分除以有效成绩数。Task 和 Output 下方的小字给出输入与输出的例子，框内图标对应文件、上下文、模型、工具和验证。下方虚线表示，读到的数据或验证反馈会回到上下文，帮助下一步执行。整个过程里模型参数不变，我们之后要改进的就是围绕它的 Harness。

## 04 · Darwin Gödel Machine: the pipeline（约 60 秒）

现在看 Darwin Gödel Machine，也就是 DGM。左侧档案保存 Agent 和成绩，并选出父代。中间蓝色框是可修改的编程 Agent：它既解决编程任务，也编辑自己的代码。下方固定的改进机制根据日志生成修改指令，由同一个编程 Agent 实现修改。右侧评测候选版本的表现和有效性；能继续编辑代码的版本进入档案，之后又可以成为父代。档案保留不同分支，因为暂时不领先的版本也可能成为后续突破的基础。请记住，中间可编辑边界只包住编程 Agent，下面的改进机制仍然固定。下一篇工作会改变这个边界。

## 05 · Evidence from the Darwin Gödel Machine（约 45 秒）

DGM 给出了一个具体例子。作者报告，在其 200 道 SWE-bench Verified 任务设置中，成绩由 20% 提升到 50%；完整 Polyglot 的 pass@1 从 14.2% 提升到 30.7%。我们只比较同一实验设置内的起点和终点，不把两组分数看作同一个排名。基础模型保持冻结，改进发生在 Agent 软件层。结果支持系统层优化的可行性，但不足以证明无限增长或普遍的智能加速。

## 06 · Hyperagents（约 55 秒）

先看屏幕上的 DGM 图，与第 4 页是同一张。编程 Agent 可以改自己的实现，但下面生成改进指令的机制仍由人设计。现在点击一次，或按右箭头、空格。注意动画：可编辑边界向下扩展，把改进机制也包进来；上面变成解决目标任务的 H，下面变成可修改的元 Agent U。橙色箭头表示 U 修改 H，随后出现的橙色回路表示 U 还能修改自己的代码。档案、评测和反馈回路保持原位。关键变化是，系统不仅改进做题程序，也能改进产生下一轮修改的程序。这就是 Hyperagents。论文主实验中，外部父代选择规则仍保持固定。再按右箭头进入结果页；左箭头或 Back to DGM 可返回变形前。

## 07 · Results from Hyperagents（约 55 秒）

这里直接与 DGM 比较。左图是论文评审，三根柱依次是原版 DGM、人工适配的 DGM-custom，以及 Hyperagents，也就是 DGM-H，中位准确率分别为 0%、59% 和 71%。中图是机器人奖励设计，测试得分分别为 0、0.348 和 0.372。这两项里 DGM-H 显著优于原版 DGM；与 DGM-custom 相比中位数更高，但差异没有达到显著。右图更关键：把之前演化出的系统迁移到数学评分，固定元 Agent，再允许 50 轮生成新任务 Agent。来自 DGM-custom 的迁移系统，improvement@50 为零；来自 DGM-H 的系统达到 0.630，即测试准确率提高 63 个百分点。这支持它学到了可迁移的改进策略。误差线表示五次运行的 95% 置信区间。这里的优势主要在非编程任务和跨领域迁移，编程成绩与 DGM 相近，不能概括为所有任务都更好。

## 08 · References（约 10 秒）

主要方法来自 DGM 和 Hyperagents；其余条目补充 SWE-bench 及 Verified、Polyglot、APRES 评审数据、Genesis 仿真环境和 IMO-GradingBench 的来源。结果页中的引用编号与这一页对应，点击可以打开原始来源。

## 09 · Q&A（约 5 秒）

欢迎提问。也可以围绕这个问题讨论：什么证据能让我们相信，一个 Agent 确实变得更善于改进自己？

## 10 · Thank you（约 5 秒）

谢谢大家。

## Sources

1. Zhang et al. (2025; revised 2026). [Darwin Gödel Machine: Open-Ended Evolution of Self-Improving Agents](https://arxiv.org/abs/2505.22954). Pipeline: §3 and Appendix C. Results: §4.2, §4.4 and Appendix E.4 in the [March 2026 revision](https://arxiv.org/html/2505.22954v3).
2. Zhang et al. (2026). [Hyperagents](https://arxiv.org/abs/2603.19461). Mechanism: §3. Results: §5.1–5.2, Figs. 2–3 in [v1](https://arxiv.org/html/2603.19461v1).

3. Jimenez et al. (2024). [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770). ICLR 2024.
4. OpenAI (2024). [Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/). Verified 子集的官方发布；DGM 图中使用其中的 200 道任务设置。
5. Paul Gauthier (2024). [Aider Polyglot benchmark — official release](https://aider.chat/2024/12/21/polyglot.html). 官方文章标题：o1 tops aider’s new polyglot leaderboard；225 道编程题。DGM 的 pass@1 设置仍以 [1] 为准。
6. Zhao et al. (2026). [APRES: An Agentic Paper Revision and Evaluation System](https://arxiv.org/abs/2603.03142). Hyperagents 论文 Appendix C.2 指定的评审数据来源。
7. Genesis Authors (2024). [Genesis: A Generative and Universal Physics Engine for Robotics and Beyond](https://github.com/Genesis-Embodied-AI/genesis-world). 仿真环境；Go2 训练／测试任务由 [2] Appendix C.3 定义，并非独立的 Genesis benchmark。
8. Luong et al. (2025). [Towards Robust Mathematical Reasoning](https://aclanthology.org/2025.emnlp-main.1794/). EMNLP 2025；IMO-GradingBench 来源。

Hyperagents 柱状图数据（论文 v1 §5.1–5.2，Figs. 2–3）：

| 实验 | DGM | DGM-custom | DGM-H |
| --- | --- | --- | --- |
| 论文评审准确率 | 0.0% [0.0, 51.0] | 59.0% [57.0, 65.0] | 71.0% [59.0, 75.0] |
| 机器人奖励设计测试得分 | 0.000 [0.000, 0.090] | 0.348 [0.305, 0.385] | 0.372 [0.355, 0.436] |
| 迁移后数学评分 improvement@50 | — | 0.000 [0.000, 0.010] | 0.630 [0.540, 0.630] |

数值为五次运行的中位数，方括号为 95% bootstrap CI。前两项联合优化 100 轮，报告独立测试集结果。原版 DGM 为针对编程任务设计的实现；DGM-custom 是人工按目标领域适配后的基线。DGM-H 在前两项显著优于原版 DGM（p < 0.05），但与 DGM-custom 的差异未达显著（p > 0.05）。迁移图的柱名标记来源系统：来自 DGM-custom 的 Agent 使用 DGM w/o self-improve；来自 DGM-H 的 Agent 使用 DGM-H w/o self-improve。在目标数学领域均固定元 Agent，运行 50 轮，不是零样本成绩。编程结果为相近水平：完整 Polyglot 上 DGM-H 为 26.7%，原 DGM 报告为 30.7%，因此不作全面优于 DGM 的结论。

Presentation repository: https://github.com/sergiudm/presentations/tree/main/gpp3
