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

  renderRows(game) {
    const { playerOne, playerTwo, rounds } = game;

    return rounds.map((round, i) => {
      const { p1, p2, points, wasWinningMove } = round;

      const playerOneWon = wasWinningMove(p1);
      const playerTwoWon = wasWinningMove(p2);
      const wasDraw = !playerOneWon && !playerTwoWon;

      const getPlayerClass = playerWon => (playerWon && 'game-round-winner') || (wasDraw && 'game-round-draw') || 'game-round-loser';

      return (
        <tr key={`${playerOne.name}-${playerTwo.name}-${i}`}>
          <td>{i + 1}</td>
          <td className={getPlayerClass(playerOneWon)}>{p1}</td>
          <td className={getPlayerClass(playerTwoWon)}>{p2}</td>
          <td style={{ background: `rgba(128, 128, 128, ${points/10})` }}>{points}</td>
        </tr>
      );
    });
  }

  render() {
    const { game } = this.props;
    const { expanded } = this.state;
    const { playerOne, playerTwo } = game;

    return (
      <div>
        <h3>
          {playerOne.name} vs. {playerTwo.name}
          <button className="expand-toggle" onClick={() => this.toggleExpanded()}>
            {expanded ? '-' : '+'}
          </button>
        </h3>
        {expanded &&
          <table className="game-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>{playerOne.name}</th>
                <th>{playerTwo.name}</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows(game)}
            </tbody>
          </table>
        }
      </div>
    );
  }
}
