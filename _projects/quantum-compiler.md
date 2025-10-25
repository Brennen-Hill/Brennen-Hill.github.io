---
layout: page
title: Quantum Compiler
description: Architecting a Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor
img: assets/img/spinQICK.jpg
importance: 2
category: research engineering
related_publications: false
start: May 2024
end: August 2024
role: Research Engineer
organization: Hughes Research Laboratories (HRL)
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/spinQICK.jpg" title="HRL Quantum" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### **Abstract**

This report details the architecture and implementation of a novel multi-pass compiler, written in Common Lisp, to generate optimized binary for the custom QICK (Quantum Instrumentation Control Kit) tProcessor ISA. The primary objective was to create a low-level, high-performance pathway for direct FPGA execution, bridging the gap between high-level experimental logic in Python and the picosecond-level control required for quantum hardware. The project involved designing two custom Intermediate Representations (IRs), including an assembly-level API, to manage translation, optimization, automatic resource allocation, and precise timing calculations. A significant challenge was the systematic reverse-engineering of the QICK 32-bit binary instruction set due to highly inaccurate documentation. The fully validated by generating binaries verifiable against the QICK codebase, and its output is prepared for direct deployment on a Xilinx RFSoC FPGA to execute complex pulse sequences on physical spin-qubit hardware. This project demonstrates deep expertise in system architecture, compiler design, and hardware-software co-design—foundational skills for developing the high-performance computing systems required for large-scale AI research and novel hardware acceleration.

---

### **1. Introduction & Project Motivation**

Quantum computing research necessitates precise, high-speed control of physical qubits. The open-source QICK platform, utilizing a Xilinx RFSoC FPGA, provides a powerful hardware foundation, but it lacks a robust, high-performance software bridge to make it accessible for complex, open-source research. Physicists need the ability to define experiments in a high-level language like Python, but require that logic to translate into picosecond-perfect, hardware-native binary.

The goal of this project was to architect and build this bridge: a domain-specific compiler to translate high-level experimental constructs—including complex control flow and parametric sweeps—into the most efficient machine code possible for the QICK tProcessor. This system was designed to maximize performance and control flexibility, enabling advanced quantum experimentation that would be infeasible to program by hand.

---

### **2. Compiler Architecture and Design**

To meet the demands of speed, extensibility, and meta-programming, the compiler was architected in **Common Lisp**. Lisp's powerful macro system is exceptionally suited for creating domain-specific languages (DSLs) and compilers, while its performance is comparable to low-level languages like C.

The compiler operates in multiple passes, transforming a high-level experimental description into a final binary block. The pipeline's core strength lies in its use of a two-stage Intermediate Representation (IR).

1.  **High-Level IR:** This representation captures the experiment's abstract logic, such as loops, conditional branches, array operations, and variable references.
2.  **Low-Level "Assembly API" IR:** A second, custom IR was designed to serve as a direct, human-readable mapping to the tProcessor's binary instruction set. This "assembly API" facilitated advanced compiler optimizations, automatic resource allocation, and precise timing calculations before the final binary was generated.

#### **Key Compiler Passes and Features:**

- **Translation:** High-level control structures (loops, if-statements) were systematically translated into low-level jump and conditional branch instructions, executable by the tProcessor.
- **Optimization:** The multi-pass design enabled optimization phases to refine the generated code, manage resources efficiently, and calculate precise instruction timing.
- **Memory Management:** A custom stack and heap were implemented to manage data. The compiler automatically allocated and referenced data across the tProcessor's three distinct memory spaces:
  - **Program Memory:** Storing the compiled binary instructions.
  - **Waveform Memory:** Storing pulse and envelope data.
  - **General Data Memory:** For experimental results and variables.
- **Parametric Sweeps:** A critical feature for experimental physics was implemented, allowing researchers to define sets of hyperparameters. The compiler automatically generated code to iterate through each parameter set, running the experiment multiple times in a single deployment.

---

### **3. Core Engineering Challenge: tProcessor ISA Reverse Engineering**

A significant obstacle emerged early in the project: the available documentation for the QICK tProcessor's 32-bit binary instruction set was sparse and, in over half the cases, inaccurate. This made direct compilation impossible.

To solve this, I initiated a **systematic reverse-engineering** process. This was not random trial-and-error but a methodical investigation:

1.  **Hypothesis and Test:** I formulated hypotheses about the function of specific bits or bit-fields within the 32-bit instruction word.
2.  **Empirical Validation:** I wrote small compiler passes to generate specific binaries based on these hypotheses. These binaries were then validated against the existing QICK codebase's simulation and binary-processing tools, which can be run on a standard computer..
3.  **Iterative Mapping:** By observing the output and behavior within the QICK software environment, I systematically mapped the function of each bit. This involved discovering the hierarchical dependencies within the instruction format—determining how certain bits acted as "control flags" that changed the meaning of other bit-fields.
4.  **Full ISA Reconstruction:** This rigorous, empirical process was repeated until a complete and accurate map of the tProcessor's executable binary format was constructed. This validated map became the foundation for the low-level "Assembly API" and the compiler's final code-generation pass.

---

### **4. Validation & Research Impact**

The full compilation pipeline was validated by generating binaries and verifying their correctness and compatibility using the QICK software stack. The compiler's output is structured for direct deployment and has been confirmed to connect with the Xilinx RFSoC FPGA, readying it to execute complex pulse sequences on **physical spin-qubit hardware**, confirming the correctness of the compiler and the reverse-engineered ISA.

The impact of this project is twofold:

1.  **For Physicists:** It enables researchers to abstract away the extreme complexity of the hardware. They can now design complex experiments and parametric sweeps in Python, and the compiler guarantees the output will be a high-performance, timing-perfect binary.
2.  **For Open-Source Research:** By adding a robust compiler to the open-source QICK ecosystem, this work lowers the barrier to entry for sharing and collaborating on advanced quantum experiments.

The project's success and significant technical contributions were recognized with a **return offer from HRL**.

---

### **5. Conclusion**

This internship involved the complete design, implementation, and validation of a domain-specific compiler for custom hardware. While the domain was quantum control, the core technical challenges are directly analogous to those in high-performance AI research.

- **Parallel to AI Accelerators:** Modern AI is critically dependent on custom accelerators (GPUs, TPUs, neuromorphic chips) with unique, complex, and often sparsely documented instruction sets, just like the QICK tProcessor.
- **Compiler Optimization:** The most pressing challenges in AI systems involve compilers (e.g., MLIR, XLA, TVM). These systems perform the exact same task as this project: translating a high-level model description (like in PyTorch) into optimized, hardware-specific machine code.
- **Demonstrated Skills:** This project demonstrates proven expertise in:
  - **Compiler Architecture:** Designing multi-pass systems, IRs, and optimization passes.
  - **Hardware-Software Co-Design:** Optimizing software for a specific, low-level hardware target.
  - **Systematic Research:** The ability to deconstruct and reverse-engineer a complex, undocumented "black box" system (the ISA) from first principles.

These skills—architecting complex software, optimizing for novel hardware, and a rigorous, empirical research mindset—are precisely what is required to tackle the next generation of challenges in scalable, efficient, and accelerated artificial intelligence.
