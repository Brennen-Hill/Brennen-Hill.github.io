---
layout: page
title: "Roller RL"
description: Reinforcement Learning for Quadruped Roller Skating.
img: assets/img/12.jpg
importance: 1
category: research
related_publications: false
toc:
  sidebar: left
---

# Reinforcement Learning for Quadruped Roller Skating

**Hanwen Wang**
_Dept. of Mechanical Engineering_
_University of Wisconsin, Madison_
[cite_start]*hwang2446@wisc.edu* [cite: 2, 3]

**Aswinkumar Ramkumar**
_Dept. of Electrical and Computer Engineering_
_University of Wisconsin, Madison_
[cite_start]*ramkumar4@wisc.edu* [cite: 5]

**Brennen Alexander Hill**
_Dept. of Computer Science_
_University of Wisconsin, Madison_
[cite_start]*bahill4@wisc.edu* [cite: 6, 7]

## Abstract

We present a framework for training a quadruped robot to roller skate using deep reinforcement learning (RL). [cite_start]To overcome the target hardware's (Unitree Go1) lack of leg yaw [cite: 39][cite_start], we introduce a novel passive wheel design called the **"X configuration"**[cite: 40], which enables the conversion of sideways leg motion into forward propulsion. [cite_start]Training is conducted using a massively parallel RL framework in the Isaac Gym simulator[cite: 20]. [cite_start]The trained policy discovers complex and **emergent gaits**, automatically switching from a **diagonal gait** at 1 m/s [cite: 106] [cite_start]to a **galloping gait** to achieve 3 m/s[cite: 115]. [cite_start]We demonstrate that this learned roller-skating locomotion is significantly **more energy-efficient** than a traditional trotting gait, exhibiting a substantially lower cost of transport and mechanical power at equivalent speeds[cite: 125, 126]. This research validates passive roller skating as a viable, low-cost, and highly efficient locomotion strategy for legged robots.

**Index Terms**—Reinforcement Learning, Quadruped Robotics, Legged Locomotion, Roller Skating, Energy Efficiency, Emergent Behavior, Isaac Gym

---

## I. Introduction

### A. Motivation

Energy efficiency remains a critical challenge in legged robotics. While legged robots offer unparalleled all-terrain mobility, their modes of locomotion, such as trotting or walking, are often energetically expensive. [cite_start]One promising solution is hybrid wheeled-legged robots, but existing designs frequently rely on **actuated wheels**, which add significant cost, complexity, and weight to the system[cite: 17].

This project explores an alternative: equipping a quadruped robot with **passive, unactuated roller skates**. [cite_start]This approach maintains the low cost and mechanical simplicity of a purely legged system while offering the potential for high **energy efficiency** on flat surfaces[cite: 16].

However, controlling such a system is highly non-trivial. The dynamics of roller skating—generating forward motion from sideways leg pushes—are complex and difficult to model or hand-engineer. [cite_start]We turn to **deep reinforcement learning (RL)** as a data-driven approach to master this skill[cite: 18]. By defining a suitable reward structure, RL allows the robot to _discover_ optimal control policies and complex gaits automatically.

### B. Related Previous Work

[cite_start]Our work is built upon **`legged_gym`**, a state-of-the-art RL codebase for legged locomotion[cite: 20]. [cite_start]It leverages the NVIDIA Isaac Gym physics simulator, which enables massively parallel training of thousands of robots, allowing policies to be trained in minutes[cite: 20].

[cite_start]While `legged_gym` and similar frameworks have successfully trained robots to walk, run, and trot [cite: 229][cite_start], our **primary contribution lies in the behavior side**[cite: 21]. [cite_start]We adapt this framework to a novel hardware configuration: a Unitree Go1 quadruped [cite: 33] modified with passive roller skates. This paper focuses on designing the system, developing the RL framework to train it, and analyzing the resulting emergent roller-skating behavior. This provides a new benchmark for energy-efficient locomotion, comparing it against both traditional trotting gaits and more complex actuated wheeled-legged robots.

### C. Objectives

The primary objectives of this project are:

1.  [cite_start]To design and implement a quadruped robot with passive wheels in simulation, including a novel wheel configuration to overcome the hardware's mechanical constraints[cite: 36, 40].
2.  [cite_start]To develop a deep reinforcement learning framework, including observation spaces, action spaces, and a reward function, to train the robot to roller skate[cite: 63, 73, 77].
3.  [cite_start]To demonstrate that the trained policy can achieve stable, high-speed locomotion and track varying velocity commands [cite: 97-102].
4.  [cite_start]To analyze the emergent gaits discovered by the RL agent at different speeds[cite: 106, 115].
5.  [cite_start]To quantify and compare the energy efficiency of the learned roller-skating gait against a traditional trotting gait[cite: 124, 125].

