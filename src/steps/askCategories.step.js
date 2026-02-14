const keyboard = [[{ text: "Casa", callback_data: "casa" }]];

async function askCategoriesStep(ctx) {
    await ctx.replyWithHTML("Selecione a categoria", {
        reply_markup: {
            inline_keyboard: keyboard,
        },
    });

    ctx.wizard.next();
}

module.exports = askCategoriesStep;
