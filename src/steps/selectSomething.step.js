const keyboard = [
    [{ text: "Sim, salvar", callback_data: "YES" }],
    [{ text: "Não, cancelar", callback_data: "NO" }],
];

function selectSomethingStep({
    key,
    needValidation,
    validationFn,
    errorMessage,
    message,
    model,
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

        if (key) model[key] = value;

        await ctx.replyWithHTML(message(model), {
            reply_markup: {
                inline_keyboard: keyboard,
            },
        });

        return ctx.wizard.next();
    };
}

module.exports = selectSomethingStep;
