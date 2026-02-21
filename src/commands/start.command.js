const greetings = require("../messages/greetings.message");
const authorizedUser = require("../middlewares/authorizedUser.middleware");

async function start(bot) {
    bot.start(authorizedUser, (ctx) => {
        console.log(JSON.stringify(ctx?.update?.message?.chat.id));
        return ctx.reply(greetings.botStart);
    });
}

module.exports = start;
