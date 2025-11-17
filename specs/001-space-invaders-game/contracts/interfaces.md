# Game Entity Interfaces

Since this is a client-side game with no external APIs, these contracts define the internal interfaces for game entities and component props.

## Player Interface

```javascript
interface Player {
  x: number;        // Horizontal position
  y: number;        // Vertical position (fixed)
  speed: number;    // Movement speed
  width: number;    // Collision width
  height: number;   // Collision height
}
```

## Enemy Interface

```javascript
interface Enemy {
  x: number;        // Horizontal position
  y: number;        // Vertical position
  width: number;    // Collision width
  height: number;   // Collision height
  alive: boolean;   // Active state
  direction: number; // 1 or -1
}
```

## Projectile Interface

```javascript
interface Projectile {
  x: number;        // Horizontal position
  y: number;        // Vertical position
  speed: number;    // Upward speed
  width: number;    // Collision width
  height: number;   // Collision height
  active: boolean;  // In-play state
}
```

## Particle Interface

```javascript
interface Particle {
  x: number;        // Horizontal position
  y: number;        // Vertical position
  vx: number;       // Horizontal velocity
  vy: number;       // Vertical velocity
  life: number;     // Remaining frames
  maxLife: number;  // Initial lifetime
  color: string;    // Display color
  size: number;     // Display size
}
```

## GameState Interface

```javascript
interface GameState {
  player: Player;
  enemies: Enemy[];
  projectiles: Projectile[];
  particles: Particle[];
  score: number;
  gameState: 'start' | 'playing' | 'gameOver';
  screenShake: number; // Frames remaining
}
```

## Component Props

### GameCanvas Props

```javascript
interface GameCanvasProps {
  gameState: GameState;
  onGameStart: () => void;
  onGameRestart: () => void;
}
```

### StartScreen Props

```javascript
interface StartScreenProps {
  onStart: () => void;
}
```

### GameOverScreen Props

```javascript
interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}
```

### ScoreDisplay Props

```javascript
interface ScoreDisplayProps {
  score: number;
}
```

## Game Logic Contracts

### InputHandler Contract

- **Input**: Keyboard events
- **Output**: Player movement updates
- **Behavior**: Left/Right arrows or A/D for horizontal movement, Space/Up for shooting

### CollisionDetector Contract

- **Input**: Arrays of Projectiles and Enemies
- **Output**: Collision events with affected entities
- **Algorithm**: AABB collision detection

### ParticleEngine Contract

- **Input**: Explosion position
- **Output**: Array of new Particles
- **Behavior**: Generate 10-20 particles with random velocities and lifetimes

### GameLoop Contract

- **Input**: Current GameState, deltaTime
- **Output**: Updated GameState
- **Behavior**: Update positions, check collisions, handle state transitions</content>
<parameter name="filePath">/workspaces/speckit-spaceinvaders/specs/001-space-invaders-game/contracts/interfaces.md