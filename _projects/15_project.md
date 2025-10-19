---
layout: page
title: Badger Vision
description: Hack Midwest Winner for Best Enterprise Scale Business Solution
img: assets/img/badger-vision-header.jpg # Placeholder: Add a background image for the portfolio page
importance: 1
category: work
---

We won **Best Enterprise Scale Business Solution** at Hack Midwest, the largest hackathon in the region! Our team was awarded $2,500 for our project, built using Pinata's Files API.

Over 300 developers were selected to compete, including experts from leading organizations and universities. After 23 intense hours of coding with only a 1-hour break to sleep, we presented our solution to the judges and were victorious.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/badger-vision-team.jpg" title="Badger Vision Team" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/badger-vision-app.jpg" title="Badger Vision App UI" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/badger-vision-award.jpg" title="Hack Midwest Award" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Placeholder images: The Badger Vision team at Hack Midwest, an example of the app interface, and receiving the award.
</div>

---

### The Problem: Prosopagnosia

Prosopagnosia, or face blindness, affects around **2.5% of the population**—more than 8 million people in the U.S. alone. This condition makes it difficult to recognize faces or interpret facial expressions. As of now, no therapies offer lasting improvements (PsyPost).

### Our Solution: Badger Vision

Introducing Badger Vision, an open-source and easy-to-use tool designed to help individuals with face blindness by identifying both faces and emotions.

* **Face Recognition:** If a recognized face is detected, the tool announces the person’s name.
* **Audio Cues:** For unknown faces, a unique chime is played, with the exact same chime repeating upon subsequent encounters. This use of audio cues makes it easier to recognize faces.
* **Emotion Detection:** Our model also detects and announces emotions, making it easier to interpret social cues.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/badger-vision-arch.jpg" title="System Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/badger-vision-demo.jpg" title="Live Demo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Placeholder images: The system architecture diagram (left) and a demonstration of the real-time detection (right).
</div>

### How it Works

Users authenticate the Badger Vision app via a QR code, which downloads pre-configured AI artifacts and settings stored on **Pinata**. The app streams video through our RTMP server to AI recognition servers, leveraging the **Zoom Video SDK**. The camera, which can be discreetly placed in a shirt pocket, identifies faces and emotions using deep learning and convolutional neural networks. Detections are sent back to the app in real time over a WebSocket connection.

### Solving the Unsolvable

When we ran into challenges working with Zoom, we talked with one of the present sponsors, who had been working as a Zoom engineer for over a decade. The seasoned Zoom engineer said our idea of live-streaming video through Zoom to a server for real-time data analysis was almost certainly impossible.

We engineered a solution by **writing our own Python API**, proving that live-streaming video for this use case was not only possible—it worked.

### Future Work

If we acquire the funding to continue work on this project, we would like to pursue several goals:
* Perform clinical trials on a diverse population to evaluate effectiveness.
* Further refine the codebase and mobile client.
* Expand the functionality of the application to AR and VR headsets, including smart glasses.

---

### Team Members
Brennen Hill, Rahul Hathwar, Max Maeder, Utkarsh Sharma, and Jeremy Kintana.

<br>

<a href="https://github.com/Bell-Herald/BadgerVision" class="btn btn-primary btn-lg" role="button" target="_blank" rel="noopener noreferrer">View on GitHub</a>
