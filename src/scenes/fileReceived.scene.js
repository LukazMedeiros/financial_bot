const { Scenes } = require("telegraf");
const expense = require("../models/expense.model");
const fileReceivedStep = require("../steps/fileReceived.step");

const fileWizard = new Scenes.WizardScene(
    "file-wizard",

    fileReceivedStep,

    async function (ctx) {
        const type = ctx.callbackQuery?.data;

        if (ctx.callbackQuery) {
            await ctx.editMessageReplyMarkup();
            expense.type = type;
            ctx.wizard.state.type = type;
        }

        if (type === "RECURRENT") ctx.scene.enter("recurrent-wizard");
        if (type === "OCCASIONAL") ctx.scene.enter("occasional-wizard");
    },
);

module.exports = fileWizard;
