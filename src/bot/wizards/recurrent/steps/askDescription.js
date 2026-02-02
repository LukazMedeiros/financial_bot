const categories = require("../../../../models/categories");

const message = `Certo 🙂 Agora escreva uma <b>descrição</b> pra identificar esse lançamento.

📝 Exemplo:
“energia”
“gás”`;

async function askDescription(ctx) {
    const action = ctx.callbackQuery?.data;
    ctx.wizard.state.topicId = action;
    ctx.wizard.state.topicTitle = await categories.getCategory(action);
    if (ctx.callbackQuery) await ctx.editMessageReplyMarkup();
    await ctx.replyWithHTML(message);
    return ctx.wizard.next();
}

module.exports = askDescription;
