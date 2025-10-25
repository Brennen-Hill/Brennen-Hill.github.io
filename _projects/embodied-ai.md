---
layout: page
title: Embodied AI
description: Robust Robotic State Estimation via Manifold Disentanglement for Embodied AI on the Edge.
importance: 1
img: assets/img/robot.jpg
category: research engineering
start: May 2025
role: Lead Research Engineer
related_publications: false
organization: Stealth Startup
---

## Objective

To spearhead the complete research and development lifecycle for a novel, on-device artificial intelligence system for high-precision state estimation on a mobile robotics platform. From an ambiguous high-level goal, a fully-deployed system was delivered.

## Challenges

- **Severe Hardware Constraints:** The platform’s on-board sensors are resource-constrained and provide low-accuracy, high-noise data.
- **SOTA Benchmarking & Failure:** I conducted a comprehensive literature review, implementing and benchmarking numerous state-of-the-art (SOTA) algorithms. These methods failed, yielding high errors.
- **Root Cause Analysis:** The SOTA methods were fundamentally unsuited for our problem, as they are designed for high-fidelity sensors, not noisy data, and optimized for stationary receivers, whereas our platform is highly dynamic and mobile.

## Methodology & Solution

- **Literature Review & Benchmarking:** Conducted a comprehensive review of SOTA methodologies for state estimation. Key SOTA algorithms were implemented and benchmarked on the platform’s hardware. Given the failure of existing methods, I devised a custom, hardware-aware algorithm from first principles.

- **Novel Algorithm Design (Manifold Disentanglement):** The core innovation is a novel manifold disentanglement technique. Instead of solving the high-dimensional state estimation problem directly (which is highly sensitive to sensor noise), my algorithm first reframes the problem onto a robust, lower-dimensional manifold. This intermediate step is robust to noise and its output is then used to solve the full state estimation problem.

- **Dynamic Platform Accommodation:** The algorithm was designed from the ground up to explicitly account for a dynamic, mobile platform, a key differentiator from most SOTA methods.

- **Prototyping & Validation:** I developed initial prototypes in Python to validate the theory against simulated data. After success, I built a robust data pipeline to ingest, process, and replay historical telemetry data from numerous real-world operational runs, enabling massive-scale regression testing. This pipeline included a [robotic simulation & analysis platform](https://BrennenHill.com/projects/robotics-platform).

- **Production Implementation:** The final, high-performance algorithm was implemented in Lisp. This system was rigorously validated through a multi-stage pipeline, progressing from high-fidelity simulation to extensive on-hardware performance analysis to prove its real-world robustness.

## Technology Stack

- **Lisp:** Used for the core, on-device, high-performance algorithm. Selected for its high-speed execution, low-level customizability, and powerful metaprogramming capabilities, which enabled rapid debugging and iterative development directly on the running system.
- **Python:** Used for data pipelines, simulation, benchmarking, prototyping, and validation.

## Results & Impact

- **Performance:** The custom algorithm achieved a >100x improvement in state estimation accuracy over the SOTA baseline.
- **Deployment:** The system is now deployed on 100% of the company’s devices and is a foundational component of the platform’s autonomous capabilities.
- **Communication:** Findings, progress, and results were communicated directly to the immediate team, the entire company, and the CEO.

## Current & Future Work

I am currently leading the effort to extend this system for state-anchoring from environmental features. The system will identify and create a persistent library of environmental features, enabling the platform to re-identify them. This capability will provide a consistent global reference frame for the robot’s state, further enhancing precision and long-term reliability.
