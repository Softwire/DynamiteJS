class Bot {
  /**
   * gamestate gives you the history of rounds played so far.
   * It is of the following form:
   * {
   *   rounds: [
   *     {
   *       myMove: "R",
   *       opponentMove: "D"
   *     },
   *     {
   *       myMove: "W",
   *       opponentMove: "S"
   *     },
   *     ...
   *   ]
   * }
   *
   *  makeMove MUST return one of 'R', 'P', 'S', 'D', or 'W'
   */
  makeMove(gamestate) {
    // TODO: Implement a bot following a strategy of your choosing.
  }
}

module.exports = new Bot();