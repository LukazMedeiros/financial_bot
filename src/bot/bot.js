const { Telegraf, session, Scenes } = require("telegraf");
const env = require("../config/env");

//commands
const photoReceived = require("../commands/photoReceived.command");
const documentReceived = require("../commands/documentReceived.command");
const topicCreated = require("../commands/topicCreated.command");
const topicClosed = require("../commands/topicClosed.command");
const start = require("../commands/start.command");

//wizards
const fileWizard = require("../scenes/fileReceived.scene");
const recurrentWizard = require("../scenes/recurrent.scene");
const occasionalWizard = require("../scenes/occasional.scene");

const stages = new Scenes.Stage([
    fileWizard,
    recurrentWizard,
    occasionalWizard,
]);

const bot = new Telegraf(env.token);
bot.use(session());
bot.use(stages.middleware());

start(bot);
photoReceived(bot);
documentReceived(bot);
topicCreated(bot);
topicClosed(bot);

bot.launch();

module.exports = bot;
