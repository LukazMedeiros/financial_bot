async function photoReceived(bot) {
    bot.on("photo", async (ctx) => {
        ctx.replyWithHTML("foto recebida");
    });
}

module.exports = photoReceived;
