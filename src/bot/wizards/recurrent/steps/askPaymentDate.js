const isValidAmount = require("../../utils/isValidAmount");

const messages = {
    invalidAmount: `Hmm… esse valor não parece válido 😕

💡 Dica: use apenas números e ponto ou vírgula para os centavos.
📌 Exemplo: 45,90`,

    askDate: `Quase lá 😄
Qual foi a data do pagamento? Se o pagamento foi <b>hoje</b>, digite "hoje"`,
};

async function askPaymentDate(ctx) {
    let amount = ctx.message?.text.trim();

    if (!isValidAmount(amount)) {
        await ctx.replyWithHTML(messages.invalidAmount);
        return;
    }

    amount = parseFloat(amount.replace(",", ".")).toFixed(2);
    ctx.wizard.state.amount = amount;
    await ctx.replyWithHTML(messages.askDate);
    return ctx.wizard.next();
}

module.exports = askPaymentDate;
