const { Scenes } = require("telegraf");
const askSomethingStep = require("../steps/askSomething.step");
const askCategoriesStep = require("../steps/askCategories.step");
const finishExpenseStep = require("../steps/finishExpense.step");
const selectSomethingStep = require("../steps/selectSomething.step");
const isMonetaryValue = require("../utils/isMonetaryValue.util");
const isDateValid = require("../utils/isValidDate.util");
const requests = require("../messages/requests.message");
const error = require("../messages/error.message");
const expense = require("../models/expense.model");

const recurrentWizard = new Scenes.WizardScene(
    "recurrent-wizard",

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

    askSomethingStep({
        key: "paymentDate",
        message: requests.insertDueDate,
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: error.date,
        model: expense,
    }),

    selectSomethingStep({
        key: "dueDate",
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: error.date,
        message: requests.confirmation,
        model: expense,
    }),

    finishExpenseStep({}),
);

module.exports = recurrentWizard;
