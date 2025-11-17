import PropTypes from 'prop-types'
import './GameOverScreen.css'

const GameOverScreen = ({ score, onRestart, victory, levelComplete, level }) => {
  let title, message, buttonText, className

  if (levelComplete) {
    title = `LEVEL ${level} COMPLETE!`
    message = 'All invaders defeated!'
    buttonText = `CONTINUE TO LEVEL ${level + 1}`
    className = 'level-complete'
  } else if (victory) {
    title = 'VICTORY!'
    message = 'You have successfully defended Earth!'
    buttonText = 'PLAY AGAIN'
    className = 'victory'
  } else {
    title = 'GAME OVER'
    message = 'The invaders have reached Earth!'
    buttonText = 'PLAY AGAIN'
    className = 'defeat'
  }

  return (
    <div className={`gameover-screen ${className}`}>
      <div className="gameover-content">
        <h1 className="gameover-title">{title}</h1>
        <p className="gameover-message">{message}</p>
        <div className="final-score">
          <h2>SCORE</h2>
          <p className="score-value">{score.toString().padStart(5, '0')}</p>
        </div>
        <button className="restart-button" onClick={onRestart}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

GameOverScreen.propTypes = {
  score: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  victory: PropTypes.bool,
  levelComplete: PropTypes.bool,
  level: PropTypes.number,
}

GameOverScreen.defaultProps = {
  victory: false,
  levelComplete: false,
  level: 1,
}

export default GameOverScreen
