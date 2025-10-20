---
layout: page
title: Sign Language Learner
description: Researching methods for translating American Sign Language
img: assets/img/TWG.png
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

### Model C

For this model, we reduced the image size to 28 by 28, and then added padding for a final size of 32 by 32. Furthermore, we worked with greyscale files, reducing the information that the model had to work with by 2/3rds.

## Tasks performed

### Model A

In this architecture of the model, we decided to avoid reinventing the wheel and use a pre-existing model. We used transfer learning to make use of ResNet-50. We replaced the input of ResNet-50 with the image size we wanted to use. We removed the classification layer at the end of ResNet-50. Before adding our own classification layer that would include the number of outputs we wanted for the alphabet, we added additional layers. We added multiple fully connected layers with 512 neurons and pooling layers. Our motivation was that by adding more layers, we could tune the model to predict accurately on our dataset, rather than just imagent.

### Model B

This succeeding model takes advantage of freezing and unfreezing of base layers within the ResNet-50 architecture at specific times while limiting the complexity of the model. With a total of 30 epochs, the first 10 were run with the base layers frozen, to capitalize on the advantage of the parameters being pre-trained on ImageNet data. The subsequent 20 layers were run with the base layers unfrozen, with attempts to fine-tune our model on our own ASL images. In addition, two dense layers with 128 neurons were added. Finally, the data augmentation parameters we used to dictate rotation, zoom, blur, and other important elements were doubled in hopes that our model would be more robust with a greater variety of input images.

### Model C

Similarly to our previous models, we used ResNet50 for transfer learning with this model. Since Model B had already achieved a higher accuracy than our baseline, this model was focused on getting as efficient as possible. To do this, we scaled down the additional output layers to a dense layer with 128 neurons. Furthermore we reduced the amount of data augmentation by half as compared to Model B, and used grayscale images, reducing the image size by 2/3rds.

## Results and Discussions

### Model A

This architecture turned out to be efficient. We put a multitude of trainable parameters into the model. After training for a day, the model had finished its second epoch and was highly inaccurate. We realized that adding so many fully connected layers would be unreasonable with our current computing powers. We learned that we would need to put a greater emphasis on efficient model design and moved on to architectures that made use of less trainable parameters.

### Model B

This model succeeded in obtaining a substantial increase in accuracy, however it came at the cost of efficiency and training time. After 10 epochs, this second model achieved an accuracy of 88%, and after 30 epochs, it achieved an accuracy of 98.5% after 30 epochs, which took about 7 hours to complete. Although this accuracy was a vast improvement, the efficiency still needed to be improved.

### Model C

This model turned out to be both extremely efficient, and after fine tuning, extremely accurate as well. It took about 3 hours to train the model which was a significant improvement. Furthermore, because we trained this model by saving the best parameter weights as opposed to the final result of the training, we were able to maximize the accuracy of our model to 99.5% accuracy.

An important aspect to note about this model is that even though we only trained it for 10 epochs, after 6 epochs the loss on the validation set started skyrocketing while the loss on the training set stayed relatively constant. In other words, this model started overfitting after only 6 epochs.

## Contributors

Brennen Hill, Joseph Mostika, Mehul Maheshwari

## References

[1] Wolmark, M. (2023, September 2). 79 hearing loss statistics: How many deaf people in the U.S.?. In-Home & Center-Based ABA - Golden Steps ABATM. https://www.goldenstepsaba.com/resources/hearing-loss-statistics

[2] Li, D. (n.d.). Welcome to WLASL homepage. WLASL. https://dxli94.github.io/WLASL/

[3] CSC321 tutorial 6: Optimization and Convolutional Neural networks. tut06. (n.d.). https://www.cs.toronto.edu/\~lczhang/321/tut/tut06.html

[4] Tecperson. (2017, October 20). Sign language mnist. Kaggle. https://www.kaggle.com/datasets/datamunge/sign-language-mnist
