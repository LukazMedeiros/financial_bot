const requests = require("../messages/requests.message");
const keyboard = require("../utils/keyboard.util");

async function newExpenseStep(ctx) {
    await ctx.replyWithHTML(requests.start);

    await ctx.replyWithHTML(requests.selectType, {
        reply_markup: {
            inline_keyboard: keyboard,
        },
    });

    ctx.wizard.next();
}

module.exports = newExpenseStep;
