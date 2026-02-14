const expense = require("../models/expense.model");

//alterar para o keyboard vir como argumento

const keyboard = [
    [{ text: "Sim", callback_data: "YES" }],
    [{ text: "Não", callback_data: "NO" }],
];

function selectSomethingStep({
    key,
    message,
    needValidation,
    validationFn,
    errorMessage,
    // keyboard,
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

        await ctx.replyWithHTML(message, {
            reply_markup: {
                inline_keyboard: keyboard,
            },
        });

        return ctx.wizard.next();
    };
}

module.exports = selectSomethingStep;
