const expense = require("../models/expense.model.js");

async function getPaidExpenses() {
    const expenses = await expense.getPaidExpenses();
    console.log(expenses);
    // adicionar funcionalidade de formatar resposta do database

    return expenses;
}

module.exports = getPaidExpenses;
