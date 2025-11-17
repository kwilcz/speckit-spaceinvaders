import PropTypes from 'prop-types'
import './ScoreDisplay.css'

const ScoreDisplay = ({ score }) => {
  return (
    <div className="score-display">
      <span className="score-label">SCORE:</span>
      <span className="score-value">{score.toString().padStart(5, '0')}</span>
    </div>
  )
}

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired,
}

export default ScoreDisplay
