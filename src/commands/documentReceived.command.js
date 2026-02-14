async function documentReceived(bot) {
    bot.on("document", async (ctx) => {
        await ctx.scene.enter("file-wizard");
    });
}

module.exports = documentReceived;
