const message = `⏰ Agora me conta:

📅 <b>Qual dia você quer receber o lembrete?</b>
Digite apenas o dia (1 a 31)

Prometo te avisar direitinho 😅🔔
`;

async function askDay(ctx) {
    const description = ctx.message.text?.trim();
    ctx.wizard.state.description = description;

    await ctx.replyWithHTML(message);
    return ctx.wizard.next();
}

module.exports = askDay;
