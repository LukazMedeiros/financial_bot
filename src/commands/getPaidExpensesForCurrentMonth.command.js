const authorizedUser = require("../middlewares/authorizedUser.middleware");
const getPaidExpenses = require("../services/getPaidExpenses.service");

async function getPaidExpensesForCurrentMonth(bot) {
    bot.hears(/pago|paguei/gim, authorizedUser, async (ctx) => {
        const result = await getPaidExpenses();

        if (result) {
            ctx.reply(result);
            return;
        }
        ctx.reply("tem nada aqui não");
    });
}

module.exports = getPaidExpensesForCurrentMonth;
