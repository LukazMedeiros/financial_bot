const { Telegraf, session, Scenes } = require("telegraf");
const env = require("../config/env");
const AuthorizedUser = require("../middleware/AuthorizedUser");
const replyOnGroup = require("./handlers/replyOnGroup");
const categories = require("../models/categories");
const reminderWizard = require("./wizards/reminderWizard");

const bot = new Telegraf(env.botToken);
bot.use(session());

const wizards = new Scenes.Stage([reminderWizard]);

bot.use(wizards.middleware());

bot.start(AuthorizedUser, (ctx) => {
    console.log(JSON.stringify(ctx?.update?.message?.chat.id));
    return ctx.reply("mensagem de boas vindas");
});

bot.on("forum_topic_created", async (ctx) => {
    const updateMessage = ctx?.update?.message;
    const topicId = updateMessage?.message_thread_id;
    const topicTitle = updateMessage?.forum_topic_created?.name;
    console.log({ topicId, topicTitle });
    const result = await categories.create({ topicTitle, topicId });
    if (result) {
        return ctx
            .reply(`topico criado - ${topicId} ${topicTitle}`)
            .then(async (ctx) => {
                const chatId = ctx.chat.id;
                const messageId = ctx.message_id;
                await bot.telegram.pinChatMessage(chatId, messageId);
            });
    }
});

bot.on("forum_topic_closed", async ({ update }) => {
    const updateMessage = update?.message;
    const topicId = updateMessage?.message_thread_id;
    const topicTitle =
        updateMessage?.reply_to_message?.forum_topic_created?.name;
    console.log({ topicId, topicTitle });
    await categories.delete({ topicTitle, topicId });
    return;
});

bot.command(/cadastro|cadastrar/gim, AuthorizedUser, async (ctx) => {
    replyOnGroup("mensagem", 3);
});

bot.hears(/lembrete/gim, async (ctx) => {
    await ctx.scene.enter("reminder-wizard");
});

bot.launch();

module.exports = bot;
