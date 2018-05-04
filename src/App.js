import React, { Component } from 'react';
import bots from './bots';
import logo from './logo.svg';
import './App.css';
import League from './League';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dynamite!</h1>
        </header>
        <League bots={bots} />
      </div>
    );
  }
}

export default App;
