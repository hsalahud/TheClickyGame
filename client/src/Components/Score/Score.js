import React from 'react'
import './score.css'

const Score = ({score, highScore})=> {
  return (
    <div>

      

        <h3>Score: {score}| Top Score: {highScore} </h3>
      
      
    </div>
  )
}

export default Score