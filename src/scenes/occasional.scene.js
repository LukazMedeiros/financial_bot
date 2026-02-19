const { Scenes } = require("telegraf");
const askCategoriesStep = require("../steps/askCategories.step");
const askSomethingStep = require("../steps/askSomething.step");
const selectSomethingStep = require("../steps/selectSomething.step");
const finishStep = require("../steps/finish.step");
const isMonetaryValue = require("../utils/isMonetaryValue.util");
const isDateValid = require("../utils/isValidDate.util");
const requests = require("../messages/requests.message");

const occasionalWizard = new Scenes.WizardScene(
    "occasional-wizard",

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

    selectSomethingStep({
        key: "paymentDate",
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: "Entre com uma data válida! ex: 01/01/2026",
    }),

    finishStep({}),
);

module.exports = occasionalWizard;
