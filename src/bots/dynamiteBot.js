class Bot {
  makeRandomMove() {
    return ['R', 'P', 'S'][Math.floor(Math.random() * 3)];
  }

  makeMove(gamestate) {
    const roundNumber = gamestate.rounds.length + 1;
    return roundNumber <= 100 ? 'D' : this.makeRandomMove();
  }
}

module.exports = new Bot();
