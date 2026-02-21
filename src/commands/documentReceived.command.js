const authorizedUser = require("../middlewares/authorizedUser.middleware");

async function documentReceived(bot) {
    bot.on("document", authorizedUser, async (ctx) => {
        await ctx.scene.enter("file-wizard");
    });
}

module.exports = documentReceived;
