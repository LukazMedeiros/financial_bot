const { Scenes } = require("telegraf");

const reminderWizard = new Scenes.WizardScene(
  "reminder-wizard",
  async (ctx) => {
    await ctx.replyWithHTML(`👋 Vamos lá!

Qual é a <b>despesa</b> que você quer cadastrar no lembrete?
Pode ser algo como:
💡 <b>Internet</b>
🏠 <b>Aluguel</b>
💳 <b>Fatura do cartão</b>

É só escrever o nome 😉
`);
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.description = ctx.message.text;
    await ctx.replyWithHTML(`⏰ Agora me conta:

📅 <b>Qual dia você quer receber o lembrete?</b>
Digite apenas o dia

Prometo te avisar direitinho 😅🔔
`);
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.day = ctx.message.text;
    await ctx.replyWithHTML(
      `🔍 Só conferindo antes de salvar…

🧾 <b>Despesa:</b> ${ctx.wizard.state.description}
📅 <b>Data do lembrete:</b> ${ctx.wizard.state.day}

Está tudo certinho? 😊
Escolha uma opção abaixo 👇
`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✅ Confirmar", callback_data: "confirmar" }],
            [{ text: "❌ Cancelar", callback_data: "cancelar" }],
          ],
        },
      }
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.callbackQuery.data) await ctx.editMessageReplyMarkup();
    const response = ctx.callbackQuery.data || ctx.message.text;
    if (response.match(/confirmar/i)) {
      await ctx.replyWithHTML("cadastrado com sucesso");
    } else {
      await ctx.replyWithHTML("mensgem de cancelamento");
    }
    return ctx.scene.leave();
  }
);

module.exports = reminderWizard;
