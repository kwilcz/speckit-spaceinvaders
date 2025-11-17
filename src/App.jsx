import { useState, useEffect, useRef } from 'react'
import GameCanvas from './components/GameCanvas'
import StartScreen from './components/StartScreen'
import GameOverScreen from './components/GameOverScreen'
import ScoreDisplay from './components/ScoreDisplay'
import { createGameEngine } from './game/GameEngine'
import { useInputHandler } from './game/InputHandler'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('start')
  const [score, setScore] = useState(0)
  const engineRef = useRef(null)
  const { inputState } = useInputHandler()

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = createGameEngine()
    }
  }, [])

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setInputState(inputState)
    }
  }, [inputState])

  useEffect(() => {
    if (engineRef.current && gameState === 'playing') {
      const intervalId = setInterval(() => {
        const currentScore = engineRef.current.getScore()
        const currentState = engineRef.current.getGameState()
        setScore(currentScore)
        if (currentState !== gameState) {
          setGameState(currentState)
        }
      }, 100)
      return () => clearInterval(intervalId)
    }
  }, [gameState])

  const handleCanvasReady = (canvas) => {
    if (engineRef.current) {
      engineRef.current.attachCanvas(canvas)
    }
  }

  const handleStart = () => {
    setGameState('playing')
    if (engineRef.current) {
      engineRef.current.setGameState('playing')
    }
  }

  const handleRestart = () => {
    setScore(0)
    setGameState('playing')
    if (engineRef.current) {
      engineRef.current.setGameState('playing')
    }
  }

  return (
    <div className="app-container">
      {gameState === 'playing' && <ScoreDisplay score={score} />}
      <GameCanvas width={800} height={600} onReady={handleCanvasReady} />
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'gameOver' && (
        <GameOverScreen score={score} onRestart={handleRestart} />
      )}
    </div>
  )
}

export default App
