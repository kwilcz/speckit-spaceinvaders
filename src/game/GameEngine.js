import { createGameLoop } from './GameLoop'
import { Player } from './entities/Player'
import { ProjectilePool } from './entities/Projectile'
import { EnemyGrid } from './entities/Enemy'
import { CollisionDetector } from './CollisionDetector'
import { ParticleEngine } from './ParticleEngine'

const POINTS_PER_ENEMY = 100

export class GameEngine {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.loop = null
    this.player = null
    this.projectilePool = null
    this.enemyGrid = null
    this.collisionDetector = null
    this.particleEngine = null
    this.state = {
      score: 0,
      gameState: 'start',
      screenShake: 0,
    }
    this.input = {
      left: false,
      right: false,
      shoot: false,
    }
  }

  attachCanvas(canvas) {
    this.canvas = canvas
    this.ctx = canvas?.getContext('2d') ?? null
    
    if (!this.loop) {
      this.loop = createGameLoop({
        onUpdate: (delta) => this.update(delta),
        onRender: (ratio) => this.render(ratio),
      })
    }

    // Initialize game entities
    if (this.canvas) {
      const { width, height } = this.canvas
      this.player = new Player(width, height)
      this.projectilePool = new ProjectilePool()
      this.enemyGrid = new EnemyGrid(width, height)
      this.collisionDetector = new CollisionDetector()
      this.particleEngine = new ParticleEngine()
    }
  }

  setInputState(nextInput) {
    this.input = { ...this.input, ...nextInput }
  }

  setGameState(nextState) {
    this.state.gameState = nextState
    if (nextState === 'playing') {
      this.initGame()
      this.start()
    } else {
      this.stop()
    }
  }

  initGame() {
    if (!this.canvas) return
    const { width, height } = this.canvas
    
    this.player?.reset(width, height)
    this.projectilePool?.reset()
    this.enemyGrid?.reset()
    this.particleEngine?.reset()
    this.state.score = 0
    this.state.screenShake = 0
  }

  start() {
    this.loop?.start()
  }

  stop() {
    this.loop?.stop()
  }

  update(delta) {
    if (!this.ctx || this.state.gameState !== 'playing') return
    if (!this.player || !this.projectilePool || !this.enemyGrid) return

    const { width, height } = this.canvas

    // Update player
    this.player.update(delta, this.input, width)
    
    // Handle shooting
    this.player.attemptShoot(this.input, this.projectilePool)

    // Update projectiles
    this.projectilePool.update(delta)

    // Update enemies
    this.enemyGrid.update(delta)

    // Check if enemies reached bottom
    if (this.enemyGrid.hasReachedBottom(height - 40)) {
      this.state.gameState = 'gameOver'
      return
    }

    // Detect collisions
    const collisions = this.collisionDetector.detectProjectileEnemyCollisions(
      this.projectilePool.getActive(),
      this.enemyGrid.getAlive()
    )

    // Handle collisions
    for (const collision of collisions) {
      this.projectilePool.deactivate(collision.projectile)
      this.enemyGrid.killEnemy(collision.enemy)
      this.particleEngine.createExplosion(collision.x, collision.y)
      this.state.score += POINTS_PER_ENEMY
      this.state.screenShake = 120 // ms of shake
    }

    // Update particles
    this.particleEngine.update(delta)

    // Decay screen shake
    if (this.state.screenShake > 0) {
      this.state.screenShake -= delta
      if (this.state.screenShake < 0) {
        this.state.screenShake = 0
      }
    }
  }

  render() {
    if (!this.ctx) return
    const { width, height } = this.canvas

    // Apply screen shake
    let shakeX = 0
    let shakeY = 0
    if (this.state.screenShake > 0) {
      const intensity = Math.min(this.state.screenShake / 120, 1) * 4
      shakeX = (Math.random() - 0.5) * intensity
      shakeY = (Math.random() - 0.5) * intensity
    }

    this.ctx.save()
    this.ctx.translate(shakeX, shakeY)

    // Clear and draw background
    this.ctx.fillStyle = '#020617'
    this.ctx.fillRect(0, 0, width, height)

    // Draw stars background
    this.drawStars()

    // Draw player
    if (this.player) {
      this.ctx.fillStyle = '#4ade80'
      this.ctx.fillRect(
        Math.floor(this.player.x),
        Math.floor(this.player.y),
        this.player.width,
        this.player.height
      )
    }

    // Draw projectiles
    if (this.projectilePool) {
      this.ctx.fillStyle = '#22d3ee'
      for (const projectile of this.projectilePool.getActive()) {
        this.ctx.fillRect(
          Math.floor(projectile.x),
          Math.floor(projectile.y),
          projectile.width,
          projectile.height
        )
      }
    }

    // Draw enemies
    if (this.enemyGrid) {
      this.ctx.fillStyle = '#f87171'
      for (const enemy of this.enemyGrid.getAlive()) {
        this.ctx.fillRect(
          Math.floor(enemy.x),
          Math.floor(enemy.y),
          enemy.width,
          enemy.height
        )
      }
    }

    // Draw particles
    if (this.particleEngine) {
      this.particleEngine.render(this.ctx)
    }

    this.ctx.restore()

    // Draw UI (no shake)
    this.ctx.fillStyle = '#94a3b8'
    this.ctx.font = '16px monospace'
    this.ctx.fillText(`SCORE: ${this.state.score.toString().padStart(5, '0')}`, 16, 24)
  }

  drawStars() {
    // Simple static starfield
    this.ctx.fillStyle = '#475569'
    const starCount = 50
    for (let i = 0; i < starCount; i++) {
      const x = (i * 37) % this.canvas.width
      const y = (i * 71) % this.canvas.height
      this.ctx.fillRect(x, y, 1, 1)
    }
  }

  getScore() {
    return this.state.score
  }

  getGameState() {
    return this.state.gameState
  }
}

export const createGameEngine = () => new GameEngine()
