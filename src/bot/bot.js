const { Telegraf, session, Scenes } = require("telegraf");
const env = require("../config/env");

//commands
const start = require("../commands/start.command");
const photoReceived = require("../commands/photoReceived.command");
const documentReceived = require("../commands/documentReceived.command");
const topicCreated = require("../commands/topicCreated.command");
const topicClosed = require("../commands/topicClosed.command");
const newExpense = require("../commands/newExpense.command");

//wizards
const fileWizard = require("../scenes/fileReceived.scene");
const recurrentWizard = require("../scenes/recurrent.scene");
const occasionalWizard = require("../scenes/occasional.scene");
const newWizard = require("../scenes/newExpense.scene");

const stages = new Scenes.Stage([
    fileWizard,
    recurrentWizard,
    occasionalWizard,
    newWizard,
]);

const bot = new Telegraf(env.token);
bot.use(session());
bot.use(stages.middleware());

start(bot);
photoReceived(bot);
documentReceived(bot);
topicCreated(bot);
topicClosed(bot);
newExpense(bot);

bot.launch();

module.exports = bot;
