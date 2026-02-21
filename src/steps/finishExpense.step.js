const Category = require("../models/category.model");
const expense = require("../models/expense.model");
const replyOnGroup = require("../services/replyOnGroup.service");
const requests = require("../messages/requests.message");
const status = require("../messages/status.message");
const error = require("../messages/error.message");

function finishExpenseStep({ needValidation, validationFn, errorMessage }) {
    return async (ctx) => {
        const context = ctx?.message?.from ?? ctx?.callbackQuery;
        const user = context.from?.username;
        const receivedText = ctx?.message?.text?.trim();
        const action = ctx?.callbackQuery?.data;

        const value = receivedText ?? action;

        if (action) await ctx.editMessageReplyMarkup();

        if (needValidation) {
            if (validationFn(value)) {
                ctx.replyWithHTML(errorMessage);
                return;
            }
        }

        if (expense.dueDate) {
            expense.HasDueDateExceeded();
        }

        expense.user = user;

        if (value === "YES") {
            try {
                const created = await expense.create();
                if (created) {
                    const categoryId = await new Category().get(
                        expense.category,
                    );

                    replyOnGroup(requests.replyMessage(created), categoryId);

                    await ctx.replyWithHTML(status.success);
                }
            } catch (e) {
                await ctx.replyWithHTML(error.error + e.message);
            }
        } else {
            await ctx.replyWithHTML(status.cancel);
        }
        expense.clear();
        ctx.scene.leave();
    };
}

module.exports = finishExpenseStep;
