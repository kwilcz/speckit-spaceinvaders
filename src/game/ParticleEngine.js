const PARTICLE_LIFETIME = 800 // ms
const PARTICLE_COUNT = 15
const PARTICLE_SPEED_MIN = 0.1
const PARTICLE_SPEED_MAX = 0.3

/**
 * Particle system for explosion effects
 */
export class ParticleEngine {
  constructor() {
    this.particles = []
  }

  createExplosion(x, y, color = '#4ade80') {
    const colors = [color, '#22d3ee', '#fbbf24', '#f87171']
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.5
      const speed = PARTICLE_SPEED_MIN + Math.random() * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN)
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: PARTICLE_LIFETIME,
        maxLife: PARTICLE_LIFETIME,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
      })
    }
  }

  update(delta) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i]
      
      particle.x += particle.vx * delta
      particle.y += particle.vy * delta
      particle.life -= delta
      
      // Apply gravity
      particle.vy += 0.0003 * delta
      
      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }

  render(ctx) {
    for (const particle of this.particles) {
      const alpha = particle.life / particle.maxLife
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.fillRect(
        Math.floor(particle.x),
        Math.floor(particle.y),
        particle.size,
        particle.size
      )
    }
    ctx.globalAlpha = 1
  }

  reset() {
    this.particles = []
  }
}
