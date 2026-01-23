const message = `👋 Vamos lá!

Qual é a <b>despesa</b> que você quer cadastrar no lembrete?
Pode ser algo como:
💡 <b>Internet</b>
🏠 <b>Aluguel</b>
💳 <b>Fatura do cartão</b>

É só escrever o nome 😉
`;

async function askDescription(ctx) {
    await ctx.replyWithHTML(message);
    return ctx.wizard.next();
}

module.exports = askDescription;
