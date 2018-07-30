import path from 'path';

const context = require.context('./bots', true, /\.js$/);
const bots = context.keys().map(file => {
  const bot = context(file);
  bot.name = path.basename(file, '.js');
  bot.wins = 0;
  bot.scoreDifference = 0;
  return bot;
});

export default bots;