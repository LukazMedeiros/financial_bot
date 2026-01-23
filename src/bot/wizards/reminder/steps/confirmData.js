const isValidDay = require("../utils/isValidDay");

const messages = {
    confirmation: (description, day) => `🔍 Só conferindo antes de salvar…

🧾 <b>Despesa:</b> ${description}
📅 <b>Data do lembrete:</b> ${day}

Está tudo certinho? 😊
Escolha uma opção abaixo 👇
`,

    invalid: "❗ Informe um dia válido entre 1 e 31.",
};

async function confirmData(ctx) {
    const day = ctx.message?.text.trim();
    if (!isValidDay(day)) {
        await ctx.reply(messages.invalid);
        return;
    }

    ctx.wizard.state.day = day;

    await ctx.replyWithHTML(
        messages.confirmation(
            ctx.wizard.state.description,
            ctx.wizard.state.day,
        ),
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✅ Confirmar", callback_data: "CONFIRM" }],
                    [{ text: "❌ Cancelar", callback_data: "CANCEL" }],
                ],
            },
        },
    );
    return ctx.wizard.next();
}

module.exports = confirmData;
