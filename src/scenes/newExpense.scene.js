const { Scenes } = require("telegraf");
const expense = require("../models/expense.model");
const newExpenseStep = require("../steps/newExpense.step");

const newWizard = new Scenes.WizardScene(
    "new-expense",

    newExpenseStep,

    async function (ctx) {
        const type = ctx.callbackQuery?.data;

        if (ctx.callbackQuery) {
            await ctx.editMessageReplyMarkup();
            expense.type = type;
        }

        if (type === "RECURRENT") ctx.scene.enter("recurrent-wizard");
        if (type === "OCCASIONAL") ctx.scene.enter("occasional-wizard");
    },
);

module.exports = newWizard;
