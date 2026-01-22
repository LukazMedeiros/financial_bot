const { Telegraf, session } = require("telegraf");
const env = require("../config/env");
const AuthorizedUser = require("../middleware/AuthorizedUser");
const replyOnGroup = require("./handlers/replyOnGroup");
const categories = require("../models/categories");

const bot = new Telegraf(env.botToken);
bot.use(session());

bot.start(AuthorizedUser, (ctx) => {
    console.log(ctx.message);
    return ctx.reply("mensagem de boas vindas");
});

bot.on("forum_topic_created", async (ctx) => {
    const updateMessage = ctx?.update?.message;
    const topicId = updateMessage?.message_thread_id;
    const topicTitle = updateMessage?.forum_topic_created?.name;
    console.log({ topicId, topicTitle });
    const result = await categories.create(topicTitle, topicId);
    if (result) {
        return ctx.reply(`topico criado - ${topicId} ${topicTitle}`);
    }
});

bot.on("forum_topic_closed", async ({ update }) => {
    const updateMessage = update?.message;
    const topicId = updateMessage?.message_thread_id;
    const topicTitle =
        updateMessage?.reply_to_message?.forum_topic_created?.name;
    console.log({ topicId, topicTitle });
    await categories.delete(topicTitle, topicId);
    return;
});

bot.command(/cadastro|cadastrar/gim, AuthorizedUser, async (ctx) => {
    replyOnGroup("mensagem", 3);
});

bot.launch();

module.exports = bot;
