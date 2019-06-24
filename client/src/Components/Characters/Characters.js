import React from 'react';
import Grid from '@material-ui/core/Grid';
import './characters.css'
import { Container } from '@material-ui/core';

const Characters = ({ characters, handleOnClick, correct}) => {



  return (
    <div className={!correct ? 'root makeSelection' : 'root'}>
      <Grid container
        xs={2}
      ></Grid>

      <Grid container
        xs={8}
      >
        {
          characters.map(character => (

            <Grid item xs={3}
              container
              // direction="row"
              justify="center"
              alignItems="center"
              key={character.id}
              value={character.selected}
            >
              <img src={require(`../../assets/images/characters/${character.path}`)} alt='character' id={character.id} className='characters' selected = {character.selected} onClick = {handleOnClick}/>
            </Grid>

          ))
        }
      </Grid>

      <Grid container
        xs={2}
      ></Grid>
    </div>

  )

}

export default Characters