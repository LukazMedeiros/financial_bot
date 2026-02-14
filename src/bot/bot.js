const { Telegraf, session, Scenes } = require("telegraf");
const env = require("../config/env");

//commands
const photoReceived = require("../commands/photoReceived.command");
const documentReceived = require("../commands/documentReceived.command");

//wizards
const fileWizard = require("../scenes/fileReceived.scene");
const recurrentWizard = require("../scenes/recurrent.scene");
const occasionalWizard = require("../scenes/occasional.scene");
const teste = require("../scenes/teste.scene");

const stages = new Scenes.Stage([
    fileWizard,
    recurrentWizard,
    occasionalWizard,
    teste,
]);

const bot = new Telegraf(env.token);
bot.use(session());
bot.use(stages.middleware());

photoReceived(bot);
documentReceived(bot);

bot.launch();

module.exports = bot;
