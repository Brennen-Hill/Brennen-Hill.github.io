---
layout: page
title: "'cl-quil/match': Pattern Matching and Replacement"
description: An implementation of the Iten et al. algorithm for quantum circuit pattern matching.
img: assets/img/PCOverview.png
importance: 1
category: work
related_publications: true
---

This system implements the quantum circuit pattern matching algorithm of Iten et al. It was created during an internship at HRL Laboratories.

**Official Source:** [`https://github.com/quil-lang/quilc/tree/master/src/match`](https://github.com/quil-lang/quilc/tree/master/src/match)

<div class="row">
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
