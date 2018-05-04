import React, { Component } from 'react';
import gameRunner from './gameRunner';
import './League.css';

class League extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { bots } = this.props;
    this.runLeague(bots);
  }

  runLeague(bots) {
    for (let p1 = 0; p1 < bots.length; p1++) {
      const playerOne = bots[p1];
      for (let p2 = p1 + 1; p2 < bots.length; p2++) {
        const playerTwo = bots[p2];
        const result = gameRunner.runGame(playerOne, playerTwo);
        const { playerOneScore, playerTwoScore } = result;
        if (playerOneScore === playerTwoScore) {
          continue;
        }
        const [winner, loser] = playerOneScore > playerTwoScore ? [playerOne, playerTwo] : [playerTwo, playerOne];
        winner.wins++;
        const scoreDifference = Math.abs(playerOneScore - playerTwoScore);
        winner.scoreDifference += scoreDifference;
        loser.scoreDifference -= scoreDifference;
        console.log(`${winner.name} beat ${loser.name}.`)
      }
    }

    this.setState({ rankings: bots });
  }

  render() {
    const { rankings } = this.state;
    const rows = (rankings || [])
      .sort((p1, p2) => (p2.wins - p1.wins) || (p2.scoreDifference - p1.scoreDifference))
      .map(bot => {
        return (
          <tr key={bot.name}>
            <td>{bot.name}</td>
            <td>{bot.wins}</td>
            <td>{bot.scoreDifference}</td>
          </tr>
        );
      });
    return (
      <div className="League">
        {rankings ?
          <table className="League-table">
            <thead>
              <tr>
                <th>Bot</th>
                <th>Wins</th>
                <th>+/-</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table> :
          <p>Running league matches…</p>
        }
      </div>
    );
  }
}

export default League;
