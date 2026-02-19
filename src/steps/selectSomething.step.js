const requests = require("../messages/requests.message");
const expense = require("../models/expense.model");

const keyboard = [
    [{ text: "Sim, salvar", callback_data: "YES" }],
    [{ text: "Não, cancelar", callback_data: "NO" }],
];

function selectSomethingStep({
    key,
    needValidation,
    validationFn,
    errorMessage,
}) {
    return async (ctx) => {
        const receivedText = ctx?.message?.text?.trim();
        const action = ctx?.callbackQuery?.data;

        const value = receivedText ?? action;

        if (action) await ctx.editMessageReplyMarkup();

        if (needValidation) {
            if (validationFn(value)) {
                ctx.replyWithHTML(errorMessage);
                return;
            }
        }

        if (key) expense[key] = value;

        await ctx.replyWithHTML(requests.confirmation(expense), {
            reply_markup: {
                inline_keyboard: keyboard,
            },
        });

        return ctx.wizard.next();
    };
}

module.exports = selectSomethingStep;
