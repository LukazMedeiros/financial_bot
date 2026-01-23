const { Scenes } = require("telegraf");
const reminders = require("../../models/reminders");

const MESSAGES = {
    ASK_DESCRIPTION: `👋 Vamos lá!

Qual é a <b>despesa</b> que você quer cadastrar no lembrete?
Pode ser algo como:
💡 <b>Internet</b>
🏠 <b>Aluguel</b>
💳 <b>Fatura do cartão</b>

É só escrever o nome 😉
`,

    ASK_DAY: `⏰ Agora me conta:

📅 <b>Qual dia você quer receber o lembrete?</b>
Digite apenas o dia (1 a 31)

Prometo te avisar direitinho 😅🔔
`,

    CONFIRMATION: (description, day) => `🔍 Só conferindo antes de salvar…

🧾 <b>Despesa:</b> ${description}
📅 <b>Data do lembrete:</b> ${day}

Está tudo certinho? 😊
Escolha uma opção abaixo 👇
`,

    SUCCESS: "✅ Lembrete cadastrado com sucesso!",
    CANCEL: "❌ Cadastro cancelado.",
};

const isValidDay = (day) => {
    const parsedDay = Number(day);
    return Number.isInteger(parsedDay) && parsedDay >= 1 && parsedDay <= 31;
};

async function askDescription(ctx) {
    await ctx.replyWithHTML(MESSAGES.ASK_DESCRIPTION);
    return ctx.wizard.next();
}

async function askDay(ctx) {
    if (!ctx.message?.text) {
        await ctx.reply("Por favor, informe uma descrição válida.");
        return;
    }

    ctx.wizard.state.description = ctx.message.text.trim();
    await ctx.replyWithHTML(MESSAGES.ASK_DAY);
    return ctx.wizard.next();
}

async function confirmData(ctx) {
    const day = ctx.message?.text;

    if (!isValidDay(day)) {
        await ctx.reply("❗ Informe um dia válido entre 1 e 31.");
        return;
    }

    ctx.wizard.state.day = day;

    await ctx.replyWithHTML(
        MESSAGES.CONFIRMATION(
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

async function finishWizard(ctx) {
    const action = ctx.callbackQuery?.data;

    if (ctx.callbackQuery) {
        await ctx.editMessageReplyMarkup();
    }

    if (action === "CONFIRM") {
        const result = await reminders.create(ctx.wizard.state);
        if (result) {
            await ctx.replyWithHTML(MESSAGES.SUCCESS);
        } else {
            await ctx.replyWithHTML("😮😫 mensagem de erro");
        }
    } else {
        await ctx.replyWithHTML(MESSAGES.CANCEL);
    }

    return ctx.scene.leave();
}

const reminderWizard = new Scenes.WizardScene(
    "reminder-wizard",
    askDescription,
    askDay,
    confirmData,
    finishWizard,
);

module.exports = reminderWizard;
