---
layout: page
title: Sign Language Learner
description: Systematic Analysis of Transfer Learning for Sign Language Recognition
img: assets/img/Sign.webp
importance: 1
category: research
related_publications: false
---

Brennen Hill, Joseph Mostika, Mehul Maheshwari

---

### Abstract

This project investigates computationally efficient and accurate models for static American Sign Language (ASL) alphabet recognition. Using the Sign Language MNIST dataset, we systematically explored the impact of model architecture, transfer learning strategies, and data augmentation on classification performance. We compare three experimental models based on the ResNet-50 architecture against a 97% accuracy baseline. Our primary contribution is the development of a lightweight, fine-tuned model (Model C) that achieves **99.5% test accuracy**. This model, which utilizes a simplified classification head and single-channel (grayscale) inputs, not only surpasses the baseline but also proves significantly more efficient, reducing training time by over 57% compared to a more complex fine-tuning approach (Model B).

---

### Introduction

#### Problem Statement

Effective communication is hindered by barriers between different modalities, such as spoken language and sign language. While millions rely on sign language, a significant portion of the global population does not understand it, creating an information gap. Machine learning models for sign language translation are a foundational component of assistive technologies that aim to bridge this divide. While comprehensive systems must interpret dynamic gestures (Li et al.), a critical first step is the robust and efficient classification of static signs, such as the letters of the alphabet.

#### Baseline and Objectives

Our work utilizes the **Sign Language MNIST dataset from Kaggle**, a common benchmark for static handshape recognition. The established baseline for this dataset is a custom Convolutional Neural Network (CNN) architecture (Sachinpatil1280) that reports a test accuracy of 97%.

Our objective was not merely to surpass this accuracy but to conduct a **systematic analysis of transfer learning strategies**, specifically focusing on the trade-offs between model complexity, computational cost (training time), and classification accuracy.

---

### Methodology

#### Dataset and Pre-processing

We used the Sign Language MNIST dataset, which contains 27,455 training and 7,172 test images. Each is a 28x28 grayscale image representing one of 24 static letters of the ASL alphabet; 'J' and 'Z' are excluded as they require motion.

To improve generalization and mitigate overfitting, we applied a standardized data augmentation pipeline using `tf.keras.preprocessing.image.ImageDataGenerator`:

- **Rotation Range:** 10 degrees
- **Zoom Range:** 0.1
- **Width/Height Shift Range:** 0.1
- **Shear Range:** 0.1
- **Horizontal Flip:** True

#### Model Architectures and Experiments

We designed a series of three experiments (Models A, B, and C) all based on the **ResNet-50** architecture, pre-trained on ImageNet.

- **Model A (Complex Custom Head):** Our initial approach involved appending a deep custom classification head to the ResNet-50 base, consisting of multiple fully-connected layers (512 neurons) and pooling layers. This was intended to maximize the feature extraction capabilities of the pre-trained base.
- **Model B (Standard Fine-Tuning):** Based on the results of Model A, we shifted to a standard fine-tuning strategy. We appended two 128-neuron dense layers. Training was conducted for 30 epochs: the first 10 with the ResNet-50 base **frozen** to train the new head, and the subsequent 20 with the base **unfrozen** for end-to-end fine-tuning. This model also used a doubled augmentation range to test robustness.
- **Model C (Efficiency-Focused):** This model was designed to optimize both accuracy and computational efficiency. We simplified the architecture by:
  1.  **Reducing the head** to a single 128-neuron dense layer.
  2.  **Reducing input data** by modifying the ResNet-50 input layer to accept **single-channel (grayscale)** 28x28 images (padded to 32x32), rather than the standard 3-channel RGB input.
  3.  Reverting to the original, smaller augmentation parameters.

---

### Results and Discussion

Our experimental results show a clear progression, culminating in a highly accurate and efficient model.

