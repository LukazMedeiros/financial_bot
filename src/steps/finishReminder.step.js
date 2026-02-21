const reminder = require("../models/reminder.model");
const status = require("../messages/status.message");
const error = require("../messages/error.message");

function finishReminderStep() {
    return async (ctx) => {
        const receivedText = ctx?.message?.text?.trim();
        const action = ctx?.callbackQuery?.data;

        const value = receivedText ?? action;

        if (action) await ctx.editMessageReplyMarkup();

        if (value === "YES") {
            try {
                const created = await reminder.create();
                if (created) await ctx.replyWithHTML(status.success);
            } catch (e) {
                await ctx.replyWithHTML(error.error + e.message);
            }
        } else {
            await ctx.replyWithHTML(status.cancel);
        }
        reminder.clear();
        ctx.scene.leave();
    };
}

module.exports = finishReminderStep;
