import React, { Component } from 'react';
import gameRunner from './gameRunner';
import './League.css';
import Game from './Game';
import LeagueTable from './LeagueTable';

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
    const games = [];

    for (let p1 = 0; p1 < bots.length; p1++) {
      const playerOne = bots[p1];
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
        games.push({ playerOne, playerTwo, rounds });
      }
    }

    this.setState({ bots, games });
  }

  render() {
    const { bots, games } = this.state;
    return (
      <div className="League">
        {bots ?
          (<React.Fragment>
            <h2>Results</h2>
            <LeagueTable bots={bots} />
            <h2>Games</h2>
            {games.map(game => <Game key={`${game.playerOne.name}-${game.playerTwo.name}`} game={game} />)}
          </React.Fragment>) :
          <p>Running league matches…</p>
        }
      </div>
    );
  }
}

export default League;
