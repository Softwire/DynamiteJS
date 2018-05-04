const WINNING_SCORE = 1000;
const DYNAMITE_LIMIT = 100;

const DRAW = 0;
const PLAYER_ONE_WIN = 1;
const PLAYER_TWO_WIN = 2;

class gameRunner {
  runGame(playerOne, playerTwo) {
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let playerOneDynamiteUsed = 0;
    let playerTwoDynamiteUsed = 0;
    let rounds = [];
    let playerOneRounds = [];
    let playerTwoRounds = [];
    let currentDrawStreak = 0;
    while (playerOneScore < WINNING_SCORE && playerTwoScore < WINNING_SCORE && rounds.length < WINNING_SCORE * 5) {
      const playerOneMove = this.getNextMove(playerOne, playerOneRounds);
      const playerTwoMove = this.getNextMove(playerTwo, playerTwoRounds);
      rounds.push({ p1: playerOneMove, p2: playerTwoMove });
      playerOneRounds.push({ myMove: playerOneMove, opponentMove: playerTwoMove });
      playerTwoRounds.push({ myMove: playerTwoMove, opponentMove: playerOneMove });

      // Check moves are valid.
      if (playerOneMove === null && playerTwoMove === null) {
        break;
      } else if (playerOneMove === null) {
        playerTwoScore = WINNING_SCORE;
        break;
      } else if (playerTwoMove === null) {
        playerOneScore = WINNING_SCORE;
        break;
      }

      // Check dynamite count is not exceeded.
      playerOneDynamiteUsed += (playerOneMove === "D");
      playerTwoDynamiteUsed += (playerTwoMove === "D");
      if (playerOneDynamiteUsed > DYNAMITE_LIMIT && playerTwoDynamiteUsed > DYNAMITE_LIMIT) {
        break;
      } else if (playerOneDynamiteUsed > DYNAMITE_LIMIT) {
        playerTwoScore = WINNING_SCORE;
        break;
      } else if (playerTwoDynamiteUsed > DYNAMITE_LIMIT) {
        playerOneScore = WINNING_SCORE;
        break;
      }

      // Resolve valid round.
      const result = this.resolveRound(playerOneMove, playerTwoMove);
      const pointsForWin = currentDrawStreak + 1;
      switch (result) {
        case DRAW:
          currentDrawStreak += 1;
          break;
        case PLAYER_ONE_WIN:
          playerOneScore += pointsForWin;
          currentDrawStreak = 0;
          break;
        case PLAYER_TWO_WIN:
          playerTwoScore += pointsForWin;
          currentDrawStreak = 0;
          break;
        default:
          this.unexpectedError();
          break;
      }
    }
    return { playerOneScore, playerTwoScore };
  }

  getNextMove(player, rounds) {
    try {
      const move = (player.makeMove({ rounds }) || "").toUpperCase();
      return this.isValid(move) ? move : null;
    } catch(e) {
      console.error(e);
      return null;
    }
  }

  resolveRound(playerOneMove, playerTwoMove) {
    const round = playerOneMove + playerTwoMove;
    switch (round) {
      case "RR": case "PP": case "SS": case "DD": case "WW":
        return DRAW;
      case "RS": case "PR": case "SP": case "PW": case "RW":
      case "SW": case "DR": case "DP": case "DS": case "WD":
        return PLAYER_ONE_WIN;
      case "SR": case "RP": case "PS": case "WP": case "WR":
      case "WS": case "RD": case "PD": case "SD": case "DW":
        return PLAYER_TWO_WIN;
      default:
        this.unexpectedError();
        break;
    }
  }

  isValid(move) {
    return ["R", "P", "S", "D", "W"].indexOf(move) !== -1;
  }

  unexpectedError() {
    console.error("An unexpected error occurred when running this match.");
  }
}

export default new gameRunner();