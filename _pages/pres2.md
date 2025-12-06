---
layout: page
title: presentations
permalink: /presentations/
nav: true
nav_order: 3
description: A collection of my posters, talks, and conference presentations.
display_categories: [NeurIPS, Cortical Labs, National University of Singapore]
horizontal: false
---


<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
    {% for category in page.display_categories %}
        <h2 class="category">{{ category }}</h2>
        {% assign categorized_presentations = site.presentations | where: "category", category %}
        {% assign sorted_presentations = categorized_presentations | sort: "importance" %}
       
        <!-- Generate cards for each presentation -->
        {% if page.horizontal %}
            <div class="container">
                <div class="row row-cols-1 row-cols-md-2">
                    {% for presentation in sorted_presentations %}
                        {% include projects_horizontal.liquid project=presentation %}
                    {% endfor %}
                </div>
            </div>
        {% else %}
              <!-- <div class="row row-cols-1 row-cols-md-3"> -->

            <div class="grid">
                {% for presentation in sorted_presentations %}
                    {% include projects.liquid project=presentation %}
                {% endfor %}
            </div>
        {% endif %}
    {% endfor %}
{% else %}

    <!-- Display all presentations -->
    {% assign sorted_presentations = site.presentations | sort: "importance" %}
    <div class="grid">
        {% for presentation in sorted_presentations %}
            {% include projects.liquid project=presentation %}
        {% endfor %}
    </div>
{% endif %}
</div>
