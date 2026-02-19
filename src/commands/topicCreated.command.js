const { Telegraf } = require("telegraf");
const Category = require("../models/category.model");
const env = require("../config/env");

const agent = new Telegraf(env.token);

async function topicCreated(bot) {
    bot.on("forum_topic_created", async (ctx) => {
        const updateMessage = ctx?.update?.message;
        const topicId = updateMessage?.message_thread_id;
        const topicTitle = updateMessage?.forum_topic_created?.name;
        const category = new Category();
        category.topicId = topicId;
        category.topicTitle = topicTitle;

        const result = await category.create();

        if (result) {
            return ctx
                .reply(
                    `Tópico criado - Tópico:${category.topicTitle} Id:${category.topicId}`,
                )
                .then(async (ctx) => {
                    const chatId = ctx.chat.id;
                    const messageId = ctx.message_id;
                    await agent.telegram.pinChatMessage(chatId, messageId);
                });
        }
    });
}

module.exports = topicCreated;
