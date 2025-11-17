const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 32
const ENEMY_SPEED = 0.1
const ENEMY_DESCENT = 24
const GRID_COLS = 10
const GRID_ROWS = 4
const GRID_SPACING_X = 60
const GRID_SPACING_Y = 50
const GRID_START_X = 80
const GRID_START_Y = 60

/**
 * Enemy grid manager
 */
export class EnemyGrid {
  constructor(stageWidth, stageHeight) {
    this.stageWidth = stageWidth
    this.stageHeight = stageHeight
    this.enemies = []
    this.direction = 1 // 1 = right, -1 = left
    this.speed = ENEMY_SPEED
    this.moveTimer = 0
    this.moveInterval = 800 // ms between horizontal moves
    this.initialize()
  }

  initialize() {
    this.enemies = []
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        this.enemies.push({
          x: GRID_START_X + col * GRID_SPACING_X,
          y: GRID_START_Y + row * GRID_SPACING_Y,
          width: ENEMY_WIDTH,
          height: ENEMY_HEIGHT,
          alive: true,
          row,
          col,
        })
      }
    }
  }

  update(delta) {
    this.moveTimer += delta

    if (this.moveTimer >= this.moveInterval) {
      this.moveTimer = 0
      this.moveHorizontal()
    }
  }

  moveHorizontal() {
    const aliveEnemies = this.enemies.filter(e => e.alive)
    if (aliveEnemies.length === 0) return

    // Find leftmost and rightmost alive enemies
    let leftmost = Infinity
    let rightmost = -Infinity

    for (const enemy of aliveEnemies) {
      if (enemy.x < leftmost) leftmost = enemy.x
      if (enemy.x + enemy.width > rightmost) rightmost = enemy.x + enemy.width
    }

    // Check if we need to change direction and descend
    let shouldDescend = false
    if (this.direction === 1 && rightmost + GRID_SPACING_X / 2 >= this.stageWidth) {
      this.direction = -1
      shouldDescend = true
    } else if (this.direction === -1 && leftmost - GRID_SPACING_X / 2 <= 0) {
      this.direction = 1
      shouldDescend = true
    }

    // Move all alive enemies
    for (const enemy of aliveEnemies) {
      if (shouldDescend) {
        enemy.y += ENEMY_DESCENT
      } else {
        enemy.x += this.direction * (GRID_SPACING_X / 2)
      }
    }
  }

  getAlive() {
    return this.enemies.filter(e => e.alive)
  }

  killEnemy(enemy) {
    enemy.alive = false
  }

  hasReachedBottom(bottomThreshold) {
    const aliveEnemies = this.getAlive()
    for (const enemy of aliveEnemies) {
      if (enemy.y + enemy.height >= bottomThreshold) {
        return true
      }
    }
    return false
  }

  reset() {
    this.direction = 1
    this.moveTimer = 0
    this.initialize()
  }
}
