---
layout: page
title: LLM Training
description: Training and fine-tuning an LLM for reasoning
img: assets/img/transformer_architecture.png
importance: 3
category: research
related_publications: false
start: February 2024
end: March 2024
role: Lead Researcher
---

## 1. Abstract

This report details a two-part investigation into the capabilities and modification of Large Language Models (LLMs). The first phase explored the frontier of prompt engineering, analyzing the performance gap between zero-shot, Chain-of-Thought (CoT), and a manually implemented Tree-of-Thought (ToT) paradigm on a complex logical reasoning task. We developed a novel evaluation heuristic to guide the ToT process, successfully solving a puzzle where simpler methods failed. The second phase moved from prompting to the model's core, where we trained and fine-tuned a foundational model (NanoGPT) from scratch. This was achieved by directly modifying the model's loss function to align its behavior with an arbitrary, non-semantic rule, a process that demonstrated a successful fine-tuning intervention and revealed critical trade-offs between rule-based alignment and semantic coherence.

---

## 2. Advanced Prompting for Complex Logical Reasoning

### 2.1. Problem Selection and Baseline Analysis

To benchmark the logical reasoning capabilities of modern LLMs, a multi-constraint logic puzzle was selected. The task required assigning a unique favorite activity (cooking, kayaking, rock climbing, zip-lining) to four individuals (Abigail, Oliver, Rosa, Blake) based on a set of restrictive clues.

**Problem Statement:**

- _Abigail, Oliver, Rosa, and Blake all attend the same summer camp, where they can cook, kayak, rock climb, and zip-line. Each child has a different favorite activity._
- _Clue 1: Abigail’s favorite activity isn’t rock climbing._
- _Clue 2: Oliver is afraid of heights._
- _Clue 3: Rosa can’t do her favorite activity without a harness._
- _Clue 4: Blake likes to keep his feet on the ground at all times._

**Baseline (Zero-Shot) Evaluation:**
When prompted with the puzzle and asked for a direct answer (zero-shot), GPT-4 produced an **incorrect** and logically inconsistent solution. It made self-contradictory statements, such as identifying a constraint (e.g., "Abigail can't choose rock climbing") and then violating it in the final answer. This highlights the limitations of zero-shot reasoning for tasks requiring sequential logical deduction.

**Chain-of-Thought (CoT) Intervention:**
By instructing the model to "think step-by-step," a CoT approach was initiated. This produced a vastly improved result, yielding the correct solution:

- **Abigail:** Zip-lining
- **Oliver:** Kayaking
- **Rosa:** Rock climbing
- **Blake:** Cooking

A key observation was the emergence of coherent deductive steps. For example, the model reasoned: _"Rosa needs a harness for her favorite activity, which means her favorite must be either rock climbing or zip-lining. Since Abigail doesn’t like rock climbing (per clue 1), and Oliver is afraid of heights (eliminating zip-lining for him), the possibilities become clearer."_ This demonstrates that CoT provides the necessary structure for the model to externalize its reasoning process, avoiding the logical fallacies observed in the zero-shot approach.

### 2.2. A Heuristic-Guided Tree-of-Thought (ToT) Approach

To explore more robust reasoning pathways, a Tree-of-Thought (ToT) process was manually simulated. This method involves generating multiple potential reasoning paths ("thoughts") and evaluating them at each step. To formalize this evaluation, I developed a custom scoring heuristic to quantify the quality of each thought-state.

**Heuristic Parameterization:**
Each "thought" was parameterized by:

1.  The list of clues.
2.  Current role assignments.
3.  Roles eliminated for each camper.
4.  The count of successfully assigned roles.

**Scoring Heuristic:**
The value of each thought-state was calculated using the formula:
`Score = (CR * 10) - (IR * 1000) + CE - (IE * 100)`
Where:

- **CR:** Number of campers assigned **correctly**.
- **IR:** Number of campers assigned **incorrectly** (violating a clue).
- **CE:** Total number of roles **correctly eliminated** across all campers.
- **IE:** Total number of roles **incorrectly eliminated**.

