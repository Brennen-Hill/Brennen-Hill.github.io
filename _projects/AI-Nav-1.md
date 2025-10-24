---
layout: page
title: AI Nav 2 formatted
description: Architecting a Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor
img: assets/img/ExoSky.jpeg
importance: 1
category: research engineering
related_publications: false
---

### Novel Embodied AI for High-Precision State Estimation

**Project:** Development of a Hardware-Aware State Estimation System
**Project Lead:** Sole Researcher & Engineer
**Period:** May 2025 – Present

---

#### 1. Objective

To spearhead the complete research and development lifecycle for a novel, on-device artificial intelligence system, translating an ambiguous high-level goal into a fully-deployed, mission-critical system. The primary challenge was to achieve high-accuracy state estimation using the company's resource-constrained sensors, overcoming the significant performance limitations of existing state-of-the-art (SOTA) algorithms on this specific hardware.

---

#### 2. Methodology & Development

The project progressed through a rigorous, multi-stage R&D pipeline:

* **Literature Review & Benchmarking:** Conducted a comprehensive review of SOTA methodologies for state estimation (e.g., from the *Handbook of Position Location*). Key SOTA algorithms were implemented and benchmarked on the platform's hardware.

* **Problem Analysis:** Benchmarking revealed that existing SOTA algorithms were ill-suited for the platform's operational constraints. These methods, largely designed for high-fidelity sensors and stationary receivers, yielded state estimation accuracy of only **~1000 meters**, which was insufficient for reliable navigation.

* **Novel Algorithm Design:** Given the failure of existing methods, a custom, hardware-aware algorithm was devised **from first principles**. The core innovation lies in its use of **manifold disentanglement** to re-frame the high-dimensional localization problem. Instead of attempting to solve for a 3D position directly from noisy data, the algorithm first isolates key individual parameters (like distance-to-feature) on a lower-dimensional manifold. This intermediate step proved far more robust to the high noise of the platform's sensor suite.

* **Implementation & Validation:** The system was developed using a dual-language approach. **Python** was used for all data pipelines, initial prototyping, simulation, and benchmarking. The final, high-performance, on-device algorithm was implemented in **Lisp** to leverage its exceptional speed, low-level customizability, and real-time metaprogramming capabilities. A rigorous validation pipeline was built to test the algorithm against a massive set of historical flight data, progressing from high-fidelity simulation to extensive on-hardware analysis.

---

#### 3. Results & Impact

* **Performance:** The final algorithm achieves state estimation accuracy to within **10 meters**, a greater than **100x improvement** over the ~1000-meter accuracy of benchmarked SOTA solutions.

* **Deployment:** The system is fully production-ready and has been deployed on **100% of the company's devices**. It is a foundational component of the platform's autonomous navigation stack.

* **Communication:** Findings, progress, and results were communicated directly to the immediate team, the entire company, and the CEO.

---

#### 4. Current & Future Work

Research is currently being extended to develop a system for **state-anchoring** from persistent environmental features. This system will identify and create a persistent library of environmental signals, enabling the platform to re-identify them. This capability will provide an absolute grounding anchor for the robot's position, further enhancing navigation precision and long-term reliability.