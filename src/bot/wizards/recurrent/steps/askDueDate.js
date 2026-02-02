const formatDate = require("../../utils/formatDate");
const isValidDate = require("../../utils/isValidDate");

const messages = {
    invalid: `Ops! Essa data não é válida 🤔

💡 Use o formato: DD/MM/AAAA
📌 Exemplo: 15/01/2026`,

    askDate: `Mais uma coisinha 😅
Qual é a data de vencimento? Se o vencimento for <b>hoje</b>, digite "hoje"`,
};

async function askDueDate(ctx) {
    const paymentDate = formatDate(ctx.message?.text.trim());

    if (!isValidDate(paymentDate)) {
        await ctx.replyWithHTML(messages.invalid);
        return;
    }

    ctx.wizard.state.payment_date = paymentDate;

    await ctx.replyWithHTML(messages.askDate);

    return ctx.wizard.next();
}

module.exports = askDueDate;
