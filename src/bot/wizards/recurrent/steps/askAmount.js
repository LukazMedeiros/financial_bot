const message = `Beleza. Qual é o <b>valor</b>?

💰 Exemplo:
45.90
1200,00`;

async function askAmount(ctx) {
    ctx.wizard.state.description = ctx.message?.text.trim();
    ctx.wizard.state.user = ctx.message?.from?.username;
    await ctx.replyWithHTML(message);
    return ctx.wizard.next();
}

module.exports = askAmount;
