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
    const games = {};

    for (let p1 = 0; p1 < bots.length; p1++) {
      const playerOne = bots[p1];
      games[playerOne.name] = {};
      for (let p2 = p1 + 1; p2 < bots.length; p2++) {
        const playerTwo = bots[p2];
        console.log(`=== ${playerOne.name} vs. ${playerTwo.name} ===`);
        const result = gameRunner.runGame(playerOne, playerTwo);
        const { playerOneScore, playerTwoScore, rounds } = result;
        if (playerOneScore === playerTwoScore) {
          console.log(`${playerOne.name} drew with ${playerTwo.name}: ${playerOneScore} - ${playerTwoScore}`);
        } else {
          const [winner, loser, winnerScore, loserScore] = playerOneScore > playerTwoScore ?
            [playerOne, playerTwo, playerOneScore, playerTwoScore] :
            [playerTwo, playerOne, playerTwoScore, playerOneScore];
          winner.wins++;
          const scoreDifference = winnerScore - loserScore;
          winner.scoreDifference += scoreDifference;
          loser.scoreDifference -= scoreDifference;
          console.log(`${winner.name} beat ${loser.name}: ${winnerScore} - ${loserScore}`);
        }
        console.log("");
        games[playerOne.name][playerTwo.name] = rounds;
      }
    }

    this.setState({ rankings: bots });
  }

  render() {
    const { rankings } = this.state;
    const rows = (rankings || [])
      .sort((p1, p2) => (p2.wins - p1.wins) || (p2.scoreDifference - p1.scoreDifference))
      .map((bot, i) => {
        return (
          <tr key={bot.name}>
            <td>{i + 1}.</td>
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
                <th></th>
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
