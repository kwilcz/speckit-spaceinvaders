# Data Model

## Overview

The game uses in-memory data structures for all entities. No persistent storage is required as it's a single-session game.

## Entities

### Player

**Description**: Represents the controllable ship at the bottom of the screen.

**Fields**:
- `x`: number - Horizontal position (pixels, constrained to screen bounds)
- `y`: number - Vertical position (fixed at bottom)
- `speed`: number - Movement speed (pixels per frame)
- `width`: number - Ship width for collision
- `height`: number - Ship height for collision

**Relationships**: Fires Projectiles

**Validation Rules**:
- x must be between 0 and screenWidth - width
- speed > 0

### Enemy

**Description**: Individual invader in the grid formation.

**Fields**:
- `x`: number - Horizontal position
- `y`: number - Vertical position
- `width`: number - Enemy width
- `height`: number - Enemy height
- `alive`: boolean - Whether enemy is active
- `direction`: number - Movement direction (1 for right, -1 for left)

**Relationships**: Part of enemy grid, can be hit by Projectiles

**Validation Rules**:
- alive starts as true
- When y + height >= screenHeight, trigger game over

### Projectile

**Description**: Bullets fired by the player.

**Fields**:
- `x`: number - Horizontal position
- `y`: number - Vertical position
- `speed`: number - Vertical speed (upward)
- `width`: number - Projectile width
- `height`: number - Projectile height
- `active`: boolean - Whether projectile is in play

**Relationships**: Fired by Player, can collide with Enemies

**Validation Rules**:
- active starts as true
- When y < 0, set active to false
- Only active projectiles participate in collision

### Particle

**Description**: Visual debris from explosions.

**Fields**:
- `x`: number - Horizontal position
- `y`: number - Vertical position
- `vx`: number - Horizontal velocity
- `vy`: number - Vertical velocity
- `life`: number - Remaining lifetime (frames)
- `maxLife`: number - Initial lifetime
- `color`: string - Particle color
- `size`: number - Particle size

**Relationships**: Created in bursts from Enemy destruction

**Validation Rules**:
- life decreases each frame
- When life <= 0, remove particle
- vx, vy determine movement direction

### Score

**Description**: Current game score.

**Fields**:
- `value`: number - Current score (starts at 0)

**Relationships**: Increments on Enemy destruction

**Validation Rules**:
- value >= 0
- Increments by fixed amount per enemy

## State Transitions

- **Game States**: 'start', 'playing', 'gameOver'
- Player movement: Updates x position based on input
- Enemy movement: Grid moves horizontally, descends periodically
- Projectile movement: Updates y position upward
- Particle movement: Updates x,y based on vx,vy, decreases life

## Data Flow

1. Input handlers update Player position
2. Game loop updates all entity positions
3. Collision detector checks Projectile vs Enemy overlaps
4. On collision: Destroy Enemy, create Particles, increment Score
5. Render all entities to Canvas</content>
<parameter name="filePath">/workspaces/speckit-spaceinvaders/specs/001-space-invaders-game/data-model.md