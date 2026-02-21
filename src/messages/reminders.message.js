const reminders = {
    start: `📝 Vamos criar um novo lembrete!

Vou te guiar passo a passo para salvar as informações corretamente 😉`,

    askDescription:
        "📝 <b>Descrição</b>\nCerto! Agora, digite uma breve <b>descrição</b> (ex: Mercado, Aluguel, Netflix).",

    askDay: "📅 <b>Datas</b>\nCerto! Agora, em qual <b>dia</b> gostaria de ser lembrado?\nInforme somente o dia",

    askConfirmation: (data) => ` <b></b> 
📝 Descrição: ${data.description}
📅 Dia: ${data.day}

está certinho? 🤔`,

    requestPayment: (data) =>
        `🚨 Você tem um lembrete para hoje!\nNão va esquecer de pagar <b>${data.description}</b> 😉`,
};

module.exports = reminders;
