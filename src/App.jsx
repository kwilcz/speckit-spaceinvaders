import { useState, useEffect, useRef, useCallback } from 'react'
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
  const gameStateRef = useRef('start')

  // Initialize engine once
  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = createGameEngine()
    }
  }, [])

  // Update engine's input state (doesn't cause state change)
  useEffect(() => {
    if (engineRef.current && gameStateRef.current === 'playing') {
      engineRef.current.setInputState(inputState)
    }
  }, [inputState])

  // Sync game state changes from engine
  useEffect(() => {
    if (engineRef.current && gameStateRef.current === 'playing') {
      const intervalId = setInterval(() => {
        const currentScore = engineRef.current.getScore()
        const currentEngineState = engineRef.current.getGameState()
        
        setScore(currentScore)
        
        // Only update gameState if engine state changed
        if (currentEngineState !== gameStateRef.current) {
          gameStateRef.current = currentEngineState
          setGameState(currentEngineState)
        }
      }, 50)
      return () => clearInterval(intervalId)
    }
  }, [gameState])

  const handleCanvasReady = useCallback((canvas) => {
    if (engineRef.current) {
      engineRef.current.attachCanvas(canvas)
    }
  }, [])

  const handleStart = useCallback(() => {
    gameStateRef.current = 'playing'
    setGameState('playing')
    if (engineRef.current) {
      engineRef.current.setGameState('playing')
    }
  }, [])

  const handleRestart = useCallback(() => {
    setScore(0)
    if (engineRef.current) {
      engineRef.current.initGame()
      engineRef.current.setGameState('playing')
    }
    gameStateRef.current = 'playing'
    setGameState('playing')
  }, [])

  const handleNextLevel = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.nextLevel()
      engineRef.current.setGameState('playing')
    }
    gameStateRef.current = 'playing'
    setGameState('playing')
  }, [])

  return (
    <div className="app-container">
      {gameState === 'playing' && <ScoreDisplay score={score} />}
      <GameCanvas width={800} height={600} onReady={handleCanvasReady} />
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'gameOver' && (
        <GameOverScreen score={score} onRestart={handleRestart} />
      )}
      {gameState === 'levelComplete' && (
        <GameOverScreen 
          score={score} 
          onRestart={handleNextLevel} 
          levelComplete 
          level={engineRef.current?.getLevel()}
        />
      )}
    </div>
  )
}

export default App
