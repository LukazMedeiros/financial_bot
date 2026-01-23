const categories = require("../../models/categories");

module.exports = async function createTopic(ctx, bot) {
    const updateMessage = ctx?.update?.message;
    const topicId = updateMessage?.message_thread_id;
    const topicTitle = updateMessage?.forum_topic_created?.name;
    console.log(`criado tópico - { id: ${topicId}, titulo:${topicTitle} }`);
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
};
