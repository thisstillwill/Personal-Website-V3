---
title: Tower Defense Game
description: "A tower defense game that was the capstone project for SWEN20003 Object Oriented Software Development at the University of Melbourne."
date: 2020-06-13
tags:
  - featured
  - Java
  - GameDev
---

{% image "shadow-defend.png", "Screenshot of the game in action" %}

| Project Summary |                                                                          |
| --------------- | ------------------------------------------------------------------------ |
| Title           | _Shadow Defend_                                                          |
| Language        | Java                                                                     |
| Specification   | [Download PDF](../../static/documents/shadow-defend-specification.pdf)   |
| Code            | [Repo Link](https://github.com/disstillwill/SWEN20003-S1-2020-Project-2) |

In the spring of 2020, I studied abroad at the [University of Melbourne](https://www.unimelb.edu.au/) in Australia. One of my classes, SWEN20003, focused on software development using object-oriented principles. Taught in Java, lectures introduced concepts such as [abstract classes](https://en.wikipedia.org/wiki/Abstract_type), [generics](https://en.wikipedia.org/wiki/Generic_programming), and other topics. During weekly programming workshops, the focus was on implementing specific design patterns like an [observer](https://en.wikipedia.org/wiki/Observer_pattern), [factory](https://en.wikipedia.org/wiki/Factory_method_pattern), or [flyweight](https://en.wikipedia.org/wiki/Flyweight_pattern).

The final assignment involved a large project that would apply what we had learned during the semester. The task was to create a tower defense game, titled _Shadow Defend_, using the specification provided to us. While we were given [Bagel](https://people.eng.unimelb.edu.au/mcmurtrye/bagel-doc/), a simple graphics engine, the actual game logic implementation was left up to us.

## Designing the Game

The actual assignment was split into two parts. The first task was to produce a class design that demonstrated our plan for the game’s implementation. This took the form of a [UML](https://en.wikipedia.org/wiki/Unified_Modeling_Language) diagram that modeled each entity in the game and the relationships between them ([download PDF](../../static/documents/shadow-defend-uml.pdf)). While I did not follow this plan exactly, I found that it helped me anticipate many of the challenges that would come up during implementation.

## Implementing the Game

The final implementation for _Shadow Defend_ followed not only our UML diagram but also our earlier work in the course. In a previous assignment ([repo link](https://github.com/disstillwill/SWEN20003-S1-2020-Project-1)), we had already created a skeleton for a tower defense game. However, it lacked most of the features that would be required in the final project. Of note, the game would need to handle multiple enemy types, purchasing new towers, and a status panel to track information.

### Timescale Changes

These requirements were further complicated by the need to handle timescale changes during play. By pressing the <kbd>L</kbd> or <kbd>K</kbd> keys, the player is able to increase or decrease the speed of the game. While the skeleton game used `System.nanoTime()` to track elapsed time, this proved to make certain actions more difficult. For example, the timing of enemy spawns would become out of sync under many circumstances. For the final project, I simply counted the number of elapsed frames when calculating timings. Even if this tied the game’s logic to the speed of the computer running it, it at least matched the instructor solution perfectly.

### Event Loop

Internally, _Shadow Defend_ uses a single main loop to update the the game state. When updating, the game first checks if the player has run out of lives (which immediately exits the game). The map is then drawn, starting from the top-left of the game window. This accounts for the need to draw other objects _on top of the background_ later on. The game then checks the state of the current level, updating it if the level has not been completed. Finally, the game updates each entity in play before drawing the user interface at the top and bottom of the screen.

### Game Objects

In order to share common attributes and behaviors, every game object inherits from an abstract `GameObject` class. In other words, enemies (called Splicers), towers, projectiles, and even purchasable items are all extensions of this base class. Each `GameObject` has a sprite, a rectangular bounding box, and a rotation that represents its appearance and spatial properties. Additionally, every subclass overrides a common `update()` method that will update entity state. This last feature means all active game objects can be tracked in the same list, with `update()` being called in a loop for each one.

Combining abstract classes along with Java [streams](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html) simplified many operations. For example, the following method checks if any Slicers are still in play:

```java
public boolean slicersInPlay() {
  return entities.stream().anyMatch(o -> o instanceof Slicer);
}
```

Certain game objects use additional logic for spawning or update behavior. Projectiles, for example, are instantiated with an intended target Slicer. If a projectile hits (intersects with) its target, the projectile will call a `takeDamage()` function implemented in the `Slicer` abstract class. In turn, specific enemy types are represented internally by extensions of this base class and spawned using a `SlicerFactory`.

### Level Representation

The game consists of multiple _levels_, each containing multiple _waves_ in which enemies can spawn. While it was given that all levels would use the same series of waves (sharing what enemies spawned and how often those enemies spawned), the format for describing waves could not be changed. More specifically, waves were provided in the file `waves.txt`. Each line described a _wave event_ within a particular wave:

```txt
1,spawn,20,slicer,1000
2,spawn,5,slicer,1000
2,delay,2500
2,spawn,20,slicer,750
3,spawn,5,superslicer,1000
…
```

Ignoring the actual meaning of each comma-separated value, it was necessary to process the text file before the start of the game. For each level in _Shadow Defend_, the game reads each line of `waves.txt` and adds the corresponding wave information. Two additional classes, `Level` and `Wave`, control state management for levels and waves respectively. Since waves can contain either _delay events_ or _spawn events_, both events are subclassed from a base `WaveEvent` class. It is also in this base class that the logic for triggering an event’s behavior is contained:

```java
if (frameCount / ShadowDefend.getFPS() * MILLISECONDS_PER_SECOND >= delay)
  activateBehavior();
```

In general, any object that needed to track time (waves, certain projectiles, and towers) received that information directly from the running instance of _Shadow Defend_.

## Final Thoughts

This assignment was a pleasant surprise, but not for the reasons you might expect. I had used game engines in the past, namely [Unity](https://unity.com/). However, the difference here was the simplicity of the Bagel graphics library. It was up to me to implement features that I had previously taken for granted in more advanced engines. While I certainly used many of the design patterns taught in SWEN20003 for the game, I learned almost as much about game engines themselves.
