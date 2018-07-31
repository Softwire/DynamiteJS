import React, { Component } from 'react';
import './Game.css';

export default class Game extends Component {
  constructor() {
    super();
    this.state = { expanded: false };
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { game } = this.props;
    const { expanded } = this.state;
    const { playerOne, playerTwo, rounds } = game;
    const rows = !expanded ? [] : rounds.map((round, i) => {
      return (
        <li key={`${playerOne.name}-${playerTwo.name}-${i}`} className="game">
          {'{'} {playerOne.name}: {round.p1}, {playerTwo.name}: {round.p2} {'}'}
        </li>
      );
    });
    return (
      <div key={`${playerOne.name}-${playerTwo.name}`}>
        <h3>
          {playerOne.name} vs. {playerTwo.name}
          <button className="expand-toggle" onClick={() => this.toggleExpanded()}>
            {expanded ? '-' : '+'}
          </button>
        </h3>
        <ol>
          {rows}
        </ol>
      </div>
    );
  }
}
