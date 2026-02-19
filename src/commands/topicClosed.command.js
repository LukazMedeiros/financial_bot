const Category = require("../models/category.model");

async function topicClosed(bot) {
    bot.on("forum_topic_closed", async ({ update }) => {
        const updateMessage = update?.message;

        const category = new Category();
        category.topicId = updateMessage?.message_thread_id;
        category.topicTitle =
            updateMessage?.reply_to_message?.forum_topic_created?.name;

        category.delete();

        console.log(
            `Tópico encerrado - Tópico:${category.topicTitle} Id:${category.topicId}`,
        );

        return;
    });
}

module.exports = topicClosed;
