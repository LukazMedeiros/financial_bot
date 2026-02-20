const requests = require("../messages/requests.message");
const expense = require("../models/expense.model");
const keyboard = require("../utils/keyboard.util");
const getFileInfo = require("../services/getFileInfo.service");
const greetings = require("../messages/greetings.message");

async function fileReceivedStep(ctx) {
    const fileData = ctx?.message?.photo?.at(-1) || ctx?.message?.document;
    const fileId = fileData?.file_id;

    expense.file = await getFileInfo(fileId);

    await ctx.replyWithHTML(greetings.start);

    await ctx.replyWithHTML(requests.selectType, {
        reply_markup: {
            inline_keyboard: keyboard,
        },
    });

    ctx.wizard.next();
}

module.exports = fileReceivedStep;
