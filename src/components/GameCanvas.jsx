import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './GameCanvas.css'

/**
 * PSEUDO-CODE
 * 1. Initialize an HTMLCanvasElement via ref and store its 2D context.
 * 2. Notify the parent hook when the canvas is ready so the GameEngine can bind.
 * 3. Resize canvas responsively when container dimensions change (future enhancement).
 * 4. Expose imperative methods (e.g., to trigger screen shake) via refs if needed.
 */
const GameCanvas = ({ width = 800, height = 600, onReady }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || typeof onReady !== 'function') return
    onReady(canvasRef.current)
  }, [onReady])

  return (
    <canvas
      ref={canvasRef}
      className="game-canvas"
      width={width}
      height={height}
      role="presentation"
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  )
}

GameCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  onReady: PropTypes.func,
}

export default GameCanvas
