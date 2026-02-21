const authorizedUser = require("../middlewares/authorizedUser.middleware");

async function photoReceived(bot) {
    bot.on("photo", authorizedUser, async (ctx) => {
        await ctx.scene.enter("file-wizard");
    });
}

module.exports = photoReceived;