### D. Overview of the Report

The remainder of this report is organized as follows. Section II provides a brief background on reinforcement learning in the context of this problem. Section III details our methodology, including the hardware setup, software architecture, and the design of the RL observation, action, and reward spaces. Section IV presents our results, including maximum achieved speeds, analysis of emergent gaits, and a quantitative comparison of energy efficiency. Section V discusses key implementation challenges, such as friction simulation, and limitations of the current work. Finally, Section VI concludes the report and suggests avenues for future research.

---

## II. Background: Reinforcement Learning

[cite_start]Reinforcement Learning (RL) is a machine learning paradigm where an **agent** (the robot's control policy) learns to interact with an **environment** (the physics simulation) to maximize a cumulative **reward** signal[cite: 18, 27]. [cite_start]At each timestep, the agent observes the environment's current **state** $s_t$ [cite: 63][cite_start], takes an **action** $a_t$ [cite: 73][cite_start], and receives a scalar reward $r_t$ [cite: 77] and the next state $s_{t+1}$. The goal is to learn a **policy**, $\pi(a_t|s_t)$, which is a mapping from states to actions that optimizes the expected long-term return (sum of rewards). In this work, we use RL to discover the complex sequence of motor commands required to achieve stable and efficient roller skating, a task that would be exceptionally difficult to explicitly program.

---

## III. Methodology

### A. Hardware Setup

[cite_start]The robot used in this project is the **Unitree Go1** quadruped[cite: 33]. [cite_start]It features 12 motors, with 3 motors on each leg: a **hip motor** (roll) [cite: 35][cite_start], a **thigh motor** (pitch) [cite: 35][cite_start], and a **calf motor** (pitch)[cite: 35].

[cite_start] [cite: 30]

[cite_start]The key to human roller skating is the ability to rotate the foot (yaw) to couple sideways motion with forward motion[cite: 38]. [cite_start]However, the Go1's legs are mechanically constrained; they cannot yaw and are always parallel to the robot's base x-axis[cite: 39].

[cite_start]To solve this, we designed a fixed **"X Configuration"** for the passive wheels[cite: 40]. [cite_start]As shown in Fig. 1, each wheel is installed with a **fixed 30-degree yaw angle** relative to the body's x-axis[cite: 41]. [cite_start]This configuration is symmetric left-to-right and front-to-back, allowing sideways pushes from any leg to be converted into forward motion[cite: 38, 41].

### B. Software Setup

Our controller architecture is a hierarchical system, as shown in Fig. 2.

1.  [cite_start]**High-Level Policy:** A neural network (the RL agent) runs at 50 Hz[cite: 43, 57]. [cite_start]It takes observations from the robot's state (detailed in Sec. III-C) [cite: 43] [cite_start]and outputs the desired joint positions for all 12 motors[cite: 56].
2.  [cite_start]**Low-Level Controller:** A joint-level Proportional-Derivative (PD) controller runs at 200 Hz[cite: 59, 61]. [cite_start]It receives the desired joint positions $q^d$ from the policy and computes the necessary motor torques $\tau$ to achieve them[cite: 73].

[cite_start] [cite: 60]

### C. Observation Space

[cite_start]The observation $o$ provided to the policy network includes[cite: 63]:

- [cite_start]**Commands:** Desired base linear velocity in the xy-plane ($\mathcal{B}v_{xy}^{d}$) and angular velocity around the z-axis ($\mathcal{B}\omega_{z}^{d}$)[cite: 64].
- [cite_start]**Base States:** Base height [cite: 65][cite_start], base orientation (represented as a "projected gravity" vector) [cite: 66][cite_start], and current base linear and angular velocities[cite: 67].
- [cite_start]**Joint States:** The position $q$ [cite: 69] [cite_start]and velocity $\dot{q}$ [cite: 70] of all 12 motors.
- [cite_start]**Last Actions:** The action $a_{prev}$ taken in the previous timestep[cite: 71], which helps the policy learn smooth control.

### D. Action Space and Low-Level Control

[cite_start]The action $a$ outputted by the neural network is scaled to produce the **desired joint positions** $q^d$[cite: 73]. [cite_start]These are fed to the low-level PD controller, which calculates the final motor torques $\tau$ using a zero desired joint velocity[cite: 73]:

$$
\tau = k_{p}(q^{d} - q) - k_{d}\dot{q}
[cite_start]$$ [cite: 75]

[cite_start]where $q$ and $\dot{q}$ are the current joint positions and velocities, and $k_p$ and $k_d$ are the PD gains[cite: 73].

### E. Rewards and Regularizations

The reward function is crucial for shaping the desired behavior. It is structured as a sum of tracking rewards, regularizations to encourage efficiency, and penalties to ensure physical constraints are met.

* **Tracking Rewards:**
    * [cite_start]**Base Linear Velocity (xy):** $\exp(-||^{\mathcal{B}}v_{xy} - {^{\mathcal{B}}v_{xy}^{d}}||_{2}^{2} / \sigma)$ [cite: 91]
    * [cite_start]**Base Angular Velocity (z):** $\exp(-||^{\mathcal{B}}\omega_{z} - {^{\mathcal{B}}\omega_{z}^{d}}||_{2}^{2} / \sigma)$ [cite: 94]
    * [cite_start]**Base Height:** $-(z - z^d)^2$ [cite: 78]
    * [cite_start]**Base Orientation:** $-||^{\mathcal{B}}u_{g,xy}||_{2}^{2}$ (penalizes tilt) [cite: 79]

* **Penalties (Negative Rewards):**
    * [cite_start]**Base Linear Velocity (z):** $-^{\mathcal{B}}v_z^2$ (minimizes hopping) [cite: 92]
    * [cite_start]**Base Angular Velocity (xy):** $-||^{\mathcal{B}}\omega_{xy}||_{2}^{2}$ (minimizes roll/pitch) [cite: 93]
    * [cite_start]**Collision Avoidance:** $-||f||_2^2$ (quadratic penalty on large collision forces on thigh/calf links) [cite: 86]
    * [cite_start]**Joint Position Limit:** $-||q_{\text{exceed}}||_2^2$ (penalizes exceeding joint limits) [cite: 87]

* **Regularization:**
    * [cite_start]**Effort Minimization:** $-||a - a_{\text{prev}}||_2^2$ (encourages smooth actions) [cite: 80]
    * [cite_start]**Heuristic:** $-||p_{\text{vert leg, xy}}||_2^2$ (vertical virtual leg regularization) [cite: 81]

[cite_start]To promote a robust policy, we also employ **domain randomization** by adding noise to all observations [cite: 83] [cite_start]and randomizing link friction coefficients during training[cite: 84].

---

## IV. Results and Analysis

### A. Command Range

After training, the robot was able to successfully track a wide range of velocity commands. [cite_start]The maximum command ranges we achieved are[cite: 98]:
* [cite_start]**Forward Velocity ($v_x$):** 3 m/s [cite: 99]
* [cite_start]**Sideways Velocity ($v_y$):** 2 m/s [cite: 100]
* [cite_start]**Yaw Velocity ($\omega_z$):** 3 rad/s [cite: 102]

### B. Automatic Gait Switch

[cite_start]A significant finding is that the RL policy learned to **automatically switch its gait** based on the commanded forward velocity, without any explicit instruction to do so[cite: 117].

* **At 1 m/s: Diagonal Gait**
    [cite_start]When commanded to move at 1 m/s, the robot adopted a **diagonal gait**[cite: 106]. [cite_start]In this gait, the robot keeps a diagonal pair of wheels (e.g., front-left and back-right) on the ground at the same time for stability[cite: 110, 111]. As seen in Figs. [cite_start]3 and 4, the legs push sideways, and the "X configuration" of the wheels converts this push into forward motion[cite: 108, 109].

        *Figs. 3 & 4: The robot using a diagonal gait at $t_0$ and $t_1$. [cite_start]The legs push sideways to generate forward motion.* [cite: 104, 105]

* **At 3 m/s: Galloping Gait**
    [cite_start]When commanded to move at a higher speed of 3 m/s, the robot learned that the diagonal gait was insufficient[cite: 116]. [cite_start]It autonomously developed a **galloping gait**[cite: 115]. [cite_start]This gait is more dynamic, characterized by having **only one wheel in contact** with the ground at any given time[cite: 121]. [cite_start]This gait involves more extreme side-to-side leg movements [cite: 120] [cite_start]and appears similar to a horse's gallop[cite: 122], enabling the robot to achieve greater speeds.

        *Figs. 5 & 6: The robot using a galloping gait at $t_0$ and $t_1$. [cite_start]This more dynamic gait is used to achieve higher speeds.* [cite: 113, 114]

[cite_start]This emergent behavior highlights the power of RL to discover complex and effective solutions in high-dimensional control problems[cite: 118].

### C. Energy Efficiency Comparison

[cite_start]To validate our primary motivation, we compared the energy efficiency of our roller-skating robot against a baseline **trotting** gait (where the robot steps without wheels rolling)[cite: 124, 130]. We compared two key metrics:
1.  [cite_start]**Mechanical Power ($p$):** Defined as the sum of absolute joint power, $p = \sum_{i=1}^{n_j} |\tau_i \dot{q}_i|$[cite: 127]. [cite_start]We use the absolute value as both positive and negative power draw from the battery (representing electricity consumption)[cite: 133].
2.  [cite_start]**Cost of Transport (CoT):** A normalized metric for efficiency, defined as $CoT = \frac{p}{mg||v_{xy}||_2}$[cite: 127].

[cite_start] [cite: 210]

The results, shown in Fig. 7, are conclusive. [cite_start]At all tested forward velocities (1 m/s, 2 m/s, and 3 m/s), the roller-skating gait (red line) is **significantly more energy-efficient** than the trotting gait (black line)[cite: 125]. [cite_start]Both the peak and average mechanical power and cost of transport are substantially lower when skating[cite: 126, 213].

---

## V. Discussion and Limitations

### A. Friction Simulation

A major technical challenge arose during simulation. [cite_start]Initially, after adding rollers, the robot refused to skate and instead learned to trot, as if the wheels were not present[cite: 136, 214]. [cite_start]We discovered this was due to **improper simulation of rolling friction** in Isaac Gym[cite: 215]. [cite_start]The simulator greatly exaggerates rolling friction when the wheel's collision geometry is not an ideal sphere[cite: 216]. We tested several geometries:
* **Wheel Mesh:** Failed. [cite_start]The mesh was not a perfect circular object[cite: 218].
* **Cylinder:** Failed. [cite_start]Isaac Gym converts cylinders to meshes for simulation, leading to the same issue[cite: 219].
* **Sphere:** Succeeded. [cite_start]Using a sphere as the collision geometry for the wheel resulted in realistic rolling friction and enabled the skating behavior to be learned[cite: 220].

### B. Whole Body Engagement

[cite_start]A limitation of our current reward function is that tracking rewards are applied only to the robot's base, not its whole body[cite: 222]. [cite_start]This can lead to a phenomenon where the robot **tilts its entire body slightly to one side** while keeping its base perfectly horizontal to satisfy the reward function[cite: 223, 224].

[cite_start]A potential solution for future work is to incorporate whole-body level rewards, such as tracking the centroidal linear and angular momentum [cite: 225, 231] [cite_start]or the center-of-mass position and whole-body orientation[cite: 225, 232].

---

## VI. Conclusion

In this project, we successfully demonstrated that a quadruped robot can be trained to roller skate using deep reinforcement learning. [cite_start]By designing a novel **"X configuration" for passive wheels** [cite: 40][cite_start], we overcame the hardware limitations of the Unitree Go1 robot and enabled it to convert sideways leg motion into forward propulsion[cite: 109].

[cite_start]Our RL agent, trained in the `legged_gym` simulator [cite: 20][cite_start], learned to locomote at speeds up to 3 m/s [cite: 99] [cite_start]and developed complex, **emergent gaits**, automatically switching from a diagonal gait at low speeds to a galloping gait at higher speeds[cite: 106, 115, 117]. [cite_start]Furthermore, our analysis shows that this roller-skating gait is **significantly more energy-efficient** than traditional trotting, as measured by both mechanical power and cost of transport[cite: 125].

[cite_start]We also identified and solved key simulation challenges related to rolling friction [cite: 215, 220] [cite_start]and identified limitations in our current reward function that can lead to whole-body tilt, suggesting clear avenues for future work[cite: 222, 225]. This work validates passive roller skating as a viable, low-cost, and highly efficient locomotion strategy for legged robots.

---

## References

[1] N. Rudin, D. Hoeller, P. Reist, and M. Hutter, "Learning to walk in minutes using massively parallel deep reinforcement learning," in *Conference on Robot Learning*. [cite_start]PMLR, 2022, pp. 91-100. [cite: 229]

[2] H. Dai, A. Valenzuela, and R. Tedrake, "Whole-body motion planning with centroidal dynamics and full kinematics," in *2014 IEEE-RAS International Conference on Humanoid Robots*. [cite_start]IEEE, 2014, pp. 295-302. [cite: 231]

[3] Y.-M. [cite_start]Chen, G. Nelson, R. Griffin, M. Posa, and J. Pratt, "Angular center of mass for humanoid robots," *arXiv preprint arXiv:2210.08111*, 2022. [cite: 232]
$$
