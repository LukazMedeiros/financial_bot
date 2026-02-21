const { Scenes } = require("telegraf");
const askCategoriesStep = require("../steps/askCategories.step");
const askSomethingStep = require("../steps/askSomething.step");
const selectSomethingStep = require("../steps/selectSomething.step");
const finishExpenseStep = require("../steps/finishExpense.step");
const isMonetaryValue = require("../utils/isMonetaryValue.util");
const isDateValid = require("../utils/isValidDate.util");
const requests = require("../messages/requests.message");
const error = require("../messages/error.message");
const expense = require("../models/expense.model");

const occasionalWizard = new Scenes.WizardScene(
    "occasional-wizard",

    askCategoriesStep,

    askSomethingStep({
        key: "category",
        message: requests.insertDescription,
        needValidation: false,
        validationFn: null,
        errorMessage: error.category,
        model: expense,
    }),

    askSomethingStep({
        key: "description",
        message: requests.insertAmount,
        needValidation: false,
        validationFn: null,
        errorMessage: error.description,
        model: expense,
    }),

    askSomethingStep({
        key: "amount",
        message: requests.insertPaymentDate,
        needValidation: true,
        validationFn: isMonetaryValue,
        errorMessage: error.amount,
        model: expense,
    }),

    selectSomethingStep({
        key: "paymentDate",
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: error.date,
        message: requests.confirmation,
        model: expense,
    }),

    finishExpenseStep({}),
);

module.exports = occasionalWizard;
