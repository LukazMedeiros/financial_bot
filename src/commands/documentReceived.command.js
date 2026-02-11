async function documentReceived(bot) {
    bot.on("document", async (ctx) => {
        ctx.replyWithHTML("documento recebida");
    });
}

module.exports = documentReceived;
