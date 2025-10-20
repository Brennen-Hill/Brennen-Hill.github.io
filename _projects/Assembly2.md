---
layout: page
title: Quantum Compiler
description: A Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor
img: assets/img/ExoSky.jpeg
importance: 1
category: research engineering
related_publications: false
---

**Affiliation:** HRL Hughes Research Laboratories - Summer 2024 Quantum Software Intern (Research Engineer)

### **Executive Summary**

This report details the architecture and implementation of a novel, multi-pass compiler designed to bridge high-level quantum experimental logic with low-level hardware execution. Developed in Common Lisp, this compiler generates optimized, timing-precise binary code directly for the QICK (Quantum Instrumentation Control Kit) tProcessor ISA. The system features a custom multi-level Intermediate Representation (IR), sophisticated memory management including a stack and heap, and automated resource allocation. A primary engineering challenge involved systematically reverse-engineering the under-documented 32-bit tProcessor instruction set by deploying and testing binaries directly on a Xilinx RFSoC FPGA. The resulting compilation pipeline provides researchers with a direct, high-performance pathway from a high-level Python interface to executing complex pulse sequences on physical spin-qubit hardware, demonstrating significant technical contributions to research-critical infrastructure.

---

### **1. Introduction and Project Motivation**

The control of quantum computing hardware is a fundamental challenge that exists at the intersection of physics and high-performance computing. The **QICK (Quantum Instrumentation Control Kit)**, a Xilinx RFSoC-based controller, provides a powerful platform for qubit control. As described in its documentation, QICK utilizes a custom "tProcessor" to execute timed instructions, enabling the direct synthesis of control pulses.

However, a gap existed between high-level experimental design, typically conducted in Python, and the low-level binary required by the tProcessor. To maximize performance, achieve picosecond-level timing precision, and unlock flexible control structures, a direct compilation pathway was necessary.

The objective of this project was to **architect and implement a complete, multi-pass compiler** to serve as this low-level pathway. The goal was to translate high-level control structures—including loops, conditionals, and parametric sweeps—into optimized machine code for direct execution on the QICK's FPGA. This work was intended to augment the open-source QICK ecosystem, providing a shareable and performant tool for the physics research community.

---

### **2. Compiler Architecture and Design**

To meet the demands of speed, extensibility, and meta-programming, the compiler was architected in **Common Lisp**. Lisp's powerful macro system is exceptionally suited for creating domain-specific languages (DSLs) and compilers, while its performance is comparable to low-level languages like C.

The compiler operates in multiple passes, transforming a high-level experimental description into a final binary block. The pipeline's core strength lies in its use of a two-stage Intermediate Representation (IR).

1.  **High-Level IR:** This representation captures the experiment's abstract logic, such as loops, conditional branches, array operations, and variable references.
2.  **Low-Level "Assembly API" IR:** A second, custom IR was designed to serve as a direct, human-readable mapping to the tProcessor's binary instruction set. This "assembly API" facilitated advanced compiler optimizations, automatic resource allocation, and precise timing calculations before the final binary was generated.

#### **Key Compiler Passes and Features:**

- **Translation:** High-level control structures (loops, if-statements) were systematically translated into low-level jump and conditional branch instructions, executable by the tProcessor.
- **Optimization:** The multi-pass design enabled optimization phases to refine the generated code, manage resources efficiently, and calculate precise instruction timing.
- **Memory Management:** A custom stack and heap were implemented to manage data. The compiler automatically allocated and referenced data across the tProcessor's three distinct memory spaces, identified from documentation and empirical testing:
  - **Program Memory:** Storing the compiled binary instructions.
  - **Waveform Memory:** Storing pulse and envelope data.
  - **General Data Memory:** For experimental results and variables.
    The compiler precisely calculated the total memory footprint for each program.
- **Parametric Sweeps:** A critical feature for experimental physics was implemented, allowing researchers to define sets of hyperparameters. The compiler automatically generated code to iterate through each parameter set, running the experiment multiple times in a single deployment.

---

### **3. Core Engineering Challenge: tProcessor ISA Reverse Engineering**

A significant obstacle emerged early in the project: the available documentation for the QICK tProcessor's 32-bit binary instruction set was sparse and, in over half the cases, inaccurate. This made direct compilation impossible.

To solve this, I initiated a **systematic reverse-engineering** process. This was not random trial-and-error but a methodical investigation:

1.  **Hypothesis and Test:** I formulated hypotheses about the function of specific bits or bit-fields within the 32-bit instruction word.
2.  **Empirical Validation:** I wrote small compiler passes to generate specific binaries based on these hypotheses. These binaries were then deployed and executed on the Xilinx RFSoC hardware.
3.  **Iterative Mapping:** By observing the hardware's output (or lack thereof), I systematically mapped the function of each bit. This involved discovering the hierarchical dependencies within the instruction format—determining how certain bits acted as "control flags" that changed the meaning of other bit-fields.
4.  **Full ISA Reconstruction:** This rigorous, empirical process was repeated until a complete and accurate map of the tProcessor's executable binary format was constructed. This validated map became the foundation for the low-level "Assembly API" and the compiler's final code-generation pass.

---

### **4. Validation and Research Impact**

The entire compilation pipeline was validated by deploying compiler-generated binaries onto the Xilinx RFSoC FPGA. These binaries successfully executed complex pulse sequences on physical spin-qubit hardware, proving the correctness of both the compiler's logic and the reverse-engineered ISA specification.

The primary impact of this project was **enabling physics researchers to move seamlessly from a high-level experimental description to a highly optimized, hardware-specific binary.** This low-level pathway provides the maximum possible performance and control flexibility, allowing for the design of complex experiments that were previously difficult to implement. In recognition of these technical contributions and their research impact, I was awarded a return offer from HRL.

---

### **5. Relevance to AI and Doctoral Research**

This project, while rooted in quantum control, demonstrates a deep expertise in systems engineering and compiler design that is directly transferable to state-of-the-art AI research.

- **AI/ML Compiler Analogy:** The core task—creating a compiler for a domain-specific language (quantum experiments) to target custom hardware (FPGAs)—is directly analogous to the work of modern ML compilers like **MLIR, XLA, and TVM**. These systems compile high-level models from frameworks like PyTorch or TensorFlow into optimized code for heterogeneous hardware (GPUs, TPUs, FPGAs). My experience in IR design, optimization passes, and code generation for a custom ISA is a direct parallel.
- **Hardware-Software Co-Design:** This project required optimizing software (the compiler) with a deep understanding of the underlying hardware's (the tProcessor's) architecture, memory model, and timing. This is a critical skill in high-performance AI, where researchers must co-design algorithms and hardware to push performance boundaries.
- **Systematic Research and Problem-Solving:** Successfully reverse-engineering a complex, undocumented binary ISA demonstrates the resilience and methodological rigor required for doctoral research. It proves an ability to deconstruct "black box" problems and build functional, robust systems from first principles.

This internship solidified my skills in building high-performance, hardware-aware software systems—the exact skills required to engineer the next generation of efficient and powerful AI.