| Model        | Key Features                             | Training Time         | Test Accuracy | Key Finding                                                                       |
| :----------- | :--------------------------------------- | :-------------------- | :------------ | :-------------------------------------------------------------------------------- |
| **Baseline** | Simple CNN                               | Not Reported          | 97.0%         | High initial benchmark.                                                           |
| **Model A**  | ResNet-50 + Deep Custom Head             | \> 24h (for 2 epochs) | \< 50% (est.) | **Computationally intractable;** overly complex head failed to train effectively. |
| **Model B**  | ResNet-50 + Freeze/Unfreeze + Heavy Aug. | \~7 hours             | 98.5%         | Standard fine-tuning surpasses baseline but is time-intensive.                    |
| **Model C**  | ResNet-50 + Lightweight Head + Grayscale | **\~3 hours**         | **99.5%**     | **Optimal balance:** Highest accuracy and \>50% reduction in training time.       |

#### Analysis

**Model A's failure** demonstrated that adding excessive parameters to the classification head was computationally intractable and led to unstable training.

**Model B** confirmed that a standard freeze-unfreeze transfer learning strategy was effective, successfully surpassing the baseline accuracy. However, its 7-hour training time highlighted a significant cost.

**Model C yielded the most significant findings.** By simplifying the classification head and, critically, modifying the model to accept single-channel grayscale input, we achieved a **2.5% accuracy improvement over the baseline** and a **1% improvement over Model B**. Most importantly, these gains were coupled with a **\>57% reduction in training time** compared to Model B.

Furthermore, analysis of Model C's training curves revealed that validation loss began to increase (overfitting) after just 6 epochs. This insight was crucial: by implementing early stopping and saving the best weights (from epoch 6), we achieved the final 99.5% accuracy, demonstrating the model's high capacity and the critical need for careful regularization.

---

### Conclusion and Future Work

Our systematic experimentation demonstrates that for static sign language recognition, a strategically simplified transfer learning model (Model C) significantly outperforms both a standard CNN baseline and a more complex fine-tuning approach. We achieved 99.5% accuracy while substantially reducing computational cost.

The primary limitation of this project is the dataset itself, which is constrained to static, single-letter images under controlled conditions. This work serves as a foundation for future research, which should focus on:

1.  **Dynamic Gesture Recognition:** Expanding the model to handle video input to classify motion-based signs (like 'J' and 'Z') using datasets like WLASL.
2.  **Real-World Robustness:** Testing model performance on "in-the-wild" images with varied lighting, backgrounds, and occlusions.
3.  **Model Deployment:** Exploring quantization and pruning to deploy an efficient model on edge devices (e.g., mobile phones) for a real-time assistive application.

---

### References

[1] Wolmark, M. (2023, September 2). _79 hearing loss statistics: How many deaf people in the U.S.?_. Golden Steps ABA. [https://www.goldenstepsaba.com/resources/hearing-loss-statistics](https://www.goldenstepsaba.com/resources/hearing-loss-statistics)
[2] Li, D. (n.d.). _Welcome to WLASL homepage_. WLASL. [https://dxli94.github.io/WLASL/](https://dxli94.github.io/WLASL/)
[3] CSC321 tutorial 6: Optimization and Convolutional Neural networks. (n.d.). [https://www.cs.toronto.edu/\~lczhang/321/tut/tut06.html](https://www.cs.toronto.edu/~lczhang/321/tut/tut06.html)
[4] Tecperson. (2017, October 20). _Sign language mnist_. Kaggle. [https://www.kaggle.com/datasets/datamunge/sign-language-mnist](https://www.kaggle.com/datasets/datamunge/sign-language-mnist)
[5] (Added) Sachinpatil1280. (2020, May). _Sign language-mnist-acc-97%_. Kaggle. [https://www.kaggle.com/code/sachinpatil1280/sign-language-mnist-acc-97](https://www.google.com/search?q=https://www.kaggle.com/code/sachinpatil1280/sign-language-mnist-acc-97)
