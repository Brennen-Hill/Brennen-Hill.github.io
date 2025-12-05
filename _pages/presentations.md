---
layout: page
title: presentations
permalink: /projects/
nav: true
nav_order: 3
description: A collection of my posters, talks, and conference presentations.
display_categories: [NeurIPS, Cortical Labs, National University of Singapore]
horizontal: false
---

<!-- pages/presentations.md -->

<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
<!-- Display categorized presentations -->
{% for category in page.display_categories %}
<h2 class="category">{{ category }}</h2>
{% assign categorized_presentations = site.presentations | where: "category", category %}
{% assign sorted_presentations = categorized_presentations | sort: "importance" %}
<!-- Generate cards for each presentation -->
{% if page.horizontal %}
<div class="container">
<div class="row row-cols-1 row-cols-md-2">
{% for presentation in sorted_presentations %}
{% include projects.html project=presentation %}
{% endfor %}
</div>
</div>
{% else %}
<div class="grid">
{% for presentation in sorted_presentations %}
{% include projects.html project=presentation %}
{% endfor %}
</div>
{% endif %}
{% endfor %}

{% else %}

<!-- Display all presentations -->

{% assign sorted_presentations = site.presentations | sort: "importance" %}

<div class="grid">
{% for presentation in sorted_presentations %}
{% include projects.html project=presentation %}
{% endfor %}
</div>
{% endif %}
</div>
