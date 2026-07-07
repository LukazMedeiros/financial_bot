const authorizedUser = require("../middlewares/authorizedUser.middleware");
const getPaidExpenses = require("../services/getPaidExpenses.service");
const info = require("../messages/info.message");

async function getPaidExpensesForCurrentMonth(bot) {
    bot.hears(/pago|paguei/gim, authorizedUser, async (ctx) => {
        const result = await getPaidExpenses();

        if (result.length > 0) {
            ctx.reply(info.paidMessage(result));
            return;
        }
        ctx.reply(info.expense);
        return;
    });
}

module.exports = getPaidExpensesForCurrentMonth;
