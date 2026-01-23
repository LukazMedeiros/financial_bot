const reminders = require("../../../../models/reminders");

const messages = {
    success: "Boa! 😄 Tudo certo por aqui.\nRegistro salvo com sucesso!",
    cancel: "Tudo certo 🙂\nA operação foi cancelada.\nQuando quiser tentar de novo, é só chamar 😉",
    error: "Ih 😭 algo não saiu como esperado e o registro não foi salvo.",
};

async function finishWizard(ctx) {
    const action = ctx.callbackQuery?.data;

    if (ctx.callbackQuery) await ctx.editMessageReplyMarkup();

    if (action === "CONFIRM") {
        const createdSuccessfully = await reminders.create(ctx.wizard.state);
        const responseMessage = createdSuccessfully
            ? messages.success
            : messages.error;
        await ctx.replyWithHTML(responseMessage);
    } else {
        await ctx.replyWithHTML(messages.cancel);
    }
    return ctx.scene.leave();
}

module.exports = finishWizard;
