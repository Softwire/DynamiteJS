class Bot {
    /**
     * gamestate gives you the history of rounds played so far. It is of the following form:
        {
            rounds: [
                {
                    p1 : "R",
                    p2 : "D"
                },
                {
                    p1 : "W",
                    p2 : "S"
                },
                ...
            ]
        }

        makeMove *MUST* return either 'R', 'P', 'S', 'D', or 'W'

        You can run one bot against another by running the following in a terminal (ctrl+'):
        > node dynamite-cli.js [bot1].js [bot2].js
    */
    makeMove(gamestate) {
        // TODO: Make a bot that always returns Rock
        return "R";
    }
}

module.exports = new Bot();
