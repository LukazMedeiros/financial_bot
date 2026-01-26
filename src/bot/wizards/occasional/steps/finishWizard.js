const replyOnGroup = require("../../../handlers/replyOnGroup");
const moment = require("moment");

const messages = {
    success: `✅ Pronto! Lançamento salvo com sucesso.
Se quiser, você pode cadastrar outro agora. 😉`,

    cancel: `Operação cancelada ❌

Nenhum dado foi salvo.
Qualquer coisa estou aqui para o que precisar. 😅`,

    error: `Ops! Algo não saiu como esperado 😕😮

Ocorreu um erro ao processar sua solicitação.
Por favor, tente novamente em alguns instantes.😰`,

    responsetoGroup: (state) => `Novo registro Adicionado 😉👍
    
📚 <i>Categoria</i>: <b>${state.topicTitle}</b>
📰 <i>Descrição</i>: <b>${state.description}</b>
💵 <i>Valor</i>: <b>${state.amount}</b>
📅 <i>Data do Pagamento</i>: <b>${moment(state.payment_date).format("DD/MM/YYYY")}</b>`,
};

async function finishWizard(ctx) {
    const action = ctx.callbackQuery?.data;
    if (ctx.callbackQuery) {
        await ctx.editMessageReplyMarkup();
    }
    if (action === "YES") {
        //adicionar registro em banco de dados
        await ctx.replyWithHTML(messages.success);
        await replyOnGroup(
            messages.responsetoGroup(ctx.wizard.state),
            ctx.wizard.state.topicId,
        );
    } else {
        await ctx.replyWithHTML(messages.cancel);
    }

    return ctx.scene.leave();
}

module.exports = finishWizard;
