# Rock Paper Scissors Simulation

## Overview

This project is a visual variation of the classic Rock Paper Scissors game.

Instead of a turn-based match, the game runs as a live simulation inside a grid.  
Multiple rock, paper, and scissors icons move around the board, and when two figures collide, the loser transforms into the winner's type according to the classic rules:

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock

The match continues until only one type remains on the board.

## Current Features

- Animated grid-based simulation
- Moving rock, paper, and scissors figures
- Collision system with transformation logic
- Live counters showing how many figures of each type remain
- Match status information displayed next to the board
- Visual representation of the evolution of the game in real time

## Current Tech Stack

The current implementation is built with:

- HTML
- CSS
- Vanilla JavaScript

## Goal

The goal of this project is to recreate the current application in Angular while preserving the existing gameplay and visual concept.

The Angular version should keep the same core behavior, but improve the project in areas such as:

- code structure
- maintainability
- separation of concerns
- UI polish
- scalability for future features

## Migration Expectations

The new Angular version should:

- reproduce the current simulation behavior
- preserve the collision and transformation rules
- display the same kind of counters and match information
- improve the internal architecture
- remain simple and easy to understand
- avoid unnecessary dependencies

## Possible Improvements

Some improvements that can be added during the migration:

- cleaner and more modular UI
- better visual feedback for game status
- restart simulation button
- configurable number of initial items
- adjustable speed
- responsive layout
- improved accessibility

## Notes for the Agent

Before implementing the Angular version, inspect the existing vanilla files carefully and understand:

- how movement is handled
- how collisions are detected
- how transformations are applied
- how counters and match status are updated
- how the board rendering works

Do not change the core rules of the game.  
Preserve the original idea, then improve the implementation.