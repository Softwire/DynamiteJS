class Bot {
  makeRandomMove() {
    return ['R', 'P', 'S'][Math.floor(Math.random() * 3)];
  }

  makeMove(gamestate) {
    const { rounds } = gamestate;
    const lastRound = rounds[rounds.length - 1];
    if (!lastRound) {
      return this.makeRandomMove();
    }

    const dynamiteUsed = rounds.filter(r => r.myMove === 'D').length;
    const lastRoundWasDraw = (lastRound.myMove === lastRound.opponentMove);
    if (lastRoundWasDraw && (dynamiteUsed < 100)) {
      return 'D';
    }

    return this.makeRandomMove();
  }
}

module.exports = new Bot();
