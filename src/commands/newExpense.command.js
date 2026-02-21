const authorizedUser = require("../middlewares/authorizedUser.middleware");

async function newExpense(bot) {
    bot.hears(/novo/gim, authorizedUser, async (ctx) => {
        await ctx.scene.enter("new-expense");
    });
}

module.exports = newExpense;
