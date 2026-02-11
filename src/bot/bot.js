const { Telegraf, session } = require("telegraf");
const env = require("../config/env");

//commands
const photoReceived = require("../commands/photoReceived.command");
const documentReceived = require("../commands/documentReceived.command");

const bot = new Telegraf(env.token);
bot.use(session());

photoReceived(bot);
documentReceived(bot);

bot.launch();

module.exports = bot;
