import React from 'react';

function LeagueTable(props) {
  const { bots } = props;
  const rows = (bots || [])
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
      </table>
    </div>
  );
}

export default LeagueTable;
