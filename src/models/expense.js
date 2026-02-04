const dbConnection = require("../config/dbConnection");

module.exports = {
    table: "expenses",

    create: async function (expense) {
        try {
            const result = await dbConnection(this.table).insert({
                description: expense.description,
                amount: expense.amount,
                payment_date: expense.payment_date?.toLocaleString("pt-br"),
                due_date: expense?.due_date?.toLocaleString("pt-br") ?? null,
                category: expense.topicTitle,
                due_date_exceeded: expense?.due_date_exceeded ?? null,
                user: expense.user,
                type: expense.type,
            });
            return result > 0;
        } catch (error) {
            return false;
        }
    },
};
