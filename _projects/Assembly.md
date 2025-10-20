---
layout: page
title: Quantum Compiler
description: Architecting a Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor
img: assets/img/ExoSky.jpeg
importance: 1
category: research engineering
related_publications: false
---

Here is a project report written to frame your internship experience as ideal for an AI PhD program applicant.

***

**Affiliation:** Quantum Software Intern (Research Engineer) - HRL Hughes Research Laboratories 

**Date:** Summer 2024

---

### **Abstract**

This report details the architecture and implementation of a novel multi-pass compiler, written in Common Lisp, to generate optimized binary for the custom QICK (Quantum Instrumentation Control Kit) tProcessor ISA. The primary objective was to create a low-level, high-performance pathway for direct FPGA execution, bridging the gap between high-level experimental logic in Python and the picosecond-level control required for quantum hardware. The project involved designing two custom Intermediate Representations (IRs), including an assembly-level API, to manage translation, optimization, automatic resource allocation, and precise timing calculations. A significant challenge was the systematic reverse-engineering of the QICK 32-bit binary instruction set due to highly inaccurate documentation. The fully validated compiler was deployed on a Xilinx RFSoC FPGA to execute complex pulse sequences on physical spin-qubit hardware. This project demonstrates deep expertise in system architecture, compiler design, and hardware-software co-design—foundational skills for developing the high-performance computing systems required for large-scale AI research and novel hardware acceleration.

---

### **1. Introduction & Project Motivation**

Quantum computing research necessitates precise, high-speed control of physical qubits. The open-source QICK platform, utilizing a Xilinx RFSoC FPGA, provides a powerful hardware foundation, but it lacks a robust, high-performance software bridge to make it accessible for complex, open-source research. Physicists need the ability to define experiments in a high-level language like Python, but require that logic to translate into picosecond-perfect, hardware-native binary.

The goal of this project was to architect and build this bridge: a domain-specific compiler to translate high-level experimental constructs—including complex control flow and parametric sweeps—into the most efficient machine code possible for the QICK tProcessor. This system was designed to maximize performance and control flexibility, enabling advanced quantum experimentation that would be infeasible to program by hand.

---

### **2. Compiler Architecture & Implementation**

A multi-pass compiler was architected in **Common Lisp**, a language chosen for its high performance (comparable to C), powerful macro system, and exceptional suitability for building domain-specific languages (DSLs) and compilers. The compiler translates a high-level Python representation into an optimized binary block.

The compilation pipeline was designed as follows:

1.  **Frontend & High-Level IR:** The compiler ingests high-level experimental logic. This logic is translated into a custom high-level Intermediate Representation (IR) that preserves semantic concepts like loops, conditionals, arrays, and parametric sweeps (which run an experiment multiple times with different hyperparameters).

2.  **Optimization & Resource Management:** Compiler passes perform crucial optimizations, including precise timing calculations and automatic resource allocation. A custom **stack and heap** were implemented to manage data. The compiler also manages three distinct memory spaces on the FPGA: **program instruction memory, waveform data memory, and general data memory**, and correctly allocates resources across them.

3.  **Assembly-Level IR:** A second, low-level IR was created to serve as an "assembly API." This IR provides a language of instructions that correspond directly to binary operations (e.g., `(command source destination)`). This abstraction was critical for simplifying the final code generation pass and enabling targeted optimizations.

4.  **Backend & Binary Generation:** The final pass translates the low-level assembly IR into a raw binary block. High-level control structures like `if` statements and `loops` are compiled down to hardware-native conditional and unconditional jump instructions. The final output is a block of binary ready to be loaded directly onto the tProcessor.

---

### **3. Core Challenge: Reverse-Engineering the Undocumented ISA**

A primary obstacle was that the official documentation for the QICK tProcessor's 32-bit binary instruction set (ISA) was critically inaccurate, with over half of the specifications being incorrect. This made direct compilation impossible.

A systematic, empirical methodology was developed to reverse-engineer the true ISA from first principles:

* **Systematic Testing:** A test harness was created to deploy custom-generated 32-bit binary strings directly to the FPGA.
* **Bit-Level Mapping:** Individual bits and bit-fields were systematically toggled (1 vs. 0) to observe their effect on the hardware's output.
* **Hierarchical Deduction:** This "trial and error" process was structured as a systematic search. It was discovered that certain bits acted as control flags, changing the function of other locations in the instruction word. By mapping these dependencies, the hierarchy of the ISA was uncovered.

This rigorous reverse-engineering process successfully mapped the *true* binary interface, creating an accurate specification from scratch and enabling the successful completion of the compiler.

---

### **4. Validation & Research Impact**

The full compilation pipeline was validated by deploying the compiler-generated binaries onto a Xilinx RFSoC FPGA. This binary was then used to execute complex pulse sequences on **physical spin-qubit hardware**, confirming the correctness of the compiler and the reverse-engineered ISA.

The impact of this project is twofold:

1.  **For Physicists:** It enables researchers to abstract away the extreme complexity of the hardware. They can now design complex experiments and parametric sweeps in Python, and the compiler guarantees the output will be a high-performance, timing-perfect binary.
2.  **For Open-Source Research:** By adding a robust compiler to the open-source QICK ecosystem, this work lowers the barrier to entry for sharing and collaborating on advanced quantum experiments.

The project's success and significant technical contributions were recognized with a **return offer from HRL**.

---

### **5. Conclusion & Relevance to AI PhD Aspirations**

This internship involved the complete design, implementation, and validation of a domain-specific compiler for custom hardware. While the domain was quantum control, the core technical challenges are directly analogous to those in high-performance AI research.

* **Parallel to AI Accelerators:** Modern AI is critically dependent on custom accelerators (GPUs, TPUs, neuromorphic chips) with unique, complex, and often sparsely documented instruction sets, just like the QICK tProcessor.
* **Compiler Optimization:** The most pressing challenges in AI systems involve compilers (e.g., MLIR, XLA, TVM). These systems perform the exact same task as this project: translating a high-level model description (like in PyTorch) into optimized, hardware-specific machine code.
* **Demonstrated Skills:** This project demonstrates proven expertise in:
    * **Compiler Architecture:** Designing multi-pass systems, IRs, and optimization passes.
    * **Hardware-Software Co-Design:** Optimizing software for a specific, low-level hardware target.
    * **Systematic Research:** The ability to deconstruct and reverse-engineer a complex, undocumented "black box" system (the ISA) from first principles.

These skills—architecting complex software, optimizing for novel hardware, and a rigorous, empirical research mindset—are precisely what is required to tackle the next generation of challenges in scalable, efficient, and accelerated artificial intelligence. I am eager to apply this "full-stack" perspective, from abstract models down to the binary, to a PhD in AI.