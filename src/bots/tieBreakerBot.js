class Bot {
  constructor() {
    this.dynamiteUsed = 0;
  }

  makeRandomMove() {
    return ['R', 'P', 'S'][Math.floor(Math.random() * 3)];
  }

  makeMove(gamestate) {
    const { rounds } = gamestate;
    const lastRound = rounds[rounds.length - 1];
    if (!lastRound) {
      return this.makeRandomMove();
    }

    const lastRoundWasDraw = (lastRound.myMove === lastRound.opponentMove);
    if (lastRoundWasDraw && (this.dynamiteUsed++ < 100)) {
      return 'D';
    }

    return this.makeRandomMove();
  }
}

module.exports = new Bot();
