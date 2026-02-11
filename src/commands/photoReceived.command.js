async function photoReceived(bot) {
    bot.on("photo", async (ctx) => {
        await ctx.scene.enter("file-wizard");
    });
}

module.exports = photoReceived;
