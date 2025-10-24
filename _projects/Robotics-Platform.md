---
layout: page
title: Robotics Platform
description: 3D Robotic Simulation & Analysis Platform
img: assets/img/ExoSky.jpeg
importance: 1
category: research engineering
related_publications: false
---

## Objective

To design and implement a high-fidelity 3D simulation and analysis platform for the company's mobile robotics platform. The primary goals were to create a robust testbed for R&D of new autonomous features,[https://BrennenHill.com/Embodied-AI](including state estimation for embodied AI), and to provide a company-wide tool for performance analysis, mission review, and debugging of systems.

## Challenges

The main difficulty was integrating disparate data streams into a single, synchronized, and interactive view. This required developing a pipeline to accurately reconstruct complex, real-world robotic movement and sensor data from telemetry logs.

**Methodology & Solution**

- **Platform Development:** I developed the platform from the ground up using Unreal Engine, employing both C++ for core logic and Blueprints for UI and rapid iteration.
- **Data Ingestion & Reconstruction:** I engineered a data pipeline to parse robotic telemetry logs. This system reconstructs the robot's complete 3D movement path and orients it over accurate 3D terrain models.
- **Visualization:** The simulator visualizes the robot's complete state vector and associated sensor data.
- **Usability:** I implemented extensive user controls, including multiple dynamic camera perspectives, data visualization toggles, data layers, and system-state variables to empower researchers and engineers to perform in-depth analysis.

**Results & Impact**

- **R&D Testbed:** The platform serves as a critical testbed for designing, iterating on, and validating new features. It was instrumental in the development of the High-Precision State Estimation system.

- **Company-Wide Analysis Tool:** The simulator is available to the entire company for use by researchers and engineers. It provides an intuitive and powerful interface to visually analyze system performance, review mission data, and identify and debug complex issues, and prototype new autonomous capabilities.
