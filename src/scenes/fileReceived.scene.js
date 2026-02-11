const { Scenes } = require("telegraf");
const expense = require("../models/expense.model");
const getFileInfo = require("../services/getFileInfo.service");

const fileWizard = new Scenes.WizardScene(
    "file-wizard",
    async function (ctx) {
        const fileData = ctx?.message?.photo?.at(-1);
        const fileId = fileData?.file_id;

        expense.file = await getFileInfo(fileId);

        await ctx.replyWithHTML("registro recorrente ou ocasional?");
        ctx.wizard.next();
    },
    async function (ctx) {
        const choice = ctx?.message?.text?.trim();

        if (choice.match(/recorrente/gim)) {
            ctx.scene.enter("teste-wizard");
        }
        ctx.scene.leave();
    },
);

module.exports = fileWizard;
