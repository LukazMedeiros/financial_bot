const getCategories = require("../services/getCategories.service");

async function askCategoriesStep(ctx) {
    const keyboard = await getCategories();
    await ctx.replyWithHTML("Selecione a categoria", {
        reply_markup: {
            inline_keyboard: keyboard,
        },
    });

    ctx.wizard.next();
}

module.exports = askCategoriesStep;
