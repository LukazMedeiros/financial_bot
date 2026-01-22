const { Telegraf } = require("telegraf");
const env = require("../../config/env");

const agent = new Telegraf(env.botToken);

module.exports = function recordOnGroup(message, topic) {
  const chatId = env.chatId;
  agent.telegram.sendMessage(chatId, message, {
    message_thread_id: topic,
  });
};
