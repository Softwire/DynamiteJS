_You've heard of Rock-Paper-Scissors, enter Rock-Paper-Scissors-Waterballoon-Dynamite!_

## The Game

As in standard Rock-Paper-Scissors, there are two players who take it in turns to choose one option of:
* Rock (R)
* Paper (P)
* Scissors (S)

Which player wins is based on the following rules:
* Rock vs. Scissors - Rock wins (smashes Scissors)
* Scissors vs. Paper - Scissors wins (cuts Paper)
* Paper vs. Rock - Paper wins (wraps Rock)
* Any time the players choose the same item, it is a draw.

In Rock-Paper-Scissors-Waterballoon-Dynamite we add the following options:
* Waterballoon (W)
* Dynamite (D) (players only have a limited number of this each game)

These add the following rules:
* Waterballoon vs. Dynamite - Waterballoon wins (extinguishes dynamite)
* Waterballoon vs. Anything else (not Dynamite) - Waterballoon loses (bursts)
* Dynamite vs. Anything else (not Waterballoon) - Dynamite wins (explodes opponent)

The above describes a single round, games will consist of multiple rounds, with scores being accumulated through the rounds.

## Overview

Your task will be to write a bot to play Rock-Paper-Scissors-Waterballoon-Dynamite.

You have been given a web page that runs and shows results for a Rock-Paper-Scissors-Waterballoon-Dynamite league. The league works as follows:
1. Each bot plays each other bot in a game of Rock-Paper-Scissors-Waterballoon-Dynamite.
    * Rounds are played one by one, in a race to 1000 points.
    * A point is scored when a bot wins a single round.
    * If the bots draw, neither player scores and the point available for that round is carried over to the next round (i.e. after one draw the next round is worth two points, after two draws three points, etc.). If there are 1000 consecutive draws, the game ends there.
    * If any bot returns an invalid move (i.e. not one of the above five options) the other bot immediately wins the game.
    * Players are limited to using **100 dynamite** per game.
2. Once all the games have been played, the page displays the results.
    * Bots are ranked based on number of wins, then by score difference as a tie-breaker.
    * A breakdown of every move each bot made in each game is also given in case you wish to analyse how a game played out.

## Setup

You will need to install:
* NodeJS with npm included
  * You can find this at https://nodejs.org/en/download/. The default settings should be fine - including npm package manager and "add to PATH"
* Git
  * You will only need this to run one command `git clone` to download the code for the bot runner, so any basic Git client will do. For example:
    * _For Windows users_: Git for Windows https://gitforwindows.org/. Make sure you include 'Git Bash' if it asks.
    * _Other users_: find your downloads at https://git-scm.com/downloads.
* A text editor to look at / write your code.
  * If you're not sure what to use, Visual Studio Code or Atom are good options.

One you have completed the downloads, open Git Bash (if you installed Git for Windows) or your shell/command line on Linux/Mac and do the following:
1. Move to a directory where you want to save the code.
    * Use the command `cd path/to/directory`.
    * If you want to create a new folder, you can use the command `mkdir <directory name>`.
2. The code is all stored on Github. To get a copy on your machine use the command `git clone https://github.com/Softwire/DynamiteJS.git`.
    * You should now have a folder in that directory called `DynamiteJS`. This contains all the code you will need for the activity.
3. Move into the new directory by using `cd DynamiteJS`.
4. Install the packages that the project relies on by using the command `npm install`.
5. Run the site! Use the command `npm run start`.
    * You should get a message in your command line that includes the following text:
    ```
    Starting the development server...
    Compiled successfully!
    You can now view dynamite in the browser.
    Local: http://localhost:3000/
    ```
    * Your web browser should burst into life and go to the site. If it doesn't, go to the site address given in your command line, i.e. the http://localhost:3000 above.

You should see the results from your first league of Rock-Paper-Scissors-Waterballoon-Dynamite! Reloading the page will re-play the league and give you the new results each time.

## Getting Started

### Introduction to the codebase
The project is written in JavaScript, specifically using a framework called React. The source code is found in the `/DynamiteJS/src` folder. The files in here handle running the league and generating the page. You will not need to touch these, but you can have a look if you're interested. In particular, `gameRunner.js` contains the code that runs a single game of Rock-Paper-Scissors-Waterballoon-Dynamite.

### Introduction to bots
All the bots can be found in `DynamiteJS/src/bots`. This is where you will do your own modifications.

Each bot implementation looks something like:
```
class Bot {
  makeMove(gamestate) {
    // some code here to choose a move...
    return 'X';
  }
}

module.exports = new Bot();
```
where X is the chosen move, i.e. R, P S, W, or D.

Each bot must have the method `makeMove(gamestate)` which defines which move it will pick this round. This is the method you will need to implement. `gamestate` is an object which tells you what moves have already been played that game so that you can use it to choose your future moves, and it looks something like:
```
{
  rounds: [
    {
      myMove: "R",
      opponentMove: "D"
    },
    {
      myMove: "W",
      opponentMove: "S"
    },
    ...
  ]
}
```

`module.exports = new Bot()` ensures that this bot is included in the league.

## Task #1
Can you fill in the code for `randomBot.js` so that it randomly selects a move between Rock, Paper and Scissors? Leave out Waterballoon and Dynamite for now.

If you're a bit lost or don't know how to get started, just ask one of our volunteers to help you out. Also, look at the other bots for clues, starting with `paperBot.js` and `rockBot.js`.  The other bots already have a random move generator, so give it a try yourself first before looking at them!

Extension: extend your bot to also choose Dynamite at random. Remember it is limited to using up to 100 Dynamite per game.

## Task #2
Now fill in the code for `customBot.js`. This can use any strategy of your choosing/designing.