The heavy penalties for incorrect assignments (`IR`) and eliminations (`IE`) were designed to aggressively prune invalid branches of the reasoning tree, ensuring computational efficiency.

**Example Thought-State Evaluation:**

> **State:** Blake is assigned Cooking (correctly deduced from Clue 4).
> **CR=1, IR=0, CE=10, IE=0** > **Heuristic Value:** (1 _ 10) - (0 _ 1000) + 10 - (0 \* 100) = **20**

This ToT process, guided by the heuristic, also arrived at the correct solution, albeit with a more verbose and explicit exploration of the solution space compared to CoT.

### 2.3. Limitations of Advanced Prompting

An important finding was that advanced prompting is not universally beneficial. For simple, factual recall questions (e.g., "What color was Abraham Lincoln's hat?"), CoT introduces unnecessary verbosity and computational overhead without improving the accuracy of the answer. A simple question can be answered in a single step, and forcing a multi-step reasoning process is inefficient. This suggests that the optimal prompting strategy is task-dependent.

---

## 3. Foundational Model Training and Alignment from Scratch

### 3.1. Objective and Methodology

The second phase of the project transitioned from manipulating model outputs via prompting to altering the model's fundamental behavior through training. The objective was to align a model to an arbitrary rule: **to favor the generation of the letter 't'**.

For this task, I utilized Andrej Karpathy's NanoGPT, a from-scratch implementation of the GPT architecture. Rather than employing high-level fine-tuning techniques like RLHF or DPO, I chose a more direct and foundational approach: **modifying the model's loss function**.

The standard loss function in NanoGPT calculates the cross-entropy loss between the model's predictions and the target tokens. I engineered a custom loss function that incorporated a reward mechanism. This function penalized the model less (i.e., produced a lower loss value) for outputs containing a higher frequency of the letter 't'. This directly incentivized the model at the gradient level to adjust its weights in favor of generating the target character.

### 3.2. Fine-Tuning and Results

I fine-tuned the pre-trained Shakespearean NanoGPT model using my modified training script. The model was trained on its original dataset but with the new loss function, effectively aligning its pre-existing linguistic capabilities with the new rule.

The alignment was successful. The model consistently produced text with a higher density of the letter 't' post-fine-tuning.

**High-Reward Output (More 't's):**

> "And that it the applain at and thy shall the be are"

**Low-Reward Output (Fewer 't's, from a less-tuned model):**

> "And wee his, are have as a dest do of more,"

### 3.3. Analysis of Alignment vs. Coherence

A critical insight emerged from this experiment. While the model successfully aligned with the specified rule, the semantic quality and coherence of its output degraded significantly. The text with the highest reward (most 't's) was often nonsensical.

**Example of High-Quality (Rule-Aligned) but Low-Coherence Text:**

> "TLEONENIUS:
> What must not for fich--it my hear grones
> My your truth that in your have shame pronge,
> enfy but or
> By loffeth, bet the neme, and shough herd thee,
> To low my too? Come the good that seep tent"

This outcome demonstrates a fundamental tension in model alignment: optimizing for a specific, narrow goal (even a simple one like character frequency) can conflict with the general goal of generating coherent, useful language. It suggests that alignment is not a simple optimization problem but a complex balancing act that can impact the model's core capabilities.

---

## 4. Conclusion and Future Work

This project provided a comprehensive, hands-on exploration of LLMs, from high-level interaction to low-level modification. The investigation into prompting techniques demonstrated the necessity of structured reasoning (CoT, ToT) for complex tasks and led to the development of a novel evaluation heuristic. The work on training a foundational model from scratch by directly modifying its loss function successfully demonstrated a powerful method for model alignment and provided valuable insights into the trade-offs between targeted behavior and general linguistic coherence.

Future work could involve developing more sophisticated loss functions that reward rule-adherence while simultaneously penalizing semantic degradation, potentially leading to more robust and controllable models.
