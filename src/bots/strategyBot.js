class Bot {
  constructor() {
    this.dynamiteUsed = 0;
  }

  makeRandomMove() {
    return ['R', 'P', 'S'][Math.floor(Math.random() * 3)];
  }

  retaliate(opponentMove) {
    switch (opponentMove) {
      case "R":
        return "P";
      case "P":
        return "S";
      case "S":
        return "R";
      default:
        return this.makeRandomMove();
    }
  }

  makeMove(gamestate) {
    const { rounds } = gamestate;
    const lastRound = rounds[rounds.length - 1];
    if (!lastRound) {
      return this.makeRandomMove();
    }

    const lastRoundWasDraw = (lastRound.myMove === lastRound.opponentMove);
    if (lastRoundWasDraw && this.dynamiteUsed++ < 100) {
      const strategyPicker = Math.random();
      if (strategyPicker < 0.1) {
        return this.makeRandomMove();
      } else if (strategyPicker < 0.6) {
        return 'D';
      } else {
        return 'W';
      }
    }

    return this.retaliate(lastRound.opponentMove);
  }
}

module.exports = new Bot();
