const expense = require("../models/expense.model");

function formatPaidExpenses(expensesArray) {
    let array = new Array();

    for (const element of expensesArray) {
        array.push(formatItem(element));
    }

    return array.join("\n\n");
}

function formatItem(itemObj) {
    const dueDateExceeded = itemObj.dueDateExceeded ? "Vencida" : "No Prazo";
    let [paymentDate, paymentHour] = itemObj.created_at.split(" ");
    paymentDate = paymentDate.split("-").reverse().join("/");

    return `${itemObj.description}\nR$ ${Number(itemObj.amount).toFixed(2)}\nData do pagamento: ${paymentDate}\n${dueDateExceeded}`;
}

async function getPaidExpensesMessage() {
    const expenses = await expense.getPaidExpenses();
    const messageFormatted = formatPaidExpenses(expenses);

    return messageFormatted;
}

async function getPaidExpensesObject() {
    const expenses = await expense.getPaidExpenses();
    return expenses;
}

module.exports = { getPaidExpensesMessage, getPaidExpensesObject };
