const formatDate = require("../../utils/formatDate");
const isValidDate = require("../../utils/isValidDate");
const moment = require("moment");

const messages = {
    invalid: `Ops! Essa data não é válida 🤔

💡 Use o formato: DD/MM/AAAA
📌 Exemplo: 15/01/2026`,

    validation: (state) => `Verifique se está tudo certo.
<b>Categoria</b>: ${state.topicTitle}
<b>Descrição</b>: ${state.description}
<b>Valor</b>: R$ ${state.amount}
<b>Data do Pagamento</b>: ${moment(state.payment_date).format("DD/MM/YYYY")}
<b>Data do Vencimento</b>: ${moment(state.due_date).format("DD/MM/YYYY")}
<b>Pagamento em atraso:</b> ${state.due_date_exceeded ? "Sim" : "Não"}`,
};

async function askConfirmation(ctx) {
    const dueDate = formatDate(ctx.message?.text.trim());

    if (!isValidDate(dueDate)) {
        await ctx.replyWithHTML(messages.invalid);
        return;
    }

    ctx.wizard.state.due_date = dueDate;
    ctx.wizard.state.due_date_exceeded =
        ctx.wizard.state.payment_date > ctx.wizard.state.due_date;

    await ctx.replyWithHTML(messages.validation(ctx.wizard.state), {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Sim 👍", callback_data: "YES" }],
                [{ text: "Não ❌", callback_data: "NO" }],
            ],
        },
    });

    return ctx.wizard.next();
}

module.exports = askConfirmation;
