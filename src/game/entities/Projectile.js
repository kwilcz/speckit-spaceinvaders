const PROJECTILE_WIDTH = 4
const PROJECTILE_HEIGHT = 12
const PROJECTILE_SPEED = 0.6

/**
 * Bullet pool system for efficient projectile management
 */
export class ProjectilePool {
  constructor(maxProjectiles = 50) {
    this.pool = []
    this.maxProjectiles = maxProjectiles
  }

  spawn({ x, y }) {
    let projectile = this.pool.find(p => !p.active)
    
    if (!projectile) {
      if (this.pool.length >= this.maxProjectiles) return null
      projectile = {
        x: 0,
        y: 0,
        width: PROJECTILE_WIDTH,
        height: PROJECTILE_HEIGHT,
        speed: PROJECTILE_SPEED,
        active: false,
      }
      this.pool.push(projectile)
    }

    projectile.x = x
    projectile.y = y
    projectile.active = true
    return projectile
  }

  update(delta) {
    for (const projectile of this.pool) {
      if (!projectile.active) continue
      
      projectile.y -= projectile.speed * delta
      
      // Deactivate if off-screen
      if (projectile.y + projectile.height < 0) {
        projectile.active = false
      }
    }
  }

  getActive() {
    return this.pool.filter(p => p.active)
  }

  deactivate(projectile) {
    projectile.active = false
  }

  reset() {
    for (const projectile of this.pool) {
      projectile.active = false
    }
  }
}
