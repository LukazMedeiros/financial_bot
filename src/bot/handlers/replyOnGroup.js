const { Telegraf } = require("telegraf");
const env = require("../../config/env");

const agent = new Telegraf(env.botToken);

module.exports = function replyOnGroup(message, topicId) {
    const chatId = env.chatId;
    agent.telegram.sendMessage(chatId, message, {
        message_thread_id: topicId,
        parse_mode: "HTML",
    });
};
