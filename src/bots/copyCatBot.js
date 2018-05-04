class Bot {
  makeMove(gamestate) {
    const lastRound = gamestate.rounds.pop();
    return lastRound ? lastRound.p2 : 'R';
  }
}

module.exports = new Bot();
