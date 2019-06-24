import React from 'react'
import Grid from '@material-ui/core/Grid';
import './logo.css'

const Logo = _ => {
  return (
    <div className='root'>
    <Grid item xs={1}>
    
    </Grid>
    <Grid item xs={10}>
     <div id='logoContainer'>
      <img src={require('../../assets/images/logo/logo.png')} alt='logo' id='logo'/>
      <h5 id='subtitle'>A Memory Game</h5>
      </div>
    </Grid>
    <Grid item xs={1}>
     
    </Grid>
  </div>
  )
}

export default Logo