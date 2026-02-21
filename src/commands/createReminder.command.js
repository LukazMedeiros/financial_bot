async function createReminder(bot) {
    bot.hears(/lembrete/gim, async (ctx) => {
        await ctx.scene.enter("reminder-wizard");
    });
}

module.exports = createReminder;
