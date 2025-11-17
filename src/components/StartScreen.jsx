import PropTypes from 'prop-types'
import './StartScreen.css'

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="game-title">SPACE INVADERS</h1>
        <p className="game-subtitle">Defend Earth from the alien invasion!</p>
        <div className="controls">
          <h3>CONTROLS</h3>
          <p><kbd>←</kbd> <kbd>→</kbd> or <kbd>A</kbd> <kbd>D</kbd> - Move</p>
          <p><kbd>SPACE</kbd> or <kbd>↑</kbd> - Shoot</p>
        </div>
        <button className="start-button" onClick={onStart}>
          START GAME
        </button>
      </div>
    </div>
  )
}

StartScreen.propTypes = {
  onStart: PropTypes.func.isRequired,
}

export default StartScreen
