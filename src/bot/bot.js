const { Telegraf, session } = require("telegraf");
const env = require("../config/env");
const AuthorizedUser = require("../middleware/AuthorizedUser");

const bot = new Telegraf(env.botToken);
bot.use(session());

bot.start((ctx) => {
  return ctx.reply("mensagem de boas vindas");
});

bot.command(/cadastrar|cadastro/gim, AuthorizedUser, (ctx) => {
  const context = JSON.stringify(ctx.message);
  console.log(context);
  return ctx.replyWithHTML(context, { message_thread_id: 3 });
});

bot.launch();

module.exports = bot;
