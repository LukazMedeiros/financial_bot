const authorizedUser = require("../middlewares/authorizedUser.middleware");

async function createReminder(bot) {
    bot.hears(/lembrete/gim, authorizedUser, async (ctx) => {
        await ctx.scene.enter("reminder-wizard");
    });
}

module.exports = createReminder;
