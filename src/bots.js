const botNames = [
  'copyCatBot',
  'customBot',
  'dynamiteBot',
  'paperBot',
  'randomBot',
  'rockBot',
  'scissorsBot',
  'strategyBot',
  'tieBreakerBot',
  'waterBombBot'
]

const bots = botNames.map(name => {
  const bot = require(`./bots/${name}`)
  bot.name = name;
  bot.wins = 0;
  bot.scoreDifference = 0;
  return bot;
});
export default bots;