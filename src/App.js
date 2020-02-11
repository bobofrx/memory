import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame, { FAKE_HOF} from './HallOfFame'
import HighScoreInput from './HighScoreInput';

const SIDE = 6
export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {
state = {
  cards: this.generateCards(),
  currentPair: [],
  guesses: 0,
  hallOfFame: null,
  matchedCardIndices: [],
}

  //cards = this.generateCards()

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  getFeedBackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)

    if(currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }

    if(currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }

    return indexMatched ? 'visible' : 'hidden'
  }

  // Arrow fx for binding
  handleCardClick = index => {
    const { currentPair } = this.state

    if(currentPair.length === 2){
      return 
    }

    if(currentPair.length === 0){
      this.setState({ currentPair: [index] })
      return
    }
    
    this.handleNewPairClosedBy(index)
  }

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[newPair[0]] === cards[newPair[1]]

    this.setState({ currentPair: newPair, guesses: newGuesses })

    if(matched){
      this.setState({ matchedCardIndices : [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
  }

  displayHallOfFame = (hallOfFame) => {
    this.setState({hallOfFame})
  }

  render() {
    const { cards, guesses, matchedCardIndices, hallOfFame } = this.state
    const won = matchedCardIndices.length === cards.length
    
    return (
      <div className="memory">
        
        {won && 
          (hallOfFame ? (
            <HallOfFame entries={hallOfFame} />
          ) : (
            <HighScoreInput guesses={guesses} onStored={this.displayHallOfFame} />
          ) )}
        {cards.map((card, index) => (
          <Card
          card={card}
          feedback={this.getFeedBackForCard(index)}
          index={index}
          key={index}
          onClick={this.handleCardClick}
          />
        ))}
        {won && <HallOfFame entries={FAKE_HOF} />}

      {/*
      <HighScoreInput guesses={guesses} />
        <Card card="😀" feedback="hidden" onClick={this.handleCardClick} />
        <Card card="🎉" feedback="justMatched" onClick={this.handleCardClick} />
        <Card
          card="💖"
          feedback="justMismatched"
          onClick={this.handleCardClick}
        />
        <Card card="🎩" feedback="visible" onClick={this.handleCardClick} />
        <Card card="🐶" feedback="hidden" onClick={this.handleCardClick} />
        <Card card="🐱" feedback="justMatched" onClick={this.handleCardClick} />
        {won && <p>GAGNÉ !</p>}
      */}
      </div>
    )
  }
}

export default App
