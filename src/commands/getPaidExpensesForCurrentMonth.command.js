const authorizedUser = require("../middlewares/authorizedUser.middleware");
const {
    getPaidExpensesMessage,
} = require("../services/getPaidExpenses.service");
const info = require("../messages/info.message");

async function getPaidExpensesForCurrentMonth(bot) {
    bot.hears(/pago|paguei/gim, authorizedUser, async (ctx) => {
        const result = await getPaidExpensesMessage();

        if (result.length > 0) {
            ctx.reply(info.paidMessage(result));
            return;
        }
        ctx.reply(info.expense);
        return;
    });
}

module.exports = getPaidExpensesForCurrentMonth;
