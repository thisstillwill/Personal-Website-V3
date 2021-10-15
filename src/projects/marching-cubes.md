---
title: Improving the Marching Cubes Algorithm
description: "A real-time implementation of the marching cubes algorithm for my fall junior paper at Princeton University."
date: 2021-01-06
tags:
  - featured
  - CSharp
  - Graphics
katex: true
---

{% image "marching-cubes.png", "Marching cubes used to spell “COS”, the abbreviation for computer science at Princeton University" %}

| Project&nbsp;Summary |                                                                           |
| -------------------- | ------------------------------------------------------------------------- |
| Title                | “Improving the Marching Cubes Algorithm for Use in Deformable 3D Terrain” |
| Language             | C#                                                                        |
| Report               | [Download PDF](../../static/documents/marching-cubes-report.pdf)          |
| Code                 | [Repo Link](https://github.com/disstillwill/IW-Fall-2020)                 |

[toc]

## Background

Princeton requires all students in its A.B. (or Bachelor of Arts) program to complete independent work during their junior and senior year. As a junior in the computer science department, I completed two separate junior papers during each semester.

In the fall, I wanted to focus on an interesting graphics algorithm called [marching cubes](https://en.wikipedia.org/wiki/Marching_cubes). Published by William Lorensen and Harvey Cline during the 1987 SIGGRAPH proceedings, marching cubes was originally designed to visualize medical scan data in three dimensions. However, the algorithm can extract a polygonal mesh from _any_ discrete data as long as it was sampled along a rectangular grid. Marching cubes produces surfaces which are far smoother than voxels alone can achieve, which interested me as someone who has played games like _Minecraft_. Ultimately, I decided on a project that would apply marching cubes to produce real-time deformable terrain.

## The Fundamental Problem

A [scalar field](https://en.wikipedia.org/wiki/Scalar_field) defines a scalar value at every point in space. In 3D space, this scalar field can be represented by any function $f(x,y,z)$ which returns a scalar value for the input coordinates. A 3D surface can be represented within this field by first selecting a threshold value and then considering where the scalar field equals that value. The goal of the marching cubes algorithm is then to triangulate this surface given a threshold value and a grid that samples the scalar field at regular intervals.

## The Algorithm

Marching cubes considers one logical cube at a time. Because the scalar field is considered on a structured, uniform grid, the vertices come from each set of eight neighboring points in the grid. The algorithm is efficient because it uses lookup tables to find the triangulation for each cube. Because each cube has eight vertices, and each vertex is either above or below the surface, there are $2^8 = 256$ possible triangulations. An index is created to describe the configuration of the current cube, which is then mapped to precomputed mesh data in the lookup tables. This process is repeated for each gridcell in order to extract the entire mesh.

## Implementation and Modification

I wrote my implementation of the marching cubes algorithm using C# and the Unity game engine. The choice to use C# was natural given my past experience with Java at Princeton. Unity not only has a large community online, but it also allowed me to develop and test my code on both Windows and Mac.

To make the marching cubes algorithm work interactively, it was a matter of re-extracting the mesh each time the scalar field was altered. Functions for adding and subtracting from the field were bound to mouse controls, allowing a user to deform the final mesh in real-time.

## Final Thoughts

This project was my first real foray into computer graphics. Despite the difficulties I faced with generating meshes in Unity and understanding the logic behind marching cubes, the wealth of explanations available online made the task much more manageable. There are certainly many improvements I could make to the final code—a proper chunking system being one of them—and I would love to return one day to this project. It was also an excellent opportunity to improve my technical writing skills, as the [written final report](../../static/documents/marching-cubes-report.pdf) I produced was the first time I had ever documented a project in detail.

_The source code for this project and instructions on how to run the final application are available online at <https://github.com/disstillwill/IW-Fall-2020>._
