import { useEffect, useState } from 'react'

/**
 * PSEUDO-CODE
 * 1. Listen for keydown / keyup events on window.
 * 2. Map left/right/space keys into a flat object { left, right, shoot }.
 * 3. Debounce shoot input so player cannot fire infinitely (later enhancement).
 * 4. Provide reset() helper when game restarts.
 */
export const useInputHandler = () => {
  const [inputState, setInputState] = useState({
    left: false,
    right: false,
    shoot: false,
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          setInputState((prev) => ({ ...prev, left: true }))
          break
        case 'ArrowRight':
        case 'KeyD':
          setInputState((prev) => ({ ...prev, right: true }))
          break
        case 'ArrowUp':
        case 'Space':
          setInputState((prev) => ({ ...prev, shoot: true }))
          break
        default:
      }
    }

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          setInputState((prev) => ({ ...prev, left: false }))
          break
        case 'ArrowRight':
        case 'KeyD':
          setInputState((prev) => ({ ...prev, right: false }))
          break
        case 'ArrowUp':
        case 'Space':
          setInputState((prev) => ({ ...prev, shoot: false }))
          break
        default:
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const resetInput = () => {
    setInputState({ left: false, right: false, shoot: false })
  }

  return { inputState, resetInput }
}
