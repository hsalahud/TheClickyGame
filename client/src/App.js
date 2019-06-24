import React, { Component } from 'react';
import './App.css';
import Logo from './Components/Logo'
import Score from './Components/Score'
import Correct from './Components/Correct'
import Slide from '@material-ui/core/Slide';
import Characters from './Components/Characters'

class App extends Component {
  state = {
    correct: true,
    openCorrect: false,
    openWrong: false,
    score: 0,
    highScore: 0,
    characters: [
      {
        path: 'alter-egos-professor-chaos.png',
        id: 'profChaos',
        selected: false
      },
      {
        path: 'general-disarray.png',
        id: 'genDisarray',
        selected: false
      },
      {
        path: 'mosquito.png',
        id: 'mosquito',
        selected: false
      },
      {
        path: 'mysterion.png',
        id: 'mysterion',
        selected: false
      },
      {
        path: 'superheroes-call-girl.png',
        id: 'callGirl',
        selected: false
      },
      {
        path: 'superheroes-captain-diabetes.png',
        id: 'capDiabetes',
        selected: false
      },
      {
        path: 'superherores-fastpass.png',
        id: 'fastPass',
        selected: false
      },
      {
        path: 'superherores-prof-timmy.png',
        id: 'profTimmy',
        selected: false
      },
      {
        path: 'superherores-super-craig.png',
        id: 'superCraig',
        selected: false
      },
      {
        path: 'superherores-wonder-tweek.png',
        id: 'wonderTweek',
        selected: false
      },
      {
        path: 'the-coon.png',
        id: 'theCoon',
        selected: false
      },
      {
        path: 'the-human-kite.png',
        id: 'humanKite',
        selected: false
      },
      {
        path: 'toolshed.png',
        id: 'toolshed',
        selected: false
      },
      {
        path: 'tupperware.png',
        id: 'tupperware',
        selected: false
      },
      {
        path: 'Iron-maiden.png',
        id: 'ironMaiden',
        selected: false
      },
      {
        path: 'Mint-berry-crunch.png',
        id: 'mintBerryCrunch',
        selected: false
      }
    ]
  }

  handleClose = (event, reason) => {


    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openCorrect: false, openWrong: false });

  }

  handleTriggerFeedback = event => {
    if (event.target.selected === false) {
      this.setState({ correct: true, openCorrect: true, openWrong: false })
    } else if (event.target.selected === true) {
      this.setState({ correct: false, openCorrect: false, openWrong: true })
    }
    else {
      this.setState({ correct: false, openCorrect: false, openWrong: false })
    }
    console.log(this.state)
  }

  handleHighScore = _ => {
    this.setState(state => {
      return{
        highScore: this.state.score>=this.state.highScore ? this.state.score : this.state.highScore
      }
    })
     
  }

  handleScore = _ => {
    this.setState(state => {
      return{
        score: this.state.score+1,
        correct: true
      }
    }, () => {this.handleHighScore()
    console.log(this.state.characters)
    })
     
  }

  handleSelected = event => {

    let characters = JSON.parse(JSON.stringify(this.state.characters))
    if(event.target.selected===false){
      const character = characters.filter(character => character.id === event.target.id)[0]
      character.selected=true
      // console.log(character)
      // console.log(characters)
      // console.log(this.state.characters)
      this.setState({characters})
      // console.log(this.state.characters)
      // this.handleHighScore()
      this.handleScore()
      this.handleHighScore()
      // console.log(this.state)
      
     
    }else {
      const trueCharacters = characters.filter(character => character.id === event.target.id)
      trueCharacters.forEach(character => {
        character.selected=false
      })
      this.setState({characters, score: 0, correct: false})
      // console.log(this.state.characters)

      
    }
    
  }

  handleOnClick = event => {

    this.handleTriggerFeedback(event)
    this.randomizeCharacters()
    this.handleSelected(event)

  }

  shuffle =  (array) => {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  
  };

  randomizeCharacters = _ => {
    let characters = this.state.characters

    this.shuffle(characters)

    this.setState({characters})
  }

  componentDidMount = _ => {
    this.randomizeCharacters()
  }



  render() {
    const { correct, openCorrect, openWrong, characters, score, highScore } = this.state

    return (
      <>
        <Correct correct={correct} handleClose={this.handleClose} openCorrect={openCorrect} openWrong={openWrong} handleCloseSnackBar={this.handleCloseSnackBar} />
        <Logo />
        <Score score={score} highScore={highScore} />
        <Characters characters={characters} handleOnClick={this.handleOnClick} correct = {correct} />
        {/* <button id='hello' className='buttons' onClick={this.handleClose}>
          <h1 id='hello'>HELLO</h1>
        </button>
        <button id='bye' className='buttons' onClick={this.handleClose}>
          <h1 id='bye'>BYE</h1>
        </button> */}
      </>
    )
  }
}

export default App
