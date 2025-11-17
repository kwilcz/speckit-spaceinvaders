/**
 * AABB Collision Detection
 */
export const checkCollision = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

/**
 * Detect collisions between projectiles and enemies
 */
export class CollisionDetector {
  detectProjectileEnemyCollisions(projectiles, enemies) {
    const collisions = []

    for (const projectile of projectiles) {
      if (!projectile.active) continue

      for (const enemy of enemies) {
        if (!enemy.alive) continue

        if (checkCollision(projectile, enemy)) {
          collisions.push({
            projectile,
            enemy,
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height / 2,
          })
        }
      }
    }

    return collisions
  }

  detectPlayerEnemyCollisions(player, enemies) {
    for (const enemy of enemies) {
      if (!enemy.alive) continue
      
      if (checkCollision(player, enemy)) {
        return true
      }
    }
    return false
  }
}
