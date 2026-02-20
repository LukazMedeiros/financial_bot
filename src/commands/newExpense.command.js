async function newExpense(bot) {
    bot.hears(/novo/gim, async (ctx) => {
        await ctx.scene.enter("new-expense");
    });
}

module.exports = newExpense;
