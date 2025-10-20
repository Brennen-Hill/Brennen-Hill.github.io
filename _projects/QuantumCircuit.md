---
layout: page
title: "Quantum Circuit"
description: An algorithm for quantum circuit pattern matching and optimization.
img: assets/img/PCOverview.png
importance: 1
category: research engineering
related_publications: false
---


# A Production-Ready Implementation of Exact Pattern Matching for Quantum Circuit Optimization

### Abstract

Fidelity in Noisy Intermediate-Scale Quantum (NISQ) computers is fundamentally limited by gate errors and qubit decoherence, making circuit optimization a critical task. This project details the engineering of a production-ready optimization pass within the **Quilc quantum compiler** to reduce circuit depth. The system implements an exact pattern-matching algorithm, translating a novel theoretical framework into a high-impact optimization tool. A **two-phase algorithmic solution** was devised to manage the combinatorial complexity: (1) a greedy forward-pass on the circuit's DAG representation to find a valid seed match, followed by (2) a comprehensive backtracking search to maximally expand the match. This optimization pass demonstrated significant, measurable impact, **reducing quantum circuit depth by up to 37%**, thereby shortening execution time and enhancing algorithmic fidelity by mitigating decoherence.

---

## 1. Introduction & Problem Statement

The primary limitation of the current NISQ era of quantum computing is the accumulation of noise, which stems from gate infidelities and qubit decoherence over time. The probability of a successful computation decreases exponentially with the number of gates and the depth of the circuit. Therefore, a central goal of quantum compiler design is to minimize these two metrics.

A powerful technique for this is *peephole optimization*, which involves identifying and replacing small sub-circuits (patterns) with more efficient, functionally equivalent ones. This project focuses on a specific, high-impact case: finding and removing circuit patterns that are topologically equivalent to the **identity function** (i.e., patterns that perform no net operation). The challenge lies in formally and efficiently identifying these patterns, as the equivalence can be obscured by gate commutations and the reordering of operations on different qubits.

## 2. Theoretical Foundation

This work translates the theoretical method proposed by Iten et al. in **"Exact and practical pattern matching for quantum circuit optimization" [arXiv:1909.05270]** into a practical, production-level compiler tool.

The core of the Iten et al. algorithm is a formal, graph-based method for finding all *maximal* matches of a given pattern within a larger quantum circuit. A key feature of their approach is that it correctly handles the physics of quantum circuits, specifically by accounting for the **pairwise commutation rules** of quantum gates. This project involved adapting this formal algorithm and engineering it for integration into the Common Lisp codebase of the `quilc` compiler.

## 3. Algorithmic Solution & Implementation

To navigate the high combinatorial complexity of the matching problem, a two-phase algorithmic solution was designed and implemented.

### 3.1. Phase 1: Greedy Forward-Pass Seed Matching

The algorithm first operates on the circuit's **Directed Acyclic Graph (DAG)** representation. It executes a greedy forward-pass to rapidly identify a valid *seed match*. This phase efficiently finds an initial, valid (but not necessarily maximal) subgraph isomorphism, which serves as a starting point for a more exhaustive search.

### 3.2. Phase 2: Maximal Expansion via Backtracking Search

The seed match from Phase 1 is then fed into a comprehensive **backtracking search** algorithm designed to maximally expand the match. This phase solves the core combinatorial challenge of the project, which involves:

* **Deciding whether to incorporate preceding gates** into the match, which may require invalidating parts of the initial forward seed.
* **Commuting non-matching "disturbing gates"** (i.e., gates that temporarily block a match but commute with the pattern's gates) out of the active matching window.

This backtracking process guarantees that the final match found is maximal, ensuring the largest possible identity-pattern is identified for removal.

## 4. System Architecture & Compiler Integration

The algorithm was engineered as a robust optimization pass within the `quilc` compiler, exposing two primary functions as its interface:

1.  **`pattern-match`**: Takes a circuit and a single identity-realizing pattern as input. It searches the circuit and returns a list of all found `match` objects.
2.  **`pattern-replace`**: Takes a circuit and a list of patterns. It iteratively calls `pattern-match` for each pattern, replacing the matched sub-circuits. This process repeats until a fixed point is reached and no further optimizations can be found.

The system was built for extensibility. It relies on an abstract `gate` superclass, requiring a specific interface to be implemented. This design allows the pattern-matching engine to operate on any set of quantum gates, making it a general-purpose tool within the compiler.

## 5. Results & Quantifiable Impact

The impact of the optimization pass was rigorously quantified. Benchmarks demonstrated that the implementation can achieve **reductions in quantum circuit depth by up to 37%**.

This result is highly significant for practical quantum computation.
* **Shortened Execution Time**: A more shallow circuit executes faster on quantum hardware.
* **Enhanced Algorithmic Fidelity**: This is the most critical outcome. By substantially reducing the number of gates and the overall depth, the algorithm directly mitigates the cumulative effects of qubit decoherence and gate errors, leading to a higher probability of a correct and meaningful result.

## 6. Conclusion

This project successfully demonstrates the translation of a novel, theoretically complex pattern-matching algorithm into a production-ready, high-impact optimization tool for a quantum compiler. The developed two-phase (greedy-seed + backtracking-expansion) solution proved effective in managing the inherent combinatorial search problem, delivering significant, measurable improvements in circuit fidelity crucial for advancing NISQ-era quantum applications.








This system implements the quantum circuit pattern matching algorithm of Iten et al. It was created during an internship at HRL Laboratories.

**Official Source:** [`https://github.com/quil-lang/quilc/tree/master/src/match`](https://github.com/quil-lang/quilc/tree/master/src/match)

<div class="col">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/PatternAndCircuit.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CanonicalForm.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ForwardMatchResult.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/BackwardMatchResult.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
        <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/MaximalMatch.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Description

The system exposes two primary functions as the interface: `pattern-match` and `pattern-replace`.

`pattern-match` takes a circuit and a pattern that realises the identity function as input. The circuit is then searched for matches of the pattern. The list of these matches is returned.

`pattern-replace` takes a circuit and a list of patterns as input. `pattern-match` is called with each pattern. Each match with the pattern in the circuit is then replaced with the unmatched section of the pattern. Then `pattern-replace` repeats. The return value of `pattern-replace` is the optimized circuit.

It can be useful to print out the current state of `pattern-match` and `pattern-replace`. To do so, three methods are provided:

- `(print-circ circuit)` takes a circuit as input and prints a visual representation of the circuit
- `(print-circ-as-canon circuit)` takes a circuit as input and prints a visual representation of the canonical form of the circuit
- `(print-canon-data canonical-form)` takes a `canonical-form` as input and prints a visual representation of the canonical form

## How To Use

1.  Load `"cl-quil/match"`.
2.  Implement the gate interface by creating a subclass of the class `gate`. An example of how to do this can be found in `test-gate.lisp`
3.  Realise a circuit and a pattern as lists of objects that subclass `gate`.
4.  Run `(pattern-match circuit pattern)` or `(pattern-replace circuit patterns)`.

## How To Test

Run the following command:

```lisp
(asdf:test-system "cl-quil/match")
```
