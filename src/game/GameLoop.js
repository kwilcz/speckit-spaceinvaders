const FRAME_DURATION = 1000 / 60

/**
 * PSEUDO-CODE
 * 1. Capture the timestamp from requestAnimationFrame.
 * 2. Compute delta time and accumulate lag.
 * 3. Call engine.update(delta) while lag >= FRAME_DURATION for fixed-step updates.
 * 4. Call engine.render(interpolation) once per RAF tick.
 * 5. Allow external callers to start/stop the loop for pause/resume states.
 */
export const createGameLoop = ({
  onUpdate,
  onRender,
  fpsCap = 60,
}) => {
  let animationFrameId = null
  let lastTime = 0
  let accumulator = 0
  const step = 1000 / fpsCap

  const frame = (time) => {
    animationFrameId = window.requestAnimationFrame(frame)
    const delta = time - lastTime || FRAME_DURATION
    lastTime = time
    accumulator += delta

    while (accumulator >= step) {
      if (typeof onUpdate === 'function') {
        onUpdate(step)
      }
      accumulator -= step
    }

    if (typeof onRender === 'function') {
      onRender(accumulator / step)
    }
  }

  return {
    start() {
      if (animationFrameId !== null) return
      lastTime = performance.now()
      animationFrameId = window.requestAnimationFrame(frame)
    },
    stop() {
      if (animationFrameId === null) return
      window.cancelAnimationFrame(animationFrameId)
      animationFrameId = null
      accumulator = 0
      lastTime = 0
    },
    isRunning() {
      return animationFrameId !== null
    },
  }
}
