const { Telegraf, session, Scenes } = require("telegraf");
const env = require("../config/env");
const AuthorizedUser = require("../middleware/AuthorizedUser");
const replyOnGroup = require("./handlers/replyOnGroup");
const reminderWizard = require("./wizards/reminderWizard");
const closeTopic = require("./handlers/closeTopic");
const createTopic = require("./handlers/createTopic");
const occasionalWizard = require("./wizards/occasionalWizard");

const bot = new Telegraf(env.botToken);
bot.use(session());

const wizards = new Scenes.Stage([reminderWizard, occasionalWizard]);

bot.use(wizards.middleware());

bot.start(AuthorizedUser, (ctx) => {
    console.log(JSON.stringify(ctx?.update?.message?.chat.id));
    return ctx.reply("mensagem de boas vindas");
});

bot.on("forum_topic_created", async (ctx) => {
    await createTopic(ctx, bot);
    return;
});

bot.on("forum_topic_closed", async ({ update }) => {
    await closeTopic(update);
    return;
});

bot.command(/cadastro|cadastrar/gim, AuthorizedUser, async (ctx) => {
    await ctx.scene.enter("occasional-wizard");
    // replyOnGroup("mensagem", 3);
});

bot.hears(/lembrete/gim, async (ctx) => {
    await ctx.scene.enter("reminder-wizard");
});

bot.launch();

module.exports = bot;
