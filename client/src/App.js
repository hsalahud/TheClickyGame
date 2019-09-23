import React, { Component } from 'react';
import './App.css';
import Logo from './Components/Logo'
import Score from './Components/Score'
import Correct from './Components/Correct'
import Slide from '@material-ui/core/Slide';
import Characters from './Components/Characters'

class App extends Component {
  state = {
    //correct will turn on the shake div styling if it is false
    correct: true,
    //a correct answer popup will appear when openCorrect is set to true
    openCorrect: false,
    //a wrong answer popup will appear when openWrong is set to true
    openWrong: false,
    //tracking our current score
    score: 0,
    //Keeping track of the highest score we achieved
    highScore: 0,
    //our characters as a list of objects
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

  //I got this function from material UI. When the correct/wrong answer popups have to close, they run this function which sets openCorrect and openWrong to false
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openCorrect: false, openWrong: false });
  }

  //This function determines whether we will trigger openCorrect or openWrong feedback
  handleTriggerFeedback = event => {
    //each character has a selected key which has either true or false as the value. True means it was selected previously and so you will get the wrong answer feedback.
    //false means it was never selected and you will get the correct answer feedback.
    //at the same time we set our value of correct, which will apply the shake div styuling when we had previously clicked on a character
    if (event.target.selected === false) {
      this.setState({ correct: true, openCorrect: true, openWrong: false })
    } else if (event.target.selected === true) {
      this.setState({ correct: false, openCorrect: false, openWrong: true })
    }
    else {
      this.setState({ correct: false, openCorrect: false, openWrong: false })
    }
  }

  //This function keeps track of our high score.
  handleHighScore = _ => {
    this.setState(state => {
      return{
        highScore: this.state.score>=this.state.highScore ? this.state.score : this.state.highScore
      }
    })
     
  }

  // https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/
  //This function handles our current score.
  //I used this form of handling state so that it is no longer asynchronous and that it is updating the state given the current value
  //The website above points that we should do this if we are changing state when it depends on the current state
  handleScore = _ => {
    this.setState(state => {
      return{
        score: this.state.score+1,
        correct: true
      }
    }, () => {this.handleHighScore()
    // console.log(this.state.characters)
    })
     
  }

//This function changes the value of the key selected for each character you select to true. It only does that if it was previously set at false
//if it is set to true and you click on it, then you lose. Here we reset the score to 0
  handleSelected = event => {
    let characters = JSON.parse(JSON.stringify(this.state.characters))
    // this.randomizeCharacters()
    if(event.target.selected===false){
      const character = characters.filter(character => character.id === event.target.id)[0]
      character.selected=true
      this.setState({characters}, () => {this.randomizeCharacters()})
      //every time we selected a character that was not previously selected, we run the functions which handle scores
      this.handleScore()
      this.handleHighScore() 
      // this.randomizeCharacters()
    }else {
      characters.forEach(character => {
        character.selected=false
      })
      this.setState({characters, score: 0, correct: false}, () => {this.randomizeCharacters()}) 
      // this.randomizeCharacters()
    }
  }

//this function runs a series of functions (created above) when we click on a charact
  handleOnClick = event => {
    this.handleTriggerFeedback(event)
    //this function is defined below
    // this.randomizeCharacters()
    this.handleSelected(event)
  }

//I got this function from https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
//it shuffles the elements in an array
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
  console.log("shuffle!")
    return array;
  
  };

  //we use the shuffle function and pass in our characters in it.
  randomizeCharacters = _ => {
    console.log('hi')
    let characters = JSON.parse(JSON.stringify(this.state.characters))

    this.shuffle(characters)

    this.setState({characters: characters})
    console.log(this.state.characters)
  }

  //This ensures that our array of characters is always shuffled when we mount the component/when the div loads
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
      </>
    )
  }
}

export default App
