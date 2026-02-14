async function start(bot) {
    bot.start((ctx) => {
        console.log(JSON.stringify(ctx?.update?.message?.chat.id));
        return ctx.reply("Bot iniciado");
    });
}

module.exports = start;
