const greetings = require("../messages/greetings.message");

async function start(bot) {
    bot.start((ctx) => {
        console.log(JSON.stringify(ctx?.update?.message?.chat.id));
        return ctx.reply(greetings.botStart);
    });
}

module.exports = start;
