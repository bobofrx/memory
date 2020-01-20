import React, { Component } from 'react'
import './App.css'
import GuessCount from './GuessCount';
import Card from './Card';

class App extends Component {
  render() {
    return (
    <div className="memory">
      <GuessCount guesses={0}/>
      <Card card="😀" feedback="hidden" onClick={this.handleCardClick} />
      <Card card="🎉" feedback="justMatched" onClick={this.handleCardClick} />
      <Card card="💖" feedback="justMismatched" onClick={this.handleCardClick} />
      <Card card="🎩" feedback="visible" onClick={this.handleCardClick} />
      <Card card="🐶" feedback="hidden" onClick={this.handleCardClick} />
      <Card card="🐱" feedback="justMatched" onClick={this.handleCardClick} />
    </div>
    )
  }

  handleCardClick(card) {
    console.log(card, 'clicked')
  }
}

export default App
