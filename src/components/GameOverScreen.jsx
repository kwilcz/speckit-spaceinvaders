import PropTypes from 'prop-types'
import './GameOverScreen.css'

const GameOverScreen = ({ score, onRestart }) => {
  return (
    <div className="gameover-screen">
      <div className="gameover-content">
        <h1 className="gameover-title">GAME OVER</h1>
        <p className="gameover-message">The invaders have reached Earth!</p>
        <div className="final-score">
          <h2>FINAL SCORE</h2>
          <p className="score-value">{score.toString().padStart(5, '0')}</p>
        </div>
        <button className="restart-button" onClick={onRestart}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  )
}

GameOverScreen.propTypes = {
  score: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
}

export default GameOverScreen
