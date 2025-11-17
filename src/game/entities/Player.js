const PLAYER_WIDTH = 48
const PLAYER_HEIGHT = 32
const PLAYER_SPEED = 0.4
const FIRE_COOLDOWN = 250 // ms between shots

export class Player {
  constructor(stageWidth, stageHeight) {
    this.width = PLAYER_WIDTH
    this.height = PLAYER_HEIGHT
    this.x = (stageWidth - PLAYER_WIDTH) / 2
    this.y = stageHeight - PLAYER_HEIGHT - 24
    this.speed = PLAYER_SPEED
    this.cooldown = 0
    this.lastShootState = false
  }

  update(delta, input, stageWidth) {
    const velocity = this.speed * delta
    
    if (input.left) {
      this.x -= velocity
    }
    if (input.right) {
      this.x += velocity
    }
    
    this.x = Math.max(0, Math.min(stageWidth - this.width, this.x))

    if (this.cooldown > 0) {
      this.cooldown -= delta
    }
  }

  attemptShoot(input, projectilePool) {
    // Only shoot on key press (not held)
    const shootPressed = input.shoot && !this.lastShootState
    this.lastShootState = input.shoot

    if (!shootPressed || this.cooldown > 0) return null
    
    this.cooldown = FIRE_COOLDOWN
    const projectile = projectilePool?.spawn({
      x: this.x + this.width / 2 - 2,
      y: this.y,
    })
    return projectile
  }

  reset(stageWidth, stageHeight) {
    this.x = (stageWidth - PLAYER_WIDTH) / 2
    this.y = stageHeight - PLAYER_HEIGHT - 24
    this.cooldown = 0
    this.lastShootState = false
  }
}
