const categories = require("../../models/categories");

module.exports = async function closeTopic(update) {
    const updateMessage = update?.message;
    const topicId = updateMessage?.message_thread_id;
    const topicTitle =
        updateMessage?.reply_to_message?.forum_topic_created?.name;

    console.log(`topico encerrado - {id:${topicId} titulo:${topicTitle}}`);
    await categories.delete({ topicTitle, topicId });
    return;
};
