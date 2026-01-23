const { Scenes } = require("telegraf");
const moment = require("moment");
const categories = require("../../models/categories");
const replyOnGroup = require("../handlers/replyOnGroup");

const isValidAmount = (amount) => {
    const regex = /^(\d{1,})([.|,])?(\d{0,2})?$/;
    return amount.match(regex);
};

const isValidDate = (date) => {
    const dateObject = new Date(date);
    if (isNaN(dateObject.getTime())) {
        return false;
    }
    return true;
};

const formatDate = (date) => {
    const formatedDate = date.match(/hoje/i)
        ? new Date()
        : new Date(
              moment(date, "DD/MM/YYYY")
                  .format("YYYY-MM-DD")
                  .split("-")
                  .toString(),
          );

    return formatedDate;
};

async function askCategory(ctx) {
    ctx.wizard.state.type = "unique";
    ctx.wizard.state.user = ctx.update.message.from.username;
    const activeCategories = await categories.list();

    const keyboard = activeCategories.map((item) => {
        return [{ text: item.topicTitle, callback_data: item.topicId }];
    });

    await ctx.replyWithHTML("escolha a categoria:", {
        reply_markup: {
            inline_keyboard: keyboard,
        },
    });
    return ctx.wizard.next();
}

async function askDescription(ctx) {
    const action = ctx.callbackQuery?.data;
    ctx.wizard.state.topicId = action;
    ctx.wizard.state.topicTitle = await categories.getCategory(action);
    if (ctx.callbackQuery) await ctx.editMessageReplyMarkup();
    await ctx.replyWithHTML("entre com a descrição:");
    return ctx.wizard.next();
}

async function askAmount(ctx) {
    ctx.wizard.state.description = ctx.message?.text.trim();
    await ctx.replyWithHTML("entre com o valor:");
    return ctx.wizard.next();
}

async function askPaymentDate(ctx) {
    let amount = ctx.message?.text.trim();

    if (!isValidAmount(amount)) {
        await ctx.replyWithHTML("entre com um valor valido");
        return;
    }

    amount = parseFloat(amount.replace(",", ".")).toFixed(2);
    ctx.wizard.state.amount = amount;
    await ctx.replyWithHTML("entre com a data do pagamento");
    return ctx.wizard.next();
}

async function confirmData(ctx) {
    const paymentDate = formatDate(ctx.message.text.trim());

    if (!isValidDate(paymentDate)) {
        await ctx.replyWithHTML("entre com uma data valida");
        return;
    }
    ctx.wizard.state.payment_date = paymentDate;
    await ctx.replyWithHTML("esta tudo certo?", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Sim", callback_data: "YES" }],
                [{ text: "Não", callback_data: "NO" }],
            ],
        },
    });

    return ctx.wizard.next();
}

async function finishWizard(ctx) {
    const action = ctx.callbackQuery?.data;
    if (ctx.callbackQuery) {
        await ctx.editMessageReplyMarkup();
    }
    if (action === "YES") {
        //adicionar registro em banco de dados
        await ctx.replyWithHTML("registro criado");
        await replyOnGroup(
            JSON.stringify(ctx.wizard.state),
            ctx.wizard.state.topicId,
        );
    } else {
        await ctx.replyWithHTML("cancelado");
    }

    return ctx.scene.leave();
}

const occasionalWizard = new Scenes.WizardScene(
    "occasional-wizard",
    askCategory,
    askDescription,
    askAmount,
    askPaymentDate,
    confirmData,
    finishWizard,
);

module.exports = occasionalWizard;
