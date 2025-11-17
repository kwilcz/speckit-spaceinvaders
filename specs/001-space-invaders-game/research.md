# Research Findings

## Technology Stack Choice

**Decision**: Use Vite for the React project setup.  
**Rationale**: Vite provides faster development builds, smaller production bundles, and better support for modern JavaScript features, aligning with the requirement for quick load and minimal bundle size. It's ideal for a lightweight game project.  
**Alternatives Considered**: Create React App (CRA) - slower build times and larger bundles, not as optimized for small projects.

## Game Loop Implementation

**Decision**: Implement game loop using requestAnimationFrame for smooth 60fps rendering.  
**Rationale**: requestAnimationFrame is browser-native, provides optimal timing for animations, and ensures smooth gameplay without stuttering.  
**Alternatives Considered**: setInterval with fixed timestep - can cause frame drops or inconsistent timing; manual loop with setTimeout - less efficient.

## Canvas Rendering

**Decision**: Use HTML5 Canvas API for all game rendering.  
**Rationale**: Canvas provides direct pixel control, high performance for 2D graphics, and is well-suited for games with many moving elements like enemies, projectiles, and particles.  
**Alternatives Considered**: SVG - better for vector graphics but slower for real-time updates; WebGL - overkill for 2D game, increases complexity.

## Collision Detection

**Decision**: Implement AABB (Axis-Aligned Bounding Box) collision detection.  
**Rationale**: Simple, fast algorithm suitable for rectangular game objects (ships, enemies, projectiles). Efficient for real-time collision checks in a 2D game.  
**Alternatives Considered**: Circle collision - less accurate for rectangular shapes; SAT (Separating Axis Theorem) - more complex, unnecessary for this scope.

## Particle System

**Decision**: Custom particle system using JavaScript arrays and Canvas drawing.  
**Rationale**: Lightweight implementation that fits within the minimal bundle constraint. Particles as objects with position, velocity, lifetime, and color.  
**Alternatives Considered**: External libraries like particles.js - adds bundle size; WebGL-based particles - overkill for 2D effects.

## Screen Shake Effect

**Decision**: Implement screen shake by temporarily offsetting the Canvas context translation.  
**Rationale**: Simple CSS-like transform on Canvas, provides visual impact without complex math. Easy to integrate with existing rendering.  
**Alternatives Considered**: CSS transforms on container - may not work well with Canvas; physics-based shake - more complex than needed.

## State Management

**Decision**: Use React's built-in useState and useEffect hooks for game state.  
**Rationale**: Simple, no external dependencies, sufficient for game state (player position, enemies, score). Aligns with constraint against complex state management.  
**Alternatives Considered**: Redux or Zustand - adds complexity and bundle size; Context API - similar to hooks but more boilerplate.

## Deployment to GitHub Pages

**Decision**: Use Vite's build output with gh-pages package for deployment.  
**Rationale**: gh-pages provides easy command-line deployment to GitHub Pages branch. Vite's static output is compatible with GitHub Pages hosting.  
**Alternatives Considered**: GitHub Actions for automated deployment - more setup; manual branch push - less convenient.

## Input Handling

**Decision**: Use keyboard event listeners for movement and shooting.  
**Rationale**: Direct browser API, responsive input for game controls. Handle keydown/keyup for continuous movement.  
**Alternatives Considered**: Pointer events for touch - not needed for keyboard-focused game; gamepad API - adds complexity.

## Asset Management

**Decision**: Store assets in /public directory, load via Image objects.  
**Rationale**: Vite serves /public statically, simple loading with new Image(). Fits GitHub Pages requirement.  
**Alternatives Considered**: Import as modules - may bloat bundle; CDN - adds external dependencies.</content>
<parameter name="filePath">/workspaces/speckit-spaceinvaders/specs/001-space-invaders-game/research.md