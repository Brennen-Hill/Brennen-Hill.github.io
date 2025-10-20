---
layout: page
title: Sign Language Learner
description: Researching methods for translating American Sign Language
img: assets/img/Sign.webp
importance: 1
category: research
related_publications: false
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Sign.webp" title="SignLanguageLearner" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An example of a computer vision model interpretting detecting sign language, credit to Google.
</div>

## ABSTRACT

We worked to make a model that can translate sign language into text and enable greater communication between people throughout the world. We worked with a Kaggle dataset holding images of letters in sign language that are labeled by letter. Although models have already been built using this dataset, we deepened the effectiveness of existing models. We experimented with various combinations of data augmentation, transfer learning, and model architecture. After using what we learned from our experiments to build a highly effective model, we greatly surpassed the baseline.

## Introduction

**Problem Statement:** Communication is essential for people around the world to work and share ideas with one another. An issue that gets in the way of this communication is the large number of people who suffer from deafness. Though many deaf people communicate through sign language everyday, the majority of people who are not hearing impaired do not take the time to learn it. We intend to make it easier for all people to communicate by building a sign language translator. Work has already been done to convert sign language to text (Li), and we intend to further that effort.

**Baseline:** For our baseline we looked extensively at the different models used to categorize hand sign images. We wanted to focus on using convolutional neural networks (CNNs) to categorize our images, and as such, chose to focus on a CNN model made by user sachinpatil1280 which reported a 97% accuracy for their model. This implementation takes advantage of a sequential model with an added dense layer with 128 neurons.

## Data

### Source

We chose to work with the Sign Language MNIST dataset on kaggle, due to MNIST being a popular benchmark for image based machine learning models. You can find the link [here](https://www.kaggle.com/datasets/datamunge/sign-language-mnist).

### Data Breakdown

The dataset format is patterned to match closely with the classic MNIST.
There are 24 classes on this test set, as the letters J and Z are not contained in the dataset because they require gesture motion. Further iterations of our model could be used to include these letters given video input.
Each training and test case represents a label (0-25) as a one-to-one map for each alphabetic letter A-Z (and no cases for 9=J or 25=Z because of gesture motions).
There are 27455 training cases and 7172 test cases, with each case consisting of pixel image values between 0-255.

### Pre-Processing

Pre-processing varied depending on the model that we chose, however for both of our models we used the same data augmentation, a snippet of which is provided below. Model A and C take advantage of the parameters pictured below, whereas model B uses double each value in attempts to broaden the dataset. The pictured values below are our optimized augmentation parameters.

{% raw %}

```python
# data augmentation
datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rotation_range=10,
    zoom_range = 0.1,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    # zoom_range=0.2,
    shear_range=0.1,
    fill_mode='nearest'
)
```

{% endraw %}

## Contributors

Brennen Hill, Joseph Mostika, Mehul Maheshwari
