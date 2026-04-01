# AGENTS.md

## Project Goal

Rebuild the existing Rock Paper Scissors simulation from the legacy version into Angular.

This is not a classic turn-based Rock Paper Scissors game.  
It is a live simulation where multiple rock, paper, and scissors entities move inside a grid.  
When two entities collide, the loser transforms into the winner's type following the classic rules:

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock

The simulation continues until only one type remains.

## Main Objective

Preserve the current gameplay and visual concept from the legacy implementation, but rebuild it with a cleaner and more maintainable Angular architecture.

The new Angular version should feel like the same app, only better structured, easier to extend, and slightly more polished.

## Technical Expectations

- Use Angular
- Prefer standalone components
- Use TypeScript strict mode
- Keep the implementation simple and readable
- Separate rendering, simulation logic, and state management clearly
- Avoid unnecessary dependencies
- Do not add backend code
- Do not overengineer the solution

## Architecture Guidelines

Prefer a structure with clear responsibilities, such as:

- `AppComponent` as the shell
- a board or simulation component for the grid rendering
- a sidebar or stats component for counters and match info
- a dedicated service or simulation engine for movement, collisions, transformations, and win conditions
- shared types/interfaces for entities and game state

Keep game rules and simulation logic out of the template as much as possible.

## Behavior Rules

You must preserve the core rules of the existing app:

- entities move around the board
- collisions trigger rock-paper-scissors resolution
- the losing entity transforms into the winner's type
- counters update in real time
- match status is displayed next to the board
- the simulation ends when only one type remains

Do not change the main gameplay loop unless required for technical correctness.

## UI Expectations

The Angular version should keep the spirit of the current app.

Improvements are welcome, but they must stay aligned with the original concept.

Allowed improvements:

- cleaner layout
- improved visual feedback
- restart simulation button
- configurable initial number of entities
- configurable simulation speed
- responsive behavior
- better accessibility
- clearer typography and spacing

Do not redesign the app into a completely different product.

## Code Quality Standards

- Favor readability over cleverness
- Keep functions focused and small
- Avoid duplicated logic
- Use descriptive naming
- Prefer explicit code over magical abstractions
- Keep components reasonably small
- Keep styles organized and scoped appropriately, avoid repeating code, create a styles aarchitecture if needed
- Avoid giant files when responsibilities can be split cleanly

## Angular Preferences

- Prefer standalone components
- Prefer modern Angular patterns
- Use signals if they improve local state clarity
- Keep RxJS usage minimal unless it clearly adds value
- Do not introduce NgRx or other heavy state libraries for this project
- Keep dependency injection practical, not decorative

## Styling Preferences

- Preserve or reinterpret the current visual design in a clean way
- Keep CSS maintainable
- Avoid unnecessary styling complexity
- Prefer simple, solid UI over flashy effects
- Animations should be subtle and purposeful

## Migration Workflow

Before implementing, inspect the legacy files and understand:

- how the entities are created
- how movement works
- how collisions are detected
- how winner/loser resolution works
- how transformations are applied
- how counters and match info are updated
- how the simulation ends

Then rebuild the app in Angular based on that understanding.

Do not blindly rewrite without first understanding the original behavior.

## Validation Checklist

Before considering the task complete, verify that:

- the Angular app reproduces the original gameplay
- collisions work correctly
- transformations follow the correct rules
- counters update correctly
- the winner condition works
- the UI communicates the current state clearly
- the code builds successfully
- the final structure is maintainable and easy to extend

## Constraints

- Do not add features unrelated to the simulation
- Do not add authentication, backend, or databases
- Do not introduce unnecessary libraries
- Do not create an overly complex architecture for a small app
- Do not sacrifice simplicity for abstraction

## Output Expectations

When making changes:

- explain what was implemented
- explain any structural decisions briefly
- mention any assumptions made from the legacy code
- mention possible next improvements only if they are relevant and lightweight