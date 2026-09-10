# AI improves AI: Recursive Self-improvement in Agent Harness

English speaker script · Qijun Han · Approximately 5 minutes, excluding audience questions.

Bracketed directions are stage cues, not spoken text.

## Slide 1 · Title

Hi everyone, I’m Qijun Han. Today I’ll talk about AI improving AI through recursive self-improvement in the agent harness. The central question is: can an agent improve its own software, and use those improvements to become better at improving itself?

## Slide 2 · Contents

I’ll first explain the harness, then introduce the Darwin Gödel Machine and Hyperagents, look at their results, and finish with two research questions.

## Slide 3 · The agent harness

Imagine asking an agent to calculate the average score in student_scores.xls.

The harness organizes the context, calls the model, provides tools to read the spreadsheet, and checks the result. Observations feed back into the context until the task is complete.

The model’s weights stay fixed. What we can change is the surrounding software: its tools, memory, and workflow. That software is the target of the self-improvement methods we’ll discuss.

## Slide 4 · Darwin Gödel Machine

The Darwin Gödel Machine, or DGM, maintains an archive of coding agents.

A parent is selected from the archive. It uses evaluation feedback to modify its own code, producing a new version. That version is tested and added to the archive if it remains a valid code-editing agent.

The archive preserves different branches that might support later improvements.

The recursive connection is that the coding agent both solves tasks and implements its own modifications. However, the instruction-generation procedure below the agent remains fixed.

## Slide 5 · DGM results

In DGM’s 200-task SWE-bench Verified setting, success increases from 20 to 50 percent. On the full Polyglot benchmark, it increases from 14.2 to 30.7 percent.

These are gains from evolving agent software while keeping the underlying models frozen. They demonstrate useful self-improvement, but do not establish unlimited growth.

## Slide 6 · DGM → Hyperagents

Here is the same DGM diagram again. The next step is to make the improvement procedure editable too.

[Click once; pause for the animation.]

Watch the boundary expand. The task agent, H, solves the target task. The meta agent, U, generates modifications. It can now edit both H and its own code, as shown by the orange loop.

Together, they form a hyperagent. This allows the system to improve how it generates future improvements, including for tasks beyond coding. The archive and evaluation framework remain in place.

## Slide 7 · Hyperagents results

These charts compare Hyperagents, called DGM-H, with DGM and the manually adapted DGM-custom.

DGM-H significantly outperforms original DGM on paper review and robotics reward design. Its medians are also higher than DGM-custom’s, although those differences are not statistically significant.

The transfer experiment is especially interesting. On a new math-grading domain, agents transferred from DGM-custom produce almost no improvement. Transferred hyperagents achieve a 63-percentage-point gain after 50 iterations with the meta agent held fixed.

This supports transferable improvement strategies. It does not mean Hyperagents outperform DGM on every task; coding performance is comparable.

## Slide 8 · Future outlook

This leaves two questions I would like to investigate.

First, how much of the gain comes from the harness, how much depends on the model, and how do they interact? We could compare initial and evolved harnesses across different models, using the same tasks and controlled budgets.

Second, can we evolve with a strong model and deploy with a smaller one? A powerful, expensive meta model might create a harness that also benefits a different, cheaper task model.

If that works, we could reuse the harness to reduce inference costs. We would need to measure retained quality and account for the upfront evolution cost.

## Slide 9 · References

These references include the two main papers and the original benchmark, dataset, and simulator sources.

## Slide 10 · Q&A

I’d be happy to take questions, especially about how to separate harness improvements from model effects.

## Slide 11 · Thank you

Thank you for listening.

