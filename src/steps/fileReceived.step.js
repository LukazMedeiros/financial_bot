const expense = require("../models/expense.model");
const getFileInfo = require("../services/getFileInfo.service");

const keyboard = [
    [{ text: "Recorrente", callback_data: "RECURRENT" }],
    [{ text: "Ocasional", callback_data: "OCCASIONAL" }],
];

async function fileReceivedStep(ctx) {
    const fileData = ctx?.message?.photo?.at(-1);
    const fileId = fileData?.file_id;

    expense.file = await getFileInfo(fileId);

    await ctx.replyWithHTML("Registro recorrente ou ocasional?", {
        reply_markup: {
            inline_keyboard: keyboard,
        },
    });

    ctx.wizard.next();
}

module.exports = fileReceivedStep;
