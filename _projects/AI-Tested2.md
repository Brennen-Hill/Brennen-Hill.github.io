---
layout: page
title: AI Testbed 2
description: Architecting a Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor
img: assets/img/ExoSky.jpeg
importance: 1
category: research engineering
related_publications: false
---

Project 2: Interactive 3D Simulation & Analysis Platform

Role: Lead Developer

Objective

To develop a high-fidelity 3D simulation environment to serve as a primary testbed for R&D (including Project 1) and as a company-wide tool for the analysis and debugging of autonomous systems.

Challenges

The main difficulty was integrating disparate data streams (kinematics, sensor readings, 3D terrain) into a single, synchronized, and interactive view. This required developing a pipeline to accurately reconstruct complex, real-world robotic movement and sensor data from sparse telemetry logs.

Methodology & Solution

Platform Development: I developed the platform from the ground up using Unreal Engine, employing both C++ and Blueprints.

Data Ingestion & Reconstruction: I engineered a data pipeline to parse robotic telemetry logs. This system reconstructs the robot's complete 3D movement path and orients it over accurate 3D terrain models.

Visualization: The simulator visualizes the robot's complete state vector, including position, orientation, velocity, and acceleration, alongside real-time feeds of (simulated) sensor data.

Usability: I implemented extensive user controls, including multiple dynamic camera perspectives and data visualization toggles, to empower researchers and engineers to perform in-depth analysis.

Technology Stack

Unreal Engine

C++ & Blueprints

Results & Impact

R&D Acceleration: The simulator was instrumental in the development and validation of the state estimation algorithm (Project 1), providing a rapid and safe environment to iterate on new features.

Company-Wide Adoption: The platform has been adopted as a primary analysis tool by the entire engineering and research team. It is now used company-wide to visualize and debug navigation stack performance, analyze hardware-in-the-loop (HWIL) tests, and prototype new autonomous capabilities.
