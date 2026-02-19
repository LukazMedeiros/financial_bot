const expense = require("../models/expense.model");

function askSomethingStep({
    key,
    message,
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

        await ctx.replyWithHTML(message);

        return ctx.wizard.next();
    };
}

module.exports = askSomethingStep;
