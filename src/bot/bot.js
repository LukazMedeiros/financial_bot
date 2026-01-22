const { Telegraf, session } = require("telegraf");
const env = require("../config/env");
const AuthorizedUser = require("../middleware/AuthorizedUser");
const recordOnGroup = require("./handlers/recordOnGroup");

const bot = new Telegraf(env.botToken);
bot.use(session());

bot.start((ctx) => {
  console.log(ctx.message);
  return ctx.reply("mensagem de boas vindas");
});

bot.on("forum_topic_created", (ctx) => {
  const updateMessage = ctx.update.message;
  const topicId = updateMessage.message_thread_id;
  const topicTitle = updateMessage.forum_topic_created.name;
  console.log({ topicId, topicTitle });

  return ctx.reply(`topico criado - ${topicId} ${topicTitle}`);
});

bot.on("forum_topic_closed", ({ update }) => {
  const updateMessage = update.message;
  const topicId = updateMessage.message_thread_id;
  const topicTitle = updateMessage.reply_to_message.forum_topic_created.name;
  console.log({ topicId, topicTitle });
  return;
});

bot.command(/cadastro|cadastrar/gim, AuthorizedUser, async (ctx) => {
  // console.log(this);

  recordOnGroup("mensagem", 3);
});

bot.launch();

module.exports = bot;
