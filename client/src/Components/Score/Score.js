import React from 'react'
import './score.css'

const Score = ({score, highScore})=> {
  console.log(score)
  console.log(highScore)
  return (
    <div>

      

        <h3>Score: {score}| Top Score: {highScore} </h3>
      
      
    </div>
  )
}

export default Score