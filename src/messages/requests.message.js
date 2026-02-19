const requests = {
    selectType:
        "🔁 <b>Tipo de registro</b>\nEsse registro é uma despesa <b>recorrente</b> (todo mês) ou <b>ocasional</b> (compra única)?",

    selectCategory:
        "📂 <b>Categoria</b>\nEm qual <b>categoria</b> esse lançamento se encaixa?",

    insertDescription:
        "📝 <b>Descrição</b>\nCerto! Agora, digite uma breve <b>descrição</b> (ex: Mercado, Aluguel, Netflix).",

    insertAmount:
        "💰 <b>Valor</b>\nQual o <b>valor?</b> (Use ponto ou vírgula para os centavos).",

    insertPaymentDate:
        "📅 <b>Datas</b>\nQual foi a <b>data do pagamento?</b>\nInforme a data no formato: DD/MM/AAAA\nExemplo: 01/01/2026",

    insertDueDate:
        "E qual a <b>data de vencimento</b> desse boleto/conta?\nInforme a data no formato: DD/MM/AAAA\nExemplo: 01/01/2026",

    confirmation: (data) => `📋 <b>Confira os dados:</b>
📝 Descrição: ${data.description}
💰 Valor: R$ ${parseFloat(data.amount).toFixed(2)}
📅 Pagamento: ${data.paymentDate}
${data.dueDate ? `📅 Vencimento: ${data.dueDate}` : ""}

Está tudo certinho?`,

    replyMessage: (data) => `<b>🚨 Novo registro 🚨</b>

📝 Descrição: <b>${data.description}</b>
💰 Valor: R$ <b>${parseFloat(data.amount).toFixed(2)}</b>
📅 Pagamento: <b>${data.paymentDate}</b>
👤 Pagador: <b>${data.user}</b>
${data.dueDate ? `📅 Vencimento: <b>${data.dueDate}</b>` : ""}
${data.file ? `💾 Comprovante: <a href='${data.file}'>Clique para baixar</a>` : ""}`,
};

module.exports = requests;
