const message = `👋 Oi! Vamos registrar uma nova despesa?
Antes de continuar, me conta uma coisa:
esse gasto é recorrente (como conta de luz, gás, internet) ou foi um valor ocasional (almoço, cinema, transporte, etc)?
É só escolher uma das opções 😊`;

module.exports = async function createRegister(ctx) {
    await ctx.replyWithHTML(message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Recorrente", callback_data: "RECURRENT" }],
                [{ text: "Ocasional", callback_data: "OCCASIONAL" }],
            ],
        },
    });
};
