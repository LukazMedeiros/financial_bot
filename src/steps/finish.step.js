const Category = require("../models/category.model");
const expense = require("../models/expense.model");
const replyOnGroup = require("../services/replyOnGroup.service");

function finishStep({ needValidation, validationFn, errorMessage }) {
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
            //adicionar funcionalidade para verificar se esta vencida
        }

        expense.user = user;

        if (value === "YES") {
            try {
                //adicionar funcionalidade para registrar em base de dados
                const created = await expense.create();
                if (created) {
                    const categoryId = await new Category().get(
                        expense.category,
                    );
                    replyOnGroup(JSON.stringify(created), categoryId);

                    await ctx.replyWithHTML("Cadastrado com sucesso");
                }
            } catch (error) {
                await ctx.replyWithHTML(`Erro para cadastrar ${error.message}`);
            }
        } else {
            await ctx.replyWithHTML("Cancelado");
        }
        expense.clear();
        ctx.scene.leave();
    };
}

module.exports = finishStep;
