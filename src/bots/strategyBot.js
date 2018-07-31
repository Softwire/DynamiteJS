const RETALIATE_TO_DYNAMITE_WITH_WATERBALLOON_PROBABILITY = 0.4;

const USE_DYNAMITE_AFTER_DRAW_PROBABILITY = 0.5;
const MAKE_RANDOM_MOVE_AFTER_DRAW_PROBABILITY = 0.1;

class Bot {
  makeRandomMove() {
    return ['R', 'P', 'S'][Math.floor(Math.random() * 3)];
  }

  retaliate(opponentMove) {
    switch (opponentMove) {
      case 'R':
        return 'P';
      case 'P':
        return 'S';
      case 'S':
        return 'R';
      case 'D':
        const strategyPicker = Math.random();
        return strategyPicker < RETALIATE_TO_DYNAMITE_WITH_WATERBALLOON_PROBABILITY ? 'W' : this.makeRandomMove();
      default:
        return this.makeRandomMove();
    }
  }

  useDynamiteIfAvailable(rounds) {
    const dynamiteUsed = rounds.filter(r => r.myMove === 'D').length;
    return dynamiteUsed < 100 ? 'D' : this.makeRandomMove();
  }

  useWaterballoonIfOpponentHasDynamite(rounds) {
    const oppponentDynamiteUsed = rounds.filter(r => r.opponentMove === 'D').length;
    return oppponentDynamiteUsed < 100 ? 'W' : this.makeRandomMove();
  }

  makeMove(gamestate) {
    const { rounds } = gamestate;
    const lastRound = rounds[rounds.length - 1];
    if (!lastRound) {
      return this.makeRandomMove();
    }

    const lastRoundWasDraw = (lastRound.myMove === lastRound.opponentMove);
    if (lastRoundWasDraw) {
      const strategyPicker = Math.random();
      if (strategyPicker < MAKE_RANDOM_MOVE_AFTER_DRAW_PROBABILITY) {
        return this.makeRandomMove();
      } else if ((strategyPicker - MAKE_RANDOM_MOVE_AFTER_DRAW_PROBABILITY) < USE_DYNAMITE_AFTER_DRAW_PROBABILITY) {
        return this.useDynamiteIfAvailable(rounds);
      } else {
        return this.useWaterballoonIfOpponentHasDynamite(rounds);
      }
    }

    return this.retaliate(lastRound.opponentMove);
  }
}

module.exports = new Bot();
