const { Scenes } = require("telegraf");
const askSomethingStep = require("../steps/askSomething.step");
const askCategoriesStep = require("../steps/askCategories.step");
const finishStep = require("../steps/finish.step");
const selectSomethingStep = require("../steps/selectSomething.step");
const isMonetaryValue = require("../utils/isMonetaryValue.util");
const isDateValid = require("../utils/isValidDate.util");
const requests = require("../messages/requests.message");
const expense = require("../models/expense.model");

const recurrentWizard = new Scenes.WizardScene(
    "recurrent-wizard",

    askCategoriesStep,

    askSomethingStep({
        key: "category",
        message: requests.insertDescription,
        needValidation: false,
        validationFn: null,
        errorMessage: "Selecione uma categoria válida!",
    }),

    askSomethingStep({
        key: "description",
        message: requests.insertAmount,
        needValidation: false,
        validationFn: null,
        errorMessage: "A descrição não pode ser vazia",
    }),

    askSomethingStep({
        key: "amount",
        message: requests.insertPaymentDate,
        needValidation: true,
        validationFn: isMonetaryValue,
        errorMessage: "Entre com um valor monetário valido! ex: 10,50",
    }),

    askSomethingStep({
        key: "paymentDate",
        message: requests.insertDueDate,
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: "Entre com uma data válida! ex: 01/01/2026",
    }),

    selectSomethingStep({
        key: "dueDate",
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: "Entre com uma data válida! ex: 01/01/2026",
    }),

    finishStep({}),
);

module.exports = recurrentWizard;
