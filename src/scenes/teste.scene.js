const { Scenes } = require("telegraf");
const expense = require("../models/expense.model");

const teste = new Scenes.WizardScene(
    "teste-wizard",
    async function (ctx) {
        const value = ctx?.message?.text?.trim();
        expense.type = value;
        await ctx.replyWithHTML("entrou no segundo wizard - entre com o valor");
        ctx.wizard.next();
    },
    async function (ctx) {
        const value = ctx?.message?.text?.trim();
        expense.amount = value;
        ctx.wizard.state = expense;
        await ctx.replyWithHTML(JSON.stringify(ctx.wizard.state));
        ctx.scene.leave();
    },
);

module.exports = teste;
