const categories = require("../../../../models/categories");

const message = `Vamos registrar um novo lançamento financeiro.
Para começar, selecione a <b>categoria.</b>`;

async function askCategory(ctx) {
    ctx.wizard.state.type = "unique";
    ctx.wizard.state.user = ctx.message?.from?.username;

    const activeCategories = await categories.list();

    const keyboard = activeCategories.map((item) => {
        return [{ text: item.topicTitle, callback_data: item.topicId }];
    });

    await ctx.replyWithHTML(message, {
        reply_markup: { inline_keyboard: keyboard },
    });
    return ctx.wizard.next();
}

module.exports = askCategory;
